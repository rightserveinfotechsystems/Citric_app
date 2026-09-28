import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

/** Slide-in menu, data-driven (add a screen here and it appears in the menu). */
const MENU_ITEMS = [
  { label: 'Genesis', route: 'Genesis' },
  { label: 'Announcement', route: 'Announcement' },
  { label: 'Apply For Incubation', route: 'ApplyForIncubation' },
  { label: 'Criteria For Selection', route: 'CriteriaForSelection' },
  { label: 'Incubation Module', route: 'IncubationModule' },
  { label: 'Potencial Ventures', route: 'PotencialVentures' },
  { label: 'Process Of Incubation', route: 'ProcessOfIncubation' },
  { label: 'Important Links', route: 'ImportantLinks' },
  { label: 'Reach Us', route: 'ReachUs' },
  { label: 'About', route: 'About' },
];

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

const windowInsets = initialWindowMetrics?.insets;

export const TopNavbar = ({ titleName }) => {
  const navigation = useNavigation();
  const route = useRoute();
  // Real device insets (status bar / notch / Dynamic Island on iOS, bars on Android
  // edge-to-edge). On Android today (non edge-to-edge) these report 0 → zero visual change.
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slide] = useState(new Animated.Value(screenWidth)); // panel off-screen (right)
  const [fade] = useState(new Animated.Value(0)); // backdrop opacity

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 0, // panel's natural position: right 72% of the screen
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slide, {
        toValue: screenWidth, // slide out of view
        duration: 280,
        useNativeDriver: false,
      }),
      Animated.timing(fade, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start(() => setMenuVisible(false));
  };

  const toggleMenu = () => (menuVisible ? closeMenu() : openMenu());

  const navigateTo = (targetRoute) => {
    closeMenu();
    navigation.navigate(targetRoute);
  };

  return (
    <>
      {/*
        Alignment fix (all devices): the bar is a fixed-height row with alignItems:'center',
        so the back arrow, title and hamburger are ALWAYS vertically centered — no more
        hand-tuned marginTop offsets that drift across devices/densities.
        The orange background extends behind the status bar (paddingTop: insets.top).
      */}
      <View
        style={[
          styles.statusBarPad,
          {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={HIT_SLOP}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image style={styles.backIcon} source={require('../../assets/backArrow.png')} />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.titleText}>
            {titleName}
          </Text>

          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={HIT_SLOP}
            onPress={toggleMenu}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Image style={styles.menuIcon} source={require('../../assets/menu.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hamburger Menu Modal — sliding panel + fading backdrop */}
      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalRoot}>
          {/* Fading backdrop */}
          <Animated.View style={[styles.backdrop, { opacity: fade }]}>
            <TouchableOpacity
              style={styles.backdropTouch}
              activeOpacity={1}
              onPress={closeMenu}
              accessibilityLabel="Close menu"
            />
          </Animated.View>

          {/* Sliding panel (right 70%) */}
          <Animated.View
            style={[
              styles.menu,
              {
                paddingTop: 12 + (windowInsets?.top ?? 0),
                paddingBottom: 12 + (windowInsets?.bottom ?? 0),
                transform: [{ translateX: slide }],
              },
            ]}
          >
            {/* Close */}
            <TouchableOpacity
              style={styles.closeButton}
              hitSlop={HIT_SLOP}
              onPress={closeMenu}
              accessibilityRole="button"
              accessibilityLabel="Close menu"
            >
              <Image style={styles.closeIcon} source={require('../../assets/close.png')} />
            </TouchableOpacity>

            {/* Brand header */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuBrand}>Citri Hub</Text>
              <Text style={styles.menuSubtitle}>ICAR-CCRI · Agri-Business Incubation Centre</Text>
            </View>

            {/* Items (current screen highlighted) */}
            <View style={styles.menuList}>
              {MENU_ITEMS.map((item, index) => {
                const active = route?.name === item.route;
                return (
                  <TouchableOpacity
                    key={item.route}
                    style={[
                      styles.menuItem,
                      index === MENU_ITEMS.length - 1 && styles.menuItemLast,
                      active && styles.menuItemActive,
                    ]}
                    activeOpacity={0.6}
                    onPress={() => navigateTo(item.route)}
                  >
                    {active && <View style={styles.activeBar} />}
                    <Text style={[styles.menuText, active && styles.menuTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Footer */}
            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterText}>
                © ICAR-Central Citrus Research Institute, Nagpur
              </Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const ORANGE = '#EC7E1C';

const styles = StyleSheet.create({
  statusBarPad: {
    backgroundColor: ORANGE, // keeps the orange painted behind the status bar
  },
  bar: {
    height: 54,
    backgroundColor: ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  titleText: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    marginRight: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  /* ── Menu modal ─────────────────────────────────────────── */
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdropTouch: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: screenWidth * 0.72,
    marginLeft: screenWidth * 0.28,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12 + (initialWindowMetrics?.insets?.top ?? 0),
    right: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  closeIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  menuBrand: {
    fontSize: 22,
    fontWeight: '900',
    color: ORANGE,
    letterSpacing: 0.3,
  },
  menuSubtitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#8A8A8A',
    letterSpacing: 0.2,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemActive: {
    backgroundColor: '#FDF1E7',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
    borderRadius: 2,
    backgroundColor: ORANGE,
  },
  menuText: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#333333',
    flexShrink: 1,
  },
  menuTextActive: {
    color: ORANGE,
    fontWeight: '800',
  },
  menuFooter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },
  menuFooterText: {
    fontSize: 10.5,
    color: '#9B9B9B',
    fontWeight: '500',
  },
});
