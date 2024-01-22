import { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';

import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDInput from "components/MDInput";
import { Line } from 'react-chartjs-2';
import { Box } from "@mui/material";
import { Chart as ChartJS, plugins } from "chart.js/auto"

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";

import mqtt from "mqtt";
import { host } from "../../config/mqtt.config";
import MDTypography from "components/MDTypography";
import moment from 'moment';
import {options, data} from "./temp"

const Heartbeats = () => {

  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(4);
  const [tempData, setTempData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7","8", "9", "10", "11", "2", "13", "14","15", "16", "17", "18", "19", "20", "21"],
    datasets: [{
      label: "Heartbeats",
      data: data,
      pointBorderColor: "transparent",
      pointStyle: false,
      tension: 0.1,
    }]
  })
  console.log(messages);

  async function getMessages() {
    try {
      const requestBodyControlTemperatura = {
        "topic": "microlab/agro/air/temperature"
      };
      const response = await axios.post('http://localhost:3001/api/messages/getByTopic', requestBodyControlTemperatura);
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 20, result.length);

      const parsedLabels = shortResult.map(x => {
        const seconds = moment(x.date).get('seconds');
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      });
      setMessages({
        labels: parsedLabels,
        datasets: { label: "Heartbeats", data: shortResult.map(x => JSON.parse(x.message).temperature) },
      });

      const resp = shortResult.map(x => JSON.parse(x.message).temp);
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
      let publishSettings = JSON.stringify({ 'tempTime': settingsTempTime });
      console.log(publishSettings);

      let result = client.publish('microlab/agro/device/ventilation/settings', publishSettings);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const changeTempSettingsHandler = (e) => {
    setSettingsTempTime(e.target.value);
  };
  // const changeHandler = (e) => {
  //   setSettings(e.target.value);
  // };



  /* MQTT */
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);

  const [temp, setTemp] = useState(0);

  const tempTopic = 'microlab/agro/air/temperature';


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
                icon="favorite"
                title="Heartbeats"
                count={temp}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => getMessages(e)}>
                Load Data
              </MDButton>
            </MDBox>

            {/* <MDBox mb={1.5}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => setMqttData(e)}>
                Set Data
              </MDButton>
            </MDBox> */}

            {/* <MDBox mb={1.5}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Temp time (sec)"
                  fullWidth
                  value={settingsTempTime}
                  name="settingsTempTime"
                  onChange={changeTempSettingsHandler}
                />
              </MDBox>

            </MDBox> */}

          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDTypography > MQTT status : {connectStatus}</MDTypography>
            </MDBox>
            {/* <MDBox mb={1.5}>
              <MDTypography > Current Settings :</MDTypography>
              <MDTypography > Temperature time :{settingsTempTime}</MDTypography>
            </MDBox> */}

          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

              <Box width="100%">
                  <div style={{height:"200px"}}>
                    <Line data={tempData} options={options} plugins={[options.plugin]}/>
                  </div>
              </Box>

          </Grid>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Heartbeats;