import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { useExpenditureAggregate } from "../../api/graph";
import { useDateRange } from "../../components/DateRangeProvider";
import {useBudget} from "../budget/BudgetContext";
import {expenseIdToName} from "../../utils/expense";

const barChartOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
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
      return opt.config.series[opt.seriesIndex].name + ": $" + val.toFixed(0);
    },
  },
  grid: {
    show: true,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    // customLegendItems: ["spent"],
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (f) => "$" + f.toFixed(2),
    },
  },
};

export default function TopCategories() {
  const theme = useTheme();
  const { startDate, endDate } = useDateRange();

  const { budget } = useBudget();
  const { data } = useExpenditureAggregate({
    since: startDate,
    until: endDate,
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
    if (data && budget) {
      const spendingMap = new Map(
          data.aggregatedExpenditures.map((e) => [
            expenseIdToName(budget, e.groupByCategory),
            e.amount,
          ]),
      );
      setSpent(spendingMap);

      setCategories(data.aggregatedExpenditures
              .toSorted((a, b) => a.amount - b.amount)
              .toReversed()
              .slice(0, 10)
              .map((e) => expenseIdToName(budget, e.groupByCategory)));
    }
  }, [data, budget]);

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