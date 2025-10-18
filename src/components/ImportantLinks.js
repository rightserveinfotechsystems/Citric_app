import React from 'react';
import { View, Text, StyleSheet, Linking, Alert, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';

const links = [
  {
    title: 'Ministry of Agriculture and Farmers Welfare, Govt. of India',
    url: 'https://agriwelfare.gov.in/',
  },
  {
    title: 'Ministry of Skill Development and Entrepreneurship, Govt. of India',
    url: 'https://www.msde.gov.in/',
  },
  {
    title: 'Indian Council of Agricultural Research',
    url: 'https://www.icar.org.in/',
  },
  {
    title: 'Startup India',
    url: 'https://www.startupindia.gov.in/',
  },
  {
    title: 'ICAR-IP&TM Unit',
    url: 'https://www.icar.org.in/intellectual-property-technology-management-iptm-unit',
  },
  {
    title: 'ICAR-Central Citrus Research Institute',
    url: 'https://ccri.icar.gov.in/',
  },
];


export default function ImportantLinks() {

  
  const openLink = async (url) => {
    // Check if the link can be opened
    const supported = await Linking.openURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open URL: ${url}`);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <TopNavbar titleName="Important Links" />
      <ImageBackground source={require("../assets/BackgroundforImportantLinks.jpg")} style={styles.container}  >
      <ScrollView style={{marginBottom:"40"}}>
        {links.map((link, index) => (
        <View key={index} style={styles.reachBox}>
          <Text style={styles.headTitle}>{link.title}</Text>
          <TouchableOpacity onPress={() => openLink(link.url)}>
            <Text style={styles.title}>{link.url}</Text>
          </TouchableOpacity>
        </View>
      ))}
        
      </ScrollView>
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // alignItems: "center",
    resizeMode: "contain",
    flex:1,
  },
  reachBox: {
    marginLeft: 20,
    marginTop: 30
  },
  headTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    width: "90%",
    marginHorizontal: "5%",
    textAlign: "center"
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: 'blue',
    textDecorationLine: "underline",
    textAlign: "center",
    width: "80%",
    marginHorizontal: "10%",
    textAlign: "center"
  },
})