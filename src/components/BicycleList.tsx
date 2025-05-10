import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, IconButton, Box, Typography
} from '@mui/material';
import { Edit, Delete, DirectionsBike, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getBicycles, deleteBicycle, Bicycle } from '../api/bicycleApi';

const BicycleList: React.FC = () => {
    const [bicycles, setBicycles] = useState<Bicycle[]>([]);
    const [searchBrand, setSearchBrand] = useState('');
    const [searchModel, setSearchModel] = useState('');

    useEffect(() => {
        fetchBicycles();
    }, []);

    const fetchBicycles = async () => {
        try {
            const data = await getBicycles(searchBrand, searchModel);
            setBicycles(data);
        } catch (error) {
            console.error('Error fetching bicycles:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteBicycle(id);
            fetchBicycles();
        } catch (error) {
            console.error('Error deleting bicycle:', error);
        }
    };

    return (
        <div>
            <Box display="flex" alignItems="center" mb={3}>
                <DirectionsBike fontSize="large" style={{ color: '#ff8c00', marginRight: '10px' }} />
                <Typography variant="h4" component="h1" style={{ color: '#ff8c00' }}>
                    Bicycles
                </Typography>
            </Box>

            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    label="Search by Brand"
                    variant="outlined"
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                />
                <TextField
                    label="Search by Model"
                    variant="outlined"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={fetchBicycles}
                    style={{ backgroundColor: '#ff8c00', color: 'white' }}
                >
                    Search
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setSearchBrand('');
                        setSearchModel('');
                        fetchBicycles();
                    }}
                >
                    Clear
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead style={{ backgroundColor: '#ff8c00' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Brand</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Model</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Assigned User</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bicycles.map((bicycle) => (
                            <TableRow key={bicycle.id} hover>
                                <TableCell>{bicycle.brand}</TableCell>
                                <TableCell>{bicycle.model}</TableCell>
                                <TableCell>{bicycle.type}</TableCell>
                                <TableCell>${bicycle.price?.toFixed(2)}</TableCell>
                                <TableCell>
                                    {bicycle.assignedUser ? (
                                        <Box display="flex" alignItems="center">
                                            <Person style={{ marginRight: '5px', color: '#ff8c00' }} />
                                            {bicycle.assignedUser.username}
                                        </Box>
                                    ) : 'None'}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={`/add-bicycle?id=${bicycle.id}`}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(bicycle.id!)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BicycleList;