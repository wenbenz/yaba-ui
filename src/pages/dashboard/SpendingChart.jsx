import {useMemo, useState} from "react";

// third-party
import ReactApexChart from "react-apexcharts";
import {AGGREGATE_EXPENDITURES, useBudgets} from "../../api/graph";
import {useDateRange} from "../../components/DateRangeProvider";
import {useQuery} from "@apollo/client";
import {dateString} from "../../utils/dates";
import {adjustBudgetForSpan, calculateSpan} from "../../utils/expense";

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
    width: 3,
  },
  grid: {
    strokeDashArray: 0,
  },
  yaxis: {
    labels: {
      formatter: (value) => Math.round(value)
    },
    title: {
      text: 'Amount ($)',
    }
  },
};

export default function SpendingChart() {
  const [options, setOptions] = useState(areaChartOptions);
  const { startDate, endDate } = useDateRange();
  const { data: expenditures } = useQuery(AGGREGATE_EXPENDITURES, {
    variables: {
      since: dateString(startDate),
      until: dateString(endDate),
      span: calculateSpan(startDate, endDate),
      groupBy: "NONE",
      aggregation: "SUM",
    },
    fetchPolicy: 'network-only'
  });
  const { data: budgets } = useBudgets();

  const [series, setSeries] = useState([
    {
      name: "Spending",
      data: []
    },
    {
      name: "Budget",
      data: []
    }
  ]);

  useMemo(() => {
    let spendingData = expenditures?.aggregatedExpenditures.map(e => e.amount) || [];

    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories: expenditures?.aggregatedExpenditures.map(e => e.spanStart) || [],
      },
      plotOptions: {
        bar: {
          columnWidth: '50%', // Adjust column width
        },
      },
    }));

    let s = [
      {
        name: "Spending",
        type: "bar", // Change to bar for columns
        data: spendingData,
      },
    ];

    budgets?.budgets.forEach(b => {
      const amount = adjustBudgetForSpan(
          b.expenses.reduce((total, e) => total + e.amount, 0),
          calculateSpan(startDate, endDate)
      );
      s.push({
        name: b.name,
        type: "line", // Keep budgets as lines
        data: expenditures?.aggregatedExpenditures.map(e => amount) || [],
      });
    });

    setSeries(s);
  }, [expenditures?.aggregatedExpenditures, budgets?.budgets, startDate, endDate]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={380}
    />
  );
}