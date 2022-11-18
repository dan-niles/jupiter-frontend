import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
import { LoginForm } from "../sections/auth/login";

const StyledRoot = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("xs")]: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
	return (
		<>
			<Helmet>
				<title> Login | Jupiter HRM </title>
			</Helmet>

			<StyledRoot>
				<Container maxWidth="sm">
					<StyledContent>
						<Box
							sx={{
								justifyContent: "center",
								display: "flex",
								mb: 3,
							}}
						>
							<img
								src="/assets/images/logo-text-blue.png"
								alt="login"
								style={{ width: "13em", display: "flex" }}
							/>
						</Box>
						<Typography variant="h4" align="center">
							Sign in
						</Typography>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ mb: 5, fontWeight: 300 }}
							align="center"
						>
							Use your Jupiter Account
						</Typography>

						<LoginForm />
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	);
}
