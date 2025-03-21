// ==============================|| HEADER - CONTENT ||============================== //

import Profile from "./Profile";

export default function HeaderContent() {
  // const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
      <Profile />
      {/*{!downLG && <Profile />}*/}
      {/*{downLG && <MobileSection />}*/}
    </>
  );
}
