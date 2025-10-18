import {useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

export default function Home() {
    const navigation = useNavigation()
    const handlePress = () => {
        // Open the URL in the default browser
        Linking.openURL('https://liveprosolutions.com/');
      };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.imageView} source={require("../assets/icar.png")} />
                <Image style={styles.imageView} source={require("../assets/citriLogo.png")} />
                <Image style={styles.imageView} source={require("../assets/iccri.png")} />
            </View>
            <View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={()=> navigation.navigate("Genesis")} style={[styles.tabView, { backgroundColor: "#A02A92" }]}>
                        <Image style={styles.imageBox} source={require("../assets/genesis.png")} />
                        <Text style={styles.tabText}>Genesis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate("About")} style={[styles.tabView, { backgroundColor: "#074F6A" }]}>
                        <Image style={styles.imageBox} source={require("../assets/citricIcon.png")} />
                        <Text style={styles.tabText}>About CitriHub</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={()=> navigation.navigate("CriteriaForSelection")} style={[styles.tabView, { backgroundColor: "#12501A" }]}>
                        <Image style={[styles.imageBox,{marginRight:30}]} source={require("../assets/selection.png")} />
                        <Text style={styles.tabText}>Criteria for Selection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate("ProcessOfIncubation")} style={[styles.tabView, { backgroundColor: "#673301" }]}>
                        <Image style={styles.imageBox} source={require("../assets/process.png")} />
                        <Text style={styles.tabText}>Process of Incubation</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={()=> navigation.navigate("IncubationModule")} style={[styles.tabView, { backgroundColor: "#C10001" }]}>
                        <Image style={[styles.imageBox]} source={require("../assets/models.png")} />
                        <Text style={styles.tabText}>Incubation Models</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate("PotencialVentures")} style={[styles.tabView, { backgroundColor: "#001C7B" }]}>
                        <Image style={styles.imageBox} source={require("../assets/ventures.png")} />
                        <Text style={styles.tabText}>Potential Ventures</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={()=> navigation.navigate("ApplyForIncubation")} style={[styles.tabView, { backgroundColor: "#565781" }]}>
                        <Image style={[styles.imageBox,{marginLeft:45}]} source={require("../assets/apply.png")} />
                        <Text style={styles.tabText}>Apply for Incubation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate("Announcement")} style={[styles.tabView, { backgroundColor: "#67018A" }]}>
                        <Image style={styles.imageBox} source={require("../assets/announcement.png")} />
                        <Text style={styles.tabText}>Announcement</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={()=> navigation.navigate("ReachUs")} style={[styles.tabView, { backgroundColor: "#517A00" }]}>
                        <Image style={styles.imageBox} source={require("../assets/reach.png")} />
                        <Text style={styles.tabText}>Reach Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate("ImportantLinks")} style={[styles.tabView, { backgroundColor: "#595959" }]}>
                        <Image style={styles.imageBox} source={require("../assets/links.png")} />
                        <Text style={styles.tabText}>Important Links</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width: "90%", margin:"auto",marginTop: 20,marginBottom: 20}}>
                <Text style={styles.headText}>Lead Developers</Text>
                <Text style={styles.redText}>Dr. S. S. Roy <Text style={styles.normalText}>(Principal Scientist)</Text> </Text>
                {/*  */}
                <Text style={styles.redText}><Text style={styles.normalText}></Text> Dr. D. K. Ghosh <Text style={styles.normalText}>(Director)</Text></Text>
                {/*  */}
                <Text style={[styles.headText,{marginTop:10}]}>Co-Developers</Text>
                <Text style={styles.normalText}>Ms. S. Paliwal, Ms. M. Gurjar, Dr. S. Bhattacharyya</Text>
                <Text style={styles.normalText}>Dr. K. K. Kommu, Dr. D. M. Kadam, Dr. A. Thirugnanavel</Text>
                <Text style={styles.normalText}>Dr. S. Mondal, Dr. N. M. Meshram and Dr. A. K. Das</Text>
                <Text style={[styles.redText,{marginTop:10}]}>ICAR-Central Citrus Research Institute</Text>
                <Text style={styles.redText}>Amravati Road - 440033, Nagpur, Maharashtra</Text>
                <View style={{borderWidth:0.5, marginVertical:5}}></View>
                {/* <Link></Link> */}
                <Text style={[styles.normalText,{color: "#517A00"}]} onPress={handlePress}>Designed by LIVEpro</Text>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        // backgroundColor: "rgb(247 222 197)",
        backgroundColor: "rgb(233 219 206)",
        flex: 1,
    },
    logoContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
    },
    imageView: {
        width: "33%",
        height: 95,
        resizeMode: "contain",
        // borderWidth: 1
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15
    },
    tabView: {
        width: "45%",
        height: 140,
        paddingVertical: 15
    },
    imageBox: {
        width: "55%",
        resizeMode: "contain",
        margin: "auto",
        height: 70
    },
    tabText: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
        paddingHorizontal: 5
    },
    normalText:{
        fontSize: 13,
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    headText:{
        fontSize: 14,
        color: "#012160",
        fontWeight: "bold",
        textAlign: "center"
    },
    redText:{
        fontSize: 13,
        color: "#C10001",
        fontWeight: "bold",
        textAlign: "center"
    }
})