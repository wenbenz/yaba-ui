import { useMemo, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// third-party
import ReactApexChart from "react-apexcharts";
import {
  endOfLastMonth,
  startOfLastMonth,
  startOfMonth,
} from "../../utils/dates";
import { useExpenditureAggregate } from "../../api/graph";
import {expenseIdToName} from "../../utils/expense";
import {useBudget} from "../budget/BudgetContext";

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

export default function MonthlyBarChart({ slot }) {
  const theme = useTheme();

  const { budget } = useBudget();

  const { data } = useExpenditureAggregate({
    since: slot === "this" ? startOfMonth() : startOfLastMonth(),
    until: slot === "this" ? new Date() : endOfLastMonth(),
    span: "MONTH",
    groupBy: "BUDGET_CATEGORY",
  });

  const [categories, setCategories] = useState([]);
  const [spent, setSpent] = useState(new Map());
  const [budgeted, setBudgeted] = useState(new Map());
  const [options, setOptions] = useState(barChartOptions);

  useMemo(() => {
    // If the user has (at least) one budget
    if (budget?.expenses) {
      // expenses
      const expensesMap = new Map(
        budget.expenses.map((expense) => [expense.id, expense.amount]),
      );
      setBudgeted(expensesMap);

      // categories, grouped by non-fixed non-slack, fixed, slack; ordered by amount budgeted
      let variableCategories = [];
      let fixedCategories = [];
      let slackCategory = "";
      budget.expenses.forEach((expense) => {
        if (expense.isFixed) {
          fixedCategories.push(expense.id);
        } else if (expense.isSlack) {
          slackCategory = expense.id;
        } else {
          variableCategories.push(expense.id);
        }
      });

      // Select only variable and slack categories. Ignore fixed.
      setCategories(
        variableCategories.concat(slackCategory),
      );
    }
  }, [budget]);

  useMemo(() => {
    if (budget?.expenses) {
      setOptions((prevState) => ({
        ...prevState,
        xaxis: {
          ...prevState.xaxis,
          categories: categories.map((category) => expenseIdToName(budget, category)),
        },
      }))
    };
  }, [budget, categories]);

  useMemo(() => {
    if (data) {
      const spendingMap = new Map(
        data.aggregatedExpenditures.map((expense) => [
          expense.groupByCategory,
          expense.amount,
        ]),
      );
      setSpent(spendingMap);
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

  return (
    <Box id="chart" sx={{ bgcolor: "transparent" }}>
      <ReactApexChart
        options={options}
        series={buildSeries(spent, budgeted, categories, theme)}
        type="bar"
        height={80 + 60 * categories.length}
      />
    </Box>
  );
}

function buildSeries(spent, budgeted, categories, theme) {
  const budgetedSeries = categories.map((category) =>
    budgeted.get(category) ? budgeted.get(category) : 0,
  );

  const spentSeries = categories.map((category) =>
    spent.get(category) ? spent.get(category) : 0,
  );

  let miscSpent = spentSeries[categories.length - 1];
  spent.forEach((amount, category) => {
    if (!categories.includes(category)) {
      miscSpent += amount;
    }
  });
  spentSeries[categories.length - 1] = miscSpent;

  return [
    {
      name: "spent",
      data: spentSeries,
      color: theme.palette.primary.main,
    },
    {
      name: "budgeted",
      data: budgetedSeries,
      color: theme.palette.secondary.main,
    },
  ];
}
