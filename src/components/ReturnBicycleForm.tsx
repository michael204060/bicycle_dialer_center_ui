import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography,
    Autocomplete, TextField, Button,
    CircularProgress, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, returnBicycle, User } from '../api/bicycleApi';

const ReturnBicycleForm: React.FC = () => {
    const { bicycleId } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser || !bicycleId) return;

        setLoading(true);
        setError(null);
        try {
            await returnBicycle(selectedUser.id!, parseInt(bicycleId));
            navigate('/');
        } catch (error: any) {
            console.error('Error returning bicycle:', error);
            setError(error.message || 'Failed to return bicycle');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ff8c00' }}>
                    Return Bicycle
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        options={users}
                        getOptionLabel={(user) => `${user.username} (${user.email})`}
                        value={selectedUser}
                        onChange={(_, newValue) => setSelectedUser(newValue)}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select User"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        loading={loading}
                    />

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
                            disabled={loading || !selectedUser}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Return'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ReturnBicycleForm;