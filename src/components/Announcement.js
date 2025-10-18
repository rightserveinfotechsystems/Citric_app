import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';
import { communication } from '../services/communication';

export default function Announcement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const openEmail = () => {
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

  const fetchAnnounceList = async () => {
    try {
      const responseFromServer = await communication.getAllAnnouncement();
      if (responseFromServer?.data?.status === 'SUCCESS') {
        setData(responseFromServer?.data?.list);
      } else {
        console.log("Error");
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAnnounceList();
  }, [])

 

  const renderItem = ({ item, index }) => {
    // Determine if item is the last one
    const isLastItem = index === data.length - 1; // Assuming data is the array being rendered
  
    // Alternate between two background styles based on index
    const headBackgroundColor = index % 2 === 0 ? "#F1CEEE" : "#D8F3D0";
    const subBackgroundColor = index % 2 === 0 ? "#FCF5F0" : "#FFFEDC";
  
    return (
      <View style={{ marginTop: 10, marginBottom: isLastItem ? 50 : 0 }}>
        <View style={[styles.headBox, { backgroundColor: headBackgroundColor }]}>
          <Text style={styles.headTitle}>{item?.title}</Text>
        </View>
        <View style={[styles.subHeadBox, { backgroundColor: subBackgroundColor }]}>
          <Text style={[styles.title, { textAlign: "left" }]}>
            {item?.description}
          </Text>
          <Text style={[styles.title, { marginTop: 10, marginLeft: 10 }]}>
            {item?.position || "Sd/-"}
          </Text>
          <Text style={[styles.title, { marginTop: 10, marginLeft: 10 }]}>
            {item?.createdBy}
          </Text>
        </View>
      </View>
    );
  };
  
  

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <TopNavbar titleName="Announcement" />
      
      <ImageBackground source={require("../assets/BackgroundforAnnouncement.jpg")} style={styles.mainContainer} >
        {
          data?.length > 0 ? 
          <FlatList
          style={styles.container}
          renderItem={renderItem}
          data={data}
          keyExtractor={(item, index) => index.toString()}
        />
        : <Text style={{fontSize: 20, color: "black", fontWeight: "bold", marginHorizontal: 40, marginTop: 20}}>Not Announcement Available</Text>
        }
        
      </ImageBackground>
        
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "94%",
    marginHorizontal: "3%",
    // marginBottom: 100
  },
  mainContainer: {
    width: "100%",
    // alignItems: "center",
    // margin:"auto",
    resizeMode: "contain",
    flex:1,
  },
  headTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    width: "95%",
    textAlign: "center",
    paddingVertical: 5,
    // textAlign: "center"
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign:"justify",
    // width: "98%",

    paddingLeft: 10,
    // textAlign: "justify"
    textAlign:"justify"
  },
  headBox: {
    borderWidth: 1,

  },
  subHeadBox: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 5
  }
})