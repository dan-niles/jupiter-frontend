import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";
// @mui
import { Stack, Button, Container, Typography } from "@mui/material";
// components

import ButtonGroup from "@mui/material/ButtonGroup";
import PrintIcon from "@mui/icons-material/Print";
import EmpByDept from "./reports/EmpByDept";

// ----------------------------------------------------------------------

export default function ReportsPage() {
	return (
		<>
			<Helmet>
				<title> Reports | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={2}
				>
					<Typography variant="h4" gutterBottom>
						Reports
					</Typography>
					<Button
						variant="contained"
						startIcon={<PrintIcon icon="eva:plus-fill" />}
					>
						Print
					</Button>
				</Stack>

				<ButtonGroup size="large" sx={{ mb: 4 }}>
					<Button key="1">Employees by Department</Button>
					<Button key="2">Leaves by Department</Button>
					<Button key="3">Grouped Employee report </Button>
					<Button key="4">Custom Report</Button>
				</ButtonGroup>

				<EmpByDept />
			</Container>
		</>
	);
}
