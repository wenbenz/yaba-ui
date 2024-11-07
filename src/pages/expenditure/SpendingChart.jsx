import PropTypes from "prop-types";
import { useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import { oneWeekAgo, startOfMonth, startOfYear } from "../../utils/dates";
import { useExpenditureAggregate } from "../../api/graph";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const getXCategories = (data) => {
  if (data) {
    return data.aggregatedExpenditures.map((e) => e.spanStart);
  }
  return [0];
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function SpendingChart({ slot }) {
  const theme = useTheme();

  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [start, setStart] = useState(oneWeekAgo());
  const [span, setSpan] = useState("DAY");
  const { data } = useExpenditureAggregate({
    since: start,
    until: new Date(),
    span: span,
    groupBy: "NONE",
  });

  // Initial state
  const [series, setSeries] = useState([
    {
      name: "Spending",
      data: slot === "year" ? new Array(12) : new Array(31),
    },
  ]);

  useMemo(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        labels: {
          style: {
            colors: secondary,
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: secondary,
          },
        },
      },
      grid: {
        borderColor: line,
      },
    }));
  }, [secondary, line, theme]);

  useMemo(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: getXCategories(data),
      },
    }));
    if (slot === "year") {
      setStart(startOfYear());
      setSpan("MONTH");
    } else {
      setStart(startOfMonth());
      setSpan("DAY");
    }

    setSeries([
      {
        name: "Spending",
        data: data && data.aggregatedExpenditures.map((e) => e.amount),
      },
    ]);
  }, [data, slot]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
}

SpendingChart.propTypes = { slot: PropTypes.string };
