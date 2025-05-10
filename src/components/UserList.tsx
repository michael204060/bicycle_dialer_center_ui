import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Box
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { getUsers, User } from '../api/bicycleApi';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Box display="flex" alignItems="center" mb={3}>
                <Person fontSize="large" style={{ color: '#ff8c00', marginRight: '10px' }} />
                <Typography variant="h4" component="h1" style={{ color: '#ff8c00' }}>
                    Users
                </Typography>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead style={{ backgroundColor: '#ff8c00' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;