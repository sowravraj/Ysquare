import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box, FormControlLabel, Checkbox, IconButton, CardMedia, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import captchaImage from "../public/assets/captcha1.png"
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { LoginApi } from './service/API'; // Import the LoginApi function

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading status

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (password && captcha) { // Basic validation for example purposes
            setLoading(true); // Set loading to true before API call
            try {
                const response = await LoginApi({ email, password });
                console.log("Sign In successful:", response.data);
    
                // Store user authentication status (token or flag) in local storage
                localStorage.setItem('auth', 'true'); 
    
                window.location.href = "https://www.ysquaretechnology.com/";
            } catch (error) {
                console.error("Sign In error:", error.response?.data || error.message);
                alert("Please check your credentials and captcha.");
            } finally {
                setLoading(false); // Set loading to false after API call completes
            }
        } else {
            alert("Please fill in all fields and verify the captcha.");
        }
    };
    

    const handleCaptchaRefresh = () => {
        // Logic to refresh the captcha; for demonstration purposes, we reload the image
        setCaptcha('');
    };

    return (
        <Container
            sx={{
                maxWidth: {
                    xs: '375px',  // For mobile screens
                    sm: '1440px', // For small and larger screens
                },
                maxHeight: {
                    xs: '828px',  // For mobile screens
                    sm: '784px',  // For small and larger screens
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', // Add this to position spinner within form
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
            <Box sx={{ textAlign: "center", mt: { xs: "100px", lg: "100px" }, mb: { xs: "64px", lg: "64px" } }}>
                <Typography
                    sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '18px', md: '20px' },
                        lineHeight: { xs: '22px', md: '24.2px' },
                        color: '#111111',
                    }}
                >
                    Sign In to Ysquare Technology ❇️
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSignIn}
                sx={{
                    width: { xs: '343px', lg: '400px' },
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        width: '100%',
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        width: '100%',
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />
                
                {/* No longer mention phone as password */}
                
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mb: { xs: "29px", lg: "29px" }
                    }}
                >
                    <CardMedia
                        component="img"
                        image={captchaImage}
                        alt="Captcha"
                        sx={{
                            height: '50px',
                            width: '190px',
                        }}
                    />
                    <IconButton
                        aria-label="refresh captcha"
                        onClick={handleCaptchaRefresh}
                        sx={{
                            ml: 2, // Add some margin to the left of the icon for spacing
                        }}
                    >
                        <CachedOutlinedIcon
                            sx={{
                                height: '30px',
                                width: '30px',
                            }}
                        />
                    </IconButton>
                </Box>
                <TextField
                    label="Captcha"
                    type="text"
                    variant="outlined"
                    required
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    sx={{
                        width: '100%',
                        mb: { xs: "34px", lg: "34px" },
                        height: '46px',
                        borderRadius: '4px',
                    }}
                />
                <FormControlLabel
                    sx={{ mb: { xs: "20px", lg: "20px" } }}
                    control={
                        <Checkbox
                            value="remember"
                            color="default"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
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
                            Remember me
                        </Typography>
                    }
                />
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
                    disabled={loading || !(email && password && captcha)} // Disable if loading or fields are empty
                >
                    Sign In
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
                        Don't have an account?{' '}
                        <Link to="/" style={{ color: '#111111', textDecoration: 'underline' }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
