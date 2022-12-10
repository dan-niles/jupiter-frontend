import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";
// @mui
import {
	Stack,
	Button,
	Container,
	Typography,
	Tab,
	Box,
	Tabs,
} from "@mui/material";
// components
import PrintIcon from "@mui/icons-material/Print";
import EmpByDept from "./reports/EmpByDept";
import LeavesByDept from "./reports/LeavesByDept";
import GroupedEmp from "./reports/GroupedEmp";

// ----------------------------------------------------------------------

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

export default function ReportsPage() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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

				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab key="t0" label="Employees by Department" id="tab-0" />
							<Tab key="t1" label="Leaves by Department" id="tab-1" />
							<Tab key="t2" label="Grouped Employee Report" id="tab-2" />
							<Tab key="t3" label="Custom Report" id="tab-3" />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<EmpByDept />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<LeavesByDept />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<GroupedEmp />
					</TabPanel>
					<TabPanel value={value} index={3}>
						Item Four
					</TabPanel>
				</Box>
			</Container>
		</>
	);
}
