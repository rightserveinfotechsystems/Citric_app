import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Alert, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { TopNavbar } from './common/TopNavbar';
import { WebView } from 'react-native-webview';

export default function ReachUs() {

  const openEmail1 = () => {
    const email = 'director.ccri@icar.gov.in';
    const url = `mailto:${email}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Unable to open email for: ${email}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const openCall1 = () => {
    const mobile = '07122500813';
    const url = `tel:${mobile}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Unable to open email for: ${email}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const openCall3 = () => {
    const mobile = '07122500249';
    const url = `tel:${mobile}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Unable to open email for: ${email}`);
        }
      })
      .catch((error) => console.log(error));
  };
  const openEmail2 = () => {
    const email = 'ccrinaif@gmail.com';
    const url = `mailto:${email}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Unable to open email for: ${email}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const openCall2 = () => {
    const mobile = '+91 9436891040';
    const url = `tel:${mobile}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`Unable to open email for: ${email}`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <TopNavbar titleName="Reach Us" />
      {/* <ScrollView> */}
      <ImageBackground source={require("../assets/BackgroundforContactUs.jpg")} style={styles.container}>
                  <ScrollView>
        <View style={styles.logoContainer}>
          <Image style={styles.imageView} source={require("../assets/icar.png")} />
          <Image style={styles.imageView} source={require("../assets/iccri.png")} />
        </View>
        {/* <WebView
        style={{width: 400, height: 500}}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <body style="margin:0;">
                
                          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3440.0374302339765!2d79.0217724!3d21.1502264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0267ae37a11%3A0xa05ccdf7bf6b3091!2sICAR-Central%20Citrus%20Research%20Institute%2C%20Nagpur!5e1!3m2!1sen!2sin!4v1733303831046!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

              </body>
            </html>
          `,
        }}
        originWhitelist={['*']}
      /> */}
        <View style={styles.reachBox}>
          <Text style={styles.headTitle}>Dr. Dilip Kumar Ghosh</Text>
          <Text style={styles.title}>Director</Text>
          <Text style={styles.title}>ICAR-Central Citrus Research Institute</Text>
          <Text style={styles.title}>Amravati Road, Nagpur – 440033, Maharashtra</Text>

          <View style={{flexDirection: "row", width: "90%"}}>
            <Text style={styles.title}>Phone:</Text>
            <View style={{flexDirection: "column"}}>
            <TouchableOpacity onPress={openCall1}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>0712-2500813</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCall3}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>0712-2500249</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: "row", width: "90%"}}>
            <Text style={styles.title}>Email:</Text>
            <TouchableOpacity onPress={openEmail1}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>director.ccri@icar.gov.in</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.reachBox}>
          <Text style={styles.headTitle}>Dr. Subhra Saikat Roy</Text>
          <Text style={styles.title}>Principal Investigator, ABIC and </Text>
          <Text style={styles.title}>In-charge, CitriHub</Text>
          <Text style={styles.title}>ICAR-Central Citrus Research Institute</Text>
          <Text style={styles.title}>Amravati Road, Nagpur – 440033, Maharashtra</Text>
          <View style={{ flexDirection: "row", width: "90%" }}>
            <Text style={styles.title}>Mobile:</Text>
            <TouchableOpacity onPress={openCall2}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>+91 9436891040</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", width: "90%" }}>
            <Text style={styles.title}>Email:</Text>
            <TouchableOpacity onPress={openEmail2}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>ccrinaif@gmail.com</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: "row", width: "90%", marginTop: "20", display: "flex",
            alignItems: "center"
          }}>
            <Image
              source={require("../assets/location-pin.png")}
              style={{ width:38, height:38, marginRight: 5 }}
            />
            {/* <Text style={styles.title}>:</Text> */}
            <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/6hokaLhpYJnudcux6')}>
              <Text style={[styles.title, { color: "blue", textDecorationLine: "underline", marginLeft: 5 }]}>
                ICAR-Central Citrus Institute Nagpur
              </Text>
            </TouchableOpacity>
          </View>


        </View>
        </ScrollView>
        
      </ImageBackground>
      {/* </ScrollView> */}
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
  logoContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  reachBox: {
    marginLeft: 20,
    marginTop: 30,
    width: "90%"
  },
  imageView: {
    width: "48%",
    height: 95,
    resizeMode: "contain",
  },
  headTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  map: {
    flex: 1,
  },
})