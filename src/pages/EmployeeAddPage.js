import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
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
import { format } from "date-fns";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function EmployeeAddPage() {
	const [empID, setEmpID] = useState("");
	const [fullName, setFullName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [nic, setNIC] = useState("");
	const [birthdate, setBirthDate] = useState(null);
	const [paygradeID, setPaygradeID] = useState("");
	const [contractID, setContractID] = useState("");
	const [departmentID, setDepartmentID] = useState("");
	const [titleID, setTitleID] = useState("");
	const [statusID, setStatusID] = useState("");
	const [maritalStatus, setMaritalStatus] = useState("");
	const [supervisorID, setSupervisorID] = useState("");
	const [customAttributeData, setCustomAttributeData] = useState({});

	const [paygrades, setPaygrades] = useState([]);
	const [contracts, setContracts] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [titles, setTitles] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [supervisors, setSupervisors] = useState([]);
	const [customAttributes, setCustomAttributes] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getPaygrades();
		getContracts();
		getTitles();
		getStatuses();
		getDepartments();
		getSupervisors();
		getCustomAttributes();
	}, []);

	const getCustomAttributes = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/custom_attributes/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setCustomAttributes(res.data);
				customAttributes.forEach((row) => {
					setCustomAttributeData((prev) => {
						return {
							...prev,
							[row.attr_name]: "",
						};
					});
				});
			});
	};

	const getPaygrades = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/paygrade/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setPaygrades(res.data);
			});
	};

	const getContracts = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/contract/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setContracts(res.data);
			});
	};

	const getTitles = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/title/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setTitles(res.data);
			});
	};

	const getStatuses = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/status/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setStatuses(res.data);
			});
	};

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

	const getSupervisors = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/employee/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setSupervisors(res.data);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			emp_id: empID,
			full_name: fullName,
			first_name: firstName,
			last_name: lastName,
			email: email,
			nic: nic,
			birthdate: format(birthdate, "yyyy-MM-dd"),
			paygrade_id: paygradeID,
			contract_id: contractID,
			dept_id: departmentID,
			title_id: titleID,
			status_id: statusID,
			supervisor_id: supervisorID,
			marital_status: maritalStatus,
		};
		console.log(data);
		axios
			.post(process.env.REACT_APP_BACKEND_URL + "/api/employee/", data, {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				navigate("/dashboard/employee/", {
					state: {
						showToast: true,
						toastMessage: "Employee created successfully!",
					},
				});
			});
	};

	return (
		<>
			<Helmet>
				<title> Add Employee | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Employees
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/employee"
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
								Add New Employee
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="emp_id"
											label="Employee ID"
											value={empID}
											onChange={(e) => {
												setEmpID(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="full_name"
											label="Full Name"
											sx={{ width: "50ch" }}
											value={fullName}
											onChange={(e) => {
												setFullName(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="first_name"
											label="First Name"
											sx={{ width: "24ch" }}
											value={firstName}
											onChange={(e) => {
												setFirstName(e.target.value);
											}}
										/>
										<TextField
											required
											id="last_name"
											label="Last Name"
											sx={{ width: "24ch" }}
											value={lastName}
											onChange={(e) => {
												setLastName(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={3} sx={{ mb: 2 }}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												required
												inputFormat="dd/MM/yyyy"
												label="Birthdate"
												value={birthdate}
												onChange={(newValue) => {
													setBirthDate(newValue);
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											required
											id="email"
											label="Email"
											sx={{ width: "25ch" }}
											value={email}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="nic"
											label="NIC"
											sx={{ width: "25ch" }}
											value={nic}
											onChange={(e) => {
												setNIC(e.target.value);
											}}
										/>
										<TextField
											required
											id="marital_status"
											select
											label="Marital Status"
											sx={{ width: "25ch" }}
											value={maritalStatus}
											onChange={(e) => {
												setMaritalStatus(e.target.value);
											}}
										>
											<MenuItem key="single" value="single">
												Single
											</MenuItem>
											<MenuItem key="married" value="married">
												Married
											</MenuItem>
											<MenuItem key="widowed" value="widowed">
												Widowed
											</MenuItem>
											<MenuItem key="divorced" value="divorced">
												Divorced
											</MenuItem>
											<MenuItem key="seperated" value="seperated">
												Seperated
											</MenuItem>
										</TextField>
									</Stack>
								</Grid>
								<Grid item xs={6}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="title"
											select
											label="Title"
											sx={{ width: "25ch" }}
											value={titleID}
											onChange={(e) => {
												setTitleID(e.target.value);
											}}
										>
											{titles.map((title) => (
												<MenuItem key={title.title_id} value={title.title_id}>
													{title.job_title}
												</MenuItem>
											))}
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
											id="paygrade"
											select
											label="Paygrade"
											sx={{ width: "25ch" }}
											required
											value={paygradeID}
											onChange={(e) => {
												setPaygradeID(e.target.value);
											}}
										>
											{paygrades.map((row) => {
												return (
													<MenuItem
														key={row.paygrade_id}
														value={row.paygrade_id}
													>
														{row.level}
													</MenuItem>
												);
											})}
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="status"
											select
											label="Status"
											sx={{ width: "25ch" }}
											value={statusID}
											onChange={(e) => {
												setStatusID(e.target.value);
											}}
										>
											{statuses.map((row) => {
												return (
													<MenuItem key={row.status_id} value={row.status_id}>
														{row.type}
													</MenuItem>
												);
											})}
										</TextField>

										<TextField
											required
											id="contract"
											select
											label="Contract"
											sx={{ width: "25ch" }}
											value={contractID}
											onChange={(e) => {
												setContractID(e.target.value);
											}}
										>
											{contracts.map((row) => {
												return (
													<MenuItem
														key={row.contract_id}
														value={row.contract_id}
													>
														{row.type}
													</MenuItem>
												);
											})}
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="supervisor_id"
											select
											label="Supervisor"
											sx={{ width: "30ch" }}
											value={supervisorID}
											onChange={(e) => {
												setSupervisorID(e.target.value);
											}}
										>
											{supervisors.map((row) => {
												return (
													<MenuItem key={row.emp_id} value={row.emp_id}>
														{row.first_name + " " + row.last_name}
													</MenuItem>
												);
											})}
										</TextField>
									</Stack>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										{customAttributes.map((row) => {
											return (
												<TextField
													key={row.attr_name}
													id={row.attr_name}
													label={row.alias}
													sx={{ width: "25ch" }}
													value={customAttributeData[row.attr_name]}
													onChange={(e) => {
														console.log(customAttributeData);
														setCustomAttributeData((prev) => {
															return {
																...prev,
																[row.attr_name]: e.target.value,
															};
														});
													}}
												/>
											);
										})}
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end">
								<Button type="submit" variant="contained">
									Create Employee
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
