import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import Dashboard from "layout/Dashboard";
import CreditCards from "../pages/creditcards";

const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/index")));
const BudgetDashboard = Loadable(lazy(() => import("pages/budget/index")));
const ExpenditureDashboard = Loadable(
  lazy(() => import("pages/expenditure/index")),
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Dashboard />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "budget",
      element: <BudgetDashboard />,
    },
    {
      path: "expenditure",
      element: <ExpenditureDashboard />,
    },
    // {
    //   path: "creditcards",
    //   element: <CreditCards />,
    // },
  ],
};

export default MainRoutes;
