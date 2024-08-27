import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useQuery, gql } from "@apollo/client";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// GraphQL Query
const AGGREGATE_EXPENDITURES = gql`
query AggregatedExpenditures($since: String, $until: String, $span: Timespan) {
  aggregatedExpenditures(
    since: $since
    until: $until
    span: $span
    groupBy: NONE
    aggregation: SUM
  ) {
    groupByCategory
    amount
    spanStart
    span
  }
}`

const dateString = (date) => {
  return date.toISOString().split('T')[0]
}

const oneWeekAgo = () => {
  let d = new Date()
  d.setDate(d.getDate() - 7)
  return d
}

function startOfMonth() {
  let d = new Date()
  d.setUTCFullYear(d.getUTCFullYear(), d.getMonth(), 0)
  return d
}

function startOfYear() {
  let d = new Date()
  d.setUTCFullYear(d.getUTCFullYear(), 0, 0)
  return d
}

const getXCategories = (data) =>  {
  if (data) {
    return data.aggregatedExpenditures.map(e => e.spanStart)
  }
  return [0]
}

// ==============================|| INCOME AREA CHART ||============================== //

export default function SpendingChart({ slot }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [start, setStart] = useState(dateString(oneWeekAgo()))
  const [span, setSpan] = useState("DAY")
  const { data } = useQuery(AGGREGATE_EXPENDITURES, {
    variables: {
      since: start,
      until: dateString(new Date()),
      span: span
    }
  });

  // Initial state
  const [series, setSeries] = useState([{
    name: 'Spending',
    data: slot === 'year' ? new Array(12) : new Array(31)
  }])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: getXCategories(data),
        labels: {
          style: {
            colors: secondary
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: secondary
          }
        }
      },
      grid: {
        borderColor: line
      }
    }));
  }, [primary, secondary, line, theme, slot, data]);

  useEffect(() => {
    if (slot === 'year') {
      setStart(dateString(startOfYear()))
      setSpan("MONTH")
    } else {
      setStart(dateString(startOfMonth()))
      setSpan("DAY")
    }

    setSeries([
      {
        name: 'Spending',
        data: data && data.aggregatedExpenditures.map(e => e.amount)
      }
    ]);
  }, [data, slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

SpendingChart.propTypes = { slot: PropTypes.string };
