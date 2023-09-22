import {
  initializeDevCycle,
  DevCycleClient
} from '@devcycle/nodejs-server-sdk';

class Devcycle {
  private static devcycleClient: DevCycleClient;
  private static initalized = false;

  public static async getDevcycleClient() {
    if (!Devcycle.initalized) {
      Devcycle.initalized = true;
      console.log('init devcycleClient');
      Devcycle.devcycleClient = await initializeDevCycle(
        process.env.DVC_SDK_KEY || ''
      ).onClientInitialized();
    }

    return Devcycle.devcycleClient;
  }
}

export default Devcycle;
