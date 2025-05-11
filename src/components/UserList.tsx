import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Box, IconButton, Button
} from '@mui/material';
import { Person, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser, User } from '../api/bicycleApi';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <Box display="flex" alignItems="center" mb={3}>
                <Person fontSize="large" style={{ color: '#ff8c00', marginRight: '10px' }} />
                <Typography variant="h4" component="h1" style={{ color: '#ff8c00' }}>
                    Users
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/add-user"
                    style={{
                        backgroundColor: '#ff8c00',
                        color: 'white',
                        marginLeft: 'auto'
                    }}
                >
                    Add User
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead style={{ backgroundColor: '#ff8c00' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={`/edit-user/${user.id}`}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(user.id!)}
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

export default UserList;