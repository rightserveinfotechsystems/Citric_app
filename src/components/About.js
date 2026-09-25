import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { aboutScreen } from '../data/about';

/** Orange section banner (Vision / Mission / …). */
function Banner({ label }) {
  return (
    <View style={[styles.ventureTitle, { backgroundColor: '#E7601D' }]}>
      <Text style={styles.ventureTitleText}>{label}</Text>
    </View>
  );
}

/** Small-dot heading row (What We Offer / Why CitriHub / Who Can Apply). */
function DotHeading({ label }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.headTitle}>{label}</Text>
    </View>
  );
}

export default function About() {
  return (
    <ScreenShell
      title={aboutScreen.title}
      background={aboutScreen.background}
      contentStyle={styles.content}
    >
      <Text style={[styles.title, { marginTop: 10 }]}>{aboutScreen.intro}</Text>

      <View style={styles.photoBox}>
        <Image style={styles.aboutPhoto} source={aboutScreen.photo} />
      </View>

      {aboutScreen.sections.map((section) => (
        <View key={section.banner} style={section.last ? styles.lastSection : null}>
          <Banner label={section.banner} />

          {section.text ? <Text style={styles.title}>{section.text}</Text> : null}

          {section.numbered
            ? section.numbered.map((item, index) => (
                <View key={item} style={styles.titleBox}>
                  <Text style={styles.bulletPoint}>{index + 1}.</Text>
                  <Text style={styles.title}>{item}</Text>
                </View>
              ))
            : null}

          {section.items
            ? section.items.map((item) => (
                <View key={item.heading}>
                  <DotHeading label={item.heading} />
                  <Text style={styles.title}>{item.body}</Text>
                </View>
              ))
            : null}
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
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
    textAlign: 'justify',
  },
  titleBox: {
    flexDirection: 'row',
    width: '95%',
  },
  bulletPoint: {
    fontSize: 16,
    width: 18,
    fontWeight: '800',
    color: 'black',
  },
  photoBox: {
    marginVertical: 12,
  },
  aboutPhoto: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  headTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
    marginTop: 7,
  },
  ventureTitle: {
    width: '100%',
    height: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  ventureTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 3,
  },
  listItem: {
    flexDirection: 'row',
  },
  bulletDot: {
    fontSize: 28,
    marginBottom: -15,
    marginRight: 5,
  },
  lastSection: {
    marginBottom: 20,
  },
});
