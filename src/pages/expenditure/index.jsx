// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";
import TopCategories from "./TopCategories";
import SpendingCard from "./SpendingCard";
import RecentTransactionsTable from "./RecentTransactionsTable";

// assets
import FileUpload from "components/FileUpload";
import { Link } from "@mui/material";
import {DateRangeProvider} from "../../components/DateRangeProvider";
import {BudgetProvider} from "../budget/BudgetContext";
import Button from "@mui/material/Button";
import {PlusCircleFilled, PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import AddTransactionDialog from "./UploadTransactions";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function ExpenditureDashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
      <DateRangeProvider>
        <BudgetProvider>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} md={7} lg={8}>
              <SpendingCard/>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Typography variant="h5">Top categories</Typography>
              <MainCard sx={{mt: 2}} content={false}>
                <TopCategories/>
              </MainCard>
            </Grid>

            {/* row 2 */}
            <Grid item xs={12} md={10} lg={8}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Recent Transactions</Typography>
                </Grid>
                <Grid item/>
              </Grid>
              <MainCard sx={{mt: 2}} content={false}>
                <RecentTransactionsTable/>
              </MainCard>
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Add Transactions</Typography>
                </Grid>
                <Grid item/>
              </Grid>
              <MainCard
                  sx={{mt: 2}}
                  // title="New Transactions"
                  // secondary={
                  //   <Link color="primary" href="/">
                  //     Download CSV Template
                  //   </Link>
                  // }
              >
                {/*<Stack spacing={3}>*/}
                {/*  <Typography variant="caption" color="text.secondary" gutterBottom>*/}
                {/*    Import transactions from a CSV file.*/}
                {/*  </Typography>*/}

                {/*  <FileUpload/>*/}
                {/*</Stack>*/}
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
              </MainCard>
            </Grid>
          </Grid>
        </BudgetProvider>
      </DateRangeProvider>
  );
}
