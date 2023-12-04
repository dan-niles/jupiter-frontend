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

const LeaveBalance = () => {
	const [departments, setDepartments] = useState([]);
	const [records, setRecords] = useState([]);

	const [deptName, setDeptName] = useState("All");
	const [leaveType, setLeaveType] = useState("All");

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
				window.configs.backendUrl + "/api/reports/leave-balance",
				{
					dept_name: deptName === "All" ? null : deptName,
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
									<Button type="submit" variant="contained" color="secondary">
										Generate
									</Button>
								</Stack>
							</form>
							<Stack>
								{showTable && (
									<h5 style={{ margin: 0, marginTop: "1em" }}>
										{records.length} record{records.length > 1 && "s"} found
									</h5>
								)}
							</Stack>
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
				Employee Leave Balance Report for {deptName} Department
				{deptName === "All" && "s"}
			</h3>

			{showTable && (
				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">Employee ID</TableCell>
										<TableCell align="left">Name</TableCell>
										<TableCell>Department</TableCell>
										<TableCell align="center">Year</TableCell>
										<TableCell align="center">Annual</TableCell>
										<TableCell align="center">Casual</TableCell>
										<TableCell align="center">Maternity</TableCell>
										<TableCell align="center">No Pay</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row, idx) => (
										<TableRow
											key={idx}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell align="left">{row.emp_id}</TableCell>
											<TableCell align="left">
												{row.first_name + " " + row.last_name}
											</TableCell>
											<TableCell component="th" scope="row">
												{row.dept_name}
											</TableCell>
											<TableCell align="center">{row.year}</TableCell>
											<TableCell align="center">
												<b>{row.annual}</b> / {row.alloc_annual}
											</TableCell>
											<TableCell align="center">
												<b>{row.casual}</b> / {row.alloc_casual}
											</TableCell>
											<TableCell align="center">
												<b>{row.maternity}</b> / {row.alloc_maternity}
											</TableCell>
											<TableCell align="center">
												<b>{row.no_pay}</b> / {row.alloc_no_pay}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			)}
		</>
	);
};

export default LeaveBalance;
