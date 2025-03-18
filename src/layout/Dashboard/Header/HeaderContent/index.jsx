// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";

// project import
import Profile from "./Profile";
import MobileSection from "./MobileSection";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateRangeProvider} from "../../../../components/DateRangeProvider";

// project import

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      {/*{!downLG && <Search />}*/}
      {/*{downLG && <Box sx={{ width: '100%', ml: 1 }} />}*/}
      {/*<IconButton*/}
      {/*  component={Link}*/}
      {/*  href="https://github.com/codedthemes/mantis-free-react-admin-template"*/}
      {/*  target="_blank"*/}
      {/*  disableRipple*/}
      {/*  color="secondary"*/}
      {/*  title="Download Free Version"*/}
      {/*  sx={{ color: 'text.primary', bgcolor: 'grey.100' }}*/}
      {/*>*/}
      {/*  <GithubOutlined />*/}
      {/*</IconButton>*/}

      {/*<Notification />*/}
      {/*{!downLG && <Profile />}*/}
      {/*{downLG && <MobileSection />}*/}
      {/*  <DateRangeProvider>*/}
      {/*      Blah*/}
      {/*  </DateRangeProvider>*/}
    </>
  );
}
