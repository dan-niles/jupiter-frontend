import { Helmet } from "react-helmet-async";
// @mui
import {
	Card,
	Stack,
	Container,
	Typography,
	TextField,
	MenuItem,
	Grid,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import { Box } from "@mui/system";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ApiGetEmployeeById } from "../services/employeeService";

import { useAuth } from "../context/auth-context";
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function PersonalInfoPage() {
	const { user } = useAuth();
	const [employee, setEmployee] = useState({});
	const [customAttributeData, setCustomAttributeData] = useState({});
	const [customAttributes, setCustomAttributes] = useState([]);

	useEffect(() => {
		getEmployee();
		getCustomAttributes();
	}, []);

	const getEmployee = () => {
		ApiGetEmployeeById(user.emp_id).then((res) => {
			setEmployee(res.data[0]);
		});
	};

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
			});
	};

	useEffect(() => {
		customAttributes.forEach((row) => {
			setCustomAttributeData((prev) => {
				return {
					...prev,
					[row.attr_name]: employee[row.attr_name],
				};
			});
		});
	}, [customAttributes]);

	return (
		<>
			<Helmet>
				<title> Employee Info | Jupiter HRM </title>
			</Helmet>

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
								Personal Info
							</Typography>
						</Stack>
						<form>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="emp_id"
											label="Employee ID"
											value={user.emp_id}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="full_name"
											label="Full Name"
											sx={{ width: "50ch" }}
											value={user.full_name}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="first_name"
											label="First Name"
											sx={{ width: "24ch" }}
											value={user.first_name}
										/>
										<TextField
											inputProps={{ readOnly: true }}
											id="last_name"
											label="Last Name"
											sx={{ width: "24ch" }}
											value={user.last_name}
										/>
									</Stack>
									<Stack direction="row" spacing={3} sx={{ mb: 2 }}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												inputProps={{ readOnly: true }}
												inputFormat="dd/MM/yyyy"
												label="Birthdate"
												value={user.birthdate}
												onChange={() => {}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											inputProps={{ readOnly: true }}
											id="email"
											label="Email"
											sx={{ width: "25ch" }}
											value={user.email}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="nic"
											label="NIC"
											sx={{ width: "25ch" }}
											value={user.nic}
										/>
										<TextField
											inputProps={{ readOnly: true }}
											id="marital_status"
											select
											label="Marital Status"
											sx={{ width: "25ch" }}
											value={user.marital_status}
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
											inputProps={{ readOnly: true }}
											id="title"
											label="Title"
											sx={{ width: "25ch" }}
											value={user.job_title}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="department"
											label="Department"
											sx={{ width: "25ch" }}
											value={user.dept_name}
										/>

										<TextField
											id="paygrade"
											label="Paygrade"
											sx={{ width: "25ch" }}
											inputProps={{ readOnly: true }}
											value={user.paygrade}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="status"
											label="Status"
											sx={{ width: "25ch" }}
											value={user.status_type}
										/>

										<TextField
											inputProps={{ readOnly: true }}
											id="contract"
											label="Contract"
											sx={{ width: "25ch" }}
											value={user.contract_type}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											inputProps={{ readOnly: true }}
											id="supervisor_id"
											label="Supervisor"
											sx={{ width: "30ch" }}
											value={user.supervisor || ""}
										/>
									</Stack>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack
										direction="row"
										spacing={2}
										sx={{ mb: 4 }}
										flexWrap="wrap"
									>
										{customAttributes.map((row) => {
											return (
												<TextField
													type={row.data_type === "INT" ? "number" : "text"}
													inputProps={{ readOnly: true }}
													key={row.attr_name}
													id={row.attr_name}
													label={row.alias}
													sx={{ width: "25ch", mb: 1 }}
													value={customAttributeData[row.attr_name]}
												/>
											);
										})}
									</Stack>
								</Grid>
							</Grid>
						</form>
					</Box>
					<Scrollbar></Scrollbar>
				</Card>
			</Container>
		</>
	);
}
