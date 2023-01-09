import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
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
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { ApiDeleteUser, ApiGetAllUsers } from "../services/userService";
// mock
// import USERLIST from "../_mock/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "emp_id", label: "Employee ID", alignRight: false },
	{ id: "name", label: "Employee Name", alignRight: false },
	{ id: "username", label: "Username", alignRight: false },
	{ id: "role", label: "Role", alignRight: false },
	// { id: "last_login", label: "Last Login", alignRight: false },
	{ id: "status", label: "Status", alignRight: false, alignCenter: true },
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
			(_user) =>
				(_user.first_name.toLowerCase().indexOf(query.toLowerCase()) &&
					_user.last_name.toLowerCase().indexOf(query.toLowerCase()) &&
					_user.emp_id.toLowerCase().indexOf(query.toLowerCase())) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function UserPage(props) {
	const [open, setOpen] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [users, setUsers] = useState([]);

	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(25);

	const { state } = useLocation();

	const [selcId, setSelcId] = useState(null);
	const [selcName, setSelcName] = useState(null);

	useEffect(() => {
		getUsers();
		if (
			state != null &&
			state.showToast !== undefined &&
			state.showToast === true
		) {
			toast.success(state.toastMessage);
		}
	}, []);

	const getUsers = () => {
		ApiGetAllUsers()
			.then((res) => {
				console.log(res.data);
				setUsers(res.data);
			})
			.catch(e => console.log(e))
	};

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
			const newSelecteds = users.map((n) => n.name);
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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const filteredUsers = applySortFilter(
		users,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredUsers.length && !!filterName;

	const handleDelete = (e) => {
		e.preventDefault();
		ApiDeleteUser(selcId)
			.then((res) => {
				toast.success("Deleted successfully!");
			})
			.catch((err) => {
				toast.error("Error deleting user!");
			});
		handleDeleteClose();
		getUsers();
	};

	const handleDeleteOpen = () => {
		handleCloseMenu();
		let selcUser = users.find((user) => user.user_id === selcId);
		setSelcName(selcUser.username);
		setOpenDeleteDialog(true);
	};

	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<>
			<Helmet>
				<title> Users | Jupiter HRM </title>
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
						Users
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						component={RouterLink}
						to="add"
					>
						New User
					</Button>
				</Stack>

				<Card>
					<UserListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={users.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const {
												user_id,
												emp_id,
												first_name,
												last_name,
												username,
												role,
												is_active,
											} = row;
											const name = `${first_name} ${last_name}`;
											const selectedUser = selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={index}
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

													<TableCell align="left">{emp_id}</TableCell>

													<TableCell component="th" scope="row">
														<Typography variant="subtitle2">{name}</Typography>
													</TableCell>

													<TableCell align="left">{username}</TableCell>

													<TableCell align="left">
														{role === "admin"
															? "Administrator"
															: role === "manager"
																? "HR-Manager"
																: "User"}
													</TableCell>

													<TableCell align="center">
														<Label
															color={(is_active === 1 && "success") || "error"}
														>
															{sentenceCase(
																is_active === 1 ? "active" : "inacative"
															)}
														</Label>
													</TableCell>

													<TableCell align="right">
														<IconButton
															size="large"
															color="inherit"
															onClick={handleOpenMenu.bind(this, user_id)}
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
						count={users.length}
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
				<DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the user with username "
						<b>{selcName}</b>"?
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
