import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';

export default function CriteriaForSelection() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>

      <TopNavbar titleName="Criteria For Selection" />
      <ImageBackground source={require("../assets/AppBackground.jpg")} style={styles.mainContainer}  >

      <ScrollView>
        <View style={[styles.titleBox,{marginTop:10}]}>
          <Text style={styles.bulletPoint}>1.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Relevance and Alignment with Citrus Domain</Text>
            <Text style={styles.title}>
              The applicant's focus must be aligned with citriculture such as citrus nursery management, commercial citrus production, or citrus processing, ensuring that their goals fit within the citrus value chain.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>2.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Commitment to Learning and Adoption</Text>
            <Text style={styles.title}>
            For applicants who seek citripreneurship development on ICAR-CCRI technologies, a strong commitment to learning, adopting, and implementing these technologies in their entrepreneurial ventures is crucial.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>3.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Innovativeness and Originality</Text>
            <Text style={styles.title}>
            Applicants bringing new business ideas or prototypes should demonstrate a high degree of innovation and originality, with the potential to introduce new products, services, or methods that can benefit the citrus industry.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>4.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Feasibility and Market Potential</Text>
            <Text style={styles.title}>
            The business idea or prototype must be feasible with a well-defined business plan, addressing a clear market need within the citrus sector, and showing potential for market acceptance and growth.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>5.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Social Impact and Community Development</Text>
            <Text style={styles.title}>
            For self-help groups and farmer producer companies, the business venture should aim to generate positive social impact, such as empowering local communities, creating employment opportunities, or enhancing the livelihoods of citrus growers.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>6.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Sustainability and Environmental Responsibility</Text>
            <Text style={styles.title}>
            The applicant’s business idea should incorporate sustainable practices that contribute to environmental conservation, efficient resource use, and long-term viability in the citrus industry.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>7.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Incubation Readiness</Text>
            <Text style={styles.title}>
            The applicant should be ready to start the incubation process, with any necessary groundwork already in place. Preference may be given to applicants with relevant experience or expertise in agriculture, horticulture, or related fields, especially those with basic knowledge of citriculture.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>8.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Technical and Financial Readiness</Text>
            <Text style={styles.title}>
            Applicants should demonstrate readiness in terms of technical know-how or a clear plan to acquire it through training, as well as financial readiness, including a funding strategy and understanding of the financial requirements.
            </Text>
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.bulletPoint}>9.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Potential for Scale-Up and Replication</Text>
            <Text style={styles.title}>
            The business venture should have the potential for scaling up or being replicated, which can further contribute to the growth and development of the citrus industry.
            </Text>
          </View>
        </View>
        <View style={[styles.titleBox, {marginBottom: 100}]}>
          <Text style={styles.bulletPoint}>10.</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.headTitle}>Commitment and Vision</Text>
            <Text style={styles.title}>
            Applicants should show a strong commitment to their agri-business, with a clear long-term vision for growth and contribution to the citrus industry.
            </Text>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    // width: "100%",
    // alignItems: "center",
    resizeMode: "contain",
    // flex:1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign:"justify",
    marginBottom:10,
  },
  titleBox: {
    flexDirection: "row",
    width: "85%",
    marginHorizontal: "5%"
  },
  headTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
  },
  bulletPoint: {
    fontSize: 15,
    width: 22,
    fontWeight: "bold",
    color: 'black',
  },
})