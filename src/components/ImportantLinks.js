import React from 'react';
import { Text, StyleSheet, Linking, Alert, TouchableOpacity, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { importantLinksScreen } from '../data/importantLinks';

async function openLink(url) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(`Unable to open URL: ${url}`);
  }
}

export default function ImportantLinks() {
  return (
    <ScreenShell title={importantLinksScreen.title} background={importantLinksScreen.background}>
      {importantLinksScreen.links.map((link) => (
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
