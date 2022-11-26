import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["access-token"] = `Bearer ${token}`;
	} else delete axios.defaults.headers.common["access-token"];
};

export default function LoginForm() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const onFormSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8080/api/login/", {
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.data.username == username) {
					sessionStorage.setItem("access-token", response.data.token);
					setAuthToken(response.data.token);
					navigate("/dashboard", { replace: true });
				}
			})
			.catch((response) => {
				console.log(response);
			});
	};

	return (
		<>
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
											icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
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

				<LoadingButton fullWidth size="large" type="submit" variant="contained">
					Login
				</LoadingButton>
			</form>
		</>
	);
}
