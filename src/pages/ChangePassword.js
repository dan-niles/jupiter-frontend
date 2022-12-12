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

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// ----------------------------------------------------------------------

export default function ChangePassword() {
	return (
		<>
			<Helmet>
				<title> Change Password | Jupiter HRM </title>
			</Helmet>

			<Container>
				{/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Change Password
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
								Change Password
							</Typography>
						</Stack>
						<form>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="current_password"
											label="Current Password"
											sx={{ width: "50ch" }}
											type="password"
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="new_password"
											label="New Password"
											sx={{ width: "50ch" }}
											type="password"
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="confirm_password"
											label="Confirm New Password"
											sx={{ width: "50ch" }}
											type="password"
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
