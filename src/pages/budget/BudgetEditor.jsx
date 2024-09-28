import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {Fab, Switch} from "@mui/material";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useMemo, useState} from "react";

function Income({budget, setBudget, index}) {
    const [errorMessage, setErrorMessage] = useState('')

    const income = budget.incomes[index];

    let changeSource = e => {
        if (budget.incomes
            .map(i => i.source)
            .filter((_, i) => i !== index)
            .includes(e.target.value)) {
            setErrorMessage("Source already exists.")
        } else {
            income.source = e.target.value
            setErrorMessage('')
            setBudget(budget)
        }
    }

    let changeAmount = e => {
        income.amount = parseFloat(e.target.value)
        setBudget(budget)
    }

    return (
        <Grid2 container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid2 xs={5}>
                <TextField id={"income-source-" + index}
                           label="Source"
                           variant="standard"
                           defaultValue={income.source}
                           fullWidth={true}
                           onChange={changeSource}
                           error={errorMessage !== ''}
                           helperText={errorMessage}
                />
            </Grid2>

            <Grid2 xs={6}>
                <TextField id={"income-amount-" + index}
                           label="Amount"
                           variant="standard"
                           defaultValue={income.amount}
                           fullWidth={true}
                           onChange={changeAmount}/>
            </Grid2>

            <Grid2 sx={{ justifyContent: 'flex-end' }} xs={1}>
                <Fab color="secondary" aria-label="remove" size="small" onClick={() => {
                    budget.incomes.splice(index, 1)
                    setBudget(budget)
                }}>
                    <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                </Fab>
            </Grid2>
        </Grid2>
    )
}

function Expense({budget, setBudget, index}) {
    const [errorMessage, setErrorMessage] = useState('')

    const expense = budget.expenses[index];

    let changeCategory = e => {
        if (budget.expenses
            .map(e => e.category)
            .filter((_, i) => i !== index)
            .includes(e.target.value)) {
            setErrorMessage("Category already exists.")
        } else {
            setErrorMessage('')
            expense.category = e.target.value
            setBudget(budget)
        }
    }

    let changeAmount = e => {
        expense.amount = parseFloat(e.target.value)
        setBudget(budget)
    }

    let toggleFixed = e => {
        expense.isFixed = e.target.checked
        setBudget(budget)
        console.log(budget, e)
    }

    return (
        <Grid2 container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid2 xs={4}>
                <TextField id={"expense-category-" + index}
                           label="Category"
                           variant="standard"
                           defaultValue={expense.category}
                           fullWidth={true}
                           onChange={changeCategory}
                           error={errorMessage !== ''}
                           helperText={errorMessage}
                />
            </Grid2>

            <Grid2 xs={5}>
                <TextField id={"expense-amount-" + index}
                           label="Amount"
                           variant="standard"
                           defaultValue={expense.amount}
                           fullWidth={true}
                           onChange={changeAmount}/>
            </Grid2>

            <Grid2 xs={2}>
                <FormControlLabel id={"expense-fixed-" + index}
                                  control={<Switch checked={expense.isFixed} />}
                                  label="Fixed"
                                  onChange={toggleFixed}/>
            </Grid2>

            <Grid2 sx={{ justifyContent: 'flex-end' }} xs={1}>
                <Fab color="secondary" aria-label="remove" size="small" onClick={() => {
                    budget.expenses.splice(index, 1)
                    setBudget(budget)
                }}>
                    <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                </Fab>
            </Grid2>
        </Grid2>
    )
}

export default function BudgetEditor({budget, setBudget, saveBudget}) {
    let totalIncome = budget.incomes.reduce((a, b) => a + b.amount, 0)
    let totalExpenses = budget.expenses.reduce((a, b) => a + b.amount, 0)

    useMemo(() => {
        totalIncome = budget.incomes.reduce((a, b) => a + b.amount, 0)
        totalExpenses = budget.expenses.reduce((a, b) => a + b.amount, 0)
    }, [budget])

    return (
        <Stack spacing={5}>
            {/*Name*/}
            <TextField id="budgetName" label="Budget Name"  variant="standard" fullWidth={true} defaultValue={budget.name} />

            {/*Incomes*/}
            <Grid2>
                <Typography variant="subtitle1">Incomes</Typography>
                <Stack spacing={2}>
                    {
                        budget.incomes.map((_, index) =>
                            <Income key={index} budget={budget} setBudget={setBudget} index={index} />)
                    }

                    <Grid2>
                        <Fab color="primary" aria-label="add" size="small" onClick={() => {
                            budget.incomes.push({source: '', amount: 0})
                            setBudget(budget)
                        }}>
                            <PlusOutlined style={{ fontSize: '1.3rem' }} />
                        </Fab>
                    </Grid2>
                </Stack>
            </Grid2>

            {/*Income total*/}
            <Stack spacing={4} direction="row">
                <Typography variant="subtitle2">Total Income: </Typography>
                <Typography variant="subtitle1" color="primary">${totalIncome}</Typography>
            </Stack>

            {/*Expenses*/}
            <Grid2>
                <Typography variant="subtitle1">Expenses</Typography>
                <Stack spacing={2}>
                    {
                        budget.expenses.map((_, index) =>
                            <Expense key={index} budget={budget} setBudget={setBudget} index={index} />)
                    }

                    <Grid2>
                        <Fab color="primary" aria-label="add" size="small" onClick={() => {
                            budget.expenses.push({category: '', amount: 0, isFixed: false})
                            setBudget(budget)
                        }}>
                            <PlusOutlined style={{ fontSize: '1.3rem' }} />
                        </Fab>
                    </Grid2>
                </Stack>
            </Grid2>

            {/*Total Expenses*/}
            <Stack spacing={4} direction="row">
                <Typography variant="subtitle2">Total Expenses: </Typography>
                <Typography variant="subtitle1" color="primary">${totalExpenses}</Typography>
            </Stack>

            {/*Total Expenses*/}
            <Stack spacing={4} direction="row">
                <Typography variant="subtitle2">Extra: </Typography>
                <Typography variant="subtitle1" color={totalIncome >= totalExpenses ? "primary" : "error"}>${totalIncome - totalExpenses}</Typography>
            </Stack>

            <Button variant="contained" onClick={saveBudget}>Save</Button>
        </Stack>
    )
}