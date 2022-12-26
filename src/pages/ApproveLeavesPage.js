import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";
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

import Iconify from "../components/iconify";
import Label from "../components/label";

// ----------------------------------------------------------------------

function createData(emp_no, name, date, type, reason, status) {
	return { emp_no, name, date, type, reason, status };
}

const rows = [
	createData(
		"00001",
		"John Doe",
		"23-12-2022",
		"Annual",
		"Christmas Holidays",
		"Pending"
	),
	createData(
		"00001",
		"John Doe",
		"12-11-2022",
		"Casual",
		"Vacation",
		"Declined"
	),
	createData(
		"00001",
		"John Doe",
		"06-11-2022",
		"Casual",
		"Vacation",
		"Approved"
	),
	createData(
		"00001",
		"John Doe",
		"07-08-2022",
		"No Pay",
		"Personal Reasons",
		"Approved"
	),
];

export default function ApproveLeavesPage() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

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
									{rows.map((row) => (
										<TableRow
											key={row.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.emp_no}
											</TableCell>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell component="th" scope="row">
												{row.date}
											</TableCell>
											<TableCell align="left">{row.type}</TableCell>
											<TableCell align="left">{row.reason}</TableCell>
											<TableCell align="center">
												<Label
													color={
														row.status === "Pending"
															? "warning"
															: row.status === "Declined"
															? "error"
															: "success"
													}
												>
													{row.status}
												</Label>
											</TableCell>
											<TableCell align="center">
												{row.status === "Pending" ? (
													<Stack
														direction="row"
														spacing={1}
														justifyContent="center"
													>
														<Button
															variant="outlined"
															startIcon={<CheckIcon />}
															color="primary"
														>
															Approve
														</Button>
														<Button
															variant="outlined"
															startIcon={<ClearIcon />}
															color="error"
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
