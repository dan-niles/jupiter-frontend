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

import { DateRangePicker } from "react-date-range";

// ----------------------------------------------------------------------

export default function EmployeeAddPage() {
	const selectionRange = {
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	};

	const [dateRange, setDateRange] = useState(selectionRange);

	const handleSelect = (ranges) => {
		setDateRange(ranges.selection);
	};

	return (
		<>
			<Helmet>
				<title> Apply Leave | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Leaves
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
								Apply for Leave
							</Typography>
						</Stack>
						<form>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="leave_type"
											select
											label="Leave Type"
											sx={{ width: "25ch" }}
											// value={currency}
											// onChange={handleChange}
										>
											<MenuItem key="Annual" value="Annual">
												Annual
											</MenuItem>
											<MenuItem key="Casual" value="Casual">
												Casual
											</MenuItem>
											<MenuItem key="Maternity" value="Maternity">
												Maternity
											</MenuItem>
											<MenuItem key="No Pay" value="No Pay">
												No Pay
											</MenuItem>
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											id="reason"
											fullWidth
											label="Reason"
											multiline
											rows={10}
										/>
									</Stack>
								</Grid>
								<Grid item xs={7}>
									<Stack
										direction="row"
										spacing={2}
										sx={{ mb: 2, border: "1px solid #dbe0e4" }}
										justifyContent="center"
									>
										<DateRangePicker
											ranges={[dateRange]}
											onChange={handleSelect}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end" sx={{ mt: 2 }}>
								<Button type="submit" variant="contained">
									Apply Leave
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
