import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopNavbar } from './TopNavbar';

/**
 * ScreenShell — the shared frame for every content screen:
 *   root → [TopNavbar] → background (image or solid color) → insets-aware ScrollView.
 *
 * Props:
 *   title            string  — navbar title
 *   showNavbar       bool    — render the TopNavbar (default true; Home passes false)
 *   background       number  — require('../assets/…') background image (optional)
 *   backgroundColor  string  — solid background color when there is no image (optional)
 *   centered         bool    — center content horizontally
 *   keyboardAvoiding bool    — wrap the scroll area in KeyboardAvoidingView
 *                               (iOS 'padding' / Android native adjustResize) — form screens
 *   scrollEnabled    bool    — false → renders a plain View instead of ScrollView
 *                               (for screens that host their own FlatList)
 *   NOTE: with showNavbar=false the shell auto-pads the content by the top/left/right
 *   safe-area insets (Dynamic Island, notch, landscape ears) — nothing gets clipped.
 *   refreshing       bool    — pull-to-refresh spinner state (optional)
 *   onRefresh        fn      — enables pull-to-refresh when provided (optional)
 *   contentStyle     object  — extra styles for the scroll content container (optional)
 *   children         node
 */
export function ScreenShell({
  title,
  showNavbar = true,
  background,
  backgroundColor,
  centered = false,
  keyboardAvoiding = false,
  scrollEnabled = true,
  refreshing = false,
  onRefresh,
  contentStyle,
  children,
}) {
  const insets = useSafeAreaInsets();

  // When there is no TopNavbar (chrome-less screens like Home), the shell itself must
  // provide the safe-area padding: top (status bar / notch / Dynamic Island) and sides
  // (notch ears in landscape). With a navbar, the bar already pads top/left/right and
  // the content starts below it — so no extra top padding is applied.
  const chromeInsets = showNavbar
    ? null
    : {
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      };

  const frameStyle = [
    styles.background,
    centered && styles.centered,
    backgroundColor ? { backgroundColor } : null,
  ];

  // NOTE: `alignItems:'center'` on a ScrollView's contentContainer triggers a long-standing
  // Android measuring bug (children with % widths / maxWidth collapse or overflow — content
  // renders clipped or blank). Centering is applied on an inner normal View instead, where
  // measurement is well-defined on every platform.
  const scroll = scrollEnabled ? (
    <ScrollView
      contentContainerStyle={[
        { paddingBottom: insets.bottom + 32 },
        chromeInsets,
        contentStyle,
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#EC7E1C"
            colors={['#EC7E1C']}
          />
        ) : undefined
      }
    >
      <View style={[styles.contentWrap, centered && styles.centered]}>{children}</View>
    </ScrollView>
  ) : (
    <View style={[styles.flex, chromeInsets, contentStyle]}>
      <View style={[styles.contentWrap, centered && styles.centered]}>{children}</View>
    </View>
  );

  return (
    <View style={styles.root}>
      {showNavbar ? <TopNavbar titleName={title} /> : null}
      {background ? (
        <ImageBackground source={background} style={frameStyle} resizeMode="cover">
          {keyboardAvoiding ? <Avoider>{scroll}</Avoider> : scroll}
        </ImageBackground>
      ) : (
        <View style={frameStyle}>
          {keyboardAvoiding ? <Avoider>{scroll}</Avoider> : scroll}
        </View>
      )}
    </View>
  );
}

/** iOS: lift content above the keyboard. Android: native adjustResize handles it. */
function Avoider({ children }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    width: '100%',
    flex: 1,
  },
  contentWrap: {
    width: '100%',
  },
  centered: {
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});
