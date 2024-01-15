// import React, { useState } from 'react'
// import MDBox from "components/MDBox";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import Box from "@mui/material/Box";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS } from "chart.js/auto"

// const Valentina = () => {
//     const { sales, tasks } = reportsLineChartData;
//     const numberOfLabels = 20;

// const data = Array.from({ length: numberOfLabels }, () => Math.floor(Math.random() * 101));

//     const [tempData, setTempData] = useState({
//         labels: ["label1", "label2", "label3", "label4", "label5", "label6", "label7", "label8", "label9", "label10", "label11", "label12", "label13", "label14", "label15", "label16", "label17", "label18", "label19", "label20"],
//         datasets: [{
//             label: "Temperatura",
//             data: data,
//             pointBorderColor: "transparent",
//             pointStyle: false,
//             tension: 0.1
//         }]
//     })


// const options = {
//     plugins: {
//         legend: false
//     }
// }

//     return (


//         <Box sx={{ position: "relative", height: "100vh" }}>
//             <DashboardLayout>
//                 <MDBox mb={2} />
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "50px" }}>
//                     <div style={{ width: "1200px" }}>
//                         <MDBox mb={3}>
//                             <ReportsLineChart
//                                 color="success"
//                                 chart={sales}
//                             />
//                         </MDBox>
//                     </div>
//                     <div style={{ width: "1200px" }}>
//                         <Bar data={tempData} />
//                     </div>
//                     <div style={{ width: "1200px" }}>
//                         <Line data={tempData} options={options} />
//                     </div>
//                 </div>


//             </DashboardLayout>
//         </Box>
//     )
// }

// export default Valentina
