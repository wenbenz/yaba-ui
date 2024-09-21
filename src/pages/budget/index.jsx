// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from "../../components/MainCard";
import MonthlyBarChart from "../dashboard/MonthlyBarChart";
import Box from "@mui/material/Box";
import BudgetPieChart from "./BudgetPieChart";

// project import

// assets

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function BudgetDashboard() {
    return (
        <>
        <Typography variant="h5">Budget</Typography>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={8}>
                <MainCard content={false} sx={{ mt: 2 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <BudgetPieChart />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <MonthlyBarChart />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
        </>
    );
}
