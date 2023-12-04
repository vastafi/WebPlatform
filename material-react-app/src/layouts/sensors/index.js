import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';

import user from "../../assets/images/user.jpg"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import MDAvatar from "components/MDAvatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";


const Sensors = () => {
  const [sensors, setSensors] = useState([])
  const [update, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    getSensors  ();
  }, [update]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/sensors/${id}`);
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

  const rows = sensors.map((item => {
    return {
      name: <Project image={user} name={item.name} />,
      ttl: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.ttl}
        </MDTypography>
      ),
      identifier: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.identifier}
      </MDTypography>
      ),
      description: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.description}
      </MDTypography>
      ),
      edit: <Link to={`/UpdateSensor/${item.sensor_id}`}> <MDTypography component="div" href="#" variant="button" color="text" fontWeight="medium">
      Edit
    </MDTypography></Link>,
      delete: <Box onClick={() => deleteUser(item.sensor_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>
    }
  }))


  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "TTL", accessor: "ttl", align: "left" },
    { Header: "Identifier", accessor: "identifier", align: "center" },
    { Header: "Description", accessor: "description", align: "center" },
    { Header: "Edit", accessor: "edit", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ]

  async function getSensors() {
    try {
      const response = await axios.get('http://localhost:3001/api/sensors/');
      setSensors(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{position: "relative", height: "100vh"}}>
      <DashboardLayout>
        <MDBox mb={2} />
        <Tables rowsData={rows} name={{name: "Users", nameBtn: "New Sensor", route: "/CreateSensor"}} columns={columns}/>
        </DashboardLayout>
    </Box>
  );
};

export default Sensors;
