import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDevice = () => {
  const [device, setNewDevice] = useState({
    name: "",
    description: "",
    identifier: "",
    image_device: "",
    image_logo: "",
  });

  const id = useParams()
  useEffect(() => {
    getDevice()
  }, [])

  async function getDevice() {
    try {
      const response = await axios.get(`http://localhost:3001/api/devices/${id.id}`);
      setNewDevice(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const changeHandler = (e) => {
    setNewDevice({
      ...setNewDevice,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      axios.put('http://localhost:3001/api/devices/', { ...device, id: id.id });
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate()
  const goBackHandler = () => {
    navigate(-1)
  };

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
                    value={device.name}
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
                  Description
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="text"
                    fullWidth
                    name="description"
                    placeholder="Description"
                    value={device.description}
                    onChange={changeHandler}
                    error={errors.descriptionError}
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
                    identifier
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="identifier"
                      placeholder="Identifier"
                      value={device.identifier}
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
                    Image Device
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="image_device"
                      placeholder="path"
                      value={device.image_device}
                      onChange={changeHandler}
                    />
                  </MDBox>
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
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    Image Logo
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="image_logo"
                      placeholder="Image Logo"
                      value={device.image_logo}
                      onChange={changeHandler}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="space-between" >
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white", backgroundColor: "red" }} type="button">
                  Close
                </Button>
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white" }} type="submit">
                  Update User
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default UpdateDevice;
