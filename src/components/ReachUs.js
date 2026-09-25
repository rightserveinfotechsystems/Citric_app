import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { ScreenShell } from './common/ScreenShell';
import { ContactCard } from './common/ContactCard';
import { communication } from '../services/communication';
import { DEFAULT_CONTACTS, normalizeContacts } from '../data/contacts';

const BACKGROUND = require('../assets/BackgroundforContactUs.jpg');
const LOGO_ICAR = require('../assets/icar.png');
const LOGO_ICCRI = require('../assets/iccri.png');

/**
 * Reach Us — fully dynamic.
 * Contacts come from GET /application/get-contacts (sorted by displayOrder).
 * Until the endpoint responds (or if it fails), the bundled defaults are shown,
 * so the screen never regresses visually. Pull-to-refresh re-fetches.
 */
export default function ReachUs() {
  const [contacts, setContacts] = useState(null); // null → first load in flight
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await communication.getContacts();
      const normalized = normalizeContacts(response?.data);
      setContacts(normalized ?? DEFAULT_CONTACTS);
    } catch {
      setContacts(DEFAULT_CONTACTS);
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
