// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";
import RecentTransactionsTable from "./RecentTransactionsTable";

// assets
import {DateRangeProvider, useDateRange} from "../../components/DateRangeProvider";
import {BudgetProvider} from "../budget/BudgetContext";
import Button from "@mui/material/Button";
import {PlusCircleFilled} from "@ant-design/icons";
import {useState} from "react";
import AddTransactionDialog from "./UploadTransactions";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangeSelector = () => {
  const {startDate, endDate, setStartDate, setEndDate} = useDateRange()
  return (<Grid item xs={12} md={8} lg={6}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Typography variant={"subtitle1"}>Date range</Typography>
        <DatePicker label={"Since"} value={dayjs(startDate)} onChange={date => setStartDate(date.toDate())}/>
        <DatePicker label={"Until"} value={dayjs(endDate)} onChange={date => setEndDate(date.toDate())}/>
      </Stack>
    </LocalizationProvider>
  </Grid>)
}

export default function ExpenditureDashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
      <DateRangeProvider>
        <BudgetProvider>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <DateRangeSelector />
            {/* row 2 */}
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Recent Transactions</Typography>
                </Grid>
                <Grid item>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenDialog(true)}
                      mt={2}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PlusCircleFilled />
                      <Typography>
                        Add new transactions
                      </Typography>
                    </Stack>
                  </Button>
                  <AddTransactionDialog
                      open={openDialog}
                      onClose={() => setOpenDialog(false)}
                  />
                </Grid>
              </Grid>
              <MainCard sx={{mt: 2}} content={false}>
                <RecentTransactionsTable/>
              </MainCard>
            </Grid>
          </Grid>
        </BudgetProvider>
      </DateRangeProvider>
  );
}
