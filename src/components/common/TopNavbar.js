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
import { useNavigation } from '@react-navigation/native';
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

export const TopNavbar = ({ titleName }) => {
  const navigation = useNavigation();
  // Real device insets (status bar / notch / Dynamic Island on iOS, bars on Android
  // edge-to-edge). On Android today (non edge-to-edge) these report 0 → zero visual change.
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(screenWidth)); // Start off-screen

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: screenWidth, // Slide out of view
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: screenWidth * 0.3, // Slide in, occupy 70% of screen width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const navigateTo = (route) => {
    toggleMenu();
    navigation.navigate(route);
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

      {/* Hamburger Menu Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu} />
        <Animated.View
          style={[
            styles.menuContainer,
            {
              // Modals render in a separate root (outside SafeAreaProvider), so we use
              // the static window metrics snapshot instead of the context hook.
              paddingTop: 12 + (initialWindowMetrics?.insets?.top ?? 0),
              paddingLeft: 10 + (initialWindowMetrics?.insets?.left ?? 0),
            },
            { transform: [{ translateX: menuAnimation }] }, // Slide effect
          ]}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Image
              style={styles.closeIcon}
              source={require('../../assets/close.png')}
            />
          </TouchableOpacity>

          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.menuItem}
              onPress={() => navigateTo(item.route)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarPad: {
    backgroundColor: '#EC7E1C', // keeps the orange painted behind the status bar
  },
  bar: {
    height: 54,
    backgroundColor: '#EC7E1C',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: screenWidth * 0.7, // 70% of the screen width
    backgroundColor: '#FFFFFF',
    paddingBottom: 24,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  closeIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});
