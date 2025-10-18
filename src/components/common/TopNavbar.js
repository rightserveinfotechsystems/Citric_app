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

const { width: screenWidth } = Dimensions.get('window'); // Get screen width dynamically

export const TopNavbar = ({ titleName }) => {
  const navigation = useNavigation();
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

  return (
    <>
      <View style={topNavbarStyle.navbarTop}>
        <TouchableOpacity style={{ width: 40,height: 50}} onPress={() => navigation.goBack()}>
          <Image
            style={topNavbarStyle.backIcon}
            source={require("../../assets/backArrow.png")}
          />
        </TouchableOpacity>
        <Text style={topNavbarStyle.navbarTopText}>{titleName}</Text>
        <TouchableOpacity onPress={toggleMenu} style={topNavbarStyle.menuButton}>
          <Image
            style={topNavbarStyle.menuIcon}
            source={require("../../assets/menu.png")} // Add a hamburger icon to your assets
          />
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={topNavbarStyle.modalOverlay}
          onPress={toggleMenu}
        />
        <Animated.View
          style={[
            topNavbarStyle.menuContainer,
            { transform: [{ translateX: menuAnimation }] }, // Slide effect
          ]}
        >

          {/* Close Button */}
          <TouchableOpacity
            style={topNavbarStyle.closeButton}
            onPress={toggleMenu}
          >
            <Image
              style={topNavbarStyle.closeIcon}
              source={require("../../assets/close.png")} // Add a close icon to your assets
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('Home');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('Genesis');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Genesis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('Announcement');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Announcement</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('ApplyForIncubation');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Apply For Incubation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('CriteriaForSelection');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Criteria For Selection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('IncubationModule');
            }}
          >
            <Text style={topNavbarStyle.menuText}>IncubationModule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('PotencialVentures');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Potencial Ventures</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('ProcessOfIncubation');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Process Of Incubation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('ReachUs');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Reach Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('ImportantLinks');
            }}
          >
            <Text style={topNavbarStyle.menuText}>Important Links</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={topNavbarStyle.menuItem}
            onPress={() => {
              toggleMenu();
              navigation.navigate('About');
            }}
          >
            <Text style={topNavbarStyle.menuText}>About</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
};

const topNavbarStyle = StyleSheet.create({
  navbarTop: {
    backgroundColor: '#EC7E1C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '1%',
    paddingLeft: 10,
  },
  navbarTopText: {
    color: 'white',
    fontSize: 18,
    marginLeft: '5%',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  backIcon: {
    width: 25,
    height: 25,
    marginTop: 15,
  },
  menuButton: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  menuIcon: {
    width: 30,
    height: 30,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 19,
    color: '#333',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeIcon: {
    width: 22,
    height: 22,
  },
});
