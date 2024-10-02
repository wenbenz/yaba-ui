// material-ui
import Grid from "@mui/material/Grid";
import MainCard from "../../components/MainCard";
import Box from "@mui/material/Box";
import BudgetPieChart from "./BudgetPieChart";
import BudgetEditor from "./BudgetEditor";
import { clone } from "lodash";

// project import
// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function ManageBudget({ budget, setBudget, saveBudget }) {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} md={6}>
          <MainCard content={false} sx={{ mt: 2 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <BudgetPieChart budget={budget} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title="Budget Editor" sx={{ mt: 2 }} content={true}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <BudgetEditor
                budget={budget}
                setBudget={(b) => setBudget(clone(b))}
                saveBudget={saveBudget}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
