// material-ui
import Box from "@mui/material/Box";

// third-party
import ReactApexChart from "react-apexcharts";

// chart options
// ==============================|| MONTHLY BAR CHART ||============================== //

export default function BudgetPieChart({ budget }) {
  // const theme = useTheme();
  const labels = budget.expenses.map((e) => e.category);
  const series = budget.expenses.map((e) => e.amount);

  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Box id="chart" sx={{ bgcolor: "transparent" }}>
      <ReactApexChart options={options} series={series} type="donut" />
    </Box>
  );
}
