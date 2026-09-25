import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopNavbar } from './TopNavbar';

/**
 * ScreenShell — the shared frame for every content screen:
 *   white root → TopNavbar → full-bleed background image → insets-aware ScrollView.
 *
 * Replaces the ~15 lines of identical boilerplate each screen used to carry
 * (root View + navbar + ImageBackground + ScrollView + inset math) with one declarative call.
 *
 * Props:
 *   title         string  — navbar title (e.g. "Genesis")
 *   background    number  — require('../assets/…') background image
 *   centered      bool    — center content horizontally (screens whose background is centered art)
 *   refreshing    bool    — pull-to-refresh spinner state (optional)
 *   onRefresh     fn      — enables pull-to-refresh when provided (optional)
 *   contentStyle  object  — extra styles for the scroll content container (optional)
 *   children      node
 */
export function ScreenShell({
  title,
  background,
  centered = false,
  refreshing = false,
  onRefresh,
  contentStyle,
  children,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <TopNavbar titleName={title} />
      <ImageBackground
        source={background}
        style={[styles.background, centered && styles.centered]}
      >
        <ScrollView
          contentContainerStyle={[
            { paddingBottom: insets.bottom + 32 },
            centered && styles.centered,
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
          {children}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    width: '100%',
    resizeMode: 'contain',
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
});
