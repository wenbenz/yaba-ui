// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from "../../components/MainCard";
import Box from "@mui/material/Box";
import BudgetPieChart from "./BudgetPieChart";
import {useBudgets} from "../../api/graph";
import {useState} from "react";
import BudgetEditor from "./BudgetEditor";
import {clone} from "lodash";

// project import
const templateBudget = {
    name: "My Budget",
    incomes: [{
        source: "Work",
        amount: 2400.00
    }],
    expenses: [
        {
            category: "Rent",
            amount: 1000.00,
            isFixed: true,
            isSlack: false
        },
        {
            category: "Groceries",
            amount: 600.00,
            isFixed: false,
            isSlack: false
        },
        {
            category: "Savings",
            amount: 800.00,
            isFixed: false,
            isSlack: true
        },
    ]
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function BudgetDashboard() {
    const {data} = useBudgets(1)
    const [budget, setBudget] = useState(templateBudget)
    const hasBudget = data && data.budgets && data.budgets.length === 0

    return (
        <>
        <Typography variant="h5">Budget</Typography>
            {hasBudget &&
            <Typography variant="subtitle2" color='secondary'>
                Looks like you don't have a budget saved. Here's a basic template to get you started.
            </Typography>
            }
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
                        <BudgetEditor budget={budget} setBudget={b => setBudget(clone(b))} saveBudget={e => console.log("SAVE")} />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
        </>
    );
}
