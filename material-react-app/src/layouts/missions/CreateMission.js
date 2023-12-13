import { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";
import Button from "@mui/material/Button";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents} from "react-leaflet";

const CreateMission = () => {
  const [newMission, setNewMission] = useState({
    device_id: "",
    map_id: "",
    user_id: "",
    ttl: "",
    config: "",
  });

  const [options, setOptions] = useState({
    devicesId: [],
    mapsId: [],
    usersId: []
  })
  const [mapData, setMapData] = useState({
    center: null,
    zoom: 5,
  });
  const [markers, setMarkers] = useState([]);

  async function getOptions() {
    try {
      const responseDevices = await axios.get(`http://localhost:3001/api/devices/`);
      setOptions((prevOptions) => ({
        ...prevOptions,
        devicesId: responseDevices.data.map((item) => ({ label: String(item.device_id) })),
      }));

      const responseMaps = await axios.get(`http://localhost:3001/api/maps/`);
      setOptions((prevOptions) => ({
        ...prevOptions,
        mapsId: responseMaps.data.map((item) => ({ label: String(item.map_id) })),
      }));

      const responseUsers = await axios.get(`http://localhost:3001/api/users/`);
      setOptions((prevOptions) => ({
        ...prevOptions,
        usersId: responseUsers.data.map((item) => ({ label: String(item.user_id) })),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  useEffect(() => {
    async function fetchMapData() {
      try {
        const response = await axios.get(`http://localhost:3001/api/maps/${newMission.map_id}`);
        const mapInfo = response.data;

        if (mapInfo) {
          setMapData({
            center: [mapInfo.centerLat, mapInfo.centerLng],
            zoom: mapInfo.zoom,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (newMission.map_id) {
      fetchMapData();
    }
  }, [newMission.map_id]);

  const changeHandler = (e) => {
    setNewMission({
      ...newMission,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandleAutocomplete = (e, value) => {
     const name = e.target.id.split('-')[0]
     console.log(name);
     console.log(value.label)
    setNewMission({
      ...newMission,
      [name]: value.label,
    });
  };

  const handlePhotoOptionChange = (e, index) => {
    const { value } = e.target;
    setMarkers((prevMarkers) =>
        prevMarkers.map((marker, i) =>
            i === index ? { ...marker, takePhoto: value === "Da" } : marker
        )
    );
  };

  const handleHeightChange = (e, index) => {
    const { value } = e.target;
    setMarkers((prevMarkers) =>
        prevMarkers.map((marker, i) =>
            i === index ? { ...marker, height: value } : marker
        )
    );
  };

  const handleOrientationChange = (e, index) => {
    const { value } = e.target;
    setMarkers((prevMarkers) =>
        prevMarkers.map((marker, i) =>
            i === index ? { ...marker, orientation: value } : marker
        )
    );
  };

  const addMarker = (position, popupContent) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { lat: position.lat, lng: position.lng, popupContent }, // Salvare separat a latitudinii și longitudinii
    ]);
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    const d = new Date();
    const month = d.getMonth()
    const year = d.getFullYear()
    const date = d.getDate()
    const newDate = `${year}/${month}/${date}`

    const coordinatesArray = markers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
      height: marker.height,
      orientation: marker.orientation,
      takePhoto: marker.takePhoto,
    }));
    const coordinatesJSON = JSON.stringify(coordinatesArray);

    try {
      const response = await axios.post('http://localhost:3001/api/missions/', { ...newMission, startDate: newDate, coordinates: coordinatesJSON, });
      console.log('Datele au fost trimise către backend:', response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate()

  const goBackHandler = () => {
    navigate(-1)
  };

  const saveMarkers = (newMarkerCoords) => {
    setMarkers([...markers, newMarkerCoords]);
  };

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        saveMarkers({ lat, lng });
      },
    });

    return null;
  }

  // mission_id: 4,
  // device_id: 1,
  // map_id: 2,
  // user_id: 15,
  // startDate: 2023-11-11T22:00:00.000Z,
  // ttl: 25,
  // config: 'config1'
  const coordinates = markers.map((marker) => [marker.lat, marker.lng]);

  return (
    <Box sx={{ position: "absolute", top: "65%", left: "50%", transform: "translate(-50%, -50%)", width: "70%" }}>
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
                <MDBox mb={2} width="100%">
                  <Autocomplete
                   disablePortal
                    options={options.devicesId}
                    id="device_id"
                    onChange={changeHandleAutocomplete}
                    name="deviceId"
                    clearIcon={null}
                    renderInput={(params) => <TextField {...params} label="Device id" />}
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
                <MDBox mb={0} width="100%">
                  <Autocomplete
                    options={options.mapsId}
                    id="map_id"
                    onChange={changeHandleAutocomplete}
                    renderInput={(params) => <TextField {...params} label="Map id" />}
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
                  mr={0}
                >
                  <MDBox mb={1} width="100%">
                    <Autocomplete
                      options={options.usersId}
                      id="user_id"
                      onChange={changeHandleAutocomplete}
                      renderInput={(params) => <TextField {...params} label="User ID" />}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" mt={0} mb={0}>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  TTL
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="ttl"
                    placeholder="TTL"
                    value={newMission.ttl}
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
                  Config
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="text"
                    fullWidth
                    name="config"
                    placeholder="Config"
                    value={newMission.config}
                    onChange={changeHandler}
                  />
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox mt={2} display="flex" justifyContent="space-between" >
                {newMission.map_id && mapData.center !==null && (
                    <MapContainer
                        center={mapData.center}
                        zoom={mapData.zoom}
                        style={{ height: "400px", marginBottom: "20px", width: "50%" }}
                        onClick={(e) => addMarker(e.latlng, 'Custom popup content')}
                    >
                      <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <MyComponent />
                      {markers.map((marker, index) => (
                          <Marker key={index} position={[marker.lat, marker.lng]}>
                            <Popup>Location {index + 1}</Popup>
                          </Marker>
                      ))}
                      {coordinates.length >= 2 && (
                          <Polyline positions={coordinates} color="blue" />
                      )}
                    </MapContainer>
                )}
                <MDBox sx={{ width: "45%", height: "100%"}}>
                  <MDTypography variant="h3" gutterBottom>
                    Locations
                  </MDTypography>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {markers.map((marker, index) => (
                        <li key={index} style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div>
                              Location {index + 1} {marker.popupContent}
                            </div>
                            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                Doriti sa faceti o fotografie?
                              </MDTypography>
                              <select
                                  style={{ marginLeft: "8px" }}
                                  onChange={(e) => handlePhotoOptionChange(e, index)}
                                  value={marker.takePhoto ? "Da" : "Nu"}
                              >
                                <option value="Da">Da</option>
                                <option value="Nu">Nu</option>
                              </select>
                            </div>
                          </div>
                          {marker.takePhoto && (
                              <div style={{ display: "flex", marginTop: "8px" }}>
                                <div style={{ marginRight: "16px" }}>
                                  <MDInput
                                      type="number"
                                      fullWidth
                                      name={`inaltime_${index}`}
                                      placeholder="Inaltime"
                                      value={marker.height || ""}
                                      onChange={(e) => handleHeightChange(e, index)}
                                      style={{ marginBottom: "8px" }}
                                  />
                                </div>
                                <div>
                                  <MDInput
                                      type="number"
                                      fullWidth
                                      name={`orientare_${index}`}
                                      placeholder="Orientare (grade)"
                                      value={marker.orientation || ""}
                                      onChange={(e) => handleOrientationChange(e, index)}
                                  />
                                </div>
                              </div>
                          )}
                        </li>
                    ))}
                  </ul>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox mt={2} display="flex" justifyContent="space-between" >
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white", backgroundColor: "red" }} type="button">
                  Close
                </Button>
                <Button onClick={() => goBackHandler()} variant="contained" style={{ color: "white" }} type="submit">
                  Create Mission
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default CreateMission;
