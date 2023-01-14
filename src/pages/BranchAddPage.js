import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAccessControl from "../hooks/useAccessControl";
import { useAuth } from "../context/auth-context";
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

import countries from "../_mock/countries.json";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function BranchAddPage() {
	const { user } = useAuth();
	useAccessControl(user.role, "branches-manage");

	const [branchName, setBranchName] = useState(null);
	const [branchAddress, setBranchAddress] = useState("");
	const [branchCountry, setBranchCountry] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(process.env.REACT_APP_BACKEND_URL + "/api/branch/", {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					branch_name: branchName,
					address: branchAddress,
					country: branchCountry,
				},
			})
			.then((res) => {
				console.log(res);
				navigate("/dashboard/branches/", {
					state: {
						showToast: true,
						toastMessage: "Branch created successfully!",
					},
				});
			})
			.catch((err) => {
				if (err.response.status === 409) {
					toast.error("Branch already exists!");
				} else {
					toast.error("Error creating attribute!");
				}
			});
	};

	return (
		<>
			<Helmet>
				<title> Add Branch | Jupiter HRM </title>
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
						Branches
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/branches/"
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
								Add Branch
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="branch_name"
											label="Branch Name"
											type="text"
											value={branchName}
											onChange={(e) => {
												setBranchName(e.target.value);
											}}
										/>

										<TextField
											required
											id="country"
											select
											label="Country"
											sx={{ width: "25ch" }}
											value={branchCountry}
											onChange={(e) => {
												setBranchCountry(e.target.value);
											}}
										>
											{countries.map((el) => (
												<MenuItem key={el.name} value={el.name}>
													{el.name}
												</MenuItem>
											))}
										</TextField>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											sx={{
												width: "60ch",
											}}
											id="address"
											label="Address"
											type="text"
											required
											value={branchAddress}
											onChange={(e) => {
												setBranchAddress(e.target.value);
											}}
										/>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end">
								<Button type="submit" variant="contained">
									Create Branch
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
