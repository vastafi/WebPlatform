/*
 * Copyright 2021 HiveMQ GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const mqtt = require('mqtt');

// your credentials
const options = {
  username: 'sergiu.doncila',
  password: 'QWEasd!@#123',
  host: '9b7b323ee67e46d18f9317162c8e8841.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
};

// connect to your cluster
const client = mqtt.connect(options);

// prints a received message
client.on('message', function(topic, message) {
  console.log('Received message:',String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('Connected!');
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// subscribe and publish to the same topic
client.subscribe('messages/topic');
client.publish('messages/topic', 'Hello, this message was received!');