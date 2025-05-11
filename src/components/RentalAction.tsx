import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Typography, Box,
    FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getBicycles, getUsers, rentBicycle, returnBicycle, Bicycle, User
} from '../api/bicycleApi';

const RentalAction: React.FC = () => {
    const { actionType } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [bicycles, setBicycles] = useState<Bicycle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | ''>('');
    const [bicycleId, setBicycleId] = useState<number | ''>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [userData, bicycleData] = await Promise.all([
                    getUsers(),
                    getBicycles()
                ]);
                setUsers(userData);
                setBicycles(bicycleData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !bicycleId) return;

        setLoading(true);
        setError(null);
        try {
            if (actionType === 'rent') {
                await rentBicycle(userId, bicycleId);
            } else if (actionType === 'return') {
                await returnBicycle(userId, bicycleId);
            }
            navigate('/rentals');
        } catch (error: any) {
            console.error(`Error ${actionType}ing bicycle:`, error);
            setError(error.message || `Failed to ${actionType} bicycle`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ff8c00' }}>
                    {actionType === 'rent' ? 'Rent Bicycle' : 'Return Bicycle'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {loading && !users.length ? (
                    <CircularProgress style={{ color: '#ff8c00' }} />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>User</InputLabel>
                            <Select
                                value={userId}
                                onChange={(e) => setUserId(Number(e.target.value))}
                                label="User"
                                required
                            >
                                {users.map(user => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Bicycle</InputLabel>
                            <Select
                                value={bicycleId}
                                onChange={(e) => setBicycleId(Number(e.target.value))}
                                label="Bicycle"
                                required
                            >
                                {bicycles.map(bicycle => (
                                    <MenuItem key={bicycle.id} value={bicycle.id}>
                                        {bicycle.brand} {bicycle.model}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box mt={3} display="flex" justifyContent="space-between">
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/rentals')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: '#ff8c00', color: 'white' }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : actionType === 'rent' ? 'Rent' : 'Return'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default RentalAction;