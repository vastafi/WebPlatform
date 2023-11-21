import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from "examples/Footer";

import map from "../../assets/images/map.png"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Footer from "examples/Footer";
import { Typography, TableContainer, Table, Tab, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import { FormInput, FormMap, StyledButton, StyledTableRow } from "./styles";
import UpdateMap from "./UpdateMap";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import MDAvatar from "components/MDAvatar";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { Form } from "react-router-dom";
import UserProfile from "layouts/user-profile";


const Maps = () => {

  const [maps, setMaps] = useState([])
  const [edit, setEdit] = useState({ state: false, id: null })
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const [newMap, setNewMap] = useState({
    zoom: "",
    centerLat: "",
    centerLng: "",
    name: "",
  });

  useEffect(() => {
    getMaps();
  }, []);


  const [toggleForm, setToggleForm] = useState(false)
  const deleteMap = (id) => {
    axios.delete(`http://localhost:3001/api/maps/${id}`);
    forceUpdate()
  }

  const [errors, setErrors] = useState({
    zoom: false,
    centerLat: false,
    centerLng: false,
    centnameerLng: false,
  });



  const changeHandler = (e) => {
    setNewMap({
      ...newMap,
      [e.target.name]: e.target.value,
    });
  };

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const something = maps.map((item => {
    return {
      project: <Project image={map} name={item.name} />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.date}
        </MDTypography>
      ),
      status: (
        <Button sx={{ color: "#7b809a", "&:hover": { color: "#7b809a" }, }} onClick={() => setEdit({ state: true, id: item.map_id })}>Edit</Button>
      ),
      completion: <Box onClick={() => deleteMap(item.map_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>,
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    }

  }))



  const renderMaps = maps.map((item) => {

    let datePart = item.date.substring(0, 10)
    let timePart = item.date.substring(11, 19)
    let formattedDateTime = datePart + " " + timePart

    return (
      <StyledTableRow hover key={crypto.randomUUID()} onClick={() => setEdit({ state: true, id: item.map_id })}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{formattedDateTime}</TableCell>
        <TableCell><DeleteIcon sx={{ fontSize: 40, cursor: "pointer" }} onClick={() => deleteMap(item.map_id)} /></TableCell>
      </StyledTableRow>
    )
  })

  async function getMaps() {
    try {
      const response = await axios.get('http://localhost:3001/api/maps/');
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



    console.log(newMap)
    const d = new Date();
    const month = d.getMonth()
    const year = d.getFullYear()
    const date = d.getDate()
    const newDate = `${year}/${month}/${date}`
    try {
      axios.post('http://localhost:3001/api/maps/', { ...newMap, date: newDate });
    } catch (error) {
      console.error(error);
    }
    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      newPassError: false,
      confirmPassError: false,
    });

    setToggleForm(!toggleForm)
    getMaps();
    forceUpdate()

  };





  return (
    <Box sx={{position: "relative", height: "100vh"}}>
      <DashboardLayout>
        <MDBox mb={2} />
        <Tables maps={maps} rowsData={something} />

        {
          toggleForm && (
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
                  type="name"
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
                  type="number"
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
                  type="number"
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
                  type="number"
                  fullWidth
                  value={newMap.centerLng}
                  name="centerLng"
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
          )
        }
        <Footer />
      </DashboardLayout>
      {
          edit.state === true && (
            <UserProfile id={edit.id} setState={setEdit} forceUpdate={forceUpdate} />
          )
        }
    </Box>

  );
};

export default Maps;
