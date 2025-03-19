import PropTypes from "prop-types";
import { useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";
import {getTimeSpan} from "../../utils/dates";
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

export default function SpendingChart({ startDate, endDate }) {
  const theme = useTheme();

  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const { data } = useExpenditureAggregate({
    since: startDate,
    until: endDate,
    span: getTimeSpan(startDate, endDate),
    groupBy: "NONE",
  });

  // Initial state
  const [series, setSeries] = useState([
    {
      name: "Spending",
      data: [],
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

    setSeries([
      {
        name: "Spending",
        data: data && data.aggregatedExpenditures.map((e) => e.amount),
      },
    ]);
  }, [data]);

  return (
      <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
      />
  );
}

SpendingChart.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};