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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import "../../theme/print.css";

// ----------------------------------------------------------------------

function createData(paygrade, annual, casual, maternity, nopay) {
	return { paygrade, annual, casual, maternity, nopay };
}

const rows = [
	createData("Level 1", 14, 12, 10, 50),
	createData("Level 2", 14, 12, 10, 50),
	createData("Level 3", 14, 12, 10, 50),
	createData("Level 4", 14, 12, 10, 50),
];

const accessToken = sessionStorage.getItem("access-token");

const CustomReport = () => {
	const [customAttributes, setCustomAttributes] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [options, setOptions] = useState([]);
	const [records, setRecords] = useState([]);
	const [tableColumns, setTableColumns] = useState([]);
	const [tableColumnKeys, setTableColumnKeys] = useState([]);

	const [deptName, setDeptName] = useState("All");

	const [showTable, setShowTable] = useState(false);

	const getCustomAttributes = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/custom_attributes/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				setCustomAttributes(res.data);
			});
	};

	const getDepartments = () => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + "/api/department/", {
				headers: {
					"access-token": `${accessToken}`,
				},
			})
			.then((res) => {
				setDepartments(res.data);
			});
	};

	useEffect(() => {
		getDepartments();
		getCustomAttributes();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (options.length === 0) {
			toast.error("Please select at least one option");
			return;
		}
		setTableColumns([]);
		setTableColumnKeys([]);
		options.forEach((item) => {
			let el = customAttributes.find((el) => {
				return el.attr_name == item;
			});
			setTableColumns((prev) => {
				return [...prev, el.alias].sort();
			});
			setTableColumnKeys((prev) => {
				return [...prev, el.attr_name].sort();
			});
		});
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + "/api/reports/custom-report",
				{
					options: options.join(", "),
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
			<Toaster className="no-print" position="top-right" reverseOrder={true} />
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
								<Stack direction="row" spacing={2} alignItems="center">
									<TextField
										id="department"
										select
										label="Department"
										sx={{ width: "25ch" }}
										value={deptName}
										onChange={(e) => {
											setDeptName(e.target.value);
										}}
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
									<FormGroup>
										<Stack direction="row" spacing={1}>
											{customAttributes.map((row, idx) => {
												return (
													<FormControlLabel
														key={idx}
														control={<Checkbox />}
														label={row.alias}
														name="form_options"
														value={row.attr_name}
														onChange={(e) => {
															setOptions((prev) => {
																if (prev.includes(e.target.value)) {
																	const index = prev.indexOf(e.target.value);
																	prev.splice(index, 1);
																	return prev.sort();
																}
																return [...prev, e.target.value].sort();
															});
														}}
													/>
												);
											})}
										</Stack>
									</FormGroup>
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
				style={{ textAlign: "center", marginTop: "2em", marginBottom: "1em" }}
				className="only-print"
			>
				Custom Attributes Report for {deptName} Department
				{deptName === "All" && "s"}
			</h3>

			{showTable && (
				<Card>
					<Scrollbar>
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Department</TableCell>
										<TableCell>Employee ID</TableCell>
										<TableCell align="left">Name</TableCell>
										{tableColumns.map((el) => {
											return <TableCell align="left">{el}</TableCell>;
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{records.map((row) => (
										<TableRow
											key={row.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.dept_name}
											</TableCell>
											<TableCell>{row.emp_id}</TableCell>
											<TableCell align="left">
												{row.first_name + " " + row.last_name}
											</TableCell>
											{tableColumnKeys.map((el) => {
												return <TableCell align="left">{row[el]}</TableCell>;
											})}
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

export default CustomReport;
