/**
 * withCitricHubConfig — project-specific config plugins for the CNG (managed) workflow.
 *
 * iOS version stamping: expo prebuild does not write expo.version / expo.ios.buildNumber
 * into the Xcode project build settings (it leaves the template defaults). This mod pins
 * MARKETING_VERSION and CURRENT_PROJECT_VERSION for every build configuration so that
 * local prebuilds, EAS cloud builds and Xcode all agree — deterministic, no build-time magic.
 * (Android versions ARE stamped natively by prebuild: versionCode/versionName in app gradle.)
 */
const { withXcodeProject } = require('@expo/config-plugins');

const withCitricHubVersions = (config) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;
    const marketingVersion = config.ios && config.ios.buildNumber ? config.version : config.version;
    const buildNumber =
      config.ios && config.ios.buildNumber ? config.ios.buildNumber : '1';

    const configurations = xcodeProject.pbxXCBuildConfigurationSection();
    for (const key of Object.keys(configurations)) {
      const cfg = configurations[key];
      if (cfg && typeof cfg === 'object' && cfg.buildSettings) {
        cfg.buildSettings.MARKETING_VERSION = `"${config.version}"`;
        cfg.buildSettings.CURRENT_PROJECT_VERSION = `"${buildNumber}"`;
      }
    }
    return config;
  });
};

module.exports = withCitricHubVersions;
