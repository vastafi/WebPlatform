import { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDInput from "components/MDInput";
import { Bar } from 'react-chartjs-2';
import { Box } from "@mui/material";
import { Chart as ChartJS, plugins } from "chart.js/auto"

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";


import mqtt from "mqtt";
import { host } from "../../config/mqtt.config";
import MDTypography from "components/MDTypography";
import moment from 'moment';
import {options, data} from "./temp"

const Temperature = () => {

  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(4);
  
  console.log(messages);

  async function getMessages() {
    try {
      const requestBodyControlTemperatura = {
        "topic": "hearth/device/smart_watch/temp"
      };
      const response = await axios.post('http://localhost:3001/api/messages/getByTopic', requestBodyControlTemperatura);
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 20, result.length);
      setMessages({
        labels: shortResult.map(x=> x.message_id),
        datasets:
            {
                label: "temp_c",
                data: shortResult.map(x => JSON.parse(x.message).temp_c),
            }
    });

    const resp = shortResult.map(x=> JSON.parse(x.message).temp_c);
    setCount(resp[49] + "%");
} catch (error) {
    console.error(error);
}


  }

  useEffect(() => {
    getMessages();
    //automatically update the chart data each 5 seconds
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  /*   Set Data */
  //const [settings, setSettings] = useState(null);
  const [settingsTempTime, setSettingsTempTime] = useState(0);

  function setMqttData() {
    try {
      let publishSettings = JSON.stringify({ 'set_point': settingsTempTime });
            console.log(publishSettings);

      let result = client.publish('hearth/device/smart_watch/temp', publishSettings);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const changeTempSettingsHandler = (e) => {
    setSettingsTempTime(e.target.value);
    setPointSettings(e.target.value);
  };
  
  /* MQTT */
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);

  const [temperature, setTemp] = useState(0);

  const tempTopic = 'hearth/device/smart_watch/temp_c';


  const mqttConnect = () => {
    setConnectStatus('Connecting');
    let client = mqtt.connect(host, options);
    setClient(client);
  };

  useEffect(() => {
    mqttConnect();
  }, []);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on('connect', () => {
        setConnectStatus('Connected');

        client.subscribe(tempTopic);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        setConnectStatus('Message received');

        if (topic === tempTopic) {
          setTemp(JSON.parse(message.toString()).temperature);
        }
        console.log(message.toString());
      });
    }
  }, [client]);


  return (
    <DashboardLayout marginLeft={274}>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} style={{ margin: '0 auto', maxWidth: '100%' }}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="thermostat"
                title="Temperature"
                count={count}
                percentage={{
                color: "success",
                amount: "+1",
                label: "difference",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => getMessages(e)}>
                Load Data
              </MDButton>
            </MDBox>

            <MDBox mb={1.5}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => setMqttData(e)}>
                Set Data
              </MDButton>
            </MDBox>

            <MDBox mb={1.5}>
              <MDBox mb={2}>
               
              </MDBox>

            </MDBox>

          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDTypography > MQTT status : {connectStatus}</MDTypography>
            </MDBox>
            <MDBox mb={1.5}>
              <MDTypography > Current Settings : </MDTypography>
              <MDTypography > Temperature time :{settingsTempTime}</MDTypography>
            </MDBox>

          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Temperature Chart"
                                    chart={messages}
                                    date={"just updated"}
                                />
                            </MDBox>
                        </Grid>
          </Grid>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Temperature;