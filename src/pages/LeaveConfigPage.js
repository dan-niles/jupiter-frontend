import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
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
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Iconify from "../components/iconify";

// ----------------------------------------------------------------------

const accessToken = sessionStorage.getItem("access-token");

export default function EmployeePage() {
	const [open, setOpen] = useState(false);

	const [paygradeRecords, setPaygradeRecords] = useState([]);

	const [editId, setEditId] = useState(null);
	const [editAnnual, setEditAnnual] = useState(0);
	const [editCasual, setEditCasual] = useState(0);
	const [editMaternity, setEditMaternity] = useState(0);
	const [editNoPay, setEditNoPay] = useState(0);

	const handleClickOpen = (id, idx) => {
		setEditAnnual(paygradeRecords[idx].annual);
		setEditCasual(paygradeRecords[idx].casual);
		setEditMaternity(paygradeRecords[idx].maternity);
		setEditNoPay(paygradeRecords[idx].no_pay);
		setEditId(id);
		setOpen(true);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		console.log(editAnnual, editCasual, editMaternity, editNoPay, editId);
		axios
			.put(process.env.REACT_APP_BACKEND_URL + "/api/paygrade/" + editId, {
				headers: {
					"access-token": `${accessToken}`,
				},
				data: {
					paygrade_id: editId,
					annual: editAnnual,
					casual: editCasual,
					maternity: editMaternity,
					no_pay: editNoPay,
				},
			})
			.then((res) => {
				toast.success("Edited successfully!");
			})
			.catch((err) => {
				toast.error("Error editing value!");
			});
		handleClose();
		getPaygradeRecords();
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getPaygradeRecords();
	}, []);

	const getPaygradeRecords = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/paygrade/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setPaygradeRecords(res.data);
			});
	};

	return (
		<>
			<Helmet>
				<title> Leave Configuration | Jupiter HRM </title>
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
						Leave Configuration
					</Typography>
					<Button
						variant="contained"
						startIcon={<RestartAltIcon icon="eva:plus-fill" />}
					>
						Yearly Reset
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Paygrade</TableCell>
										<TableCell align="right">Annual Leave</TableCell>
										<TableCell align="right">Casual Leave</TableCell>
										<TableCell align="right">Maternity Leave</TableCell>
										<TableCell align="right">No Pay Leave</TableCell>
										<TableCell align="center">Edit</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{paygradeRecords.map((row, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.level}
											</TableCell>
											<TableCell align="right">{row.annual}</TableCell>
											<TableCell align="right">{row.casual}</TableCell>
											<TableCell align="right">{row.maternity}</TableCell>
											<TableCell align="right">{row.no_pay}</TableCell>
											<TableCell align="center">
												<IconButton
													aria-label="edit"
													onClick={handleClickOpen.bind(
														this,
														row.paygrade_id,
														index
													)}
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
				<DialogTitle>Edit Leave Allocation</DialogTitle>
				<form onSubmit={handleEdit}>
					<DialogContent>
						<DialogContentText>
							Enter the number of days for each leave type
						</DialogContentText>
						<Stack spacing={1} direction="column" sx={{ mt: 2 }}>
							<TextField
								id="annual"
								label="Annual Leave"
								type="number"
								fullWidth
								variant="standard"
								value={editAnnual}
								onChange={(e) => {
									setEditAnnual(e.target.value);
								}}
							/>
							<TextField
								id="casual"
								label="Casual Leave"
								type="number"
								fullWidth
								variant="standard"
								value={editCasual}
								onChange={(e) => {
									setEditCasual(e.target.value);
								}}
							/>
							<TextField
								id="maternity"
								label="Maternity Leave"
								type="number"
								fullWidth
								variant="standard"
								value={editMaternity}
								onChange={(e) => {
									setEditMaternity(e.target.value);
								}}
							/>
							<TextField
								id="annual"
								label="No Pay"
								type="number"
								fullWidth
								variant="standard"
								value={editNoPay}
								onChange={(e) => {
									setEditNoPay(e.target.value);
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
