import { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Autocomplete, Box, TextField } from "@mui/material";
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import Grid from "@mui/material/Grid";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "../dashboard/data/reportsLineChartData";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import flower1 from '../../assets/images/dronesProject/flower1.jpg'
import flower2 from '../../assets/images/dronesProject/flower2.jpg'
import flower3 from '../../assets/images/dronesProject/flower3.jpg'

const Drones = () => {
    const [options, setOptions] = useState({
        devicesId: [],
        missionsId: [],
    });
    const [mapCoordinates, setMapCoordinates] = useState({
        center: null,
        zoom: 5,
    });
    const [droneMission, setDroneMission] = useState({
        device_id: "",
        mission_id: "",
    });
    const images = [
        flower1,
        flower2,
        flower3
    ];
    const [markers, setMarkers] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [lines, setLines] = useState([]);
    const { sales } = reportsLineChartData;

    async function getOptions() {
        try {
            const responseDevices = await axios.get(`http://localhost:3001/api/devices/`);
            setOptions((prevOptions) => ({
                ...prevOptions,
                devicesId: responseDevices.data.map((item) => ({ label: String(item.name) })),
            }));

            const responseMission = await axios.get(`http://localhost:3001/api/missions/`);
            setOptions((prevOptions) => ({
                ...prevOptions,
                missionsId: responseMission.data.map((item) => ({ label: String(item.mission_id) })),
            }));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOptions()
    }, [])

    async function fetchMapIdForMissionId(missionId) {
        try {
            const response = await axios.get(`http://localhost:3001/api/missions/${missionId}`);
            const missionInfo = response.data;

            if (missionInfo) {
                return missionInfo.map_id;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async function fetchMarkersForMissionId(missionId) {
        try {
            const response = await axios.get(`http://localhost:3001/api/missions/${missionId}`);
            const missionInfo = response.data;

            if (missionInfo && missionInfo.coordinates) {
                return missionInfo.coordinates; // Nu e nevoie să mai parsezi JSON-ul aici
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchMapData() {
            try {
                if (droneMission.mission_id) {
                    const missionId = droneMission.mission_id;
                    const mapId = await fetchMapIdForMissionId(missionId);
                    if (mapId) {
                        const mapResponse = await axios.get(`http://localhost:3001/api/maps/${mapId}`);
                        const mapInfo = mapResponse.data;

                        if (mapInfo) {
                            setMapCoordinates({
                                center: [mapInfo.centerLat, mapInfo.centerLng],
                                zoom: mapInfo.zoom,
                            });
                            console.log('mapInfo', mapInfo)

                            const newCoordinates = mapInfo.coordinates || [];
                            setCoordinates(newCoordinates);
                            console.log(newCoordinates)

                            if (newCoordinates.length >= 2) {
                                setLines([
                                    <Polyline
                                        key="polyline"
                                        positions={newCoordinates}
                                        color="blue"
                                    />
                                ]);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchMapData();
    }, [droneMission.mission_id]);

    useEffect(() => {
        const addMarkersToMap = async () => {
            if (droneMission.mission_id) {
                try {
                    const missionId = droneMission.mission_id;
                    const coordinates = await fetchMarkersForMissionId(missionId);

                    if (coordinates.length > 0) {
                        setMarkers(
                            coordinates.map((coord, index) => (
                                <Marker key={index} position={[coord.lat, coord.lng]}>
                                    <Popup>Location {index + 1}</Popup>
                                </Marker>
                            ))
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        addMarkersToMap();
    }, [droneMission.mission_id]);

    useEffect(() => {
        if (coordinates.length >= 2 && coordinates[0] && coordinates[1]) {
            setLines([
                <Polyline
                    key="polyline"
                    positions={coordinates}
                    color="blue"
                />
            ]);
        }
    }, [coordinates]);

    const changeHandleAutocomplete = (e, value) => {
        const name = e.target.id.split('-')[0]
        setDroneMission({
            ...droneMission,
            [name]: value.label,
        });
    };

    return (
        <Box sx={{ position: "absolute", top: "60%", left: "53%", transform: "translate(-50%, -50%)", width: "87%" }}>
            <DashboardLayout>
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
                                id="device_name"
                                onChange={changeHandleAutocomplete}
                                name="deviceName"
                                clearIcon={null}
                                renderInput={(params) => <TextField {...params} label="Device name" />}
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
                                options={options.missionsId}
                                id="mission_id"
                                onChange={changeHandleAutocomplete}
                                renderInput={(params) => <TextField {...params} label="Mission id" />}
                            />
                        </MDBox>
                    </MDBox>

                </MDBox>
                <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                    <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        width="100%"
                        mr={2}
                    >
                        <MDBox mb={2} width="100%">
                            {mapCoordinates.center !== null && (
                                <MapContainer
                                    center={mapCoordinates.center}
                                    zoom={mapCoordinates.zoom}
                                    style={{ height: "350px", marginBottom: "20px", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {markers}
                                    {lines}
                                </MapContainer>
                            )}
                        </MDBox>
                    </MDBox>
                    <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        width="100%"
                        mr={2}
                    >
                        <MDBox mb={2} width="100%">
                            {mapCoordinates.center !== null && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <MDBox mb={3} height="350px" width="100%">
                                            <Carousel showThumbs={false}>
                                                {images.map((image, index) => (
                                                    <div key={index}>
                                                        <img src={image} alt={`Image ${index + 1}`} />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </MDBox>
                                    </Grid>
                                </Grid>)}
                        </MDBox>
                    </MDBox>
                </MDBox>
                <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3} width="100%">
                                <ReportsLineChart
                                    color="success"
                                    title="Statistics"
                                    description={
                                        <>
                                            Total number of flowers <strong>205</strong>.
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>

                </MDBox>
            </DashboardLayout>
        </Box>
    );
};

export default Drones;
