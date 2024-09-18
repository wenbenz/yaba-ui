import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import BudgetDashboard from "../pages/budget";
import ExpenditureDashboard from "../pages/expenditure";

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'budget',
      element: <BudgetDashboard />
    },
    {
      path: 'expenditure',
      element: <ExpenditureDashboard />
    }
  ]
};

export default MainRoutes;
