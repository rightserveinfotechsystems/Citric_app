import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { ContactCard } from './common/ContactCard';
import { communication } from '../services/communication';

const BACKGROUND = require('../assets/BackgroundforContactUs.jpg');
const LOGO_ICAR = require('../assets/icar.png');
const LOGO_ICCRI = require('../assets/iccri.png');

/**
 * The ONLY screen that fetches from the API:
 *   GET /contacts/get-contacts  (Contact[] — the mongoose model, sorted by displayOrder)
 * Until the endpoint responds (or if it fails), the bundled fallback below is shown,
 * so the screen never regresses visually. Pull-to-refresh re-fetches.
 */

const FALLBACK_CONTACTS = [
  {
    name: 'Dr. N. G. Patil',
    positions: ['Director'],
    institution: 'ICAR-Central Citrus Research Institute',
    address: 'Amravati Road, Nagpur – 440033, Maharashtra',
    phones: ['0712-2500813', '0712-2500249'],
    emails: ['director.ccri@icar.org.in'],
    phoneLabel: 'Phone',
    displayOrder: 1,
  },
  {
    name: 'Dr. Subhra Saikat Roy',
    positions: ['Principal Investigator, ABIC and', 'In-charge, CitriHub'],
    institution: 'ICAR-Central Citrus Research Institute',
    address: 'Amravati Road, Nagpur – 440033, Maharashtra',
    phones: ['+91 9436891040'],
    emails: ['ccrinaif@gmail.com'],
    phoneLabel: 'Mobile',
    mapUrl: 'https://maps.app.goo.gl/6hokaLhpYJnudcux6',
    mapLabel: 'ICAR-Central Citrus Institute Nagpur',
    displayOrder: 2,
  },
];

/** Accepts Contact[] or { contacts: Contact[] }; sorts by displayOrder; null if empty/invalid. */
function normalizeContacts(payload) {
  const list = Array.isArray(payload) ? payload : payload?.contacts;
  if (!Array.isArray(list) || list.length === 0) return null;
  return [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

export default function ReachUs() {
  const [contacts, setContacts] = useState(null); // null → first load in flight
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await communication.getContacts();
      const normalized = normalizeContacts(response?.data?.contacts);
      setContacts(normalized ?? FALLBACK_CONTACTS);
    } catch {
      setContacts(FALLBACK_CONTACTS);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <ScreenShell
      title="Reach Us"
      background={BACKGROUND}
      centered
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.imageView} source={LOGO_ICAR} />
        <Image style={styles.imageView} source={LOGO_ICCRI} />
      </View>

      {contacts === null ? (
        <ActivityIndicator size="large" color="#EC7E1C" style={styles.loader} />
      ) : (
        contacts.map((contact) => <ContactCard key={contact.name} contact={contact} />)
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  imageView: {
    width: '48%',
    height: 95,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 40,
  },
});
