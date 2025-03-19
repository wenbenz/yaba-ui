// material-ui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project import
import MainCard from "components/MainCard";
import SpendingChart from "./SpendingChart";
import {useDateRange} from "../../components/DateRangeProvider";

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function SpendingCard() {
  const { startDate, endDate } = useDateRange();

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Your Spending</Typography>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
            <SpendingChart startDate={startDate} endDate={endDate} />
        </Box>
      </MainCard>
    </>
  );
}
