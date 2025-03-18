import { useState } from "react";

// material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project import
import MainCard from "components/MainCard";
import SpendingChart from "./SpendingChart";
import {useDateRange} from "../../components/DateRangeProvider";

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function SpendingCard() {
  const [slot, setSlot] = useState("month");
  const { startDate, endDate } = useDateRange();

  console.log(startDate, endDate)

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Your Spending</Typography>
        </Grid>
        {/*<Grid item>*/}
        {/*  <Stack direction="row" alignItems="center" spacing={0}>*/}
        {/*    <Button*/}
        {/*      size="small"*/}
        {/*      onClick={() => setSlot("month")}*/}
        {/*      color={slot === "month" ? "primary" : "secondary"}*/}
        {/*      variant={slot === "month" ? "outlined" : "text"}*/}
        {/*    >*/}
        {/*      Month*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      size="small"*/}
        {/*      onClick={() => setSlot("year")}*/}
        {/*      color={slot === "year" ? "primary" : "secondary"}*/}
        {/*      variant={slot === "year" ? "outlined" : "text"}*/}
        {/*    >*/}
        {/*      Year*/}
        {/*    </Button>*/}
        {/*  </Stack>*/}
        {/*</Grid>*/}
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <SpendingChart slot={slot} />
        </Box>
      </MainCard>
    </>
  );
}
