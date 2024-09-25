import { useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';
import { endOfLastMonth, startOfLastMonth, startOfMonth } from "../../utils/dates";
import {useExpenditureAggregate} from "../../api/graph";

// chart options
const numCategories = 10
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 800,
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      // columnWidth: '45%',
      borderRadius: 1,
      horizontal: true,
      dataLabels: {
        position: 'bottom'
      },
    }
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
  },
  yaxis: {
    show: true
  },
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    offsetX: 0,
    formatter: function(val) {
      return "$" + val.toFixed(2)
      // return opt.w.globals.labels[opt.dataPointIndex] + ": $" + val.toFixed(0)// + " / $" + budget[opt.dataPointIndex].toFixed(0)
    }
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart({ slot }) {
  const theme = useTheme();

  const { data } = useExpenditureAggregate({
    since: slot === "this" ? startOfMonth() : startOfLastMonth(),
    until: slot === "this" ? new Date() : endOfLastMonth(),
    span: "MONTH",
    groupBy: "BUDGET_CATEGORY",
  })

  const [spent, setSpent] = useState([]);
  const [budgeted, setBudgeted] = useState([]);
  const [categories, setCategories] = useState(['No data']);
  const [options, setOptions] = useState(barChartOptions);

  useMemo(() => {
    if (data) {
      const sortedData = data.aggregatedExpenditures
          .toSorted((a, b) => a.amount - b.amount)
          .toReversed()

      setCategories(sortedData.slice(0, numCategories)
          .map(e => e.groupByCategory)
          .concat(["other"]))

      setSpent(sortedData.slice(0, numCategories)
          .map(e => e.amount)
          .concat([
            sortedData.slice(numCategories).reduce((sum, e) => sum + e.amount, 0),
          ]))

      const budget = [7000, 6000, 5500, 5000, 5000, 4000, 3000, 2000, 1500, 1000, 10000]

      setBudgeted(budget)

      // setOptions((prevState) => ({
      //   ...prevState,
      //   dataLabels: {
      //     ...prevState.dataLabels,
      //     formatter: function(val, opt) {
      //       return opt.w.globals.labels[opt.dataPointIndex] + ": $" + val.toFixed(0)// + " / $" + budget[opt.dataPointIndex].toFixed(0)
      //     }
      //   },
      // }))
    }
  }, [data])

  useMemo(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        },
        categories: categories
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['spent', 'budgeted', 'over budget'],
        markers: {
          fillColors: [theme.palette.primary.main, theme.palette.primary.dark, theme.palette.error.main]
        }
      }
    }));
  }, [theme, categories]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={buildSeries(categories, spent, budgeted, theme)} type="bar" height={460} />
    </Box>
  );
}

function buildSeries(categories, spent, budgeted, theme) {
  let d = []
  for (let i = 0; i < spent.length; i++) {
    d.push({
      x: categories[i],
      y: spent[i],
      fillColor: spent[i] <= budgeted[i] ? theme.palette.primary.main : theme.palette.error.main,
      goals: [
        {
          name: "budgeted",
          value: budgeted[i],
          strokeWidth: 5,
          strokeColor: theme.palette.primary.dark
        }
      ]
    })
  }
  return [{
    name: "spent",
    data: d
  }]
}
