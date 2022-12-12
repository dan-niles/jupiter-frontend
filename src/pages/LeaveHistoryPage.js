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
										<TableCell>Column Name</TableCell>
										<TableCell align="center">Type</TableCell>
										<TableCell align="center">Alias</TableCell>
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
												{row.name}
											</TableCell>
											<TableCell align="center">{row.type}</TableCell>
											<TableCell align="center">{row.alias}</TableCell>
											<TableCell align="center">
												<IconButton aria-label="edit" onClick={handleClickOpen}>
													<Iconify icon={"eva:edit-fill"} />
												</IconButton>
												<IconButton
													sx={{ color: "error.main" }}
													aria-label="delete"
													onClick={handleClickOpen}
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
