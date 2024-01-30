import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from "@mui/material/Grid";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDButton from "components/MDButton";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";


import MDTypography from "components/MDTypography";
import mqtt from "mqtt";
import { host } from "../../config/mqtt.config";
import { options } from "./temp";

function createData(
  name,
  t1,
) {
  return { name, t1};
}

const rows = [
  createData('36,5 °C – 37,4 °C','Normal temperature'),
  createData('37,5 °C – 38,0 °C', 'Subfebrile Temperature'),
  createData('38,1 °C – 38,5 °C', 'Mild fever'),
  createData('38,6 °C – 39,0 °C', 'Moderate fever'),
  createData('39,1 °C – 39,9 °C', 'High fever'),
  createData('40,0 °C – 42,0 °C', 'Very high fever'),
];


const Temperature = () => {

  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(35);
  
  console.log(messages);

  async function getMessages() {
    try {
      const requestTemperatureC = {
        "topic": "hearth/device/smart_watch/temp"
      };
      const response = await axios.post('http://localhost:3001/api/messages/getByTopic', requestTemperatureC);
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(-50);
      //let shortResult = result.splice(result.length - 20, result.length);
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
  const [setPoint, setPointSettings] = useState(60);

  function setMqttData() {
    try {
      let publishSettings = JSON.stringify({ 'temp_c': settingsTempTime });
            console.log(publishSettings);

      let result = client.publish('hearth/device/smart_watch/temp/temp_c', publishSettings);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // const changeTempSettingsHandler = (e) => {
  //   setSettingsTempTime(e.target.value);
  //   setPointSettings(e.target.value);
  // };
  
  /* MQTT */
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);

  const [temperature, setTemp] = useState(0);

  const tempTopic = 'hearth/device/smart_watch/temp';

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
              <MDTypography > Temperature time : {settingsTempTime}</MDTypography>
            </MDBox>

          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Temperature Chart Celsius °C"
                                    chart={messages}
                                    date={"just updated"}
                                />
                            </MDBox>
                        </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>

          <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Temperature Chart Fahrenheit °F"
                                    chart={messages}
                                    date={"just updated"}
                                />
                            </MDBox>
                        </Grid>
          </Grid>
        </MDBox>
      </MDBox>
     <b> Body temperature: normal range and deviations</b>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Temperature range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name} </TableCell>
             <TableCell component="th" scope="row" >{row.t1}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <br></br>
     <Footer />
    </DashboardLayout>
  );
};

export default Temperature;