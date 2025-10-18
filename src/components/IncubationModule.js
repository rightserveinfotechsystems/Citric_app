import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';

export default function IncubationModule() {
  return (
    <View style={{flex: 1 }}>
      <TopNavbar titleName="Incubation Models" />
      <ImageBackground source={require("../assets/AppBackground.jpg")} style={styles.mainContainer}  >
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 20 }}>
            <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>Individual Incubation</Text>
            </View>
          {/* <Text style={styles.headTitle}>Individual Incubation</Text> */}
          <Text style={styles.title}>
            Tailored support for individual entrepreneurs or startups focusing on personalized guidance and resources. Ideal for most of the entrepreneurs with unique business ideas or early-stage business venture. The key features are one-on-one mentorship, customized business planning, access to technical resources, and specialized training sessions.
          </Text>
          <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>Social or Group-Based Incubation</Text>
            </View>
          {/* <Text style={styles.headTitle}>Social or Group-Based Incubation</Text> */}
          <Text style={styles.title}>
            Focuses on groups such as self-help groups (SHGs) or farmer producer organizations (FPOs) that work together on a common citrus-based venture. Emphasizes collaborative growth and community impact. The key features are group mentoring, collective training programs, shared resources, and support for social entrepreneurship initiatives.
          </Text>
          <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>Acceleration</Text>
            </View>
          {/* <Text style={styles.headTitle}>Acceleration</Text> */}
          <Text style={styles.title}>
            Designed for more mature startups or businesses looking to rapidly scale their operations. Provides intensive support to accelerate growth and expand market reach. The key features are advanced mentorship, strategic business development, and scaling support. Includes targeted training and opportunities for partnerships with other stakeholders.
          </Text>
        </View>
        <View style={{ marginBottom: 100 }}>
          <Text style={[styles.greenText, { marginTop: 5 }]}>Mode of Incubation</Text>
          <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>On-Site Incubation</Text>
            </View>
          {/* <Text style={styles.headTitle}>On-Site Incubation</Text> */}
          <Text style={styles.title}>
            Provides hands-on support and resources at CitriHub’s physical facility in Nagpur and regular in-person training sessions.
          </Text>
          <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>Off-Site Incubation</Text>
            </View>
          <Text style={styles.title}>
            Offers incubation support online tools like virtual meetings, telephonic conversation and digital training modules, etc. ideal for entrepreneurs who are not able to relocate or prefer to work from their own location.
          </Text>
          <View style={styles.listItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.headTitle}>Specialized Programs</Text>
            </View>
          <Text style={styles.title}>
            Tailored programs focusing on specific aspects of citrus processing and specific product development, which may be conducted in various formats based on the needs of the incubates.
          </Text>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    // alignItems: "center",
    resizeMode: "contain",
    flex:1,
  },
  container: {
    width: "94%",
    marginHorizontal: "3%",
    // marginTop: 20
  },
  headTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginTop: 7,
  },
  greenText: {
    color: "#186A24",
    fontWeight: "bold",
    fontSize: 16
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign:"justify",
  },
  listItem: {
    flexDirection: 'row',
  },
  bulletDot:{
    fontSize: 28,
    marginBottom: -15,
    marginRight:5,
  },
})