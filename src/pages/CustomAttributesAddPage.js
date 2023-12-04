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

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function CustomAttributesAddPage() {
	const { user } = useAuth();
	useAccessControl(user.role, "custom-attributes-manage");

	const [attrName, setAttrName] = useState("");
	const [alias, setAlias] = useState("");
	const [attrType, setAttrType] = useState("VARCHAR");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(window.configs.backendUrl + "/api/custom_attributes/", {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					attr_name: attrName,
					alias: alias,
					data_type: attrType,
				},
			})
			.then((res) => {
				// console.log(res);
				navigate("/dashboard/custom-attributes/", {
					state: {
						showToast: true,
						toastMessage: "Attribute created successfully!",
					},
				});
			})
			.catch((err) => {
				if (err.response.status === 409) {
					toast.error("Attribute already exists!");
				} else {
					toast.error("Error creating attribute!");
				}
			});
	};

	return (
		<>
			<Helmet>
				<title> Add Custom Attributes | Jupiter HRM </title>
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
						Custom Attribute
					</Typography>

					<Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/custom-attributes/"
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
								Add Custom Attributes
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
										<TextField
											required
											id="alias"
											label="Alias"
											sx={{ width: "25ch" }}
											value={alias}
											onChange={(e) => {
												setAlias(e.target.value);
											}}
										/>
									</Stack>
									<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
										<TextField
											required
											id="attr_name"
											label="Column Name"
											sx={{ width: "25ch" }}
											value={attrName}
											onChange={(e) => {
												setAttrName(e.target.value);
											}}
										/>
										<TextField
											required
											id="data_type"
											select
											label="Data Type"
											sx={{ width: "25ch" }}
											value={attrType}
											onChange={(e) => {
												setAttrType(e.target.value);
											}}
										>
											<MenuItem key="VARCHAR" value="VARCHAR">
												VARCHAR
											</MenuItem>
											<MenuItem key="INT" value="INT">
												INTEGER
											</MenuItem>
										</TextField>
									</Stack>
								</Grid>
							</Grid>

							<Stack alignItems="end">
								<Button type="submit" variant="contained">
									Create Attribute
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
