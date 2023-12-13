import {useEffect, useState} from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {Autocomplete, TextField} from "@mui/material";
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import Grid from "@mui/material/Grid";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import flower1 from '../../assets/images/dronesProject/flower1.jpg'
import flower2 from '../../assets/images/dronesProject/flower2.jpg'
import flower3 from '../../assets/images/dronesProject/flower3.jpg'
import Battery from "../exampleProject1/battery";
import mqtt from "mqtt";
import {options} from "../../config/mqtt.config";
import {host} from "../../config/mqtt.config";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "../../components/MDButton";

const Drones = () => {
    const [optionsMission, setOptionsMission] = useState({
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
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const [battery, setBattery] = useState(0);
    const batteryTopic = 'microlab/automotive/device/drone/battery-1';
    const [messages, setMessages] = useState({});
    const [redLineCoordinates, setRedLineCoordinates] = useState([]);
    const [totalFlowers, setTotalFlowers] = useState(0);
    const [markerLocations, setMarkerLocations] = useState([]);

    async function getOptionsMission() {
        try {
            const responseDevices = await axios.get(`http://localhost:3001/api/devices/`);
            setOptionsMission((prevOptions) => ({
                ...prevOptions,
                devicesId: responseDevices.data.map((item) => ({label: String(item.name)})),
            }));

            const responseMission = await axios.get(`http://localhost:3001/api/missions/`);
            setOptionsMission((prevOptions) => ({
                ...prevOptions,
                missionsId: responseMission.data.map((item) => ({label: String(item.mission_id)})),
            }));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOptionsMission()
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

                            const newCoordinates = mapInfo.coordinates || [];
                            setCoordinates(newCoordinates);
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
        const addMarkersAndLineToMap = async () => {
            if (droneMission.mission_id) {
                try {
                    const missionId = droneMission.mission_id;
                    const coordinates = await fetchMarkersForMissionId(missionId);

                    if (coordinates.length > 0) {
                        const markers = coordinates.map((coord, index) => (
                            <Marker key={index} position={[coord.lat, coord.lng]}>
                                <Popup>Location {index + 1}</Popup>
                            </Marker>
                        ));

                        setMarkers(markers);

                        const lineCoords = coordinates.map(coord => [coord.lat, coord.lng]);
                        setLines([
                            <Polyline key="line-blue" positions={lineCoords} color="blue"/>,
                        ]);

                        const markerLocations = coordinates.map((coord, index) => ({
                            label: `Location ${index + 1}`,
                            position: [coord.lat, coord.lng],
                        }));
                        setMarkerLocations(markerLocations);

                        let i = 0;
                        const interval = setInterval(() => {
                            if (i < coordinates.length) {
                                const redLineCoords = coordinates.slice(0, i + 1).map(coord => [coord.lat, coord.lng]);
                                setRedLineCoordinates([
                                    <Polyline key="line-red" positions={redLineCoords} color="red"/>,
                                ]);
                                i++;
                            } else {
                                clearInterval(interval);
                            }
                        }, 5000);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        addMarkersAndLineToMap();
    }, [droneMission.mission_id]);

    const changeHandleAutocomplete = (e, value) => {
        const name = e.target.id.split('-')[0]
        setDroneMission({
            ...droneMission,
            [name]: value.label,
        });
    };

    console.log('messages', messages)
    async function getMessages() {
        try {
            const requestFlowerNumbering = {
                "topic": "microlab/automotive/device/drone/flowerNumbering-1"
            };
            const response =
                await axios.post('http://localhost:3001/api/messages/getByTopic', requestFlowerNumbering);

            let result = response.data;
            console.log(result.length);

            let shortResult = result.splice(result.length - 50, result.length);

            const total = shortResult.reduce((accumulator, current) => {
                const parsedMessage = JSON.parse(current.message);
                return accumulator + parsedMessage.flowerNumbering;
            }, 0);
            setTotalFlowers(total);

            setMessages({
                labels: shortResult.map(x => x.message_id),
                datasets: { label: "Number of Flowers", data: shortResult.map(x => JSON.parse(x.message).flowerNumbering) },
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMessages();
        //automatically update the chart data each 5 seconds
        const intervalId = setInterval(() => {
            getMessages();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const mqttConnect = () => {
        setConnectStatus('Connecting');
        let client = mqtt.connect(host, options);
        setClient(client);
    };

    useEffect(() => {
        mqttConnect();
    }, []);

    useEffect(() => {
        if (client) {
            console.log(client);
            client.on('connect', () => {
                setConnectStatus('Connected');

                client.subscribe(batteryTopic);
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });

            client.on('message', (topic, message) => {
                setConnectStatus('Message received');

                if (topic === batteryTopic) {
                    setBattery(JSON.parse(message.toString()).battery);
                }
                console.log(message.toString());
            });

        }
    }, [client]);

    const startMission = async () => {
        try {
            if (client && droneMission.mission_id) {
                const missionId = droneMission.mission_id;
                const coordinates = await fetchMarkersForMissionId(missionId);

                if (coordinates.length > 0) {
                    const payload = JSON.stringify({ missionId, coordinates });
                    client.publish('microlab/automotive/device/drone/startMission-1', payload);
                    console.log('Coordinates sent:', payload);
                }
            }
        } catch (error) {
            console.error('Error while starting mission:', error);
        }
    };

    return (
        <DashboardLayout marginLeft={274}>
            <DashboardNavbar/>
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
                            options={optionsMission.devicesId}
                            id="device_name"
                            onChange={changeHandleAutocomplete}
                            name="deviceName"
                            clearIcon={null}
                            renderInput={(params) => <TextField {...params} label="Device name"/>}
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
                            options={optionsMission.missionsId}
                            id="mission_id"
                            onChange={changeHandleAutocomplete}
                            renderInput={(params) => <TextField {...params} label="Mission id"/>}
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
                        <Battery percentage={battery}/>
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
                        <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => startMission(e)}>
                        Start Mission
                        </MDButton>
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
                                style={{height: "390px", marginBottom: "20px", width: "100%"}}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {lines}
                                {redLineCoordinates}
                                {markers}
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
                                                    <img src={image} alt={`Image ${index + 1}`}/>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </MDBox>
                                </Grid>
                            </Grid>)}
                    </MDBox>
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Number of Flowers"
                                    description={
                                        <>
                                            Total number of flowers <strong>{totalFlowers}</strong>.
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={messages}/>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
};

export default Drones;
