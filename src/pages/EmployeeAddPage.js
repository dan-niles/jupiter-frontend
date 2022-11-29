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
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";

// ----------------------------------------------------------------------

export default function EmployeeAddPage() {
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
						Add New Employee
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
					<Scrollbar></Scrollbar>
				</Card>
			</Container>
		</>
	);
}
