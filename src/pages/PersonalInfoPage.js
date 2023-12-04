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
	const [dependants, setDependants] = useState({
		1: {
			dep_id: null,
			name: "",
			relationship: "",
			birthdate: null,
		},
		2: {
			dep_id: null,
			name: "",
			relationship: "",
			birthdate: null,
		},
	});
	const [emergencyContacts, setEmergencyContacts] = useState({
		1: {
			emergency_contact_id: null,
			name: "",
			phone: "",
			address: "",
		},
		2: {
			emergency_contact_id: null,
			name: "",
			phone: "",
			address: "",
		},
	});

	useEffect(() => {
		getEmployee();
		getCustomAttributes();
		getDependants();
		getEmergencyContacts();
	}, []);

	const getEmployee = () => {
		ApiGetEmployeeById(user.emp_id).then((res) => {
			setEmployee(res.data[0]);
		});
	};

	const getCustomAttributes = () => {
		axios
			.get(window.configs.backendUrl + "/api/custom_attributes/", {
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

	const getDependants = () => {
		axios
			.get(
				window.configs.backendUrl + "/api/dependant/" + user.emp_id,
				{
					headers: {
						"access-token": `${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				res.data.forEach((row, idx) => {
					setDependants((prev) => {
						return {
							...prev,
							[idx + 1]: {
								dep_id: row.dep_id,
								name: row.dep_name,
								relationship: row.relationship_to_emp,
								birthdate: new Date(row.dep_birthdate),
							},
						};
					});
				});
			});
	};

	const getEmergencyContacts = () => {
		axios
			.get(
				window.configs.backendUrl +
				"/api/emergency-contact/" +
				user.emp_id,
				{
					headers: {
						"access-token": `${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				res.data.forEach((row, idx) => {
					setEmergencyContacts((prev) => {
						return {
							...prev,
							[idx + 1]: {
								emergency_contact_id: row.emergency_contact_id,
								name: row.contact_name,
								phone: row.phone_no,
								address: row.address,
							},
						};
					});
				});
			});
	};

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
												onChange={() => { }}
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
										// sx={{ mb: 4 }}
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

							<Grid container spacing={2}>
								<Grid item xs={12}>
									<h4 style={{ marginBottom: "1em" }}>Dependant Details</h4>
									<Stack direction="row" spacing={2}>
										<TextField
											id="dep_name_1"
											label="Dependant Name"
											sx={{ width: "24ch" }}
											value={dependants[1].name}
											onChange={(e) => {
												setDependants((prev) => {
													return {
														...prev,
														[1]: {
															...prev[1],
															name: e.target.value,
														},
													};
												});
											}}
										/>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												required
												id="dep_birthdate_1"
												inputFormat="dd/MM/yyyy"
												label="Dependant Birthdate"
												value={dependants[1].birthdate}
												onChange={(e) => {
													setDependants((prev) => {
														return {
															...prev,
															[1]: {
																...prev[1],
																birthdate: e,
															},
														};
													});
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											id="dep_relation_2"
											label="Relationship to Employee"
											sx={{ width: "24ch" }}
											value={dependants[1].relationship}
											onChange={(e) => {
												setDependants((prev) => {
													return {
														...prev,
														[1]: {
															...prev[1],
															relationship: e.target.value,
														},
													};
												});
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
										<TextField
											id="dep_name_2"
											label="Dependant Name"
											sx={{ width: "24ch" }}
											value={dependants[2].name}
											onChange={(e) => {
												setDependants((prev) => {
													return {
														...prev,
														[2]: {
															...prev[2],
															name: e.target.value,
														},
													};
												});
											}}
										/>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												required
												id="dep_birthdate_2"
												inputFormat="dd/MM/yyyy"
												label="Dependant Birthdate"
												value={dependants[2].birthdate}
												onChange={(e) => {
													setDependants((prev) => {
														return {
															...prev,
															[2]: {
																...prev[2],
																birthdate: e,
															},
														};
													});
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											id="dep_relation_2"
											label="Relationship to Employee"
											sx={{ width: "24ch" }}
											value={dependants[2].relationship}
											onChange={(e) => {
												setDependants((prev) => {
													return {
														...prev,
														[2]: {
															...prev[2],
															relationship: e.target.value,
														},
													};
												});
											}}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Grid container spacing={2} sx={{ mb: 4 }}>
								<Grid item xs={12}>
									<h4 style={{ marginBottom: "1em" }}>
										Emergency Contact Details
									</h4>
									<Stack direction="row" spacing={2}>
										<TextField
											id="contact_name_1"
											label="Contact Name"
											sx={{ width: "24ch" }}
											value={emergencyContacts[1].name}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[1]: {
															...prev[1],
															name: e.target.value,
														},
													};
												});
											}}
										/>
										<TextField
											id="contact_phone_1"
											label="Phone No."
											type="number"
											sx={{ width: "24ch" }}
											value={emergencyContacts[1].phone}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[1]: {
															...prev[1],
															phone: e.target.value,
														},
													};
												});
											}}
										/>
										<TextField
											id="contact_address_1"
											label="Address"
											sx={{ width: "34ch" }}
											value={emergencyContacts[1].address}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[1]: {
															...prev[1],
															address: e.target.value,
														},
													};
												});
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
										<TextField
											id="contact_name_2"
											label="Contact Name"
											sx={{ width: "24ch" }}
											value={emergencyContacts[2].name}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[2]: {
															...prev[2],
															name: e.target.value,
														},
													};
												});
											}}
										/>
										<TextField
											id="contact_phone_2"
											label="Phone No."
											type="number"
											sx={{ width: "24ch" }}
											value={emergencyContacts[2].phone}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[2]: {
															...prev[2],
															phone: e.target.value,
														},
													};
												});
											}}
										/>
										<TextField
											id="contact_address_2"
											label="Address"
											sx={{ width: "34ch" }}
											value={emergencyContacts[2].address}
											onChange={(e) => {
												setEmergencyContacts((prev) => {
													return {
														...prev,
														[2]: {
															...prev[2],
															address: e.target.value,
														},
													};
												});
											}}
										/>
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
