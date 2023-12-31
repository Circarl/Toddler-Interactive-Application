import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../utils/firebase";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const defaultTheme = createTheme();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = (e) => {
    e.preventDefault();
    login(e, email, password);
  };

  const guestLogin = "guest@gmail.com";
  const guestPassword = "guestPassword@gmail.com";

  const handleGuestLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, guestLogin, guestPassword);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log("error guest", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          height="88vh"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.tapestry.info/wp-content/uploads/sites/2/2020/10/shutterstock_1448047388-wecompress.com_-2048x1365.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid height="88vh" xs={12} sm={8} md={5} component={Paper}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={!showPassword ? "password" : "text"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={showPassword}
                    onChange={toggleShowPassword}
                    color="primary"
                  />
                }
                label="Show Password"
              />
              <Button
                fullWidth
                variant="contained"
                onClick={(event) => handleGuestLogin(event)}
              >
                Guest Login
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink variant="body2" to="/signup">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
