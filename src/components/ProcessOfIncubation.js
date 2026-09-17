import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';;

export default function ProcessOfIncubation() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <TopNavbar titleName="Process Of Incubation" />
      <ImageBackground source={require("../assets/AppBackground.jpg")} style={styles.mainContainer}  >
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <View>
          <Image style={styles.processPhoto1} source={require("../assets/processPhoto.png")} />
        </View>
        <View style={{marginBottom: 100}}>
          <Image style={styles.processPhoto2} source={require("../assets/processPhoto2.png")} />
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
  processPhoto1: {
    width: "100%",
    height: 300,
    resizeMode: "contain"
  },
  processPhoto2: {
    width: "100%",
    resizeMode: "contain"
  },
})