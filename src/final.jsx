import React, { useState } from 'react';
import { Container, TextField, Typography, FormControlLabel, Checkbox, Button, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from './service/API'; // Import the RegisterApi function

const Final = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState('Ysq!Tech#123');
    const [email, setEmail] = useState('letstalk@ysquaretechnology.com');
    const [phoneNo, setPhoneNo] = useState('9790564186');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Reset password error
        setPasswordError('');

        // Validate password length
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }

        if (isChecked) {
            setLoading(true);
            console.log("Email:", email, "Password:", password, "Phone No:", phoneNo); // Log for debugging
            try {
                await RegisterApi({
                    name: phoneNo, // If you want to use phoneNo as the name, it's okay
                    email: email,
                    password: password, // Use the password input
                });
                navigate("/signin");
            } catch (error) {
                console.error("Registration error:", error); // Log error for debugging
                alert("Registration failed. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please agree to Terms and Privacy Policy to continue.");
        }
    };

    const isFormValid = () => {
        return email && password.length >= 8 && phoneNo && isChecked;
    };

    return (
        <Container
            sx={{
                maxWidth: {
                    xs: '375px',
                    sm: '1440px',
                },
                maxHeight: {
                    xs: '828px',
                    sm: '784px',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ textAlign: 'center', mt: { xs: "148px", lg: "148px" }, mb: { xs: "64px", lg: "64px" } }}>
                <Typography 
                    sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '18px', md: '20px' },
                        lineHeight: { xs: '22px', md: '24.2px' },
                        color: '#111111',
                    }}
                >
                    Welcome to Ysquare Technology ❇️
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: { xs: '343px', lg: '400px' }, 
                    height: { xs: '334px', lg: '334px' },  
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <CircularProgress color="primary" />
                    </Box>
                )}

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    required
                    sx={{
                        width: '100%',
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    variant="outlined"
                    required
                    error={password.length < 8}
                    helperText={password.length < 8 ? 'Password must be at least 8 characters.' : null}
                    sx={{
                        width: '100%',
                        mb: password.length < 8 ? '60px' : '34px',
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />
                <TextField
                    label="Phone No."
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    variant="outlined"
                    required
                    sx={{
                        width: '100%',
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <FormControlLabel
                        sx={{ mb: { xs: "29px", lg: "29px" } }}
                        control={
                            <Checkbox 
                                value="remember" 
                                color="default" 
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    lineHeight: '14.52px',
                                    color: '#989898',
                                }}
                            >
                                I agree to Terms and Privacy Policy
                            </Typography>
                        }
                    />
                </Box>
                <Button                 
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                        backgroundColor: 'black',
                        color: 'white',
                        textTransform: "capitalize", // Correctly capitalizes the button text
                        fontWeight: 900, // Set font weight to 900
                    }}
                    disabled={!isFormValid() || loading}
                >
                    Sign Up
                </Button>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '14.52px',
                            textAlign: 'left',
                            color: '#111111',
                        }}
                    >
                        Already have an account?{' '}
                        <Link to="/signin" style={{ color: '#111111', textDecoration: 'underline' }}>
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Final;
