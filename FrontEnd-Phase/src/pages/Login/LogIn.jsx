import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import logo from "../../images/LogIn/LOGO.jfif";
import AuthContext from "../../AuthService.jsx";
import {
  ModalCustomLogin,
  ConfirmCodeModalLogIn,
  ForgetPasswordModal,
} from "../../components/ModalTest/ModalCom";

import "./LogIn.css";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../components/Toast/ToastCustom";
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";
import { IP } from "../../App.jsx";
import axios from "axios";
import { LinearColor } from "../../components/ProfileComponents/HistoryBuyComp/HistoryBuyComponent.jsx";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [loginBg, setLogInBg] = useState(undefined);
  let { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [username2, setUsername2] = useState("");
  const [password, setPassword] = useState("");
  const [openModalChild, setOpenModalChild] = React.useState(false);
  const [openModalForget, setOpenModalForget] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [receivedCode, setReceivedCode] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const inputRefs = useRef([]);
  useEffect(() => {
    setReceivedCode(verificationCode.join(""));
  }, [verificationCode]);
  //parent and child modal

  const handleCloseChild = () => {
    setOpenModalChild(false);
  };
  async function handleSendUserName() {
    if (username === undefined || username === "") {
      warningMessage("لطفا نام کاربری خود را وارد کنید!");
      return;
    }
    try {
      const post = { username: username };
      const response = await axios.post(
        `${IP}/user/forget_password_request/`,
        post
      );
      if (response.status === 200) {
        successMessage(
          `  کد 6 رقمی به شماره موبایل ${response.data.number}با موفقیت ارسال شد.`
        );
        setUsername2(username);
        setUsername("");
        setPhoneNumber(response.data.number);
        setOpenModalChild(true);
      }
    } catch (e) {
      errorMessage("مشکل در اتصال به سرور :(");
    }
  }

  const handleOpenParentCloseChild = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setOpenModalChild(false);
  };

  const handleCloseAndDeleteForget = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setUsername2("");
    setUsername("");
    setOpenModalForget(false);
  };
  const handleCloseChildOpenForget = () => {
    setOpenModalForget(true);
    setVerificationCode(["", "", "", "", "", ""]);
    setUsername("");
    setOpenModalChild(false);
  };
  const handleCloseForgetOpenParent = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setOpenModalForget(false);
  };

  //verification code

  const handleChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move cursor to next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      verificationCode[index] === ""
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleButtonClick = () => {
    if (!timerRunning) {
      setTimerSeconds(120); // Reset timer to 2 minutes
      setTimerRunning(true);
      setVerificationCode(["", "", "", "", "", ""]);

      inputRefs.current[0].focus(); // Focus on the first input
      // Start the timer
      const timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      // Stop the timer when it reaches 0
      const timeoutDuration = timerSeconds * 1000; // Store the initial duration
      setTimeout(() => {
        clearInterval(timerInterval);
        setTimerRunning(false);
      }, timeoutDuration);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  //received code number

  async function handleSubmitReceivedCode(event) {
    event.preventDefault();
    const code = verificationCode.join("");
    if (!code) {
      warningMessage("لطفا کد دریافتی را وارد کنید!");
      return;
    } else if (code.length !== 6 || !/^\d+$/.test(code)) {
      // Code is invalid
      errorMessage("لطفا کد 6 رقمی معتبر وارد کنید!");
      return;
    }
    var verifyNumber = parseInt(code);
    const post = { entered_code: verifyNumber, mobile_number: phoneNumber };
    try {
      const response = await axios.post(`${IP}/user/verify_otp/`, post);
      if (response.status === 200) {
        successMessage("کد وارد شده صحیح می‌باشد.");
        handleButtonClick();
        handleCloseChildOpenForget();
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.error === "Invalid verification code") {
        errorMessage("کد دریافتی مطابقت ندارد لطفا مجدد امتحان کنید!");
        handleButtonClick();
      } else {
        errorMessage("مشکل در اتصال به سرور :(");
      }
    }
  }

  const handleCloseChildAndDelete = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setOpenModalChild(false);
  };
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (username === "" || username == null) {
      warningMessage("لطفا نام‌کاربری خود را وارد کنید!");
      return;
    } else if (password === "" || password === null) {
      warningMessage("لطفا رمز ورود خود را وارد کنید!");
      return;
    }
    const post = { username: username, password: password };

    login(post)
      .then((resualt) => {
        if (resualt === "success") {
          successMessage("شما با موفقیت وارد شدید.");
          navigate("/");
          setUsername("");
          setPassword("");
          return;
        } else if (resualt === "password") {
          errorMessage("رمز عبور اشتباه است!");
          setPassword("");
          return;
        } else if (resualt === "username") {
          errorMessage("نام کاربری یافت نشد :( !");
          setUsername("");
          return;
        } else if (resualt === "wrong") {
          errorMessage("اطلاعات شما یافت نشد!");
          setUsername("");
          setPassword("");
          return;
        }
      })
      .catch((error) => {
        errorMessage("مشکل اتصال به سرور!");
      });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  async function handleGetLogInBg() {
    try {
      const response = await axios.get(`${IP}/user/log_img`);
      if (response.status == 200) {
        setLogInBg(response.data);
        console.log(response.data);
      }
    } catch (e) {
      errorMessage("خطا در اتصال به شبکه!");
    }
  }
  useEffect(() => {
    handleGetLogInBg();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <ToastContainerCustom />
        <ConfirmCodeModalLogIn
          receivedCode={receivedCode}
          phoneNumber={phoneNumber}
          openChild={openModalChild}
          handleCloseChild={handleCloseChild}
          handleOpenParentCloseChild={handleOpenParentCloseChild}
          handleSubmitCheckReceivedCode={handleSubmitReceivedCode}
          handleCloseChildAndDelete={handleCloseChildAndDelete}
        >
          <Box className="verificationInputsParent">
            {verificationCode.map((digit, index) => (
              <input
                id={`inputMini${index}`}
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="verificationInputs"
                autoFocus={index === 0}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            width={"100%"}
            marginTop={2}
          >
            <p
              id="timer-received-code"
              onClick={handleButtonClick}
              disabled={timerRunning}
            >
              {timerRunning
                ? `زمان باقی‌مانده تا ارسال مجدد ${formattedTime()}`
                : "دریافت مجدد کد تایید"}
            </p>
          </Box>
        </ConfirmCodeModalLogIn>
        <ForgetPasswordModal
          openForget={openModalForget}
          handleCloseForget={handleCloseAndDeleteForget}
          handleCloseForgetOpenParent={handleCloseForgetOpenParent}
          usernameMain={username2}
        />
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          component={Paper}
          elevation={6}
          square
          display={"grid"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <img src={logo} alt="logo" className="logo-size"></img>
            <Typography component="h1" variant="h5" className="custom-font">
              ورود به بیدوین
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "5px 0",
                }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  dir="ltr"
                  id="input-with-sx"
                  label="User name:"
                  variant="standard"
                  color="success"
                  className="custom-font"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "5px 0",
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <TextField
                  dir="ltr"
                  id="outlined-adornment-password"
                  label="Password:"
                  variant="standard"
                  color="success"
                  type={showPassword ? "text" : "password"}
                  size="medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 0",
                }}
              >
                <FormControlLabel
                  style={{ margin: 0 }}
                  control={<Checkbox value="remember" color="success" />}
                  label="مرا به خاطر بسپار"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "5px 0",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className="custom-color"
                  sx={{}}
                  size="large"
                  style={{ width: 248 }}
                >
                  ورود
                </Button>
              </Box>

              <Grid container sx={{ marginTop: 2, marginBottom: 1 }}>
                <Grid item xs>
                  رمز خود را فراموش کرده‌اید؟
                  <span
                    variant="body2"
                    style={{ marginRight: 5 }}
                    className="custom-link"
                    onClick={handleSendUserName}
                  >
                    کلیک کنید
                  </span>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  قبلا ثبت‌نام نکرده‌اید؟
                  <NavLink
                    to={"/signup"}
                    variant="body2"
                    className="custom-link equal"
                  >
                    عضویت
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={8}
          sx={{
            backgroundImage: `url(${
              loginBg === undefined ? "" : loginBg.login
            })`,
            backgroundRepeat: "no-repeat",

            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "#fff",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
