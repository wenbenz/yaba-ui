// assets
import { DashboardOutlined, PieChartOutlined, DollarOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'budget',
      title: 'Budget',
      type: 'item',
      url: '/budget',
      icon: PieChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'expenditure',
      title: 'Expenditure',
      type: 'item',
      url: '/expenditure',
      icon: DollarOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
