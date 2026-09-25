import React from 'react';
import { Text, StyleSheet, Linking, Alert, TouchableOpacity, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';

async function openLink(url) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(`Unable to open URL: ${url}`);
  }
}

/** Static screen content (bundled with the app — no API). */
const LINKS = {
  title: 'Important Links',
  background: require('../assets/BackgroundforImportantLinks.jpg'),
  links: [
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
  ],
};

export default function ImportantLinks() {
  return (
    <ScreenShell title={LINKS.title} background={LINKS.background}>
      {LINKS.links.map((link) => (
        <View key={link.url} style={styles.reachBox}>
          <Text style={styles.headTitle}>{link.title}</Text>
          <TouchableOpacity onPress={() => openLink(link.url)}>
            <Text style={styles.linkText}>{link.url}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  reachBox: {
    marginLeft: 20,
    marginTop: 30,
  },
  headTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    width: '90%',
    marginHorizontal: '5%',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    width: '80%',
    marginHorizontal: '10%',
  },
});
