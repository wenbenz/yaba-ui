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
import ManageBudget from "./ManageBudget";
import LinearProgress from "@mui/material/LinearProgress";
import {AlertTitle} from "@mui/material";
import {Alert} from "@mui/lab";
import {QuestionCircleFilled} from "@ant-design/icons";
import CreateBudget from "./CreateBudget";
import Loader from "../../components/Loader";

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
    const [budget, setBudget] = useState(templateBudget)

    const {loading, data, error} = useBudgets(1)
    const hasBudget = data && data.budgets && data.budgets.length > 0

    if (loading) {
        return (<Loader />)
    }

    if (error) {
        return (<Typography variant="h5">An unexpected error has occurred.</Typography>)
    }

    return (
        <>
        <Typography variant="h5">Budget</Typography>
            {!hasBudget && <CreateBudget budget={budget} />}
            <ManageBudget budget={budget} setBudget={setBudget} saveBudget={e => {console.log("SAVE", budget)}} />
        </>
    );
}
