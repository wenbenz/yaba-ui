import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Typography variant="subtitle2" color="secondary" align="center">
        © {new Date().getFullYear()} Yaba
      </Typography>
    </Container>
  );
}
