import express from 'express';
import { Request, Response } from 'express';
import mqtt from 'mqtt';

// MQTT broker URL and port
const brokerUrl = 'https://broker.hivemq.com'; // Change this to your MQTT broker's URL
const brokerPort = 1883; // Change this to the appropriate port

// MQTT topic to publish to
const topic = 'test-done-cru9'; // Change this to the topic you want to publish to

// MQTT client options
const clientOptions: mqtt.IClientOptions = {
  clientId: 'mqtt-ts-sender', // Change this to a unique client ID
};

// Create an MQTT client
const client = mqtt.connect(brokerUrl, clientOptions);

// Connect to the MQTT broker
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Publish a message to the specified topic
  client.publish(topic, 'Hello, MQTT from Node.js TypeScript!', (err) => {
    if (err) {
      console.error('Error publishing message:', err);
    } else {
      console.log('Message published successfully');
      client.end(); // Close the MQTT client after publishing
    }
  });
});

// Handle errors
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

const app = express();
const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Node.js Server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});