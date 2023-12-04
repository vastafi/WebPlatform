import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';

import DeviceImg from "../../assets/images/Device.png"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import MDAvatar from "components/MDAvatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";


const Devices = () => {
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
    getDevices();
  }, [update]);

  const deleteDevice = (id) => {
    axios.delete(`http://localhost:3001/api/devices/${id}`);
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
      name: <Project image={DeviceImg} name={item.name} />,
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
      imgDvc: (
        <img src={item.image_logo} style={{width: "30px"}} alt="img device"/>
      ),
      edit: <Link to={`/UpdateDevice/${item.device_id}`}> <MDTypography component="div" href="#" variant="button" color="text" fontWeight="medium">
      Edit
    </MDTypography></Link>,
      delete: <Box onClick={() => deleteDevice(item.device_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>
    }
  }))

  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Identifier", accessor: "identifier", align: "left" },
    { Header: "Description", accessor: "description", align: "left" },
    { Header: "Image device", accessor: "imgDvc", align: "left" },
    { Header: "Edit", accessor: "edit", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ]

  async function getDevices() {
    try {
      const response = await axios.get('http://localhost:3001/api/devices/');
      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{position: "relative", height: "100vh"}}>
      <DashboardLayout>
        <MDBox mb={2} />
        <Tables rowsData={rows} name={{name: "Devices", nameBtn: "New Device", route: "/CreateDevice"}} columns={columns} func={setToggleForm}/>
        </DashboardLayout>
    </Box>
  );
};

export default Devices;
