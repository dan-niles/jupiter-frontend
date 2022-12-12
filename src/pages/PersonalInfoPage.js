import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ----------------------------------------------------------------------

export default function PersonalInfo() {
	const [value, setValue] = useState(null);

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
						Employees
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard"
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

						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="emp_id"
										label="Employee ID"
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="full_name"
										label="Full Name"
										sx={{ width: "50ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="first_name"
										label="First Name"
										sx={{ width: "24ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
									<TextField
										id="last_name"
										label="Last Name"
										sx={{ width: "24ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
								</Stack>
								<Stack direction="row" spacing={3} sx={{ mb: 2 }}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label="Birthdate"
											value={value}
											onChange={(newValue) => {
												setValue(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
											InputProps={{
												readOnly: true,
											}}
										/>
									</LocalizationProvider>
									<TextField
										id="email"
										label="Email"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="nic"
										label="NIC"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={name}
										// onChange={handleChange}
									/>
									<TextField
										id="marital_status"
										select
										label="Marital Status"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="Single" value="Single">
											Single
										</MenuItem>
										<MenuItem key="Married" value="Married">
											Married
										</MenuItem>
									</TextField>
								</Stack>
							</Grid>
							<Grid item xs={6}>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="title"
										select
										label="Title"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="Software Engineer" value="Software Engineer">
											Software Engineer
										</MenuItem>
									</TextField>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="department"
										select
										label="Department"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="ICT" value="ICT">
											ICT
										</MenuItem>
									</TextField>

									<TextField
										id="paygrade"
										select
										label="Paygrade"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="Level 1" value="Level 1">
											Level 1
										</MenuItem>
										<MenuItem key="Level 2" value="Level 2">
											Level 2
										</MenuItem>
									</TextField>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="status"
										select
										label="Status"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="Fulltime" value="Fulltime">
											Full-time
										</MenuItem>
									</TextField>

									<TextField
										id="contract"
										select
										label="Contract"
										sx={{ width: "25ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="Fulltime" value="Fulltime">
											Full-time
										</MenuItem>
									</TextField>
								</Stack>
								<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
									<TextField
										id="supervisor_id"
										select
										label="Supervisor"
										sx={{ width: "30ch" }}
										InputProps={{
											readOnly: true,
										}}
										// value={currency}
										// onChange={handleChange}
									>
										<MenuItem key="John Doe" value="John Doe">
											John Doe
										</MenuItem>
									</TextField>
								</Stack>
							</Grid>
						</Grid>
					</Box>
					<Scrollbar></Scrollbar>
				</Card>
			</Container>
		</>
	);
}
