import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';

export default function About() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <TopNavbar titleName="About" />
      <ImageBackground source={require("../assets/AppBackground.jpg")} style={styles.mainContainer}  >
      <ScrollView style={styles.container}>
        <Text style={[styles.title, { marginTop: 10 }]}>CitriHub, the Agri-business Incubation Centre of ICAR-Central Citrus Research Institute, Nagpur is dedicated to fostering innovation and agripreneurship in the citrus domain. Our goal is to support startups and entrepreneurs in transforming their ideas into successful agri-businesses that contribute to the growth and sustainability of the citrus sector.</Text>
        <View style={{marginVertical:"12"}}>
          <Image style={styles.aboutPhoto} source={require("../assets/aboutPhoto.png")} />
        </View>
        <View style={[styles.ventureTitle,{backgroundColor: "#E7601D"}]}>
        <Text style={styles.ventureTitleText}>Vision</Text>
        </View>
        <Text style={styles.title}>To become a leading hub for innovation and agripreneurship in citriculture, driving sustainable growth and global competitiveness in the citrus industry through cutting-edge technology and incubation support.</Text>
        <View style={[styles.ventureTitle,{backgroundColor: "#E7601D"}]}>
        <Text style={styles.ventureTitleText}>Mission</Text>
        </View>
        
        <Text style={styles.title}>To Improve the well-being of the citrus stakeholders with improved and innovative citrus-based products and services through technology commercialization and agripreneurship development to realize the larger goal of fostering agri-business and innovation in the field of citriculture by creating entrepreneurial ecosystems for current and future citripreneurs. </Text>
        <View style={[styles.ventureTitle,{backgroundColor: "#E7601D"}]}>
        <Text style={styles.ventureTitleText}>Objectives</Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>1.</Text>
          <Text style={styles.title}>
            Foster innovation and commercialization of citrus technologies.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>2.</Text>
          <Text style={styles.title}>
            Support the development of scalable citrus-based enterprises.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>3.</Text>
          <Text style={styles.title}>
            Enhance the skills and capabilities of citripreneurs.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>4.</Text>
          <Text style={styles.title}>
            Make citripreneurs more competitive and prosperous for sustainable and inclusive growth.
          </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>5.</Text>
          <Text style={styles.title}>
            Create more opportunities for self-employment and agri-business in the citrus domain
          </Text>
        </View>
          <View style={[styles.ventureTitle, { backgroundColor: "#E7601D" }]}>
            <Text style={styles.ventureTitleText}>What We Offer</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Business Incubation</Text>
          </View>
        
        <Text style={styles.title}>
          Offering mentorship, business planning, brand building and technical advisory to turn innovative ideas or prototype into viable businesses.
        </Text>
          <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Technical Support</Text>
          </View>
        {/* <Text style={styles.headTitle}>Technical Support</Text> */}
        <Text style={styles.title}>
          Providing access to advanced technology, and expertise in citrus nursery, cultivation, processing and allied aspects for successful agribusiness venture.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Training and Workshops</Text>
          </View>
        {/* <Text style={styles.headTitle}>Training and Workshops</Text> */}
        <Text style={styles.title}>
          Conducting regular capacity building programs, workshops, entrepreneurship development programmes on the latest technologies and practices in citriculture.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Infrastructure</Text>
          </View>
        {/* <Text style={styles.headTitle}>Infrastructure</Text> */}
        <Text style={styles.title}>
          State-of-the-art facilities, including pilot processing plants, to support product development and business operations.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Funding Facilitation</Text>
          </View>
        {/* <Text style={styles.headTitle}>Funding Facilitation</Text> */}
        <Text style={styles.title}>
          Assisting the incubates in the development and/or improvement of business plans, pitch preparation, and project presentation to attract grants, seed funders, angel investors, or venture capitalists.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>IP Management</Text>
          </View>
        {/* <Text style={styles.headTitle}>IP Management</Text> */}
        <Text style={styles.title}>
          Helping incubates in the protection of intellectual property issues if any arise during the period of incubation at ICAR-CCRI.
        </Text>
        <View style={[styles.ventureTitle, { backgroundColor: "#E7601D" }]}>
            <Text style={styles.ventureTitleText}>Why CitriHub</Text>
          </View>
        {/* <Text style={[styles.greenText, { marginTop: 10 }]}>Why CitriHub</Text> */}
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Expert Guidance</Text>
          </View>
        {/* <Text style={styles.headTitle}>Expert Guidance</Text> */}
        <Text style={styles.title}>
          Leverage the knowledge and experience of scientists and experts.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Cutting-edge Technology</Text>
          </View>
        {/* <Text style={styles.headTitle}>Cutting-edge Technology</Text> */}
        <Text style={styles.title}>
          Access to the latest research and innovations in citriculture.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Comprehensive Support</Text>
          </View>
        {/* <Text style={styles.headTitle}>Comprehensive Support</Text> */}
        <Text style={styles.title}>
          From idea validation to commercialization, receive end-to-end support throughout your citripreneurial journey.
        </Text>
        <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Networking Opportunities</Text>
          </View>
        {/* <Text style={styles.headTitle}>Networking Opportunities	</Text> */}
        <Text style={styles.title}>
          Connect with a vibrant community of citripreneurs, other incubators, investors, and industry stakeholders.
        </Text>

        <View style={{marginBottom: 20}}>
        <View style={[styles.ventureTitle, { backgroundColor: "#E7601D" }]}>
            <Text style={styles.ventureTitleText}>Who Can Apply</Text>
          </View>
          {/* <Text style={[styles.greenText, { marginTop: 10 }]}>Who Can Apply</Text> */}
          <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Startups and Agripreneurs</Text>
          </View>
          {/* <Text style={styles.headTitle}>Startups and Agripreneurs</Text> */}
          <Text style={styles.title}>
            Those with innovative business ideas or prototypes looking to scale up their existing ventures or enter the citrus-based agribusiness sector.
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>Aspiring Citripreneurs</Text>
          </View>
          {/* <Text style={styles.headTitle}>Aspiring Citripreneurs</Text> */}
          <Text style={styles.title}>
            Individuals seeking to adopt modern technologies in citrus nursery management, cultivation, processing, and value addition to launch a citrus-based business.
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.headTitle}>SHGs and FPOs/FPCs</Text>
          </View>
          {/* <Text style={styles.headTitle}>SHGs and FPOs/FPCs</Text> */}
          <Text style={styles.title}>
            Groups interested in developing social entrepreneurship initiatives centered around citrus-based products and services.
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
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
    textAlign:"justify",
  },
  titleBox: {
    flexDirection: "row",
    width: "95%",
    // marginTop: 10,
  },
  bulletPoint: {
    fontSize: 16,
    width: 18,
    fontWeight: "800",
    color: 'black',
  },
  aboutPhoto: {
    width: "100%",
    height: 130,
    resizeMode: "contain"
  },
  greenText: {
    color: "#186A24",
    fontWeight: "bold",
    fontSize: 16
  },
  headTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
    marginTop: 7,
  },
  ventureTitle:{
    width: "100%",
    height: 30,
    marginTop:10,
    marginBottom:5,
  },
  ventureTitleText:{
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 3
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