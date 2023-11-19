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

import mqtt from 'mqtt';

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

client.on('connect', mqtt_connected);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('close', mqtt_close);
client.on('message', mqtt_messsageReceived);

//receive a message from MQTT broker
function mqtt_messsageReceived(topic, message, packet) {
  console.log('Received message on topic:', topic); 
  var message_str = message.toString(); //convert byte array to string
  console.log("message to string", message_str);
  // message_str = message_str.replace(/\n$/, ''); //remove new line
  // //message_str = message_str.toString().split("|");
  // console.log("message to params array",message_str);
  // //payload syntax: clientID,topic,message
  // if (message_str.length == 0) {
  //     console.log("Invalid payload");
  //     } else {    
  //     insert_message(topic, message_str, packet);
  //     //console.log(message_arr);
  // }
};


function mqtt_connected(){
  console.log("Connected to MQTT");
};

function mqtt_reconnect(err) {
  console.log("Reconnect MQTT");
  if (err) {console.log(err);}
  client  = mqtt.connect(options);
};

function mqtt_close() {
  console.log("Close MQTT");
};

function mqtt_error(err) {
  console.log("MQTT Error:",err);
};

function mqtt_subscribe(err, Topic) {
  console.log("Subscribed to " + JSON.stringify(Topic));
  if (err) {console.log(err);}
};


// subscribe and publish to the same topic
client.subscribe('agrobot/sensors/#', mqtt_subscribe);

setInterval(function () {
  let tc = Math.floor((Math.random() * 100) + 1);
  client.publish('agrobot/sensors/temperature/sensor-1', JSON.stringify({'temp': tc}));
}, 30000);


//testing
import connection from "./db.js";