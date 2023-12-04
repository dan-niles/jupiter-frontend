import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useContext } from "react";
import UserContext from "../context/user-context";
import toast, { Toaster } from "react-hot-toast";

import { config } from "../config";

// @mui
import {
	Link,
	Stack,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import Iconify from "../components/iconify";
import { useAuth } from "../context/auth-context";

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
	padding: theme.spacing(12, 5, 15, 5),
}));

// ----------------------------------------------------------------------

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["access-token"] = `Bearer ${token}`;
	} else delete axios.defaults.headers.common["access-token"];
};

export default function LoginPage() {
	const navigate = useNavigate();
	const userContext = useContext(UserContext);

	const { login } = useAuth()

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const onFormSubmit = (e) => {
		e.preventDefault();

		console.log("loggin in")
		login(username, password)
			.then(res => {
				console.log(res.data)
				navigate("/dashboard", { replace: true });
			})
			.catch(err => console.log(err))

		const backendUrl = config.url.BASE_URL;
		const backendUrl2 = window.configs.backendUrl;

		axios
			.post(window.configs.backendUrl + "/api/login/", {
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.data.username === username) {
					delete response.data.password;
					sessionStorage.setItem("user-data", JSON.stringify(response.data));
					sessionStorage.setItem("access-token", response.data.token);
					// setAuthToken(response.data.token);
					userContext.setData(response.data);
					navigate("/dashboard", { replace: true });
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 404) {
					toast.error("Invalid credentials!");
				} else {
					toast.error("Something went wrong!");
				}
			});
	};

	return (
		<>
			<Helmet>
				<title> Login | Jupiter HRM </title>
			</Helmet>

			<Toaster position="top-right" reverseOrder={true} />

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

						<form onSubmit={onFormSubmit}>
							<Stack spacing={3}>
								<TextField
									name="username"
									label="Username"
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>

								<TextField
									name="password"
									label="Password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() => setShowPassword(!showPassword)}
													edge="end"
												>
													<Iconify
														icon={
															showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
														}
													/>
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Stack>

							<Stack
								direction="row"
								alignItems="flex-end"
								justifyContent="flex-end"
								sx={{ mt: 2, mb: 4 }}
							>
								<Link variant="subtitle2" underline="hover">
									Forgot password?
								</Link>
							</Stack>

							<LoadingButton
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								Login
							</LoadingButton>
						</form>
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	);
}
