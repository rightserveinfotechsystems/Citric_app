/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

// The registered component name MUST equal the native module name:
//   - android/app/src/main/java/com/citric_app/MainActivity.kt → getMainComponentName()
//   - ios/citric_app/AppDelegate.mm                            → self.moduleName
// app.json intentionally holds ONLY the "expo" object (SDK 52 Expo config rejects a mixed
// root: "Root-level expo object found. Ignoring extra keys: name, displayName"), so the
// JS-side component name is declared here as its single source of truth.
AppRegistry.registerComponent('citric_app', () => App);
