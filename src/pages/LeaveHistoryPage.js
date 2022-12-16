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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Iconify from "../components/iconify";
import Label from "../components/label";

// ----------------------------------------------------------------------

function createData(date, type, reason, status) {
	return { date, type, reason, status };
}

const rows = [
	createData("23-12-2022", "Annual", "Christmas Holidays", "Pending"),
	createData("12-11-2022", "Casual", "Vacation", "Declined"),
	createData("06-11-2022", "Casual", "Vacation", "Approved"),
	createData("07-08-2022", "No Pay", "Personal Reasons", "Approved"),
];

export default function LeaveHistoryPage() {
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
									{rows.map((row) => (
										<TableRow
											key={row.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
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
													<IconButton
														sx={{ color: "error.main" }}
														aria-label="delete"
														onClick={handleClickOpen}
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
