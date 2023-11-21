import { useState, useEffect } from "react";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { styled } from "@mui/material/styles";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user-profile/Header";

import AuthService from "../../services/auth-service";
import { Box, TextField } from "@mui/material";

const UserProfile = ({id, setState, forceUpdate}) => {
  const [isDemo, setIsDemo] = useState(false);
  // const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    newPassError: false,
    confirmPassError: false,
  });

  // const getUserData = async () => {
  //   const response = await AuthService.getProfile();
  //   if (response.data.id == 1) {
  //     setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  //   }
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     ...response.data.attributes,
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   }));
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);
  const [map, setMap] = useState({})


    const changeHandler = (e) => {
      setMap({
        ...map,
        [e.target.name]: e.target.value,
      });
    };

  useEffect(() => {
      async function getMap() {
          try {
              const response = await axios.get(`http://localhost:3001/api/maps/${id}`);
              setMap(response.data)
          } catch (error) {
              console.error(error);
          }
      }
      getMap()
  }, [])

  console.log(map);


  const submitHandler = (e) => {
      e.preventDefault()
      const d = new Date();
      const month = d.getMonth()
      const year = d.getFullYear()
      const date = d.getDate()
      const newDate = `${year}/${month}/${date}`
      try {
          axios.put('http://localhost:3001/api/maps/', {...map, date: newDate, id: id});
        } catch (error) {
          console.error(error);
        }

        setState({state: false, id: null})
        forceUpdate()
  }

  console.log(map);



  return (
    <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%"}}>
      <DashboardLayout>
        {/* <DashboardNavbar /> */}
        {/* <MDBox mb={2} /> */}
        <Header name={user.name}>
          {/* {notification && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Your profile has been updated
            </MDTypography>
          </MDAlert>
        )} */}
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
                    value={map.name}
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
                  Zoom
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="zoom"
                    value={map.zoom}
                    onChange={changeHandler}
                    error={errors.emailError}
                    disabled={isDemo}
                  />
                  {errors.emailError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The zoom must be valid
                    </MDTypography>
                  )}
                </MDBox>
                {isDemo && (
                  <MDTypography variant="caption" color="text" fontWeight="light">
                    In the demo version the email can not be updated
                  </MDTypography>
                )}
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
                      value={map.centerLat}
                      onChange={changeHandler}
                    />
                    {errors.newPassError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The centerLat must be valid
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
                    centerLng
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="number"
                      fullWidth
                      name="centerLng"
                      placeholder="centerLng"
                      value={map.centerLng}
                      onChange={changeHandler}
                    />
                    {errors.confirmPassError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The centerLng must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                  {isDemo && (
                    <MDTypography variant="caption" color="text" ml={1} fontWeight="light">
                      In the demo version the password can not be updated
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="end">
                <MDButton variant="gradient" color="info" type="submit">
                  Save changes
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
        {/* <Footer /> */}
      </DashboardLayout>
    </Box>

  );
};

export default UserProfile;
