import { useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// third-party
import ReactApexChart from "react-apexcharts";
import { startOfMonth, startOfYear } from "../../utils/dates";
import { useExpenditureAggregate } from "../../api/graph";
import MainCard from "../../components/MainCard";
import SpendingChart from "./SpendingChart";

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      // columnWidth: '45%',
      borderRadius: 1,
      horizontal: true,
      dataLabels: {
        position: "bottom",
      },
      barHeight: 22,
    },
  },
  xaxis: {
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: true,
    labels: {
      style: {
        fontSize: 14,
        fontWeight: 400,
      },
    },
  },
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    offsetX: 0,
    formatter: function (val, opt) {
      // return "$" + val.toFixed(2)
      return opt.config.series[opt.seriesIndex].name + ": $" + val.toFixed(0); // + " / $" + budget[opt.dataPointIndex].toFixed(0)
    },
  },
  grid: {
    show: true,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["spent", "budgeted"],
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (f) => "$" + f.toFixed(2),
    },
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function TopCategories() {
  const theme = useTheme();

  const { data } = useExpenditureAggregate({
    since: startOfYear(),
    until: new Date(),
    span: "YEAR",
    groupBy: "BUDGET_CATEGORY",
  });

  const [categories, setCategories] = useState([]);
  const [spent, setSpent] = useState(new Map());
  const [options, setOptions] = useState(barChartOptions);

  useMemo(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: categories,
      },
    }));
  }, [categories]);

  useMemo(() => {
    if (data) {
      const spendingMap = new Map(
        data.aggregatedExpenditures.map((expense) => [
          expense.groupByCategory,
          expense.amount,
        ]),
      );
      setSpent(spendingMap);

      setCategories(
        data.aggregatedExpenditures
          .toSorted((a, b) => a.amount - b.amount)
          .toReversed()
          .slice(0, 10)
          .map((e) => e.groupByCategory),
      );
    }
  }, [data]);

  useMemo(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        labels: {
          ...prevState.xaxis.labels,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      yaxis: {
        ...prevState.yaxis,
        labels: {
          ...prevState.yaxis.labels,
          style: {
            ...prevState.yaxis.labels.style,
            colors: theme.palette.text.primary,
          },
        },
      },
      legend: {
        ...prevState.legend,
        markers: {
          ...prevState.legend.markers,
          fillColors: [theme.palette.primary.main, theme.palette.primary.dark],
        },
      },
    }));
  }, [theme]);

  console.log(options);

  return (
    <Box id="chart" sx={{ bgcolor: "transparent", pt: 1, pr: 2 }}>
      <ReactApexChart
        options={options}
        series={buildSeries(spent, categories, theme)}
        type="bar"
        height={450}
      />
    </Box>
  );
}

function buildSeries(spent, categories, theme) {
  let spentSeries = categories.map((category) =>
    spent.get(category) ? spent.get(category) : 0,
  );

  return [
    {
      name: "spent",
      data: spentSeries,
      color: theme.palette.primary.main,
    },
  ];
}
