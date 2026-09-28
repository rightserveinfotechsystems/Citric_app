import React, { useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell } from '../components/common/ScreenShell';
import { communication } from '../services/communication';

/**
 * Screen content bundled with the app. Tiles/logos are static; `credits`
 * is the DEFAULT — refreshed from GET /contacts/get-developer when reachable.
 */
const HOME = {
  backgroundColor: 'rgb(233 219 206)',
  logos: [
    require('../assets/icar.png'),
    require('../assets/citriLogo.png'),
    require('../assets/iccri.png'),
  ],
  tiles: [
    { label: 'Genesis', route: 'Genesis', color: '#A02A92', icon: require('../assets/genesis.png') },
    { label: 'About CitriHub', route: 'About', color: '#074F6A', icon: require('../assets/citricIcon.png') },
    {
      label: 'Criteria for Selection',
      route: 'CriteriaForSelection',
      color: '#12501A',
      icon: require('../assets/selection.png'),
      iconStyle: { marginRight: 30 },
    },
    { label: 'Process of Incubation', route: 'ProcessOfIncubation', color: '#673301', icon: require('../assets/process.png') },
    { label: 'Incubation Models', route: 'IncubationModule', color: '#C10001', icon: require('../assets/models.png') },
    { label: 'Potential Ventures', route: 'PotencialVentures', color: '#001C7B', icon: require('../assets/ventures.png') },
    {
      label: 'Apply for Incubation',
      route: 'ApplyForIncubation',
      color: '#565781',
      icon: require('../assets/apply.png'),
      iconStyle: { marginLeft: 45 },
    },
    { label: 'Announcement', route: 'Announcement', color: '#67018A', icon: require('../assets/announcement.png') },
    { label: 'Reach Us', route: 'ReachUs', color: '#517A00', icon: require('../assets/reach.png') },
    { label: 'Important Links', route: 'ImportantLinks', color: '#595959', icon: require('../assets/links.png') },
  ],
  credits: {
    leadHeading: 'Lead Developers',
    lead: [
      { name: 'Dr. S. S. Roy', role: '(Principal Scientist)' },
      { name: 'Dr. D. K. Ghosh', role: '(Formal Director)', nameFirst: true },
    ],
    coHeading: 'Co-Developers',
    coLines: [
      'Ms. S. Paliwal, Ms. M. Gurjar, Dr. S. Bhattacharyya',
      'Dr. K. K. Kommu, Dr. D. M. Kadam, Dr. A. Thirugnanavel',
      'Dr. S. Mondal, Dr. N. M. Meshram and Dr. A. K. Das',
    ],
    orgLines: ['ICAR-Central Citrus Research Institute', 'Amravati Road - 440033, Nagpur, Maharashtra'],
  },
  designedBy: { label: 'Designed by LIVEpro', url: 'https://liveprosolutions.com/' },
};

/** Pairs tiles into rows of two (original launcher layout). */
function toRows(tiles) {
  const rows = [];
  for (let i = 0; i < tiles.length; i += 2) rows.push(tiles.slice(i, i + 2));
  return rows;
}

/**
 * Accepts { lead, coHeading, coLines } (directly or wrapped in data/developer/credits);
 * partial payloads are merged over the bundled defaults; null if unusable.
 */
function normalizeCredits(payload) {
  let d = payload;
  for (let i = 0; i < 3 && d && typeof d === 'object'
    && !Array.isArray(d.lead) && !Array.isArray(d.coLines); i += 1) {
    d = d.data ?? d.developer ?? d.credits ?? null;
  }
  if (!d || typeof d !== 'object') return null;
  const lead = Array.isArray(d.lead)
    ? d.lead.filter((p) => p && typeof p.name === 'string').map((p) => ({
        name: p.name,
        role: typeof p.role === 'string' ? p.role : '',
        ...(p.nameFirst === undefined ? {} : { nameFirst: !!p.nameFirst }),
      }))
    : null;
  const coLines = Array.isArray(d.coLines)
    ? d.coLines.filter((l) => typeof l === 'string')
    : null;
  if (!lead?.length && !coLines?.length) return null;
  return {
    lead: lead?.length ? lead : HOME.credits.lead,
    coHeading: typeof d.coHeading === 'string' && d.coHeading ? d.coHeading : HOME.credits.coHeading,
    coLines: coLines?.length ? coLines : HOME.credits.coLines,
  };
}

export default function Home() {
  const navigation = useNavigation();
  const [credits, setCredits] = useState(HOME.credits); // bundled defaults render instantly

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await communication.getDeveloper();
        const normalized = normalizeCredits(response?.data);
        if (active && normalized) setCredits(normalized); // API fails → keep defaults
      } catch {
        /* offline / endpoint missing → bundled credits stay */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <ScreenShell
      title="Citri Hub"
      showNavbar={false}
      backgroundColor={HOME.backgroundColor}
      contentStyle={styles.content}
    >
      <View style={styles.logoContainer}>
        {HOME.logos.map((logo, index) => (
          <Image key={index} style={styles.imageView} source={logo} />
        ))}
      </View>

      {toRows(HOME.tiles).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tabContainer}>
          {row.map((tile) => (
            <TouchableOpacity
              key={tile.route}
              onPress={() => navigation.navigate(tile.route)}
              style={[styles.tabView, { backgroundColor: tile.color }]}
            >
              <Image style={[styles.imageBox, tile.iconStyle]} source={tile.icon} />
              <Text style={styles.tabText}>{tile.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.creditsBox}>
        <Text style={styles.headText}>{credits.leadHeading}</Text>
        {credits.lead.map((person, i) =>
          person.nameFirst ? (
            <Text key={`lead-${i}`} style={styles.redText}>
              <Text style={styles.normalText} /> {person.name}{' '}
              <Text style={styles.normalText}>{person.role}</Text>
            </Text>
          ) : (
            <Text key={`lead-${i}`} style={styles.redText}>
              {person.name} <Text style={styles.normalText}>{person.role}</Text>{' '}
            </Text>
          ),
        )}
        <Text style={[styles.headText, styles.spacedTop]}>{credits.coHeading}</Text>
        {credits.coLines.map((line, i) => (
          <Text key={`co-${i}`} style={styles.normalText}>{line}</Text>
        ))}
        {HOME.credits.orgLines.map((line) => (
          <Text key={line} style={styles.redText}>{line}</Text>
        ))}
        <View style={styles.divider} />
        <Text
          style={[styles.normalText, styles.livepro]}
          onPress={() => Linking.openURL(HOME.designedBy.url)}
        >
          {HOME.designedBy.label}
        </Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgb(233 219 206)',
  },
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  imageView: {
    width: '33%',
    height: 95,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  tabView: {
    width: '45%',
    height: 140,
    paddingVertical: 15,
  },
  imageBox: {
    width: '55%',
    resizeMode: 'contain',
    margin: 'auto',
    height: 70,
  },
  tabText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  creditsBox: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  normalText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headText: {
    fontSize: 14,
    color: '#012160',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  redText: {
    fontSize: 13,
    color: '#C10001',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  spacedTop: {
    marginTop: 10,
  },
  livepro: {
    color: '#517A00',
  },
});
