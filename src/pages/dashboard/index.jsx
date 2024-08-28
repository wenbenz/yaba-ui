// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import SpendingCard from './SpendingCard';
import SaleReportCard from './SaleReportCard';
import RecentTransactionsTable from './RecentTransactionsTable';

// apollo client
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery} from '@apollo/client';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import FileUpload from 'components/FileUpload';
import { Link } from '@mui/material';
import {AGGREGATE_EXPENDITURES} from "../../api/queries";
import {dateString} from "../../utils/dates";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

const client = new ApolloClient({
  uri: 'http://localhost:9222/graphql',
  cache: new InMemoryCache(),
})

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <ApolloProvider client={client}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} md={7} lg={8}>
          <SpendingCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Typography variant="h5">Top 10 categories</Typography>
          <MainCard sx={{ mt: 2 }} content={false}>
            <MonthlyBarChart />
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
    </ApolloProvider>
  );
}
