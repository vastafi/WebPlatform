import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { Typography, TableContainer, Table, Tab, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

const Maps = () => {

  const [maps, setMaps] = useState([])
  const [newMap, setNewMap] = useState({
    zoom: "",
    centerLat: "",
    centerLng: "",
    name: "",
  });


  const [errors, setErrors] = useState({
    zoom: false,
    centerLat: false,
    centerLng: false,
    centnameerLng: false,
  });

  useEffect(() => {
    // getMaps();
  }, []);

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "rgb(75 70 159 / 16%)"
    },
    "&:last-child td, &:last-child th": {
      border: 0
    },
  }));

  const StyledButton = styled(MDButton)(() => ({
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    color: "white",
    fontSize: "15px",
    textTransform: "none",
    "&:hover": {
      color: "black"
    },
    "&:focus:not(:hover)": {
      backgroundColor: "rgba(0, 0, 0, 0.87)",
    },
  }));

  const FormMap = styled(MDBox)(() => ({
    width: "1000px",
    position: "absolute",
    padding: "50px 30px",
    top: "50%",
    left: "50%",
    backgroundColor: "rgba(33 42 47)",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px"
  }));

  const FormInput = styled(MDInput)(() => ({
    width: "100%",
    backgroundColor: "white",
    borderRadius: "7px",
    "&:focus": {
      border: "1px solid yellow"
    }
  }));

  const changeHandler = (e) => {
    setNewMap({
      ...newMap,
      [e.target.name]: e.target.value,
    });
  };


  const renderMaps = maps.map((item) => {

    let datePart = item.date.substring(0, 10)
    let timePart = item.date.substring(11, 19)
    let formattedDateTime = datePart + " " + timePart

    return (
      <StyledTableRow hover>
        <TableCell>{item.name}</TableCell>
        <TableCell>{formattedDateTime}</TableCell>
      </StyledTableRow>
    )
  })
  console.log(maps)

  async function getMaps() {
    try {
      const response = await axios.get('http://localhost:3001/api/maps');
      setMaps(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newMap.name.trim().length === 0) {
      setErrors({ ...errors, name: true });
      return;
    }
    
    if (newMap.zoom.trim().length === 0) {
      setErrors({ ...errors, zoom: true });
      return;
    }

    if (newMap.centerLat.trim().length === 0) {
      setErrors({ ...errors, centerLat: true });
      return;
    }

    if (newMap.centerLng.trim().length === 0) {
      setErrors({ ...errors, centerLng: true });
      return;
    }






    // let userData = {
    //   data: {
    //     type: "profile",
    //     attributes: {
    //       name: user.name,
    //       email: user.email,
    //       profile_image: null,
    //     },
    //   },
    // };
    // // set new user data for call
    // if (user.newPassword.length > 0) {
    //   userData = {
    //     data: {
    //       type: "profile",
    //       attributes: {
    //         ...user,
    //         profile_image: null,
    //         password: user.newPassword,
    //         password_new: user.newPassword,
    //         password_confirmation: user.confirmPassword,
    //       },
    //     },
    //   };
    // }

    // // call api for update
    // const response = await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      newPassError: false,
      confirmPassError: false,
    });

    setNotification(true);
  };



  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <MDBox
        minHeight="90vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>
                <Typography variant="h4">Maps</Typography>
              </TableCell>
            </TableHead>
            <TableBody>
              {renderMaps}
            </TableBody>
          </Table>
        </TableContainer>
        <MDBox mb={1} />
        <StyledButton variant="contained">
          New Map
        </StyledButton>
      </MDBox>
      <FormMap
        component="form"
        role="form"
        onSubmit={submitHandler}
        display="flex"
        gap="40px"
        flexDirection="column"
      >
        <MDBox>
          <FormInput
            type="text"
            fullWidth
            value={newMap.name}
            name="name"
            placeholder="New map name"
            onChange={changeHandler}
          />
          {errors.name && (
            <Typography variant="caption" color="error" fontWeight="light">
              Map name is required!!!
            </Typography>
          )}
        </MDBox>

        <MDBox>
          <FormInput
            type="text"
            fullWidth
            value={newMap.zoom}
            name="zoom"
            placeholder="zoom"
            onChange={changeHandler}
          />
          {errors.zoom && (
            <Typography variant="caption" color="error" fontWeight="light">
              zoom is required
            </Typography>
          )}
        </MDBox>

        <MDBox>
          <FormInput
            type="text"
            fullWidth
            value={newMap.centerLat}
            name="centerLat"
            placeholder="CenterLat"
            onChange={changeHandler}
          />
          {errors.centerLat && (
            <Typography variant="caption" color="error" fontWeight="light">
              centerLat is required
            </Typography>
          )}
        </MDBox>

        <MDBox>
          <FormInput
            type="text"
            fullWidth
            value={newMap.centerLng}
            name="centerLat"
            placeholder="CenterLng"
            onChange={changeHandler}
          />
          {errors.centerLng && (
            <Typography variant="caption" color="error" fontWeight="light">
                CenterLng is required
            </Typography>
          )}
        </MDBox>

        <StyledButton variant="contained"
          type="submit">
          Save Map
        </StyledButton>
      </FormMap>
      <Footer />
    </DashboardLayout>
  );
};

export default Maps;
