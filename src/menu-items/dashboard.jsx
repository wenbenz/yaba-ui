// assets
import {
  DashboardOutlined,
  DollarOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  title: "My Finances",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "budget",
      title: "Budget",
      type: "item",
      url: "/budget",
      icon: PieChartOutlined,
      breadcrumbs: false,
    },
    {
      id: "expenditure",
      title: "Expenditure",
      type: "item",
      url: "/expenditure",
      icon: DollarOutlined,
      breadcrumbs: false,
    },
    // {
    //   id: "creditcards",
    //   title: "Credit Cards",
    //   type: "item",
    //   url: "/creditcards",
    //   icon: CreditCardOutlined,
    //   breadcrumbs: false,
    // },
  ],
};

export default dashboard;
