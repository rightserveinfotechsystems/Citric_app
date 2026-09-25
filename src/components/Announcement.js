import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopNavbar } from './common/TopNavbar';
import { ScreenShell } from './common/ScreenShell';
import { communication } from '../services/communication';

const BACKGROUND = require('../assets/BackgroundforAnnouncement.jpg');

/**
 * Announcement — server-driven list (GET /application/getAnnouncementList).
 * Alternate card colors by index, signature block (position / createdBy), and
 * pull-to-refresh. ScreenShell runs in scrollEnabled=false mode so the FlatList
 * owns virtualization; the shell still provides navbar + background + insets.
 */
export default function Announcement() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnnounceList = useCallback(async () => {
    try {
      const responseFromServer = await communication.getAllAnnouncement();
      if (responseFromServer?.data?.status === 'SUCCESS') {
        setData(responseFromServer?.data?.list ?? []);
      } else {
        console.log('Error');
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  }, []);

  useEffect(() => {
    fetchAnnounceList();
  }, [fetchAnnounceList]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAnnounceList();
    setRefreshing(false);
  }, [fetchAnnounceList]);

  const renderItem = ({ item, index }) => {
    const isLastItem = index === data.length - 1;

    // Alternate between two background styles based on index
    const headBackgroundColor = index % 2 === 0 ? '#F1CEEE' : '#D8F3D0';
    const subBackgroundColor = index % 2 === 0 ? '#FCF5F0' : '#FFFEDC';

    return (
      <View style={{ marginTop: 10, marginBottom: isLastItem ? 50 : 0 }}>
        <View style={[styles.headBox, { backgroundColor: headBackgroundColor }]}>
          <Text style={styles.headTitle}>{item?.title}</Text>
        </View>
        <View style={[styles.subHeadBox, { backgroundColor: subBackgroundColor }]}>
          <Text style={[styles.title, { textAlign: 'left' }]}>{item?.description}</Text>
          <Text style={[styles.title, { marginTop: 10, marginLeft: 10 }]}>
            {item?.position || 'Sd/-'}
          </Text>
          <Text style={[styles.title, { marginTop: 10, marginLeft: 10 }]}>{item?.createdBy}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenShell
      title="Announcement"
      background={BACKGROUND}
      scrollEnabled={false}
      contentStyle={styles.frame}
    >
      {data?.length > 0 ? (
        <FlatList
          style={styles.container}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          renderItem={renderItem}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#EC7E1C"
              colors={['#EC7E1C']}
            />
          }
        />
      ) : (
        <Text style={styles.emptyText}>Not Announcement Available</Text>
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  frame: {
    // no horizontal padding — the FlatList keeps the original 94% width
  },
  container: {
    width: '94%',
    marginHorizontal: '3%',
  },
  headTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    width: '95%',
    textAlign: 'center',
    paddingVertical: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 10,
    textAlign: 'justify',
  },
  headBox: {
    borderWidth: 1,
  },
  subHeadBox: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 5,
  },
  emptyText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 40,
    marginTop: 20,
  },
});
