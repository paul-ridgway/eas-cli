import { Platform, Workflow } from '@expo/eas-build-job';
import {
  AndroidBuildProfile,
  CredentialsSource,
  DistributionType,
  iOSBuildProfile,
} from '@expo/eas-json';

export enum RequestedPlatform {
  Android = 'android',
  iOS = 'ios',
  All = 'all',
}

export { Platform };

export enum BuildStatus {
  IN_QUEUE = 'in-queue',
  IN_PROGRESS = 'in-progress',
  ERRORED = 'errored',
  FINISHED = 'finished',
}

export type TrackingContext = Record<string, string | number>;

export interface Build {
  id: string;
  status: BuildStatus;
  platform: Platform;
  createdAt: string;
  updatedAt: string;
  artifacts?: BuildArtifacts;
  metadata?: Partial<BuildMetadata>;
}

interface BuildArtifacts {
  buildUrl?: string;
  logsUrl: string;
}

export type BuildMetadata = {
  /**
   * Application version (the expo.version key in app.json/app.config.js)
   */
  appVersion: string;

  /**
   * EAS CLI version
   */
  cliVersion: string;

  /**
   * Build workflow
   * It's either 'generic' or 'managed'
   */
  workflow: Workflow;

  /**
   * Credentials source
   * Credentials could be obtained either from credential.json or Expo servers.
   */
  credentialsSource?: CredentialsSource.LOCAL | CredentialsSource.REMOTE;

  /**
   * Expo SDK version
   * It's determined by the expo package version in package.json.
   * It's undefined if the expo package is not installed for the project.
   */
  sdkVersion?: string;

  /**
   * Release channel (for expo-updates)
   * It's undefined if the expo-updates package is not installed for the project.
   */
  releaseChannel?: string;

  /**
   * Tracking context
   * It's used to track build process across different Expo services and tools.
   */
  trackingContext: TrackingContext;

  /**
   * Distribution type
   * Indicates whether this is a build for store or internal distribution.
   */
  distribution: DistributionType;

  /**
   * App name (expo.name in app.json/app.config.js)
   */
  appName?: string;

  /**
   * App identifier:
   * - iOS builds: the bundle identifier (expo.ios.bundleIdentifier in app.json/app.config.js)
   * - Android builds: the application id (expo.android.package in app.json/app.config.js)
   */
  appIdentifier?: string;
};

export type PlatformBuildProfile<T extends Platform> = T extends Platform.Android
  ? AndroidBuildProfile
  : iOSBuildProfile;
