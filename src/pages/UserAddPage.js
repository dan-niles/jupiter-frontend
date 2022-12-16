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

export default function UserAddPage() {
	const [value, setValue] = useState(null);

	return (
		<>
			<Helmet>
				<title> Add User | Jupiter HRM </title>
			</Helmet>

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
						<form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="role"
											select
											label="User Role"
											sx={{ width: "25ch" }}
											// value={currency}
											// onChange={handleChange}
										>
											<MenuItem key="admin" value="admin">
												Administrator
											</MenuItem>
											<MenuItem key="manager" value="manager">
												Manager
											</MenuItem>
											<MenuItem key="user" value="user">
												User
											</MenuItem>
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
										<TextField
											id="department"
											select
											label="Department"
											sx={{ width: "25ch" }}
											// value={currency}
											// onChange={handleChange}
										>
											<MenuItem key="ICT" value="ICT">
												ICT
											</MenuItem>
											<MenuItem key="HR" value="HR">
												HR
											</MenuItem>
										</TextField>

										<TextField
											id="emp_id"
											select
											label="Employee"
											sx={{ width: "50ch" }}
											// value={currency}
											// onChange={handleChange}
										>
											<MenuItem key="admin" value="admin">
												00001 - John Doe
											</MenuItem>
											<MenuItem key="manager" value="manager">
												00002 - Tim Allen
											</MenuItem>
											<MenuItem key="user" value="user">
												00003 - Paul Blake
											</MenuItem>
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="username"
											label="Username"
											sx={{ width: "25ch" }}
											// value={name}
											// onChange={handleChange}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="password"
											label="Pasword"
											sx={{ width: "25ch" }}
											type="password"
											// value={name}
											// onChange={handleChange}
										/>
										<TextField
											required
											id="confirm_password"
											label="Confirm Pasword"
											sx={{ width: "25ch" }}
											type="password"
											// value={name}
											// onChange={handleChange}
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
