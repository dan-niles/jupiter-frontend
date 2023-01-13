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
	TextField,
	TableHead,
	MenuItem,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Label from "../components/label";
import { ApiGetLeavesToApprove, ApiTakeLeaveAction } from "../services/leaveService";
import { useAuth } from "../context/auth-context";

// ----------------------------------------------------------------------

export default function ApproveLeavesPage() {

	const { user } = useAuth()

	const [open, setOpen] = useState(false);

	const [leavesToApprove, setLeavesToApprove] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = () => {
		ApiGetLeavesToApprove(user.emp_id)
			.then(res => {
				setLeavesToApprove(res.data)
			})
			.catch(err => console.error(err))
	}

	const takeLeaveAction = (leave_id, action) => {
		ApiTakeLeaveAction({ action, leave_id })
			.then(res => {
				console.log(res)
				fetchData()
			})
			.catch(err => console.error(err))
	}

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Helmet>
				<title> Approve Leaves | Jupiter HRM </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Approve Leaves
					</Typography>
					{/* <Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
					>
						Apply Leave
					</Button> */}
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Emp. No.</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Leave Date</TableCell>
										<TableCell align="left">Type</TableCell>
										<TableCell align="left">Reason</TableCell>
										<TableCell align="center">Status</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{leavesToApprove.map((leave, i) => (
										<TableRow
											key={i}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{leave.emp_id}
											</TableCell>
											<TableCell component="th" scope="row">
												{leave.first_name} {leave.last_name}
											</TableCell>
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
													<Stack
														direction="row"
														spacing={1}
														justifyContent="center"
													>
														<Button
															variant="outlined"
															startIcon={<CheckIcon />}
															color="primary"
															onClick={() => takeLeaveAction(leave.leave_id, "approved")}
														>
															Approve
														</Button>
														<Button
															variant="outlined"
															startIcon={<ClearIcon />}
															color="error"
															onClick={() => takeLeaveAction(leave.leave_id, "declined")}
														>
															Decline
														</Button>
													</Stack>
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
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the new values for the selected attribute.
					</DialogContentText>
					<Stack spacing={2} direction="column" sx={{ mt: 2 }}>
						<TextField
							id="column_name"
							label="Column Name"
							type="text"
							fullWidth
						// sx={{ mb: 1 }}
						/>
						<TextField
							id="type"
							select
							label="Data Type"
							sx={{ width: "25ch" }}
						>
							<MenuItem key="varchar" value="varchar">
								VARCHAR
							</MenuItem>
							<MenuItem key="int" value="int">
								INTEGER
							</MenuItem>
							<MenuItem key="date" value="date">
								DATE
							</MenuItem>
						</TextField>
						<TextField id="alias" label="Alias" type="text" fullWidth />
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
