import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Label from "../components/label";
import { ApiDeletePendingLeave, ApiGetLeavesOfUser } from "../services/leaveService";

// ----------------------------------------------------------------------

export default function LeaveHistoryPage() {
	const [open, setOpen] = useState(false);
	const [leaveData, setLeaveData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		ApiGetLeavesOfUser()
			.then((res) => {
				setLeaveData(res.data);
			})
			.catch((e) => console.error(e));
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteLeave = (leave_id) => {
		ApiDeletePendingLeave(leave_id)
			.then((res) => {
				fetchData();
				console.log(res.data);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<Helmet>
				<title> Leave History | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Leave History
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="/dashboard/leave/apply"
					>
						Apply Leave
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Leave Date</TableCell>
										<TableCell align="left">Type</TableCell>
										<TableCell align="left">Reason</TableCell>
										<TableCell align="center">Status</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{leaveData.map((leave, i) => (
										<TableRow
											key={leave.leave_id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{leave.date}
											</TableCell>
											<TableCell align="left">{leave.leave_type}</TableCell>
											<TableCell align="left">{leave.reason}</TableCell>
											<TableCell align="center">
												<Label
													color={
														leave.status === "pending"
															? "warning"
															: leave.status === "declined"
																? "error"
																: "success"
													}
												>
													{leave.status}
												</Label>
											</TableCell>
											<TableCell align="center">
												{leave.status === "pending" ? (
													<IconButton
														sx={{ color: "error.main" }}
														aria-label="delete"
														onClick={() => deleteLeave(leave.leave_id)}
													>
														<Iconify icon={"eva:trash-2-outline"} />
													</IconButton>
												) : null}
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
				<DialogTitle>Delete Pending Leave</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure to delete the pending leave?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>NO</Button>
					<Button color="error" onClick={deleteLeave}>
						YES
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
