import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TopNavbar } from './common/TopNavbar'

export default function Genesis() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <TopNavbar titleName="Genesis" />
      <ImageBackground source={require("../assets/BackgroundforGenesis.jpg")} style={styles.container}>
            <ScrollView>
      
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
            Under the auspices of the XIIth Plan Scheme of the National Agricultural Innovation Fund (NAIF - Component II), ICAR established the Agri-Business Incubation (ABI) Centre.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
          The activities of ABIs are coordinated and monitored by the Intellectual Property and Technology Management Unit at ICAR, New Delhi.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
          The program's goal is to provide essential physical, technical, business, and networking support to foster emerging agri-businesses and entrepreneurship, as well as to incubate novel, commercially viable, and potentially transformative innovations.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
          Additionally, the program offers services to help entrepreneurs refine their business ideas and validate their products before launching a full-scale business.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
          A total of 49 ABIs are currently operational across various ICAR institutes and 1 at ICRISAT.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.title}>
          The Agri-Business Incubation (ABI) Centre at ICAR-Central Citrus Research Institute was established in 2019 and branded as CitriHub in 2023.
          </Text>
        </View>
        </ScrollView>

      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    resizeMode: "contain",
    flex:1,
  },
  titleBox: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    marginRight:20,

  },
  bulletPoint: {
    fontSize: 40,
    width: 20,
    color: 'black',
    marginTop: -17
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign:"justify",
  },
})