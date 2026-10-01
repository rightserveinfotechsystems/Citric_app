/**
 * withCitricHubConfig
 *
 * Project-specific config plugin for Citri Hub.
 *
 * Keeps the iOS version information deterministic across:
 * - Expo prebuild
 * - EAS Cloud Build
 * - Local Xcode builds
 *
 * Expo's config-plugins are imported through the Expo package.
 */

const { withXcodeProject } = require('expo/config-plugins');

const withCitricHubVersions = (config) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;

    const marketingVersion = config.version || '1.0.0';
    const buildNumber =
      config.ios && config.ios.buildNumber
        ? String(config.ios.buildNumber)
        : '1';

    const configurations =
      xcodeProject.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(configurations)) {
      const cfg = configurations[key];

      if (
        cfg &&
        typeof cfg === 'object' &&
        cfg.buildSettings
      ) {
        cfg.buildSettings.MARKETING_VERSION =
          `"${marketingVersion}"`;

        cfg.buildSettings.CURRENT_PROJECT_VERSION =
          `"${buildNumber}"`;
      }
    }

    return config;
  });
};

module.exports = withCitricHubVersions;

