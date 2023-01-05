import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
	NavLink as RouterLink,
	useNavigate,
	useParams,
} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// @mui
import {
	Card,
	Stack,
	Button,
	Container,
	Typography,
	TextField,
	MenuItem,
	Grid,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { Box } from "@mui/system";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function UserEditPage() {
	const [user, setUser] = useState({});
	const { id } = useParams();

	const [empID, setEmpID] = useState("");
	const [empName, setEmpName] = useState("");
	const [role, setRole] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [usrnameConflictError, setUsrnameConflictError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (
			Object.keys(user).length != 0 &&
			user != undefined &&
			user != {} &&
			user != "" &&
			user != null
		) {
			setEmpID(user.emp_id);
			setEmpName(user.first_name + " " + user.last_name);
			setUsername(user.username);
			setRole(user.role);
		}
	}, [user]);

	const getUser = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/user/" + id, {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				// setEmpID(user.emp_id);
				// setEmpName(user.first_name + " " + user.last_name);
				// setUsername(user.username);
				// setRole(user.role);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUsrnameConflictError(false);
		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
		} else {
			axios
				.put(process.env.REACT_APP_BACKEND_URL + "/api/user/" + id, {
					headers: {
						"access-token": `${accessToken}`,
					},
					data: {
						emp_id: empID,
						role: role,
						username: username,
						password: password,
					},
				})
				.then((res) => {
					console.log(res);
					navigate("/dashboard/user/", {
						state: {
							showToast: true,
							toastMessage: "User edited successfully!",
						},
					});
				})
				.catch((err) => {
					if (err.response.status === 409) {
						setUsrnameConflictError(true);
						toast.error("Username already exists!");
					} else {
						toast.error("Error creating user!");
					}
				});
		}
	};

	return (
		<>
			<Helmet>
				<title> Edit User | Jupiter HRM </title>
			</Helmet>

			<Toaster position="top-right" reverseOrder={true} />

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Users
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/user"
					>
						Go Back
					</Button>
				</Stack>

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
								Edit User
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="role"
											select
											label="User Role"
											sx={{ width: "25ch" }}
											value={role}
											onChange={(e) => {
												setRole(e.target.value);
											}}
										>
											<MenuItem key="admin" value="admin">
												Administrator
											</MenuItem>
											<MenuItem key="manager" value="manager">
												HR-Manager
											</MenuItem>
											<MenuItem key="user" value="user">
												User
											</MenuItem>
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
										<TextField
											id="emp_id"
											label="Employee ID"
											sx={{ width: "25ch" }}
											type="text"
											value={empID}
											readOnly
										/>
										<TextField
											id="emp_name"
											label="Name"
											sx={{ width: "25ch" }}
											type="text"
											value={empName}
											readOnly
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											error={usrnameConflictError}
											helperText={
												usrnameConflictError ? "Username already exists" : ""
											}
											required
											id="username"
											label="Username"
											sx={{ width: "25ch" }}
											value={username}
											onChange={(e) => {
												setUsername(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="password"
											label="Pasword"
											sx={{ width: "25ch" }}
											type="password"
											value={password}
											onChange={(e) => {
												setPassword(e.target.value);
											}}
										/>
										<TextField
											error={password !== confirmPassword}
											helperText={
												password !== confirmPassword
													? "Passwords do not match"
													: ""
											}
											required
											id="confirm_password"
											label="Confirm Pasword"
											sx={{ width: "25ch" }}
											type="password"
											value={confirmPassword}
											onChange={(e) => {
												setConfirmPassword(e.target.value);
											}}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end">
								<Button type="submit" variant="contained">
									Edit User
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
