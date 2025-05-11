import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Container, Typography, Box,
    FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBicycles, createBicycle, updateBicycle, getUsers, Bicycle, User } from '../api/bicycleApi';

const BicycleForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bicycle, setBicycle] = useState<Bicycle>({
        brand: '',
        model: '',
        type: '',
        price: 0,
        assignedUserId: undefined
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [userData, bicycles] = await Promise.all([
                    getUsers(),
                    id ? getBicycles() : Promise.resolve([])
                ]);
                setUsers(userData);

                if (id && bicycles.length > 0) {
                    const foundBicycle = bicycles.find(b => b.id === parseInt(id));
                    if (foundBicycle) {
                        setBicycle({
                            ...foundBicycle,
                            assignedUserId: foundBicycle.assignedUser?.id || foundBicycle.assignedUserId
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await updateBicycle(parseInt(id), bicycle);
            } else {
                await createBicycle(bicycle);
            }
            navigate('/');
        } catch (error: any) {
            console.error('Error saving bicycle:', error);
            setError(error.message || 'Failed to save bicycle');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBicycle(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleUserChange = (userId: number | '') => {
        setBicycle(prev => ({
            ...prev,
            assignedUserId: userId === '' ? undefined : userId
        }));
    };

    if (loading && !bicycle.brand) {
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
                    {id ? 'Edit Bicycle' : 'Add New Bicycle'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={bicycle.brand}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={bicycle.model}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Type"
                        name="type"
                        value={bicycle.type}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={bicycle.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Assigned User</InputLabel>
                        <Select
                            value={bicycle.assignedUserId || ''}
                            onChange={(e) => handleUserChange(Number(e.target.value))}
                            label="Assigned User"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {users.map(user => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.username} ({user.email})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/')}
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

export default BicycleForm;