import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function DepartmentAddPage() {
	const [name, setName] = useState("");
	const [code, setCode] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(process.env.REACT_APP_BACKEND_URL + "/api/department/", {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					dept_name: name,
					dept_code: code,
				},
			})
			.then((res) => {
				// console.log(res);
				navigate("/dashboard/department/", {
					state: {
						showToast: true,
						toastMessage: "Department created successfully!",
					},
				});
			})
			.catch((err) => {
				if (err.response.status === 409) {
					toast.error("Department already exists!");
				} else {
					toast.error("Error creating attribute!");
				}
			});
	};

	return (
		<>
			<Helmet>
				<title> Add Department | Jupiter HRM </title>
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
						Departments
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/department/"
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
								Add Department
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="dept_name"
											label="Name"
											sx={{ width: "30ch" }}
											value={name}
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
										<TextField
											error={code.length > 5}
											helperText={
												code.length > 5 && "Code must be 5 characters long"
											}
											required
											id="dept_code"
											label="Code"
											sx={{ width: "30ch" }}
											value={code}
											onChange={(e) => {
												setCode(e.target.value);
											}}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end">
								<Button type="submit" variant="contained">
									Create Department
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
