import React from 'react';
import { Linking, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell } from '../components/common/ScreenShell';
import { homeScreen } from '../data/home';

/** Pairs tiles into rows of two (original launcher layout). */
function toRows(tiles) {
  const rows = [];
  for (let i = 0; i < tiles.length; i += 2) rows.push(tiles.slice(i, i + 2));
  return rows;
}

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScreenShell
      title="Citri Hub"
      showNavbar={false}
      backgroundColor={homeScreen.backgroundColor}
      contentStyle={styles.content}
    >
      <View style={styles.logoContainer}>
        {homeScreen.logos.map((logo, index) => (
          <Image key={index} style={styles.imageView} source={logo} />
        ))}
      </View>

      {toRows(homeScreen.tiles).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tabContainer}>
          {row.map((tile) => (
            <TouchableOpacity
              key={tile.route}
              onPress={() => navigation.navigate(tile.route)}
              style={[styles.tabView, { backgroundColor: tile.color }]}
            >
              <Image style={[styles.imageBox, tile.iconStyle]} source={tile.icon} />
              <Text style={styles.tabText}>{tile.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.creditsBox}>
        <Text style={styles.headText}>{homeScreen.credits.leadHeading}</Text>
        {homeScreen.credits.lead.map((person) =>
          person.nameFirst ? (
            <Text key={person.name} style={styles.redText}>
              <Text style={styles.normalText} /> {person.name}{' '}
              <Text style={styles.normalText}>{person.role}</Text>
            </Text>
          ) : (
            <Text key={person.name} style={styles.redText}>
              {person.name} <Text style={styles.normalText}>{person.role}</Text>{' '}
            </Text>
          ),
        )}
        <Text style={[styles.headText, styles.spacedTop]}>{homeScreen.credits.coHeading}</Text>
        {homeScreen.credits.coLines.map((line) => (
          <Text key={line} style={styles.normalText}>{line}</Text>
        ))}
        {homeScreen.credits.orgLines.map((line) => (
          <Text key={line} style={styles.redText}>{line}</Text>
        ))}
        <View style={styles.divider} />
        <Text
          style={[styles.normalText, styles.livepro]}
          onPress={() => Linking.openURL(homeScreen.designedBy.url)}
        >
          {homeScreen.designedBy.label}
        </Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgb(233 219 206)',
  },
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  imageView: {
    width: '33%',
    height: 95,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  tabView: {
    width: '45%',
    height: 140,
    paddingVertical: 15,
  },
  imageBox: {
    width: '55%',
    resizeMode: 'contain',
    margin: 'auto',
    height: 70,
  },
  tabText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  creditsBox: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  normalText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headText: {
    fontSize: 14,
    color: '#012160',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  redText: {
    fontSize: 13,
    color: '#C10001',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  spacedTop: {
    marginTop: 10,
  },
  livepro: {
    color: '#517A00',
  },
});
