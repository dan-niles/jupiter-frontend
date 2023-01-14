import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
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
import BusinessIcon from "@mui/icons-material/Business";

import axios from "axios";

// ----------------------------------------------------------------------

function createData(id, name, code) {
	return { id, name, code };
}

const rows = [
	createData(1, "Organization Name", "Jupiter Apparels"),
	createData(2, "Head Office", "Colombo"),
	createData(3, "Registration No.", "RJU-902132"),
	createData(4, "Logo URL", "public/assets/images/logo.png"),
];

const accessToken = sessionStorage.getItem("access-token");

export default function OrganizationInfoPage() {
	const { user } = useAuth();
	useAccessControl(user.role, "org-info-manage");

	const [open, setOpen] = useState(false);
	const [orgRecords, setOrgRecords] = useState([]);
	const [editId, setEditId] = useState(null);
	const [editName, setEditName] = useState("");
	const [editValue, setEditValue] = useState("");

	const handleClickOpen = (id, idx) => {
		setEditName(orgRecords[idx].alias);
		setEditValue(orgRecords[idx].value);
		setEditId(id);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		axios
			.put(process.env.REACT_APP_BACKEND_URL + "/api/org_info/" + editId, {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					id: editId,
					value: editValue,
				},
			})
			.then((res) => {
				toast.success("Edited successfully!");
			})
			.catch((err) => {
				toast.error("Error editing value!");
			});
		handleClose();
		getOrgRecords();
	};

	useEffect(() => {
		getOrgRecords();
	}, []);

	const getOrgRecords = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/org_info/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				setOrgRecords(res.data);
			});
	};

	return (
		<>
			<Helmet>
				<title> Organization Info | Jupiter HRM </title>
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
						Organization Info
					</Typography>
					<Button
						variant="contained"
						startIcon={<BusinessIcon />}
						component={RouterLink}
						to="/dashboard/branches"
					>
						Show Branches
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Item</TableCell>
										<TableCell>Value</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orgRecords.map((record, index) => (
										<TableRow
											key={record.id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell>{index + 1}</TableCell>
											<TableCell component="th" scope="row">
												{record.alias}
											</TableCell>
											<TableCell>{record.value}</TableCell>
											<TableCell align="center">
												<IconButton
													aria-label="edit"
													onClick={handleClickOpen.bind(this, record.id, index)}
												>
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
				<form onSubmit={handleEdit}>
					<DialogContent>
						<DialogContentText>Enter new value.</DialogContentText>
						<Stack spacing={2} direction="column" sx={{ mt: 3 }}>
							<TextField
								sx={{ width: "30ch" }}
								required
								id="name"
								label={editName}
								type="text"
								fullWidth
								value={editValue}
								onChange={(e) => {
									setEditValue(e.target.value);
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
		</>
	);
}
