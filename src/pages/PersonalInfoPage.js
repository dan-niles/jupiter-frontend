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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import { useAuth } from "../context/auth-context";

// ----------------------------------------------------------------------

export default function PersonalInfoPage() {

	const { user } = useAuth()

	return (
		<>
			<Helmet>
				<title> Employee Info | Jupiter HRM </title>
			</Helmet>

			<Container>
				{/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Employee
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
				</Stack> */}

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

							{/* <Stack alignItems="end">
								<Button type="submit" variant="contained">
									Edit Employee
								</Button>
							</Stack> */}
						</form>
					</Box>
					<Scrollbar></Scrollbar>
				</Card>
			</Container>
		</>
	);
}
