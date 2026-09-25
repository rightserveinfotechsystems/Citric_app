import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Alert, TouchableOpacity } from 'react-native';

/** Strips everything except digits and '+', so tel: URLs are valid on both platforms. */
const telHref = (phone) => `tel:${String(phone).replace(/[^+\d]/g, '')}`;
const mailHref = (email) => `mailto:${email}`;

async function openOrAlert(url, failMessage) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(failMessage);
  }
}

/**
 * ContactCard — renders ONE contact from the /get-contacts model:
 *   { name, positions[], institution, address, phones[], emails[],
 *     displayOrder, phoneLabel?, mapUrl?, mapLabel? }
 * Positions render as one line each; phones/emails become tappable links;
 * mapUrl adds the location row. Layout/colors match the original static screen.
 */
export function ContactCard({ contact }) {
  const phones = contact.phones ?? [];
  const emails = contact.emails ?? [];

  return (
    <View style={styles.reachBox}>
      <Text style={styles.headTitle}>{contact.name}</Text>
      {(contact.positions ?? []).map((line) => (
        <Text key={line} style={styles.title}>{line}</Text>
      ))}
      {contact.institution ? <Text style={styles.title}>{contact.institution}</Text> : null}
      {contact.address ? <Text style={styles.title}>{contact.address}</Text> : null}

      {phones.length > 0 && (
        <View style={styles.row}>
          <Text style={styles.title}>{contact.phoneLabel ?? 'Phone'}:</Text>
          <View style={styles.column}>
            {phones.map((phone) => (
              <TouchableOpacity
                key={phone}
                onPress={() => openOrAlert(telHref(phone), `Unable to open dialer for: ${phone}`)}
              >
                <Text style={styles.link}>{phone}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {emails.length > 0 && (
        <View style={styles.row}>
          <Text style={styles.title}>Email:</Text>
          <View style={styles.column}>
            {emails.map((email) => (
              <TouchableOpacity
                key={email}
                onPress={() => openOrAlert(mailHref(email), `Unable to open email for: ${email}`)}
              >
                <Text style={styles.link}>{email}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {contact.mapUrl ? (
        <View style={styles.mapRow}>
          <Image
            source={require('../../assets/location-pin.png')}
            style={styles.pin}
          />
          <TouchableOpacity
            onPress={() => openOrAlert(contact.mapUrl, 'Unable to open maps')}
          >
            <Text style={[styles.link, styles.mapLabel]} numberOfLines={2}>
              {contact.mapLabel ?? 'Open in Maps'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  reachBox: {
    marginLeft: 20,
    marginTop: 30,
    width: '90%',
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
  row: {
    flexDirection: 'row',
    width: '90%',
  },
  column: {
    flexDirection: 'column',
  },
  link: {
    fontSize: 16,
    fontWeight: '800',
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  mapRow: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  pin: {
    width: 38,
    height: 38,
    marginRight: 5,
  },
  mapLabel: {
    flex: 1,
    marginRight: 10,
  },
});
