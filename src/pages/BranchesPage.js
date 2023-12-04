import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAccessControl from "../hooks/useAccessControl";
import { useAuth } from "../context/auth-context";
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
import countries from "../_mock/countries.json";
// ----------------------------------------------------------------------
const accessToken = sessionStorage.getItem("access-token");

export default function BranchesPage() {
	const { user } = useAuth();
	useAccessControl(user.role, "branches-manage");

	const [open, setOpen] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [branches, setBranches] = useState([]);

	const [editId, setEditId] = useState(null);
	const [editName, setEditName] = useState(null);
	const [editAddress, setEditAddress] = useState("");
	const [editCountry, setEditCountry] = useState("");

	const [deleteId, setDeleteId] = useState(null);
	const [deleteName, setDeleteName] = useState(null);

	const { state } = useLocation();

	const getBranches = () => {
		axios
			.get(window.configs.backendUrl + "/api/branch/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setBranches(res.data);
			});
	};

	useEffect(() => {
		getBranches();
		if (
			state != null &&
			state.showToast !== undefined &&
			state.showToast === true
		) {
			toast.success(state.toastMessage);
		}
	}, []);

	const handleEdit = (e) => {
		e.preventDefault();
		console.log(editId);
		axios
			.put(window.configs.backendUrl + "/api/branch/" + editId, {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					branch_id: editId,
					branch_name: editName,
					address: editAddress,
					country: editCountry,
				},
			})
			.then((res) => {
				toast.success("Edited successfully!");
			})
			.catch((err) => {
				toast.error("Error editing branch!");
			});
		handleClose();
		getBranches();
	};

	const handleClickOpen = (id, idx) => {
		setEditName(branches[idx].branch_name);
		setEditAddress(branches[idx].address);
		setEditCountry(branches[idx].country);
		setEditId(id);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		axios
			.delete(window.configs.backendUrl + "/api/branch/" + deleteId, {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					branch_id: deleteId,
				},
			})
			.then((res) => {
				toast.success("Deleted successfully!");
			})
			.catch((err) => {
				toast.error("Error deleting branch!");
			});
		handleDeleteClose();
		getBranches();
	};

	const handleDeleteOpen = (id, idx) => {
		setDeleteName(branches[idx].branch_name);
		setDeleteId(id);
		setOpenDeleteDialog(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Helmet>
				<title> Branches | Jupiter HRM </title>
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
					{/* <Button
						color="error"
						variant="outlined"
						startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
						component={RouterLink}
						to="/dashboard/organization"
					>
						Go Back
					</Button> */}
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="add"
					>
						Add New Branch
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
												<IconButton
													aria-label="edit"
													onClick={handleClickOpen.bind(
														this,
														row.branch_id,
														index
													)}
												>
													<Iconify icon={"eva:edit-fill"} />
												</IconButton>
												<IconButton
													sx={{ color: "error.main" }}
													aria-label="delete"
													onClick={handleDeleteOpen.bind(
														this,
														row.branch_id,
														index
													)}
												>
													<Iconify icon={"eva:trash-2-outline"} />
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

			{/* Edit branch dialog */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit</DialogTitle>
				<form onSubmit={handleEdit}>
					<DialogContent>
						<DialogContentText>
							Enter the new values for the selected branch.
						</DialogContentText>
						<Stack spacing={2} direction="column" sx={{ mt: 2 }}>
							<TextField
								required
								id="branch_name"
								label="Branch Name"
								type="text"
								fullWidth
								value={editName}
								onChange={(e) => {
									setEditName(e.target.value);
								}}
							/>
							<TextField
								id="address"
								label="Address"
								type="text"
								fullWidth
								required
								value={editAddress}
								onChange={(e) => {
									setEditAddress(e.target.value);
								}}
							/>
							<TextField
								required
								id="country"
								select
								label="Country"
								sx={{ width: "25ch" }}
								value={editCountry}
								onChange={(e) => {
									setEditCountry(e.target.value);
								}}
							>
								{countries.map((el) => (
									<MenuItem key={el.name} value={el.name}>
										{el.name}
									</MenuItem>
								))}
							</TextField>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Save</Button>
					</DialogActions>
				</form>
			</Dialog>

			{/* Delete confirmation dialog */}
			<Dialog
				open={openDeleteDialog}
				onClose={handleDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete this branch?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the branch with name "
						<b>{deleteName}</b>"?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<form onSubmit={handleDelete}>
						<Button onClick={handleDeleteClose}>Cancel</Button>
						<Button color="error" type="submit">
							Confirm
						</Button>
					</form>
				</DialogActions>
			</Dialog>
		</>
	);
}
