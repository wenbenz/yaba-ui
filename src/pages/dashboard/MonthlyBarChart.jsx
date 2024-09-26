import {useMemo, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';
import {endOfLastMonth, startOfLastMonth, startOfMonth} from "../../utils/dates";
import {useExpenditureAggregate} from "../../api/graph";

// chart options
const numCategories = 10
const barChartOptions = {
  chart: {
    type: 'bar',
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
      barHeight: 22,
    }
  },
  xaxis: {
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    },
  },
  yaxis: {
    show: true,
    labels: {
      style: {
        fontSize: 14,
        fontWeight: 400
      }
    }
  },
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    offsetX: 0,
    formatter: function(val, opt) {
      // return "$" + val.toFixed(2)
      return opt.config.series[opt.seriesIndex].name + ": $" + val.toFixed(0)// + " / $" + budget[opt.dataPointIndex].toFixed(0)
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
          .map(e => e.groupByCategory))

      setSpent(sortedData.slice(0, numCategories)
          .map(e => e.amount))

      const budget = [7000, 6000, 5500, 5000, 5000, 4000, 3000, 2000, 1500, 1000]

      setBudgeted(budget)
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
      yaxis: {
        ...prevState.yaxis,
        labels: {
          ...prevState.yaxis.labels,
          style: {
            ...prevState.yaxis.labels.style,
            colors: theme.palette.text.primary
          }
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['spent', 'budgeted'],
        markers: {
          fillColors: [theme.palette.primary.main, theme.palette.primary.dark]
        }
      }
    }));
  }, [theme, categories]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={buildSeries(categories, spent, budgeted, theme)} type="bar" height={80 + 50 * categories.length} />
    </Box>
  );
}

function buildSeries(categories, spent, budgeted, theme) {
  // let d = [] 10=570, 2=180,
  // for (let i = 0; i < spent.length; i++) {
  //   d.push({
  //     x: categories[i],
  //     y: spent[i],
  //     fillColor: spent[i] <= budgeted[i] ? theme.palette.primary.main : theme.palette.error.main,
  //     // goals: [
  //     //   {
  //     //     name: "budgeted",
  //     //     value: budgeted[i],
  //     //     strokeWidth: 5,
  //     //     strokeColor: theme.palette.primary.dark
  //     //   }
  //     // ]
  //   })
  // }
  return [{
    name: "spent",
    data: spent,
    color: theme.palette.primary.main
  }, {
    name: "budgeted",
    data: budgeted,
    color: theme.palette.secondary.main
  }]
}
