import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

function createData(id, name, code) {
	return { id, name, code };
}

const rows = [
	createData(1, "ICT", "D0001"),
	createData(2, "HR", "D0002"),
	createData(3, "Finance", "D0003"),
	createData(4, "Marketing", "D0004"),
	createData(5, "Production", "D0005"),
];

const accessToken = sessionStorage.getItem("access-token");

export default function DepartmentPage() {
	const [open, setOpen] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [departments, setDepartments] = useState([]);

	const [editId, setEditId] = useState(null);
	const [editName, setEditName] = useState(null);
	const [editCode, setEditCode] = useState("");

	const [deleteId, setDeleteId] = useState(null);
	const [deleteName, setDeleteName] = useState(null);

	const { state } = useLocation();

	const getDepartments = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/department/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setDepartments(res.data);
			});
	};

	useEffect(() => {
		getDepartments();
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
			.put(process.env.REACT_APP_BACKEND_URL + "/api/department/" + editId, {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					dept_id: editId,
					dept_name: editName,
					dept_code: editCode,
				},
			})
			.then((res) => {
				toast.success("Edited successfully!");
			})
			.catch((err) => {
				toast.error("Error editing department!");
			});
		handleClose();
		getDepartments();
	};

	const handleClickOpen = (id, idx) => {
		setEditName(departments[idx].dept_name);
		setEditCode(departments[idx].dept_code);
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
				process.env.REACT_APP_BACKEND_URL + "/api/department/" + deleteId,
				{
					headers: {
						"access-token": `${accessToken}`,
					},
					data: {
						dept_id: deleteId,
					},
				}
			)
			.then((res) => {
				toast.success("Deleted successfully!");
			})
			.catch((err) => {
				toast.error("Error deleting department!");
			});
		handleDeleteClose();
		getDepartments();
	};

	const handleDeleteOpen = (id, idx) => {
		setDeleteName(departments[idx].dept_name);
		setDeleteId(id);
		setOpenDeleteDialog(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Helmet>
				<title> Departments | Jupiter HRM </title>
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
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="add"
					>
						Add New Department
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Department Name</TableCell>
										<TableCell align="center">Code</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{departments.map((row, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell>{row.dept_id}</TableCell>
											<TableCell component="th" scope="row">
												{row.dept_name}
											</TableCell>
											<TableCell align="center">{row.dept_code}</TableCell>
											<TableCell align="center">
												<IconButton
													aria-label="edit"
													onClick={handleClickOpen.bind(
														this,
														row.dept_id,
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
														row.dept_id,
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

			{/* Edit department dialog */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit</DialogTitle>
				<form onSubmit={handleEdit}>
					<DialogContent>
						<DialogContentText>
							Enter the new values for the selected department.
						</DialogContentText>
						<Stack spacing={2} direction="column" sx={{ mt: 2 }}>
							<TextField
								required
								id="dept_name"
								label="Department Name"
								type="text"
								fullWidth
								value={editName}
								onChange={(e) => {
									setEditName(e.target.value);
								}}
							/>
							<TextField
								error={editCode.length > 5}
								helperText={
									editCode.length > 5 && "Code must be 5 characters long"
								}
								id="dept_code"
								label="Code"
								type="text"
								fullWidth
								required
								maxLength={5}
								value={editCode}
								onChange={(e) => {
									setEditCode(e.target.value);
								}}
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit" disabled={editCode.length > 5 && true}>
							Save
						</Button>
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
					{"Delete this department?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the department with name "
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
