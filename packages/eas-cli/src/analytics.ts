import Segment from 'analytics-node';
import os from 'os';

/**
 * We use require() to exclude package.json from TypeScript's analysis since it lives outside
 * the src directory and would change the directory structure of the emitted files
 * under the build directory
 */
const packageJSON = require('../package.json');

const PLATFORM_TO_ANALYTICS_PLATFORM: { [platform: string]: string } = {
  darwin: 'Mac',
  win32: 'Windows',
  linux: 'Linux',
};

// values shared between different instances of Segement
let sharedUsername: string | undefined;
let sharedUserTraits: any;

export class AnalyticsClient<Event extends string> {
  private instance?: Segment;
  private userIdentifyCalled = false;

  constructor(writeKey?: string) {
    this.instance = writeKey ? new Segment(writeKey) : undefined;
  }

  public setUserProperties(username: string, traits: any) {
    sharedUsername = username;
    sharedUserTraits = traits;

    this.ensureUserIdentified();
  }

  public logEvent(name: string, properties: any = {}) {
    if (this.instance && sharedUsername) {
      this.ensureUserIdentified();
      this.instance.track({
        userId: sharedUsername, // In segment users are identified by name
        event: name,
        properties,
        context: this.getContext(),
      });
    }
  }

  private ensureUserIdentified() {
    if (this.instance && !this.userIdentifyCalled && sharedUsername) {
      this.instance.identify({
        userId: sharedUsername,
        traits: sharedUserTraits,
        context: this.getContext(),
      });
      this.userIdentifyCalled = true;
    }
  }

  private getContext() {
    const platform = PLATFORM_TO_ANALYTICS_PLATFORM[os.platform()] || os.platform();
    const context = {
      device: {
        model: platform,
        brand: platform,
      },
      os: {
        name: platform,
        version: os.release(),
      },
      app: {
        name: 'eas-cli',
        version: packageJSON?.version,
      },
    };

    return context;
  }
}

const defaultClient = new AnalyticsClient<string>(undefined);

export default defaultClient;
