import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const initialFormData = {
    name: '',
    age: '',
    gender: '',
};

const initialTableData = [
    { id: 1, name: 'John', age: 25, gender: 'Male' },
    { id: 2, name: 'Jane', age: 30, gender: 'Female' },
];

const MixFormUser = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [tableData, setTableData] = useState(initialTableData);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Add new data to the tableData
        setTableData([...tableData, { ...formData, id: tableData.length + 1 }]);
        // Reset the form data
        setFormData(initialFormData);
    };

    return (
        <div>
            {/* Form 1 */}
            <form>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                />
                <FormControl>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>

            {/* Table 1 */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Form 2 */}
            {/* Similar structure as Form 1, but with different state and handlers */}

            {/* Table 2 */}
            {/* Similar structure as Table 1, but with different state and data */}
        </div>
    );
};

export default MixFormUser;
