import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { BulletList } from './common/BulletList';
import { incubationModelsScreen } from '../data/incubationModels';

export default function IncubationModule() {
  return (
    <ScreenShell
      title={incubationModelsScreen.title}
      background={incubationModelsScreen.background}
      contentStyle={{ paddingHorizontal: '3%' }}
    >
      <BulletList items={incubationModelsScreen.models} variant="heading" style={styles.topGroup} />

      <Text style={styles.greenText}>{incubationModelsScreen.modesSubtitle}</Text>

      <BulletList items={incubationModelsScreen.modes} variant="heading" style={styles.bottomGroup} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: '3%',
  },
  topGroup: {
    marginTop: 20,
  },
  greenText: {
    color: '#186A24',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  bottomGroup: {
    marginBottom: 100,
  },
});
