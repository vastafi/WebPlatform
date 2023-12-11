import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';

import map from "../../assets/images/map.png"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import MDAvatar from "components/MDAvatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Maps = () => {

  const [maps, setMaps] = useState([])
  const [update, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    getMaps();
  }, [update]);

  const deleteMap = (id) => {
    axios.delete(`http://localhost:3001/api/maps/${id}`);
    forceUpdate()
  }

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = maps.map((item => {
    return {
      name: <Project image={map} name={item.name} />,
      date: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.date}
      </MDTypography>
      ),
      edit:<Link to={`/UpdateMap/${item.map_id}`}> <MDTypography component="div" href="#" variant="button" color="text" fontWeight="medium">
      Edit
    </MDTypography></Link>,
      delete: <Box onClick={() => deleteMap(item.map_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>,
    }
  }))

  const columns = [
    { Header: "Name", accessor: "name", width: "30%", align: "left" },
    { Header: "Date", accessor: "date", align: "left" },
    { Header: "Edit", accessor: "edit", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ]

  async function getMaps() {
    try {
      const response = await axios.get('http://localhost:3001/api/maps/');
      setMaps(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <DashboardLayout>
        <Tables rowsData={rows} name={{ name: "Maps", nameBtn: "New Map", route: "/CreateMap" }} columns={columns}/>
        <MDBox mb={2} />
      </DashboardLayout>
    </Box>
  );
};

export default Maps;
