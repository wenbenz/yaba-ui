// material-ui
import Typography from "@mui/material/Typography";
import { useBudgets, useUpdateBudget } from "../../api/graph";
import { useMemo, useState } from "react";
import { cloneDeep } from "lodash";
import ManageBudget from "./ManageBudget";
import CreateBudget from "./CreateBudget";
import Loader from "../../components/Loader";
import {BudgetProvider} from "./BudgetContext";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function BudgetDashboard() {
  // const [budget, setBudget] = useState(templateBudget);

  // const { loading, data, error } = useBudgets(1);
  // const [updateBudget, updateBudgetResponse] = useUpdateBudget(budget);
  // const hasBudget = data && data.budgets && data.budgets.length > 0;

  // useMemo(
  //   () =>
  //     data &&
  //     data.budgets &&
  //     data.budgets.length > 0 //&&
  //     // setBudget(cloneDeep(data.budgets[0])),
  //   [data],
  // );

  // if (loading) {
  //   return <Loader />;
  // }
  //
  // if (error) {
  //   return (
  //     <Typography variant="h5">An unexpected error has occurred.</Typography>
  //   );
  // }

  return (
    <>
      <Typography variant="h5">Budget</Typography>
      <BudgetProvider>
        <ManageBudget />
      </BudgetProvider>
    </>
  );
}
