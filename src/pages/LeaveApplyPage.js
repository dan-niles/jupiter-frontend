import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Navigate, NavLink as RouterLink, useNavigate } from "react-router-dom";
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
import { ApiApplyLeave } from "../services/leaveService";
import { toast, Toaster } from "react-hot-toast";

// ----------------------------------------------------------------------

export default function EmployeeAddPage() {

	const navigate = useNavigate();

	const [leaveFormValues, setLeaveFormValues] = useState({
		startDate: new Date(),
		endDate: new Date(),
		reason: "",
		leave_type: "",
		key: "selection"
	})

	const handleLeaveSelect = (ranges) => {
		setLeaveFormValues(ranges.selection);
	};

	const handleFormValueChange = (e) => {
		setLeaveFormValues({
			...leaveFormValues,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		ApiApplyLeave(leaveFormValues)
			.then(res => {
				toast.success("Successfully applied for leave.")
				navigate("/dashboard")
			})
			.catch(err => {
				toast.error("Something went wrong.")
			})
	};

	return (
		<>
			<Helmet>
				<title> Apply Leave | Jupiter HRM </title>
			</Helmet>

			<Toaster position="top-right" reverseOrder={true} />

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
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="leave_type"
											select
											label="Leave Type"
											name="leave_type"
											sx={{ width: "25ch" }}
											value={leaveFormValues.leave_type}
											onChange={handleFormValueChange}
										>
											<MenuItem key="Annual" value="annual">
												Annual
											</MenuItem>
											<MenuItem key="Casual" value="casual">
												Casual
											</MenuItem>
											<MenuItem key="Maternity" value="maternity">
												Maternity
											</MenuItem>
											<MenuItem key="No Pay" value="no_pay">
												No Pay
											</MenuItem>
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="reason"
											fullWidth
											label="Reason"
											multiline
											rows={10}
											name="reason"
											value={leaveFormValues.reason}
											onChange={handleFormValueChange}
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
											ranges={[leaveFormValues]}
											onChange={handleLeaveSelect}
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
