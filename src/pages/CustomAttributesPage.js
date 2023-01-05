import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

function createData(name, type, alias) {
	return { name, type, alias };
}

const rows = [
	createData("nationality", "VARCHAR", "Nationality"),
	createData("religion", "VARCHAR", "Religion"),
	createData("blood_type", "VARCHAR", "Blood Type"),
	createData("date_joined", "DATE", "Date Joined"),
];

const accessToken = sessionStorage.getItem("access-token");

export default function CustomAttributesPage() {
	const [open, setOpen] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [customAttributes, setCustomAttributes] = useState([]);

	const [editId, setEditId] = useState(null);
	const [editAlias, setEditAlias] = useState("");

	const [deleteId, setDeleteId] = useState(null);
	const [deleteAlias, setDeleteAlias] = useState(null);
	const [deleteColumnName, setDeleteColumnName] = useState(null);

	const { state } = useLocation();

	const getCustomAttributes = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/custom_attributes/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setCustomAttributes(res.data);
			});
	};

	useEffect(() => {
		getCustomAttributes();
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
		axios
			.put(
				process.env.REACT_APP_BACKEND_URL + "/api/custom_attributes/" + editId,
				{
					headers: {
						"access-token": `${accessToken}`,
					},
					data: {
						attr_id: editId,
						alias: editAlias,
					},
				}
			)
			.then((res) => {
				toast.success("Edited successfully!");
			})
			.catch((err) => {
				toast.error("Error editing value!");
			});
		handleClose();
		getCustomAttributes();
	};

	const handleClickOpen = (id, idx) => {
		setEditAlias(customAttributes[idx].alias);
		setEditId(id);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		axios
			.delete(
				process.env.REACT_APP_BACKEND_URL +
					"/api/custom_attributes/" +
					deleteId,
				{
					headers: {
						"access-token": `${accessToken}`,
						attr_name: deleteColumnName,
					},
					data: {
						attr_id: deleteId,
						attr_name: deleteColumnName,
					},
				}
			)
			.then((res) => {
				toast.success("Deleted successfully!");
			})
			.catch((err) => {
				toast.error("Error deleting attribute!");
			});
		handleDeleteClose();
		getCustomAttributes();
	};

	const handleDeleteOpen = (id, idx) => {
		setDeleteAlias(customAttributes[idx].alias);
		setDeleteColumnName(customAttributes[idx].attr_name);
		setDeleteId(id);
		setOpenDeleteDialog(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Helmet>
				<title> Custom Attributes | Jupiter HRM </title>
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
						Custom Attributes
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="add"
					>
						Add New Attribute
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Column Name</TableCell>
										<TableCell align="center">Type</TableCell>
										<TableCell align="center">Alias</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{customAttributes.map((row, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.attr_name}
											</TableCell>
											<TableCell align="center">{row.data_type}</TableCell>
											<TableCell align="center">{row.alias}</TableCell>
											<TableCell align="center">
												<IconButton
													aria-label="edit"
													onClick={handleClickOpen.bind(
														this,
														row.attr_id,
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
														row.attr_id,
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

			{/* Edit attributes dialog */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit</DialogTitle>
				<form onSubmit={handleEdit}>
					<DialogContent>
						<DialogContentText>
							Enter the new alias for the selected attribute.
						</DialogContentText>
						<Stack spacing={2} direction="column" sx={{ mt: 2 }}>
							<TextField
								required
								id="alias"
								label="Alias"
								type="text"
								fullWidth
								value={editAlias}
								onChange={(e) => {
									setEditAlias(e.target.value);
								}}
							/>
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
					{"Delete this attribute?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the attribute with alias "
						<b>{deleteAlias}</b>"?
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
