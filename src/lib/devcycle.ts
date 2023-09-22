import {
  initializeDevCycle,
  DevCycleClient
} from '@devcycle/nodejs-server-sdk';

class Devcycle {
  private static devcycleClient: DevCycleClient;
  private static devcycleClientPromise: Promise<DevCycleClient> | null = null;

  private static async connect() {
    if (!Devcycle.devcycleClientPromise) {
      Devcycle.devcycleClientPromise = initializeDevCycle(
        process.env.DVC_SDK_KEY || ''
      )
        .onClientInitialized()
        .then((client) => (Devcycle.devcycleClient = client));
    }

    return Devcycle.devcycleClientPromise;
  }

  public static async getDevcycleClient() {
    await Devcycle.connect();
    return Devcycle.devcycleClient;
  }
}

export default Devcycle;
