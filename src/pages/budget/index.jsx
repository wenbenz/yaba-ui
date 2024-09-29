// material-ui
import Typography from '@mui/material/Typography';
import {useBudgets, useUpdateBudget} from "../../api/graph";
import {useMemo, useState} from "react";
import {cloneDeep} from "lodash";
import ManageBudget from "./ManageBudget";
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
            category: "Miscellaneous",
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
    const [updateBudget, updateBudgetResponse] = useUpdateBudget(budget)
    const hasBudget = data && data.budgets && data.budgets.length > 0

    useMemo(() => data && setBudget(cloneDeep(data.budgets[0])), [data])

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
            <ManageBudget budget={budget} setBudget={setBudget} saveBudget={e => {
                updateBudget()
                if (updateBudgetResponse.error) {
                    console.log(error)
                }
            }} />
        </>
    );
}
