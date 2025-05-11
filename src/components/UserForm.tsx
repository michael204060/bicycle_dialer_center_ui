import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Typography, Box,
    CircularProgress, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUsers, User } from '../api/bicycleApi';

const UserForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User>({
        username: '',
        email: ''
    });

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const users = await getUsers();
                const foundUser = users.find(u => u.id === parseInt(id));
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await updateUser(parseInt(id), user);
            } else {
                await createUser(user);
            }
            navigate('/users');
        } catch (error: any) {
            console.error('Error saving user:', error);
            setError(error.message || 'Failed to save user');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading && !user.username) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress style={{ color: '#ff8c00' }} />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ff8c00' }}>
                    {id ? 'Edit User' : 'Add New User'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/users')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#ff8c00', color: 'white' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default UserForm;