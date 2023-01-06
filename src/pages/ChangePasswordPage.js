import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// @mui
import {
	Card,
	Stack,
	Button,
	Container,
	Typography,
	TextField,
	Grid,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import { Box } from "@mui/system";

import { useContext } from "react";
import UserContext from "../context/user-context";

const accessToken = sessionStorage.getItem("access-token");

// ----------------------------------------------------------------------

export default function ChangePasswordPage() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [oldPasswordError, setOldPasswordError] = useState(false);

	const userContext = useContext(UserContext);
	const user_id = userContext.userData.user_id;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match!");
		} else {
			axios
				.put(
					process.env.REACT_APP_BACKEND_URL +
						"/api/user/change-password/" +
						user_id,
					{
						headers: {
							"access-token": `${accessToken}`,
						},
						data: {
							user_id: user_id,
							old_password: oldPassword,
							new_password: newPassword,
						},
					}
				)
				.then((res) => {
					setOldPassword("");
					setNewPassword("");
					setConfirmPassword("");
					toast.success("Changed password successfully!");
				})
				.catch((err) => {
					if (err.response.data.message === "INVALID_CURR_PW") {
						setOldPasswordError(true);
						toast.error("Current Password is Invalid!");
					} else {
						toast.error("Something went wrong!");
					}
				});
		}
	};

	return (
		<>
			<Helmet>
				<title> Change Password | Jupiter HRM </title>
			</Helmet>

			<Toaster position="top-right" reverseOrder={true} />

			<Container>
				<Card>
					<Box
						sx={{
							p: 2,
							m: 2,
						}}
						noValidate
						autoComplete="off"
					>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							mb={3}
						>
							<Typography variant="h4" gutterBottom>
								Change Password
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="current_password"
											label="Current Password"
											sx={{ width: "50ch" }}
											type="password"
											helperText={
												oldPasswordError ? "Current password is invalid" : ""
											}
											error={oldPasswordError}
											value={oldPassword}
											onChange={(e) => {
												setOldPassword(e.target.value);
												setOldPasswordError(false);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="new_password"
											label="New Password"
											sx={{ width: "50ch" }}
											type="password"
											value={newPassword}
											onChange={(e) => {
												setNewPassword(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											error={newPassword !== confirmPassword}
											helperText={
												newPassword !== confirmPassword
													? "Passwords do not match"
													: ""
											}
											id="confirm_password"
											label="Confirm New Password"
											sx={{ width: "50ch" }}
											type="password"
											value={confirmPassword}
											onChange={(e) => {
												setConfirmPassword(e.target.value);
											}}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="start" sx={{ mt: 2 }}>
								<Button type="submit" variant="contained">
									Submit
								</Button>
							</Stack>
						</form>
					</Box>
					<Scrollbar></Scrollbar>
				</Card>
			</Container>
		</>
	);
}
