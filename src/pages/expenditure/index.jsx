// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import TopCategories from './TopCategories';
import SpendingCard from './SpendingCard';
import RecentTransactionsTable from './RecentTransactionsTable';

// assets
import FileUpload from 'components/FileUpload';
import {Link} from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function ExpenditureDashboard() {
  return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} md={7} lg={8}>
          <SpendingCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Typography variant="h5">Top categories</Typography>
          <MainCard sx={{ mt: 2 }} content={false}>
            <TopCategories />
          </MainCard>
        </Grid>

        {/* row 2 */}
        <Grid item xs={12} md={10} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Transactions</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <RecentTransactionsTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Import Transactions</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }}
            title="Upload CSV"
            secondary={
              <Link color="primary" href="/">Download CSV Template</Link>
            }
          >
            <Stack spacing={3}>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Import transactions from a CSV file.
              </Typography>

              <FileUpload />
            </Stack>
          </MainCard>
        </Grid>

      </Grid>
  );
}
