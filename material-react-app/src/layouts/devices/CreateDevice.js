import { useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateDevice = () => {
  const [newDevice, setNewDevice] = useState({
    name: "",
    description: "",
    identifier: "",
    image_device: "",
    image_logo: "",
  });
  const [errors, setErrors] = useState({
    nameError: false,
    descriptionError: false,
    identifierError: false,
    image_deviceError: false,
    image_logoError: false,
  });

  const changeHandler = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setNewDevice({
      ...newDevice,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      axios.post('http://localhost:3001/api/devices/', { ...newDevice });
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
                    type="text"
                    fullWidth
                    name="name"
                    value={newDevice.name}
                    placeholder="name"
                    onChange={changeHandler}
                  />
                  {errors.nameError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The name can not be null
                    </MDTypography>
                  )}
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
                    value={newDevice.description}
                    onChange={changeHandler}
                    error={errors.descriptionError}
                  />
                  {errors.descriptionError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The description must be valid
                    </MDTypography>
                  )}
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
                      value={newDevice.identifier}
                      onChange={changeHandler}
                    />
                    {errors.identifierError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The identifier must be valid
                      </MDTypography>
                    )}
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
                      value={newDevice.image_device}
                      onChange={changeHandler}
                    />
                    {errors.image_deviceError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The image_device must be valid
                      </MDTypography>
                    )}
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
                      value={newDevice.image_logo}
                      onChange={changeHandler}
                    />
                    {errors.image_logoError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The image_logo must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="space-between" >
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white", backgroundColor: "red" }} type="button">
                  Close
                </Button>
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white" }} type="submit">
                  Create User
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>
  );
};

export default CreateDevice;
