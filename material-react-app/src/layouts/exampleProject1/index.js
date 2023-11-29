import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import MDButton from "components/MDButton";

import Temp from "./temp";
import Battery from "./battery";
import Dial from "./dial";
import AccelDial from "./accelDial";


const exampleProject1 = () => {
  const [messages, setMessages] = useState([])

  console.log(messages);

  // const columns = [
  //   { Header: "Name", accessor: "name", align: "left" },
  //   { Header: "Phone", accessor: "phone", align: "left" },
  //   { Header: "Email", accessor: "email", align: "center" },
  //   { Header: "Role", accessor: "role", align: "center" },
  //   { Header: "Description", accessor: "description", align: "center" },
  //   { Header: "Edit", accessor: "edit", align: "center" },
  //   { Header: "Delete", accessor: "delete", align: "center" },
  // ]

  async function getMessages() {
    try {
      const response = await axios.get('http://localhost:3001/api/users/');
      setMessages(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }



  const { sales } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="thermostat"
                title="Temperature"
                count={22}
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
              <ComplexStatisticsCard
                icon="waterdropicon"
                title="Humidity"
                count="55%"
                percentage={{
                  color: "error",
                  amount: "-1",
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
                  title="Statistics"
                  description={
                    <>
                      (<strong>+25</strong>) hot weather today.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Temp id={"temp1"} value={25} title={"temperature"}></Temp>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Battery percentage={85} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Dial id="dial2" value={25} title="Speed Y" />

            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AccelDial id="dial3" value={34} title="Acceleration X" />
            </Grid>
          </Grid>
        </MDBox>




      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default exampleProject1;
