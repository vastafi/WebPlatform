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

const UpdateSensor = () => {
    const [newSensor, setNewSensor] = useState({
        name: "",
        ttl: "",
        identifier: "",
        description: "",
      });
  const [errors, setErrors] = useState({
    nameError: false,
    ttlError: false,
    identifierError: false,
    descriptionError: false,
  });

    const changeHandler = (e) => {
      setNewSensor({
        ...newSensor,
        [e.target.name]: e.target.value,
      });
    };

    const id = useParams()

  const submitHandler = (e) => {
      e.preventDefault()
      try {
          axios.put('http://localhost:3001/api/sensors/', {...newSensor, id:id.id});
        } catch (error) {
          console.error(error);
        }
  }

  const navigate = useNavigate()

  const goBackHandler = () => {
    navigate(-1)
  };



  useEffect(() => {
    getSensor()
  }, [])

  async function getSensor() {
    try {
      const response = await axios.get(`http://localhost:3001/api/sensors/${id.id}`);
      setNewSensor(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  console.log(newSensor);


  return (
    <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%"}}>
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
                    value={newSensor.name}
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
                  TTL
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="ttl"
                    placeholder="ttl"
                    value={newSensor.ttl}
                    onChange={changeHandler}
                  />
                  {errors.ttlError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The ttl must be valid
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
                  Identifier
                  </MDTypography>
                  <MDBox mb={0} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="identifier"
                      placeholder="identifier"
                      value={newSensor.identifier}
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
                    Description
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="description"
                      placeholder="description"
                      value={newSensor.description}
                      onChange={changeHandler}
                    />
                    {errors.descriptionError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The description must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox mt={0} display="flex" justifyContent="space-between" >
              <Button onClick={()=> goBackHandler()} variant="contained" style={{color: "white", backgroundColor: "red"}} type="button">
                Close
                </Button>
              <Button onClick={()=> goBackHandler()} variant="contained" style={{color: "white"}} type="submit">
                Update Sensor
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default UpdateSensor;
