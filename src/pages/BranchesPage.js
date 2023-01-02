import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// @mui
import {
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TextField,
	TableHead,
	MenuItem,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Iconify from "../components/iconify";
// ----------------------------------------------------------------------
const accessToken = sessionStorage.getItem("access-token");

export default function BranchesPage() {
	const [open, setOpen] = useState(false);

	const [branches, setBranches] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getBranches();
	}, []);

	const getBranches = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/branch/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setBranches(res.data);
			});
	};

	return (
		<>
			<Helmet>
				<title> Branches | Jupiter HRM </title>
			</Helmet>

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
						to="/dashboard/organization"
					>
						Go Back
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Branch Name</TableCell>
										<TableCell>Address</TableCell>
										<TableCell>Country</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{branches.map((row, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell>{row.branch_id}</TableCell>
											<TableCell component="th" scope="row">
												{row.branch_name}
											</TableCell>
											<TableCell>{row.address}</TableCell>
											<TableCell>{row.country}</TableCell>
											<TableCell align="center">
												<IconButton aria-label="edit" onClick={handleClickOpen}>
													<Iconify icon={"eva:edit-fill"} />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter new value.</DialogContentText>
					<Stack spacing={2} direction="column" sx={{ mt: 2 }}>
						<TextField id="name" label="Name" type="text" fullWidth />
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
