import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';

const BACKGROUND = require('../assets/AppBackground.jpg');
const PHOTO_1 = require('../assets/processPhoto.png');
const PHOTO_2 = require('../assets/processPhoto2.png');

export default function ProcessOfIncubation() {
  return (
    <ScreenShell title="Process Of Incubation" background={BACKGROUND}>
      <View>
        <Image style={styles.photo1} source={PHOTO_1} />
      </View>
      <View style={styles.bottomGroup}>
        <Image style={styles.photo2} source={PHOTO_2} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  photo1: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  photo2: {
    width: '100%',
    resizeMode: 'contain',
  },
  bottomGroup: {
    marginBottom: 100,
  },
});
