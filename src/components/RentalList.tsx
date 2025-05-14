import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Box, Chip
} from '@mui/material';
import { DirectionsBike, Person, Event, EventAvailable } from '@mui/icons-material';
import { getRentals, Rental } from '../api/bicycleApi';

const RentalList: React.FC = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const data = await getRentals();
                setRentals(data);
            } catch (error) {
                console.error('Error fetching rentals:', error);
            }
        };

        fetchRentals();
    }, []);

    return (
        <div>
            <Box display="flex" alignItems="center" mb={3}>
                <DirectionsBike fontSize="large" style={{ color: '#ff8c00', marginRight: '10px' }} />
                <Typography variant="h4" component="h1" style={{ color: '#ff8c00' }}>
                    Rentals
                </Typography>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead style={{ backgroundColor: '#ff8c00' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Bicycle</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Rent Start</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Rent End</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentals.map((rental, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Person style={{ marginRight: '5px', color: '#ff8c00' }} />
                                        {rental.username}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <DirectionsBike style={{ marginRight: '5px', color: '#ff8c00' }} />
                                        {rental.bicycleBrand} {rental.bicycleModel}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Event style={{ marginRight: '5px', color: '#ff8c00' }} />
                                        {new Date(rental.rentStartTime).toLocaleString()}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {rental.rentEndTime ? (
                                        <Box display="flex" alignItems="center">
                                            <EventAvailable style={{ marginRight: '5px', color: '#ff8c00' }} />
                                            {new Date(rental.rentEndTime).toLocaleString()}
                                        </Box>
                                    ) : 'Not returned'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={rental.rentEndTime ? 'Completed' : 'Active'}
                                        color={rental.rentEndTime ? 'success' : 'primary'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RentalList;