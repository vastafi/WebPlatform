import Footer from "../../examples/Footer";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "../../components/MDButton";
import Menu from "@mui/material/Menu";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MDTypography from "../../components/MDTypography";
import Card from "@mui/material/Card";
import { MapContainer, TileLayer } from 'react-leaflet';
import flower1 from '../../assets/images/dronesProject/flower1.jpg';
import flower2 from '../../assets/images/dronesProject/flower2.jpg';
import flower3 from '../../assets/images/dronesProject/flower3.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReportsLineChart from "../../examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "../dashboard/data/reportsLineChartData";

const Drones = () => {
    const [droneAnchorEl, setDroneAnchorEl] = useState(null);
    const [missionAnchorEl, setMissionAnchorEl] = useState(null);
    const defaultPosition = [-33.8569, 151.2152];

    const handleDroneMenuClose = () => {
        setDroneAnchorEl(null);
    };

    const handleMissionMenuClose = () => {
        setMissionAnchorEl(null);
    };

    const droneNames = ['Drone 1', 'Drone 2', 'Drone 3'];
    const missionNames = ['Mission 1', 'Mission 2', 'Mission 3'];

    const flowerImages = [
        { id: 1, src: flower1, alt: 'Flower 1' },
        { id: 2, src: flower2, alt: 'Flower 2' },
        { id: 3, src: flower3, alt: 'Flower 3' },
    ];
    const { sales } = reportsLineChartData;

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={1.3}>
                        <MDBox mb={0}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                type="button"
                                onClick={(event) => setDroneAnchorEl(event.currentTarget)}
                            >
                                Drones
                                <KeyboardArrowDownIcon />
                            </MDButton>
                            <Menu
                                anchorEl={droneAnchorEl}
                                open={Boolean(droneAnchorEl)}
                                onClose={handleDroneMenuClose}
                            >
                                {droneNames.map((drone, index) => (
                                    <MenuItem key={index} onClick={handleDroneMenuClose}>
                                        {drone}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={7}>
                        <MDBox mb={0}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                type="button"
                                onClick={(event) => setMissionAnchorEl(event.currentTarget)}
                            >
                                Missions
                                <KeyboardArrowDownIcon />
                            </MDButton>
                            <Menu
                                anchorEl={missionAnchorEl}
                                open={Boolean(missionAnchorEl)}
                                onClose={handleMissionMenuClose}
                            >
                                {missionNames.map((mission, index) => (
                                    <MenuItem key={index} onClick={handleMissionMenuClose}>
                                        {mission}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => getMessages(e)}>
                                Create Mission
                            </MDButton>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            {/*<MDBox mt={0.1}>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*        <Grid item xs={12} md={6} lg={2}>*/}
            {/*            <img src={droneImg} alt="Drone Image" style={{ width: '120%', marginTop: '10px', alignSelf: 'flex-start' }} />*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</MDBox>*/}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <Card className="mapCard">
                        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <MDBox>
                                <MDTypography variant="h6" gutterBottom>
                                    GPS Tracking
                                </MDTypography>
                                <div style={{ width: '550%', height: '500px' }}> {/* Adjusted width */}
                                    <MapContainer
                                        center={defaultPosition}
                                        zoom={18}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution="&copy; OpenStreetMap contributors"
                                        />
                                    </MapContainer>
                                </div>
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Card className="nearMapCard" style={{ height: '100%' }}>
                        <MDBox display="flex" flexDirection="column" alignItems="center" p={3}>
                            <MDTypography variant="h6" gutterBottom>
                                Sneapshots
                            </MDTypography>
                            <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
                                {flowerImages.map((image) => (
                                    <div key={image.id}>
                                        <img src={image.src} alt={image.alt} />
                                    </div>
                                ))}
                            </Carousel>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
            <MDBox mt={4.5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <MDBox mb={3}>
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
            <Footer />
        </DashboardLayout>
    );
};

export default Drones;

