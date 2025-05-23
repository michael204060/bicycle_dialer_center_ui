import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import BicycleList from './components/BicycleList';
import UserList from './components/UserList';
import RentalList from './components/RentalList';
import BicycleForm from './components/BicycleForm';
import RentalAction from './components/RentalAction';
import UserForm from './components/UserForm';

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <div>
                <AppBar position="static" style={{ backgroundColor: '#ff8c00' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Bicycle Dealer Center
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Bicycles</Button>
                        <Button color="inherit" component={Link} to="/users">Users</Button>
                        <Button color="inherit" component={Link} to="/rentals">Rentals</Button>
                        <Button color="inherit" component={Link} to="/add-bicycle">Add Bicycle</Button>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '40px' }}>
                    <Routes>
                        <Route path="/" element={<BicycleList />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/rentals" element={<RentalList />} />
                        <Route path="/add-bicycle" element={<BicycleForm />} />
                        <Route path="/edit-bicycle/:id" element={<BicycleForm />} />
                        <Route path="/add-user" element={<UserForm />} />
                        <Route path="/edit-user/:id" element={<UserForm />} />
                        <Route path="/rent-action/:actionType" element={<RentalAction />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

export default App;