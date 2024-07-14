import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TtySharpIcon from "@mui/icons-material/TtySharp";
//End Icons

//Components
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";
import { IP } from "../../App.jsx";

//End Components

//Local Components

import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../components/Toast/ToastCustom";
import { AuthenticationModal } from "../../components/ModalTest/ModalCom";

//End Local Component

import "./SignUpStyle.css";

const SignUp = () => {
  const [registerBg, setRegisterBg] = useState(undefined);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [openModalAuthen, setOpenModalAuthen] = React.useState(false);
  const [state, setState] = React.useState(1);

  const [receivedCode, setReceivedCode] = useState("");

  const handleChangeCompPhone = () => {
    setState(1);
  };
  const handleChangeCompCode = () => {
    setState(2);
  };
  const handleChangeCompInfo = () => {
    setState(3);
  };

  //Authentication Modal
  const handleCloseAuthenAndDelete = () => {
    setNationalCode("");
    setOpenModalAuthen(false);
  };
  const handleOpenAuthenModal = () => {
    setOpenModalAuthen(true);
  };
  const handleCloseAuthenModalAndDeleteAll = () => {
    setOpenModalAuthen(false);
    setName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setUserName("");
    setNationalCode("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
  //End Authentiication

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleChangePhoneNumber = (event) => {
    const inputValue = event.target.value;
    // Check if the input value is numeric
    if (!isNaN(inputValue) || inputValue === "") {
      setPhoneNumber(inputValue);
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };

  const handleChangeUsername = (event) => {
    const input = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (input === "" || regex.test(input)) {
      setUserName(input);
    } else {
      // setPhoneNumber("");

      errorMessage("لطفا تنها از اعداد و ارقام انگلیسی استفاده کنید!");
    }
  };
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    // Regular expression for validating email addresses
    const emailRegex = /^[a-zA-Z0-9.@]+$/;

    // Check if the input matches the email regular expression
    if (emailValue === "" || emailRegex.test(emailValue)) {
      setEmail(emailValue);
    } else {
      errorMessage("لطفا ایمیل خود را به فرم صحیح وارد کنید!");
    }
  };
  const handleChangeNationalCode = (event) => {
    const input = event.target.value;
    // Only allow numbers
    const regex = /^[0-9\b]+$/;
    if (input === "" || regex.test(input)) {
      if (input.length === 11) {
        errorMessage("کد ملی شما یک عدد ۱۰ رقمی می‌باشد!");
        return;
      } else {
        setNationalCode(input);
      }
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangePassword = (event) => {
    const input = event.target.value;
    // Only allow if the input matches all validation criteria
    const regex = /^[A-Za-z\d!@#$%&*^]+$/;
    if (input === "" || regex.test(input)) {
      setPassword(input);
    }
  };
  const validateUsername = (username) => {
    // Regular expression for validating username: at least 6 characters consisting of letters and numbers
    const regex = /^[a-zA-Z0-9]{6,}$/;
    return regex.test(username);
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const navigate = useNavigate();
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (name === "" || name == null) {
      errorMessage("لطفا نام خود را وارد کنید!");
      return;
    } else if (name.length < 3) {
      warningMessage("نام شما حداقل باید دارای ۳ حرف باشد! ");
      return;
    } else if (lastName === "" || lastName == null) {
      errorMessage("لطفا نام خانوادگی خود را وارد کنید!");
      return;
    } else if (lastName.length < 3) {
      warningMessage("نام خانوادگی شما حداقل باید دارای ۳ حرف باشد! ");
      return;
    } else if (userName === "" || userName == null) {
      errorMessage("لطفا نام‌کاربری خود را وارد کنید!");
      return;
    } else if (!validateUsername(userName)) {
      warningMessage("نام‌کاربری شما حداقل باید دارای ۶ حرف باشد! ");
      return;
    } else if (email === "" || email == null) {
      errorMessage("لطفا آدرس ایمیل خود را وارد کنید!");
      return;
    } else if (!validateEmail(email)) {
      errorMessage("لطفا آدرس ایمیل معتبر وارد کنید!");
      return;
    } else if (password === "" || password == null) {
      errorMessage("لطفا یک رمز عبور وارد کنید!");
      return;
    } else if (password.length < 8) {
      warningMessage("رمز عبور شما حداقل باید دارای ۸ حرف باشد!");
      return;
    } else if (password !== confirmPassword) {
      errorMessage("رمز عبور و تکرار رمز عبور مشابه نمی‌باشند!");
      return;
    } else {
      successMessage("اطلاعات اولیه با موفقیت ثبت شد.");
      handleOpenAuthenModal();
    }
  };

  async function handleSubmitAuthentication(event) {
    event.preventDefault();
    const post = {
      username: userName,
      name: name,
      last_name: lastName,
      password: password,
      password2: confirmPassword,
      email: email,
      phone: phoneNumber,
      national_code: nationalCode,
    };
    try {
      const response = await axios.post(`${IP}/user/signup/`, post);
      if (response.status === 201) {
        successMessage("ثبت‌نام شما با موفقیت انجام شد.");
        handleCloseAuthenModalAndDeleteAll();
        navigate("/login");
      }
    } catch (e) {
      if (e.response.data.error === "Username already exists") {
        errorMessage("نام کاربری وارد شده، تکراری می‌باشد!");
        setUserName("");
        setNationalCode("");
        setOpenModalAuthen(false);
      } else if (e.response.data.error === "National Code does not exist") {
        errorMessage("کد ملی وارد شده صحیح نمی‌باشد! لطفا مجددا امتحان کنید.");
        setNationalCode("");
      } else if (e.response.data.error === "National Code already exists") {
        errorMessage("حساب کاربری با این کد ملی وجود دارد!");
        setNationalCode("");
      } else if (e.response.data.error === "phone already exists") {
        errorMessage("شماره همراه وارد شده، در سیستم وجود دارد!");
        handleCloseAuthenModalAndDeleteAll();
        setState(1);
      }
    }
  }

  const onClickChangePhoneNumber = () => {
    handleCloseAuthenModalAndDeleteAll();
    handleChangeCompPhone();
    setPassword("");
    setReceivedCode("");
  };

  //AthenticationPhoneNumber Component

  async function handleSubmitSendPhoneNumber(event) {
    event.preventDefault();
    if (phoneNumber === "" || phoneNumber === null) {
      errorMessage("لطفا شماره تلفن‌همراه خود را وارد کنید!");
      return;
    } else if (!validatePhoneNumber(phoneNumber)) {
      errorMessage("لطفا شماره تلفن‌همراه خود را به درستی وارد کنید!");
    }
    const post = { mobile_number: phoneNumber };
    try {
      const response = await axios.post(`${IP}/user/otp/`, post);
      if (response.status === 200) {
        successMessage(
          `کد تایید به شماره تلفن‌همراه ${phoneNumber} ارسال گردید.`
        );
        setState(2);
      }
    } catch (e) {
      errorMessage("مشکل در اتصال به سرور :(");
    }
  }
  function validatePhoneNumber(phone) {
    // Regular expression for Iranian phone numbers (11-digit format)
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  }

  async function handleGetRegisterBg() {
    try {
      const response = await axios.get(`${IP}/user/sign_img`);
      if (response.status === 200) {
        setRegisterBg(response.data);
        console.log(response.data);
      }
    } catch (e) {
      errorMessage("خطا در اتصال به شبکه!");
    }
  }
  useEffect(() => {
    handleGetRegisterBg();
  }, []);

  //End AthenticationPhoneNumber Component

  //AthenticationCode Component

  //End AthenticationCode Component
  return (
    <Grid
      fullWidth
      container
      component="main"
      sx={{
        height: "100vh",
      }}
    >
      <ToastContainerCustom />
      <AuthenticationModal
        openAuthen={openModalAuthen}
        handleCloseAuthenAndDelete={handleCloseAuthenAndDelete}
        nationalCode={nationalCode}
        phoneNumber={phoneNumber}
        handleSubmitAuthentication={handleSubmitAuthentication}
        handleChangeNationalCode={handleChangeNationalCode}
        handleChangePhone={onClickChangePhoneNumber}
      />
      {state === 1 ? (
        <AthenticationPhoneNumber
          phoneNumber={phoneNumber}
          handleChangePhoneNumber={handleChangePhoneNumber}
          handleSubmitSendPhoneNumber={handleSubmitSendPhoneNumber}
          registerBg={registerBg}
        />
      ) : state === 2 ? (
        <AthenticationCode
          phoneNumber={phoneNumber}
          receivedCode={receivedCode}
          setReceivedCode={setReceivedCode}
          handleBackToPhoneNumber={handleChangeCompPhone}
          handleChangeCompInfo={handleChangeCompInfo}
          registerBg={registerBg}
        />
      ) : state === 3 ? (
        <GetInformation
          handleSignUpSubmit={handleSignUpSubmit}
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          userName={userName}
          handleChangeUsername={handleChangeUsername}
          email={email}
          handleEmailChange={handleEmailChange}
          handleChangeE={setEmail}
          password={password}
          handleChangePassword={handleChangePassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleClickShowConfirmPassword={handleClickShowConfirmPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          handleMouseDownConfirmPassword={handleMouseDownConfirmPassword}
          registerBg={registerBg}
        />
      ) : (
        ""
      )}
    </Grid>
  );
};
export default SignUp;
export function GetInformation(props) {
  return (
    <Grid
      fullWidth
      item
      alignItems={"center"}
      justifyContent={"center"}
      className="custom-body"
      xs={12}
      sx={{
        backgroundImage: `url(${
          props.registerBg === undefined ? "" : props.registerBg.sign2
        })`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Grid
        item
        container
        className="wrapper"
        mx={2}
        my={3}
        px={1}
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        xs={12}
        sm={10}
        md={8}
        lg={6}
        fullWidth
      >
        <Typography
          component="h1"
          color={"#000000de"}
          variant="h5"
          className="custom-font"
        >
          عضویت در بیدوین
        </Typography>
        <Grid
          item
          fullWidth
          component="form"
          onSubmit={props.handleSignUpSubmit}
          sx={{ mt: 3 }}
          noValidate
        >
          <Grid
            item
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
              xs={12}
              sm={6}
            >
              <span className="custome-label-span">نام:</span>
              <TextField
                error
                autoComplete="given-name"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
                size="small"
                helperText="نام شما باید حداقل دارای ۳ حرف باشد!"
              />
            </Grid>
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
              xs={12}
              sm={6}
            >
              <span className="custome-label-span">نام خانوادگی:</span>
              <TextField
                error
                required
                fullWidth
                variant="filled"
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
                size="small"
                helperText="نام خانوادگی شما باید حداقل دارای ۳ حرف باشد!       "
              />
            </Grid>
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
              xs={12}
              sm={6}
            >
              <span className="custome-label-span">نام کاربری:</span>
              <TextField
                dir="ltr"
                required
                fullWidth
                id="username"
                label="Username"
                name="usename"
                autoComplete="userName"
                variant="filled"
                value={props.userName}
                onChange={props.handleChangeUsername}
                size="small"
              />
            </Grid>
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
              xs={12}
              sm={6}
            >
              <span className="custome-label-span">آدرس ایمیل:</span>
              <TextField
                dir="ltr"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="filled"
                value={props.email}
                onChange={props.handleEmailChange}
                size="small"
              />
            </Grid>
            <Grid
              item
              fullWidth
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
            >
              <span className="custome-label-span">رمز عبور:</span>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: 3,
                  paddingLeft: 3,
                  width: "100%",
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={props.handleClickShowPassword}
                  onMouseDown={props.handleMouseDownPassword}
                  edge="end"
                >
                  {props.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <TextField
                  error
                  dir="ltr"
                  id="password"
                  label="Password:"
                  variant="standard"
                  type={props.showPassword ? "text" : "password"}
                  size="medium"
                  value={props.password}
                  onChange={props.handleChangePassword}
                  autoFocus
                  required
                  fullWidth
                  helperText="رمز عبور شما باید حداقل دارای ۸ حرف باشد"
                />
              </Box>
            </Grid>
            <Grid
              item
              fullWidth
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingRight: 4,
                paddingLeft: 4,
                marginTop: 2,
              }}
            >
              <span className="custome-label-span">تکرار رمز عبور:</span>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: 3,
                  paddingLeft: 3,
                  width: "100%",
                }}
                fullWidth
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={props.handleClickShowConfirmPassword}
                  onMouseDown={props.handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {props.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
                <TextField
                  error
                  dir="ltr"
                  id="confirmpassword"
                  label="Confirm Password:"
                  variant="standard"
                  type={props.showConfirmPassword ? "text" : "password"}
                  size="medium"
                  value={props.confirmPassword}
                  onChange={(e) => props.setConfirmPassword(e.target.value)}
                  autoFocus
                  required
                  fullWidth
                  helperText="به حروف کوچک و بزرگ دقت داشته باشید"
                />
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              paddingLeft={0}
              fullWidth
              xs={12}
            >
              <Button
                type="submit"
                variant="contained"
                className="custom-color"
                fullWidth
                size="large"
                sx={{ width: "50%" }}
              >
                ادامه فرآیند
              </Button>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={12}
              color={"black"}
            >
              قبلا عضو شده‌اید؟
              <NavLink
                to={"/login"}
                variant="body2"
                className="custom-link equal"
              >
                ورود
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function AthenticationPhoneNumber({
  phoneNumber,
  handleSubmitSendPhoneNumber,
  handleChangePhoneNumber,
  registerBg,
}) {
  return (
    <Grid
      item
      alignItems={"center"}
      justifyContent={"center"}
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${
          registerBg === undefined ? "" : registerBg.sign1
        })`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Grid
        item
        container
        className="wrapper"
        mx={2}
        my={3}
        px={1}
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        xs={11}
        sm={7}
        md={5}
        lg={4}
        fullWidth
        padding={3}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <h1 id="parent-modal-title" style={{ color: "#ffffff" }}>
            BidWin
          </h1>
        </Grid>
        <Grid item width={"100%"}>
          <h2 className="parent-modal-description1">ورود | ثبت‌نام</h2>
          <p className="parent-modal-description2">باسلام!</p>
          <p className="parent-modal-description2">
            لطفا شماره موبایل خود را وارد کنید.
          </p>

          <Box component="form" onSubmit={handleSubmitSendPhoneNumber}>
            <TextField
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              id="input-with-icon-textfield"
              label="Phone Number"
              dir="ltr"
              style={{ width: "100%" }}
              placeholder="۰۹** *** ** **"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <TtySharpIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              helperText="لطفا این قسمت را خالی نگذارید"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              width={"100%"}
              marginBottom={2}
              marginTop={2}
            >
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="contained"
                className="custom-color"
                sx={{}}
                size="large"
              >
                تایید
              </Button>
            </Box>
          </Box>
          <Grid
            item
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              آیا حساب کاربری فعالی دارید؟
              <NavLink
                to={"/login"}
                variant="body2"
                className="custom-link-white equal"
              >
                ورود
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function AthenticationCode({
  phoneNumber,
  handleBackToPhoneNumber,
  receivedCode,
  setReceivedCode,
  handleChangeCompInfo,
  registerBg,
}) {
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
  }, [verificationCode, setReceivedCode]);

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
      setTimeout(() => {
        clearInterval(timerInterval);
        setTimerRunning(false);
      }, timerSeconds * 1000);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  async function handleSubmitSendAuthenCode(event) {
    event.preventDefault();
    if (receivedCode === "" || receivedCode === null) {
      errorMessage("لطفا کد ۶ رقمی را وارد کنید!");
      return;
    } else if (isNaN(receivedCode)) {
      errorMessage("شما تنها مجاز به وارد کردن عدد هستید!");
      return;
    } else {
      var verifyNumber = parseInt(receivedCode);
      const post = { entered_code: verifyNumber, mobile_number: phoneNumber };
      try {
        const response = await axios.post(`${IP}/user/verify_otp/`, post);
        if (response.status === 200) {
          successMessage("کد وارد شده صحیح می‌باشد.");
          handleChangeCompInfo();
          handleButtonClick();
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
  }

  return (
    <Grid
      item
      alignItems={"center"}
      justifyContent={"center"}
      className="custom-body-code"
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${
          registerBg === undefined ? "" : registerBg.sign3
        })`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff",
        backgroundSize: "contain",
        backgroundPosition: "left",
        minHeight: "100vh",
      }}
    >
      <Grid
        item
        container
        className="wrapper-authen-code "
        mx={2}
        my={3}
        px={1}
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        xs={11}
        sm={7}
        md={5}
        lg={4}
        fullWidth
        padding={3}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <h1 id="parent-modal-title">BidWin</h1>
          <ArrowCircleRightIcon
            id="arrowIcon"
            onClick={handleBackToPhoneNumber}
          />
        </Grid>
        <Grid item width={"100%"}>
          <h2 className="parent-modal-description1">
            لطفا کد تایید را وارد کنید:
          </h2>
          <p className="parent-modal-description2">
            کد تایید برای شماره {phoneNumber} ارسال گردید.
          </p>

          <Box component="form" onSubmit={handleSubmitSendAuthenCode}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              width={"100%"}
              marginBottom={2}
              marginTop={2}
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
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              width={"100%"}
              marginBottom={2}
              marginTop={2}
            >
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="contained"
                className={`${
                  receivedCode.length === 6
                    ? "custom-color"
                    : "disabled-color-button-code"
                }`}
                size="large"
                disabled={receivedCode.length !== 6}
              >
                تایید
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
