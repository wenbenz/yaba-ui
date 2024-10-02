import { useState } from "react";

// material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project import
import MainCard from "components/MainCard";
import MonthlyBarChart from "./MonthlyBarChart";

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function SpendingCard() {
  const [slot, setSlot] = useState("last");

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Spending vs. Budget</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot("this")}
              color={slot === "this" ? "primary" : "secondary"}
              variant={slot === "this" ? "outlined" : "text"}
            >
              This Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot("last")}
              color={slot === "last" ? "primary" : "secondary"}
              variant={slot === "last" ? "outlined" : "text"}
            >
              Last Month
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <MonthlyBarChart slot={slot} />
        </Box>
      </MainCard>
    </>
  );
}
