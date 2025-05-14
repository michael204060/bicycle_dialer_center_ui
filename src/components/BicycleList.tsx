import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, IconButton, Box, Typography
} from '@mui/material';
import { Edit, Delete, DirectionsBike, Person, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getBicycles, deleteBicycle, Bicycle, getRentals } from '../api/bicycleApi';

const BicycleList: React.FC = () => {
    const [bicycles, setBicycles] = useState<Bicycle[]>([]);
    const [rentals, setRentals] = useState<any[]>([]);
    const [searchBrand, setSearchBrand] = useState('');
    const [searchModel, setSearchModel] = useState('');

    useEffect(() => {
        fetchBicycles();
        fetchRentals();
    }, []);

    const fetchBicycles = async () => {
        try {
            const data = await getBicycles(searchBrand, searchModel);
            setBicycles(data);
        } catch (error) {
            console.error('Error fetching bicycles:', error);
        }
    };

    const fetchRentals = async () => {
        try {
            const data = await getRentals();
            setRentals(data);
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    const isBicycleRented = (bicycleId: number) => {
        return rentals.some(rental =>
            rental.bicycleId === bicycleId && !rental.rentEndTime
        );
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


            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                    <TextField
                        label="Search by Brand"
                        variant="outlined"
                        value={searchBrand}
                        onChange={(e) => setSearchBrand(e.target.value)}
                        size='small'
                    />
                    <TextField
                        label="Search by Model"
                        variant="outlined"
                        value={searchModel}
                        onChange={(e) => setSearchModel(e.target.value)}
                        size='small'
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

                <Button
                    variant="contained"
                    component={Link}
                    to="/add-bicycle"
                    style={{ backgroundColor: '#ff8c00', color: 'white' }}
                    startIcon={<Add />}
                >
                    Add Bicycle
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
                        {bicycles.map((bicycle) => {
                            const isRented = isBicycleRented(bicycle.id!);
                            return (
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
                                            to={`/edit-bicycle/${bicycle.id}`}
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
                                        {isRented ? (
                                            <IconButton
                                                component={Link}
                                                to={`/return-bicycle/${bicycle.id}`}
                                                style={{ color: '#f44336' }}
                                            >
                                                <DirectionsBike />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                component={Link}
                                                to={`/rent-bicycle/${bicycle.id}`}
                                                style={{ color: '#4caf50' }}
                                            >
                                                <DirectionsBike />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BicycleList;