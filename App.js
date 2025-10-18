import React from 'react';
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
  );
}

export default App;
