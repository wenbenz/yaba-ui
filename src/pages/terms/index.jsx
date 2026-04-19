import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

import Logo from "components/logo";

export default function TermsOfService() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Logo />
        </Box>

        <Typography variant="h2" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last updated: April 2026
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          1. About Yaba
        </Typography>
        <Typography variant="body1" paragraph>
          Yaba is a self-hosted personal finance tool for tracking budgets,
          transactions, and payment methods. You run Yaba on your own
          infrastructure — Anthropic has no access to your data or your
          instance.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Your Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          You are responsible for maintaining your own server, keeping your
          software up to date, and securing access to your instance. Do not
          share your credentials with others.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Acceptable Use
        </Typography>
        <Typography variant="body1" paragraph>
          Yaba is intended for personal finance management. Use it to track
          your own finances. Do not use it to process data you are not
          authorized to handle.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Changes to These Terms
        </Typography>
        <Typography variant="body1" paragraph>
          These terms may be updated from time to time. Continued use of Yaba
          after changes constitutes acceptance of the updated terms.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary">
          Questions?{" "}
          <Link component={RouterLink} to="/privacy">
            Read our Privacy Policy
          </Link>
          .
        </Typography>
      </Container>
    </Box>
  );
}
