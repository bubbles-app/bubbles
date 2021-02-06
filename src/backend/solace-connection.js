import options from './solace-connection-options';
import Paho from 'paho-mqtt';

class SolaceConnection extends Paho.Client {
  constructor() {
    super(options.invocationContext.host, Number(options.invocationContext.port), options.invocationContext.clientId);
    this.onMessageArrived = this.handleMessage.bind(this);
    this.callbacks = [];
  }

  connectWithPromise() {
    return new Promise((resolve, reject) => {
      options.onSuccess = resolve;
      options.onFailure = reject;
      this.connect(options);
    });
  }

  // called when the client loses its connection
  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost with Solace Cloud');
    }

    // TODO: add auto-reconnect
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  // called when a message arrives
  handleMessage(message) {
    console.log('Received message', message.payloadString);
    this.callbacks.forEach((callback) => callback(message));
  }
}

const solaceConnection = new SolaceConnection();
export default solaceConnection;
