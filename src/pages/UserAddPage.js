import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// @mui
import {
	Card,
	Stack,
	Paper,
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

export default function UserAddPage() {
	const [empID, setEmpID] = useState("");
	const [role, setRole] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [departmentID, setDepartmentID] = useState(null);
	const [departments, setDepartments] = useState([]);

	const [usrnameConflictError, setUsrnameConflictError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		getDepartments();
	}, []);

	const getDepartments = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/department/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setDepartments(res.data);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUsrnameConflictError(false);
		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
		} else {
			axios
				.post(process.env.REACT_APP_BACKEND_URL + "/api/user/", {
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
					// console.log(res);
					navigate("/dashboard/user/", {
						state: {
							showToast: true,
							toastMessage: "User created successfully!",
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
				<title> Add User | Jupiter HRM </title>
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
								Add New User
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
											required
											id="department"
											select
											label="Department"
											sx={{ width: "25ch" }}
											value={departmentID}
											onChange={(e) => {
												setDepartmentID(e.target.value);
											}}
										>
											{departments.map((department) => (
												<MenuItem
													key={department.dept_id}
													value={department.dept_id}
												>
													{department.dept_name}
												</MenuItem>
											))}
										</TextField>

										<TextField
											required
											id="emp_id"
											select
											label="Employee"
											sx={{ width: "50ch" }}
											value={empID}
											onChange={(e) => {
												setEmpID(e.target.value);
											}}
										>
											<MenuItem key="00001" value="00001">
												00001 - John Doe
											</MenuItem>
											<MenuItem key="00002" value="00002">
												00002 - Tim Allen
											</MenuItem>
											<MenuItem key="00003" value="00003">
												00003 - Paul Blake
											</MenuItem>
										</TextField>
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
									Create User
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
