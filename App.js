import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Genesis from './src/components/Genesis';
import About from './src/components/About';
import Announcement from './src/components/Announcement';
import ApplyForIncubation from './src/components/ApplyForIncubation';
import CriteriaForSelection from './src/components/CriteriaForSelection';
import ImportantLinks from './src/components/ImportantLinks';
import IncubationModule from './src/components/IncubationModule';
import PotencialVentures from './src/components/PotencialVentures';
import ProcessOfIncubation from './src/components/ProcessOfIncubation';
import ReachUs from './src/components/ReachUs';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // SafeAreaProvider with static initial metrics: useSafeAreaInsets() works on every
    // screen with zero first-frame inset flicker. (NavigationContainer's built-in
    // SafeAreaProviderCompat detects this upstream provider and will not add a second.)
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Genesis" component={Genesis} options={{ headerShown: false }} />
              <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
              <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: false }} />
              <Stack.Screen name="ApplyForIncubation" component={ApplyForIncubation} options={{ headerShown: false }} />
              <Stack.Screen name="CriteriaForSelection" component={CriteriaForSelection} options={{ headerShown: false }} />
              <Stack.Screen name="ImportantLinks" component={ImportantLinks} options={{ headerShown: false }} />
              <Stack.Screen name="IncubationModule" component={IncubationModule} options={{ headerShown: false }} />
              <Stack.Screen name="PotencialVentures" component={PotencialVentures} options={{ headerShown: false }} />
              <Stack.Screen name="ProcessOfIncubation" component={ProcessOfIncubation} options={{ headerShown: false }} />
              <Stack.Screen name="ReachUs" component={ReachUs} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
      {/*
        Status bar parity: iOS today runs the system default (dark icons) — now explicit.
        Android is intentionally left under the native theme (DayNight) exactly as shipped;
        the edge-to-edge recipe is documented in docs/06-cross-platform-safearea.md.
      */}
      {Platform.OS === 'ios' && <StatusBar style="dark" />}
    </SafeAreaProvider>
  );
}

export default App;
