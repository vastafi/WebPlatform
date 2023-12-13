import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";


const iluminare = () => {
  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(4);


  console.log(messages);

  async function getMessages() {
    try {
      const requestLightIntensity = {
        "topic": "microlab/agro/light/intensity"
      };
      const response =
        await axios.post('http://localhost:3001/api/messages/getByTopic', requestLightIntensity);

      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 50, result.length);

      setMessages({
        labels: shortResult.map(x => new Date(x.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })),
        datasets: { label: "Light Intensity", data: shortResult.map(x => JSON.parse(x.message).intensity) },
      });

      const resp = shortResult.map(x => JSON.parse(x.message).intensity);
      setCount(resp[49] + " lux");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessages();
    //automatically update the chart data each 5 seconds
    const intervalId = setInterval(() => {
      getMessages();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardLayout marginLeft={274}>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="lightbulbicon"
                title="Light Intensity"
                count={count}
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
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Set Data
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Light Intensity and Setpoint"
                  chart={messages}
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

export default iluminare;