/**
 * @format
 */

import { registerRootComponent } from 'expo';
import App from './App';

// SDK 57 CNG convention: registerRootComponent registers the root component as "main",
// which matches the GENERATED native shells (MainActivity.getMainComponentName() = "main"
// and AppDelegate.swift factory.startReactNative(withModuleName: "main")) — no native
// mods required. The registered name is independent of app.json (which holds only the
// "expo" object, per Expo config rules).
registerRootComponent(App);
