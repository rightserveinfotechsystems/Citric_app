import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { TopNavbar } from './common/TopNavbar';

export default function PotencialVentures() {
  return (
    <View style={{flex:1}}>
      <TopNavbar titleName="Potencial Ventures" />
      <ImageBackground source={require("../assets/AppBackground.jpg")} style={styles.mainContainer}  >

      <ScrollView style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.headTitle}>The following ventures offer immense potential for citripreneurs. By focusing on innovation, quality, and market demands, incubates can establish successful agribusinesses and contribute to the growth of the citrus sector.
          </Text>
        </View>
        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#E7601D"}]}>
            <Text style={styles.ventureTitleText}>Shoot-tip Grafting (STG)</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/graft.png")}/>
          </View>
          <Text style={styles.title}>
          STG, a signature technology of ICAR-CCRI, is a revolutionary technique for disease-free production of mother plants, virus elimination and cleaning of imported material. It offers a significant opportunity for producing high-quality, disease-free citrus plants, a highly valued commodity in the market. STG can be a profitable agribusiness venture for citrus nurseries.
          </Text>
        </View>
        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#0A769E"}]}>
            <Text style={styles.ventureTitleText}>Micro-budding</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/micro.png")}/>
          </View>
          <Text style={styles.title}>
          Another precision technique for citrus propagation standardized by ICAR-CCRI, micro-budding ensures high success rates, allows for rapid multiplication of citrus cultivars and can be used to produce high-quality uniform planting material for early fruiting in short time span. Learning micro-budding technique enables faster, low-cost, year-round multiplication of citrus plants which is boon for nurserypreneurs.
          </Text>
        </View>

        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#825007"}]}>
            <Text style={styles.ventureTitleText}>Containerized Nursery Technique</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/nursery.png")}/>
          </View>
          <Text style={styles.title}>
          One of the most licensed technologies by ICAR-CCRI, Containerized Nursery Technique ensures uniform plant growth, efficient space utilization, and minimized disease (Phytophthora) incidence. This method offers several advantages over traditional field nurseries and is a promising venture for supplying disease-free quality planting material to growers, making it a viable agribusiness opportunity.
          </Text>
        </View>

        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#196B24"}]}>
            <Text style={styles.ventureTitleText}>Retrofitting of Nursery Phase</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/retrofitting.png")}/>
          </View>
          <Text style={styles.title}>
          Retrofitting of the citrus nursery phase is a key technology for optimizing the production costs of planting stock. The technology restricts the nursery phase to about 11-12 months through direct seeding compared to the traditional citrus nursery system (18-20 months) thus reducing the cost of the nursery (33-52%) than the conventional method. This technique offers a great opportunity to citrus nurseryprenuers.
          </Text>
        </View>

        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#D21B16"}]}>
            <Text style={styles.ventureTitleText}>Commercial Production</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/commercial.jpeg")}/>
          </View>
          <Text style={styles.title}>
          Commercial citrus production involves establishing and managing orchards for the production of mandarin, sweet orange, lemon, lime, pomelo and grapefruit. With proper management practices and better marketing strategies, commercial citrus production can be a lucrative agribusiness venture.
          </Text>
        </View>

        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#808101"}]}>
            <Text style={styles.ventureTitleText}>Trichoderma Bioformulation Production</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/bioformulation.png")}/>
          </View>
          <Text style={styles.title}>
          ICAR-CCRI established one small-scale Trichoderma biopesticide production unit. Trichoderma is known for its ability to control plant diseases, especially Phytopthora. Trichoderma-based bio-formulations are gaining popularity as eco-friendly alternatives to synthetic pesticides. Setting up a Trichoderma bioformulation production facility can be a profitable agribusiness venture, especially in regions with high demand for organic and sustainable agricultural inputs.
          </Text>
        </View>

        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#6900B0"}]}>
            <Text style={styles.ventureTitleText}>Mallada desjardensi Bioagent Production</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/bioagent.jpeg")}/>
          </View>
          <Text style={styles.title}>
          ICAR-CCRI has established a small-scale production unit for the biocontrol agent Mallada desjardensi. Mallada desjardensi (Navas) is a natural enemy of citrus-sucking insects, including citrus blackfly, whitefly, aphids, mealybugs, citrus psylla, and other soft-bodied pests. This biocontrol agent serves as an eco-friendly alternative to synthetic pesticides. Setting up a Mallada desjardensi production facility can be a profitable agribusiness venture.
          </Text>
        </View>
        
        <View style={styles.ventureBox}>
          <View style={[styles.ventureTitle,{backgroundColor: "#215F98"}]}>
            <Text style={styles.ventureTitleText}>Post-harvest Management</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/harvest.png")}/>
          </View>
          <Text style={styles.title}>
          Proper handling, cleaning, coating, grading, packaging, and storage of citrus fruits can significantly increase their shelf life and market value. This area offers opportunities for value-added services and supply chain management. ICAR-CCRI standardized end-to-end post-harvest management practices for citrus from harvesting to storage. Establishing a citrus post-harvest management facility or pre-processing services can be a profitable agribusiness venture.
          </Text>
        </View>

        <View style={[styles.ventureBox,{marginBottom: 100}]}>
          <View style={[styles.ventureTitle,{backgroundColor: "#A12B92"}]}>
            <Text style={styles.ventureTitleText}>Processing and Value-addition</Text>
          </View>
          <View style={{width:"100%", marginVertical: 5}}>
          <Image style={styles.ventureImage} source={require("../assets/valueAddition.png")}/>
          </View>
          <Text style={styles.title}>
          Fruit processing is the sunrise sector in our country. Citrus fruits can be processed and value-added to create a wide range of products like juices, squash, nectar, fizzy drink, energy drink, cordial, marmalade, jelly, sweets, confectionaries, pickles, etc. Besides, citrus peel can be used for the extraction of pectin and essential oil. ICAR-CCRI has developed a wide range of value-added products from citrus. Citrus foodpreneurship can create new markets and higher returns.
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
    alignItems: "center",
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
    fontWeight: 'bold',
    color: 'black',
    textAlign:"justify",
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign:"justify",
  },
  ventureBox:{
   marginTop: 30
  },
  ventureTitle:{
    width: "100%",
    height: 30
  },
  ventureTitleText:{
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 3
  },
  ventureImage:{
    resizeMode: "contain",
    width: "80%",
    marginHorizontal: "10%",
    height: 200,
  }
})
