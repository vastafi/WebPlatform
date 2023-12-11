import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';

import MissionsImg from "../../assets/images/Missions.png"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import MDAvatar from "components/MDAvatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";


const Missions = () => {
  const [users, setUsers] = useState([])
  const [edit, setEdit] = useState({ state: false, id: null })
  const [toggleForm, setToggleForm] = useState(false)
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const [errors, setErrors] = useState({
    zoom: false,
    centerLat: false,
    centerLng: false,
    centnameerLng: false,
  });

  useEffect(() => {
    getMissions();
  }, [update]);

  const deleteMission = (id) => {
    axios.delete(`http://localhost:3001/api/missions/${id}`);
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

  const rows = users.map((item => {
    return {
      name: <Project image={MissionsImg} name={item.mission_id} />,
      Device_id: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.device_id}
        </MDTypography>
      ),
      Map_id: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.map_id}
        </MDTypography>
      ),  
      User_id: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.user_id}
      </MDTypography>
      ),
      Start_Date: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.startDate}
      </MDTypography>
      ),
      ttl: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.ttl}
      </MDTypography>
      ),
      config: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.config}
      </MDTypography>
      ),
      edit: <Link to={`/UpdateMission/${item.mission_id}`}> <MDTypography component="div" href="#" variant="button" color="text" fontWeight="medium">
      Edit
    </MDTypography></Link>,
      delete: <Box onClick={() => deleteMission(item.mission_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>
    }
  }))


  const columns = [
    { Header: "Id", accessor: "name", align: "left" },
    { Header: "Device ID", accessor: "Device_id", align: "left" },
    { Header: "Map ID", accessor: "Map_id", align: "left" },
    { Header: "User Id", accessor: "User_id", align: "left" },
    { Header: "Start Date", accessor: "Start_Date", align: "left" },
    { Header: "TTL", accessor: "ttl", align: "left" },
    { Header: "Config", accessor: "config", align: "left" },
    { Header: "Edit", accessor: "edit", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ]

  async function getMissions() {
    try {
      const response = await axios.get('http://localhost:3001/api/missions/');
      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{position: "relative", height: "100vh"}}>
      <DashboardLayout>
        <MDBox mb={2} />
        <Tables rowsData={rows} name={{name: "Devices", nameBtn: "New Mission", route: "/CreateMission"}} columns={columns} func={setToggleForm}/>
        </DashboardLayout>
    </Box>
  );
};

export default Missions;
