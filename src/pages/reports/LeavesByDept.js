import {
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	IconButton,
	TableContainer,
	TextField,
	TableHead,
	Grid,
	MenuItem,
} from "@mui/material";

import Scrollbar from "../../components/scrollbar";
import { Box } from "@mui/system";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../../theme/print.css";

// ----------------------------------------------------------------------

function createData(paygrade, annual, casual, maternity, nopay) {
	return { paygrade, annual, casual, maternity, nopay };
}

const leaveTypes = {
	All: "All",
	annual: "Annual",
	casual: "Casual",
	maternity: "Maternity",
	no_pay: "No Pay",
};

const accessToken = sessionStorage.getItem("access-token");

const LeavesByDept = () => {
	const [departments, setDepartments] = useState([]);
	const [records, setRecords] = useState([]);

	const [deptName, setDeptName] = useState("All");
	const [leaveType, setLeaveType] = useState("All");

	const currentYear = new Date().getFullYear();

	const [startDate, setStartDate] = useState(new Date(currentYear, 0, 1));
	const [endDate, setEndDate] = useState(new Date(currentYear, 11, 31));

	const [showTable, setShowTable] = useState(false);

	const getDepartments = () => {
		axios
			.get(window.configs.backendUrl + "/api/department/", {
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
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				window.configs.backendUrl + "/api/reports/leaves-by-department",
				{
					dept_name: deptName === "All" ? null : deptName,
					leave_type: leaveType === "All" ? null : leaveType,
				},
				{
					headers: {
						"access-token": `${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setRecords(res.data);
				setShowTable(true);
			});
	};

	return (
		<>
			<Card className="no-print" sx={{ mb: 3 }}>
				<Box
					sx={{
						p: 2,
						m: 2,
					}}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<form onSubmit={handleSubmit}>
								<Stack direction="row" spacing={2}>
									<TextField
										id="department"
										select
										label="Department"
										sx={{ width: "25ch" }}
										value={deptName}
										onChange={(e) => setDeptName(e.target.value)}
									>
										<MenuItem key="All" value="All">
											All
										</MenuItem>
										{departments.map((row, idx) => {
											return (
												<MenuItem key={idx} value={row.dept_name}>
													{row.dept_name}
												</MenuItem>
											);
										})}
									</TextField>
									<TextField
										id="leave_type"
										select
										label="Leave Type"
										sx={{ width: "25ch" }}
										value={leaveType}
										onChange={(e) => setLeaveType(e.target.value)}
									>
										<MenuItem key="All" value="All">
											All
										</MenuItem>
										<MenuItem key="annual" value="annual">
											Annual
										</MenuItem>
										<MenuItem key="casual" value="casual">
											Casual
										</MenuItem>
										<MenuItem key="maternity" value="maternity">
											Maternity
										</MenuItem>
										<MenuItem key="no_pay" value="no_pay">
											No Pay
										</MenuItem>
									</TextField>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											required
											inputFormat="dd/MM/yyyy"
											label="Start Date"
											value={startDate}
											onChange={(newValue) => {
												setStartDate(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											required
											inputFormat="dd/MM/yyyy"
											label="End Date"
											value={endDate}
											onChange={(newValue) => {
												setEndDate(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
									<Button type="submit" variant="contained" color="secondary">
										Generate
									</Button>
								</Stack>
							</form>
							{/* <Stack>
								{showTable && (
									<h5 style={{ margin: 0, marginTop: "1em" }}>
										{records.length} record{records.length > 1 && "s"} found
									</h5>
								)}
							</Stack> */}
						</Grid>
					</Grid>
				</Box>
			</Card>

			<h3
				style={{
					textAlign: "center",
					marginTop: "2em",
					marginBottom: "0.25em",
				}}
				className="only-print"
			>
				Employee Leave Report for {deptName} Department
				{deptName === "All" && "s"}
			</h3>
			<h4
				style={{
					textAlign: "center",
					marginTop: "0.25em",
					marginBottom: "1em",
				}}
				className="only-print"
			>
				{leaveTypes[leaveType]} Leave{leaveType === "All" && "s"}{" "}
				{leaveType !== "All" && "Only"} - From {startDate.toDateString()} to{" "}
				{endDate.toDateString()}
			</h4>

			{showTable && (
				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Department</TableCell>
										<TableCell align="left">Employee ID</TableCell>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">Leave Type</TableCell>
										<TableCell align="left">Date</TableCell>
										<TableCell align="left">Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row, idx) => {
										let rec_date = new Date(row.date);
										if (rec_date >= startDate && rec_date <= endDate) {
											return (
												<TableRow
													key={idx}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
												>
													<TableCell component="th" scope="row">
														{row.dept_name}
													</TableCell>
													<TableCell align="left">{row.emp_id}</TableCell>
													<TableCell align="left">
														{row.first_name + " " + row.last_name}
													</TableCell>
													<TableCell
														align="left"
														sx={{ textTransform: "capitalize" }}
													>
														{row.leave_type}
													</TableCell>
													<TableCell align="left">
														{format(rec_date, "dd/MM/yyyy")}
													</TableCell>
													<TableCell
														align="left"
														sx={{ textTransform: "capitalize" }}
													>
														{row.status}
													</TableCell>
												</TableRow>
											);
										}
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			)}
		</>
	);
};

export default LeavesByDept;
