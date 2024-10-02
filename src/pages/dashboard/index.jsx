// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";
import SpendingCard from "./SpendingCard";

// assets
import FileUpload from "components/FileUpload";
import { Link } from "@mui/material";
import { useMemo, useState } from "react";
import { useBudgets, useExpenditureAggregate } from "../../api/graph";
import { startOfLastMonth } from "../../utils/dates";
import MonthlyStat from "./MonthlyStat";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [totalSpent, setTotalSpent] = useState([0, 0]);
  const [adherance, setAdherance] = useState(1);
  const [cashflow, setCashflow] = useState([0, 0]);
  const [rewards, setRewards] = useState(0);

  const monthlySpending = useExpenditureAggregate({
    since: startOfLastMonth(),
    until: new Date(),
    span: "MONTH",
    groupBy: "NONE",
  });

  const groupedMonthlySpending = useExpenditureAggregate({
    since: startOfLastMonth(),
    until: new Date(),
    span: "MONTH",
    groupBy: "BUDGET_CATEGORY",
  });

  const budgets = useBudgets(1);

  // calculate the total spent this and last month
  useMemo(() => {
    if (monthlySpending.data) {
      const spendingData = monthlySpending.data.aggregatedExpenditures;
      let v = [0, 0];
      spendingData.forEach((e) => {
        const spanStart = e.spanStart;
        const d = new Date(spanStart);
        v[d.getUTCMonth() - startOfLastMonth().getMonth()] = e.amount;
      });
      setTotalSpent(v);
    }
  }, [monthlySpending.data]);

  // calculate the cash flow as a function of the total budgeted income and previously calculated spending
  useMemo(() => {
    if (budgets.data && budgets.data.budgets.length > 0) {
      const budget = budgets.data.budgets[0];
      const totalIncome = budget.incomes.reduce((sum, e) => sum + e.amount, 0);

      setCashflow(totalSpent.map((spent) => totalIncome - spent));
    }
  }, [budgets.data, totalSpent]);

  // find the budget adherance by counting the number of categories in budget
  useMemo(() => {
    if (
      groupedMonthlySpending &&
      groupedMonthlySpending.data &&
      budgets.data &&
      budgets.data.budgets.length > 0
    ) {
      const budget = budgets.data.budgets[0];
      const categories = budget.expenses.length;
      let overbudget = 0;

      // build a map from budget category to amount
      let b = {};
      budget.expenses.forEach((e) => {
        b[e.category] = e.amount;
      });

      groupedMonthlySpending.data.aggregatedExpenditures.forEach((e) => {
        if (!b[e.groupByCategory] || b[e.groupByCategory] < e.amount) {
          overbudget += 1;
        }
      });

      setAdherance((categories - overbudget) / categories);
    }
  }, [groupedMonthlySpending, budgets.data]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Overview</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MonthlyStat
          title="Total Monthly Expenditure"
          prev={totalSpent[0]}
          current={totalSpent[1]}
          format={(v) => "$" + Math.abs(v).toFixed(2)}
          positiveMessage="Your spending increased by"
          negativeMessage="Your spendig decreased by"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MonthlyStat
          title="Cashflow"
          prev={cashflow[0]}
          current={cashflow[1]}
          format={(v) => "$" + v.toFixed(2)}
          positiveMessage="Your cashflow increased by"
          negativeMessage="Your casfhlow decreased by"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MonthlyStat
          title="Budget Adherence"
          current={adherance}
          showDiff={false}
          format={(v) => v.toFixed(0) * 100 + "%"}
          positiveMessage="You stuck to your budget"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MonthlyStat
          title="Rewards"
          current={0}
          showDiff={false}
          format={(v) => "$" + Math.abs(v).toFixed(2)}
          positiveMessage="This is not yet implemnted."
        />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <SpendingCard />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Import Transactions</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard
          sx={{ mt: 2 }}
          title="Upload CSV"
          secondary={
            <Link color="primary" href="/">
              Download CSV Template
            </Link>
          }
        >
          <Stack spacing={3}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Import transactions from a CSV file.
            </Typography>

            <FileUpload />
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
