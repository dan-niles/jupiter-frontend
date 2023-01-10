import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { NavLink as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// @mui
import {
	Card,
	Table,
	Stack,
	Paper,
	Button,
	Popover,
	Checkbox,
	TableRow,
	MenuItem,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TablePagination,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// sections
import { EmpListHead, EmpListToolbar } from "../sections/@dashboard/employee";
import { ApiDeleteEmployee, ApiGetAllEmployee } from "../services/employeeService";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "emp_id", label: "Employee ID", alignRight: false },
	{ id: "emp_name", label: "Name", alignRight: false },
	{ id: "department", label: "Department", alignRight: false },
	{ id: "title", label: "Title", alignRight: false },
	{ id: "email", label: "Email", alignRight: false },
	{ id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function EmployeePage() {
	const [open, setOpen] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [employees, setEmployees] = useState([]);

	const [page, setPage] = useState(0);
	const [order, setOrder] = useState("asc");
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState("name");
	const [filterName, setFilterName] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const [selcId, setSelcId] = useState(null);
	const [selcName, setSelcName] = useState(null);

	const { state } = useLocation();

	const getEmployees = () => {
		ApiGetAllEmployee()
			.then((res) => {
				setEmployees(res.data);
			});
	};

	useEffect(() => {
		getEmployees();

		if (
			state != null &&
			state.showToast !== undefined &&
			state.showToast === true
		) {
			toast.success(state.toastMessage);
		}
	}, []);

	const handleOpenMenu = (id, event) => {
		setSelcId(id);
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = employees.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

	const filteredUsers = applySortFilter(
		employees,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredUsers.length && !!filterName;

	const handleDelete = (e) => {
		e.preventDefault();
		ApiDeleteEmployee(selcId)
			.then((res) => {
				toast.success("Deleted successfully!");
			})
			.catch((err) => {
				toast.error("Error deleting employee!");
			});
		handleDeleteClose();
		getEmployees();
	};

	const handleDeleteOpen = () => {
		handleCloseMenu();
		const selcEmp = employees.find((emp) => emp.emp_id === selcId);
		setSelcName(`${selcEmp.first_name} ${selcEmp.last_name}`);
		setOpenDeleteDialog(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Helmet>
				<title> Employees | Jupiter HRM </title>
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
						Employees
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="add"
					>
						New Employee
					</Button>
				</Stack>

				<Card>
					<EmpListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<EmpListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={employees.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											const {
												emp_id,
												first_name,
												last_name,
												dept_name,
												job_title,
												email,
											} = row;
											const name = `${first_name} ${last_name}`;
											const selectedUser = selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={emp_id}
													tabIndex={-1}
													role="checkbox"
													selected={selectedUser}
												>
													<TableCell padding="checkbox">
														<Checkbox
															checked={selectedUser}
															onChange={(event) => handleClick(event, name)}
														/>
													</TableCell>

													<TableCell component="th" scope="row" padding="none">
														<Typography variant="subtitle2" noWrap>
															{emp_id}
														</Typography>
													</TableCell>

													<TableCell align="left">{name}</TableCell>

													<TableCell align="left">{dept_name}</TableCell>

													<TableCell align="left">{job_title}</TableCell>

													<TableCell align="left">{email}</TableCell>

													<TableCell align="right">
														<IconButton
															size="large"
															color="inherit"
															onClick={handleOpenMenu.bind(this, emp_id)}
														>
															<Iconify icon={"eva:more-vertical-fill"} />
														</IconButton>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<Paper
													sx={{
														textAlign: "center",
													}}
												>
													<Typography variant="h6" paragraph>
														Not found
													</Typography>

													<Typography variant="body2">
														No results found for &nbsp;
														<strong>&quot;{filterName}&quot;</strong>.
														<br /> Try checking for typos or using complete
														words.
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[25, 50, 100]}
						component="div"
						count={employees.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 1,
						width: 140,
						"& .MuiMenuItem-root": {
							px: 1,
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<MenuItem component={RouterLink} to={"edit/" + selcId}>
					<Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
					Edit
				</MenuItem>

				<MenuItem sx={{ color: "error.main" }} onClick={handleDeleteOpen}>
					<Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>

			{/* Delete confirmation dialog */}
			<Dialog
				open={openDeleteDialog}
				onClose={handleDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete this employee?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the employee (<b>{selcName}</b>)
						with employee ID "<b>{selcId}</b>"?
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
