import { useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateMap = () => {
  const navigate = useNavigate()
  const goBackHandler = () => {
    navigate(-1)
  };

  const [newMap, setNewMap] = useState({
    zoom: "",
    centerLat: "",
    centerLng: "",
    name: "",
  });

  const changeHandler = (e) => {
    setNewMap({
      ...newMap,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const d = new Date();
    const month = d.getMonth()
    const year = d.getFullYear()
    const date = d.getDate()
    const newDate = `${year}/${month}/${date}`
    try {
      console.log("it's ok");
      axios.post('http://localhost:3001/api/maps/', { ...newMap, date: newDate, });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%" }}>
      <DashboardLayout>
        <Header name="NewMap">
          <MDBox
            component="form"
            role="form"
            onSubmit={submitHandler}
            display="flex"
            flexDirection="column"
          >
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Name
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="name"
                    fullWidth
                    name="name"
                    value={newMap.name}
                    placeholder="name"
                    onChange={changeHandler}
                  />
                </MDBox>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                ml={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  zoom
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="zoom"
                    placeholder="zoom"
                    value={newMap.zoom}
                    onChange={changeHandler}
                  />
                </MDBox>
              </MDBox>
            </MDBox>

            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox display="flex" flexDirection="row">
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  mr={2}
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    centerLat
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="number"
                      fullWidth
                      name="centerLat"
                      placeholder="centerLat"
                      value={newMap.centerLat}
                      onChange={changeHandler}
                    />
                  </MDBox>
                </MDBox>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  ml={2}
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    centerLng
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="number"
                      fullWidth
                      name="centerLng"
                      placeholder="centerLng"
                      value={newMap.centerLng}
                      onChange={changeHandler}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="space-between">
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white", backgroundColor: "red" }} type="button">
                  Close
                </Button>
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white" }} type="submit">
                  Create Map
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default CreateMap;
