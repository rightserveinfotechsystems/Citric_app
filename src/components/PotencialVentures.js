import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { potencialVenturesScreen } from '../data/potencialVentures';

export default function PotencialVentures() {
  return (
    <ScreenShell
      title={potencialVenturesScreen.title}
      background={potencialVenturesScreen.background}
      contentStyle={styles.content}
    >
      <View style={styles.introBox}>
        <Text style={styles.headTitle}>{potencialVenturesScreen.intro}</Text>
      </View>

      {potencialVenturesScreen.ventures.map((venture) => (
        <View key={venture.title} style={[styles.ventureBox, venture.last && styles.lastBox]}>
          <View style={[styles.ventureTitle, { backgroundColor: venture.color }]}>
            <Text style={styles.ventureTitleText}>{venture.title}</Text>
          </View>
          <View style={styles.imageBox}>
            <Image style={styles.ventureImage} source={venture.image} />
          </View>
          <Text style={styles.title}>{venture.body}</Text>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '94%',
    marginHorizontal: '3%',
  },
  introBox: {
    marginTop: 20,
  },
  headTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign: 'justify',
  },
  ventureBox: {
    marginTop: 30,
  },
  lastBox: {
    marginBottom: 100,
  },
  ventureTitle: {
    width: '100%',
    height: 30,
  },
  ventureTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 3,
  },
  imageBox: {
    width: '100%',
    marginVertical: 5,
  },
  ventureImage: {
    resizeMode: 'contain',
    width: '80%',
    marginHorizontal: '10%',
    height: 200,
  },
});
