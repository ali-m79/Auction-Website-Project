import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import TtySharpIcon from "@mui/icons-material/TtySharp";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../Toast/ToastCustom";
import "./modalStyle.css";
import axios from "axios";
import { IP } from "../../App";

//MUI Icons
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

//Other Components
import StarRating from "./StarRating";
import { Typography } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export function ModalCustomLogin({
  phoneNumber,
  openParent,
  handleCloseParent,
  handleCloseParentOpenChild,
  handleSubmitSendPhoneNumber,
  handleCloseParentAndDelete,
  handleChangePhoneNumber,
  disabled = false,
}) {
  return (
    <div>
      <Modal
        open={openParent}
        onClose={handleCloseParentAndDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid
          className="modal-Parent"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
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
            <CancelIcon id="cancelIcon" onClick={handleCloseParentAndDelete} />
          </Grid>
          <Grid item width={"100%"}>
            <h2 className="parent-modal-description1">تغییر رمز عبور</h2>
            <p className="parent-modal-description2">
              برای تغییر رمز عبور، شماره موبایل خود را وارد کنید.
            </p>

            <Box component="form" onSubmit={handleSubmitSendPhoneNumber}>
              <TextField
                value={phoneNumber}
                onChange={(e) => handleChangePhoneNumber(e.target.value)}
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
                disabled={disabled}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                width={"100%"}
                marginBottom={2}
                marginTop={4}
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
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
export function ConfirmCodeModalLogIn({
  phoneNumber,
  openChild,
  handleCloseChild,
  handleOpenParentCloseChild,
  handleSubmitCheckReceivedCode,
  handleCloseChildAndDelete,
  receivedCode,
  children,
}) {
  return (
    <Modal
      open={openChild}
      onClose={handleCloseChildAndDelete}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Grid
        className="modal-Parent"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
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
            onClick={handleOpenParentCloseChild}
          />
        </Grid>
        <Grid item width={"100%"}>
          <h2 className="parent-modal-description1">
            لطفا کد تایید را وارد کنید:
          </h2>
          <p className="parent-modal-description2">
            <span>کد تایید برای شماره</span>
            <span className="montserrat-fonts">{` ${phoneNumber} `}</span>
            <span>ارسال گردید.</span>
          </p>

          <Box component="form" onSubmit={handleSubmitCheckReceivedCode}>
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
              {children}
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
                    : "disabled-color-button"
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
    </Modal>
  );
}

export function ForgetPasswordModal({
  openForget,
  handleCloseForget,
  handleCloseForgetOpenParent,
  usernameMain,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [hasUppercase, setHasUppercase] = React.useState(false);
  const [hasLowercase, setHasLowercase] = React.useState(false);
  const [hasNumber, setHasNumber] = React.useState(false);
  const [hasSpecialChar, setHasSpecialChar] = React.useState(false);
  const [isLongEnough, setIsLongEnough] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordsMatch(
      newPassword === confirmPassword && newPassword.length >= 8
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(
      password === newConfirmPassword && newConfirmPassword.length >= 8
    );
  };
  useEffect(() => {
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%&*^]/.test(password));
    setIsLongEnough(password.length >= 8);
  }, [password]);
  useEffect(() => {
    if (
      isLongEnough &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      setStrength("قوی");
    } else if (
      (isLongEnough && (hasUppercase || hasLowercase) && hasNumber) ||
      (isLongEnough && (hasUppercase || hasLowercase) && hasSpecialChar) ||
      (isLongEnough && hasUppercase && hasLowercase)
    ) {
      setStrength("متوسط");
    } else if (
      isLongEnough ||
      hasUppercase ||
      hasLowercase ||
      hasNumber ||
      hasSpecialChar
    ) {
      setStrength("ضعیف");
    } else {
      setStrength("");
    }
  }, [isLongEnough, hasLowercase, hasNumber, hasSpecialChar, hasUppercase]);
  const handleCloseForgetOpenParentAndDelete = () => {
    setPassword("");
    setConfirmPassword("");
    setShowConfirmPassword(false);
    setShowPassword(false);
    handleCloseForgetOpenParent();
  };
  async function handleSubmitChangePassword(event) {
    event.preventDefault();
    // Logic to handle password submission goes here
    const changePasswordInfo = {
      username: usernameMain,
      password1: password,
      password2: confirmPassword,
    };
    console.log(changePasswordInfo);
    try {
      const response = await axios.post(
        `${IP}/user/new_password/`,
        changePasswordInfo
      );
      if (response.status === 200) {
        successMessage("رمز عبور شما با موفقیت تغییر پیدا کرد.");
        setPassword("");
        setConfirmPassword("");
        setShowConfirmPassword(false);
        setShowPassword(false);
        handleCloseForget();
      }
    } catch (e) {
      errorMessage("مشکل اتصال در سرور!");
    }
  }

  return (
    <Modal
      open={openForget}
      onClose={handleCloseForgetOpenParentAndDelete}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        className="modal-Parent"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <h1 id="forget-modal-title">BidWin</h1>
          <ArrowCircleRightIcon
            id="arrowIcon"
            onClick={handleCloseForgetOpenParentAndDelete}
          />
        </Grid>
        <Grid width={"100%"}>
          <h2 className="parent-modal-description1">تغییر رمز عبور</h2>
          <p className="parent-modal-description2">
            رمز عبور بایستی حداقل ۸ حرفی باشد
          </p>
          <Box component="form" onSubmit={handleSubmitChangePassword}>
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
                label="New Password:"
                variant="standard"
                color="success"
                type={showPassword ? "text" : "password"}
                size="medium"
                value={password}
                onChange={handlePasswordChange}
              />
            </Box>
            <div style={{ margin: "10px 0 0 0", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label
                  className={`${
                    strength === "ضعیف"
                      ? "error-color"
                      : strength === "متوسط"
                      ? "cuation-color"
                      : strength === "قوی"
                      ? "success-color"
                      : ""
                  }`}
                >
                  {strength}
                </label>
                <Grid
                  sx={{ columnCount: "3" }}
                  display={"flex"}
                  flexDirection={"row"}
                  id="strength-progress"
                  columns={3}
                  columnGap={1}
                  marginTop={2}
                  width={"100%"}
                >
                  <span
                    className={`${
                      strength === "ضعیف"
                        ? "error-color-bg"
                        : strength === "متوسط"
                        ? "cuation-color-bg"
                        : strength === "قوی"
                        ? "success-color-bg"
                        : ""
                    }`}
                  ></span>
                  <span
                    className={`${
                      strength === "متوسط"
                        ? "cuation-color-bg"
                        : strength === "قوی"
                        ? "success-color-bg"
                        : ""
                    }`}
                  ></span>
                  <span
                    className={`${
                      strength === "قوی" ? "success-color-bg" : ""
                    }`}
                  ></span>
                </Grid>
                <ul className="parent-caption-ul">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {hasNumber ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        style={{ margin: "0 0 4px 5px " }}
                        className="success-color"
                      />
                    ) : (
                      <ErrorOutlineIcon
                        fontSize="small"
                        style={{ marginLeft: "5px" }}
                        className="error-color "
                      />
                    )}
                    <li
                      className={`text-caption ${
                        hasNumber ? "success-color" : "custome-color"
                      }`}
                    >
                      شامل عدد
                    </li>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {isLongEnough ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        style={{ margin: "0 0 4px 5px " }}
                        className="success-color"
                      />
                    ) : (
                      <ErrorOutlineIcon
                        fontSize="small"
                        style={{ marginLeft: "5px" }}
                        className="custome-color"
                      />
                    )}
                    <li
                      className={`text-caption ${
                        isLongEnough ? "success-color" : "custome-color"
                      }`}
                    >
                      حداقل ۸ حرف
                    </li>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {hasSpecialChar ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        style={{ margin: "0 0 4px 5px " }}
                        className="success-color"
                      />
                    ) : (
                      <ErrorOutlineIcon
                        fontSize="small"
                        style={{ marginLeft: "5px" }}
                        className="custome-color"
                      />
                    )}
                    <li
                      className={`text-caption ${
                        hasSpecialChar ? "success-color" : "custome-color"
                      }`}
                    >
                      شامل علامت (!@#$%&*^)
                    </li>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {hasUppercase && hasLowercase ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        style={{ margin: "0 0 4px 5px " }}
                        className="success-color"
                      />
                    ) : (
                      <ErrorOutlineIcon
                        fontSize="small"
                        style={{ marginLeft: "5px" }}
                        className="custome-color"
                      />
                    )}
                    <li
                      className={`text-caption ${
                        hasLowercase && hasUppercase
                          ? "success-color"
                          : "custome-color"
                      }`}
                    >
                      شامل یک حرف بزرگ و کوچک
                    </li>
                  </Box>
                </ul>
              </Box>
            </div>
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
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <TextField
                dir="ltr"
                id="outlined-adornment-password"
                label="Confirm New Password:"
                variant="standard"
                color="success"
                type={showConfirmPassword ? "text" : "password"}
                size="medium"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
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
                  passwordsMatch ? "custom-color" : "disabled-color-button"
                }`}
                sx={{}}
                size="large"
                disabled={!passwordsMatch}
              >
                تغییر رمز
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
}
export function AuthenticationModal({
  phoneNumber,
  nationalCode,
  openAuthen,
  handleCloseAuthenAndDelete,
  handleSubmitAuthentication,
  handleChangeNationalCode,
  handleChangePhone,
}) {
  return (
    <Modal
      open={openAuthen}
      onClose={handleCloseAuthenAndDelete}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        className="modal-Parent"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          width={"100%"}
        >
          <h1 id="parent-modal-title">Authentication</h1>
          <ArrowCircleRightIcon
            id="arrowIcon"
            onClick={handleCloseAuthenAndDelete}
          />
        </Grid>
        <Grid item width={"100%"}>
          <h2 className="parent-modal-description1">تایید هویت</h2>
          <p className="parent-modal-description2">
            اطلاعات شناسایی خود را منطبق با کارت ملی وارد کنید. این اطلاعات باید
            متعلق به مالک شماره {phoneNumber} باشد.
          </p>

          <Box component="form" onSubmit={handleSubmitAuthentication}>
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 2,
              }}
              xs={12}
            >
              <span className="custome-label-span">کد ملی:</span>
              <TextField
                dir="ltr"
                required
                fullWidth
                id="nationalcode"
                label="National Code:"
                name="nationalcode"
                variant="filled"
                value={nationalCode}
                onChange={handleChangeNationalCode}
                size="small"
                helperText="متعلق به مالک شماره موبایل"
              />
            </Grid>
            <Grid
              item
              fullWidth
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 2,
              }}
              xs={12}
            >
              <ErrorOutlineIcon className="error-icon-position" />
              <span className="parent-modal-description2">
                لطفاً دقت کنید! درستی اطلاعات توسط سامانه ثبت احوال بررسی
                می‌شود.
              </span>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              fullWidth
              marginBottom={2}
              marginTop={4}
            >
              <Button
                fullWidth
                onClick={handleChangePhone}
                variant="contained"
                className={"custom-color"}
                sx={{}}
                size="large"
              >
                تغییر شماره همراه{" "}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                }}
                fullWidth
              >
                <TouchAppIcon />
                <span className="parent-modal-description2 custome-color">
                  در صورت کلیک کل فرآیند ثبت‌نام، از ابتدا شروع می‌شود!
                </span>
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
            >
              <Button
                disabled={nationalCode.length !== 10}
                fullWidth
                type="submit"
                variant="contained"
                className={`${
                  nationalCode.length === 10
                    ? "custom-color"
                    : "disabled-color-button"
                }`}
                sx={{}}
                size="large"
              >
                تکمیل ثبت‌نام
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
}
export function FeedBackModal({ openFeedBack, handleCloseModal, sellerInfo }) {
  const [ratingNumber, setRatingNumber] = useState(3);
  const [feedBackText, setFeedBackText] = useState("");
  const [checked, setChecked] = React.useState([false, false, false, false]);

  const handleCheckboxChange = (index) => {
    setChecked((prevState) => {
      const updatedCheckboxes = [...prevState];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      return updatedCheckboxes;
    });
  };

  //Close Modal Component
  const handleCloseAndDeleteModal = () => {
    handleCloseModal();
    setRatingNumber(3);
    setFeedBackText("");
    setChecked([false, false, false, false]);
  };
  //Send Information Function
  async function handleSumitForm(e) {
    e.preventDefault();
  }
  //Change States
  const handleChangeFeedBackText = (event) => {
    setFeedBackText(event.target.value);
  };
  return (
    <Modal
      open={openFeedBack}
      onClose={handleCloseAndDeleteModal}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: {
            xs: "20px 5px",
            sm: "20px 10px",
            md: "20px 15px",
            lg: "20px",
          },
          gap: "10px",
        }}
        className="modal-Parent-feedback"
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 id="parent-modal-title" style={{ marginBottom: "0" }}>
            Send Feedback
          </h1>
          <CancelIcon id="arrowIcon" onClick={handleCloseAndDeleteModal} />
        </Grid>
        <Root>
          <Divider className="custome_divider">
            <Chip label="ارسال بازخورد فروشنده" size="small" />
          </Divider>
        </Root>
        <ShowCustomerInfo information={sellerInfo} />
        <Grid item xs={12} width={"100%"}>
          <Box
            component="form"
            onSubmit={handleSumitForm}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                padding: { xs: "5px" },
              }}
              xs={12}
              className="form-content-parent"
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                }}
                xs={12}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                  }}
                  xs={12}
                >
                  <Typography variant="caption" className="rating-caption">
                    از خرید خود چقدر راضی بودید؟
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  xs={12}
                >
                  <StarRating
                    defaultRating={3}
                    maxRating={5}
                    size={36}
                    onSetRating={setRatingNumber}
                    rating={ratingNumber}
                    messages={["🤬", "😭", "🙂", "😄", "😍"]}
                  />
                </Grid>
              </Grid>
              <Root sx={{ padding: "5px 0" }}>
                <Divider className="custome_divider-2"></Divider>
              </Root>
              <FeedBackMessege
                messeges={
                  ratingNumber >= 3
                    ? feedbackMessege.good_feedback
                    : feedbackMessege.bad_feedback
                }
                color={ratingNumber >= 3 ? "success" : "error"}
                checked={checked}
                handleChange={handleCheckboxChange}
              />
              <Root sx={{ padding: "5px 0" }}>
                <Divider className="custome_divider-2"></Divider>
              </Root>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <textarea
                  value={feedBackText}
                  onChange={handleChangeFeedBackText}
                  id="feedBackTextArea"
                  placeholder="جزئیات بازخورد خود را وارد نمایید!"
                ></textarea>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                gap: "5px",
              }}
            >
              <Grid
                xs={12}
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  gap: "10px",
                }}
                className="notice_parent"
              >
                <ErrorIcon color="error" />
                <p className="notice_account">
                  شما تنها مجاز به یک بار ارسال بازخورد هستید!
                </p>
              </Grid>
              <Grid
                xs={12}
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  gap: "10px",
                }}
                className="info_parent"
              >
                <InfoIcon color="info" />
                <p className="info_p">
                  لطفاً بازخورد خود را با صداقت ارسال کنید :)
                </p>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "5px",
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  className=""
                  color="error"
                  size="medium"
                  onClick={handleCloseAndDeleteModal}
                >
                  فعلا حسش نیست!
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingRight: "5px",
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  className=""
                  size="medium"
                  color="success"
                >
                  ارسال بازخورد
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
}
function ShowCustomerInfo({ information }) {
  return (
    <Grid
      item
      xs={12}
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: "5px",
        padding: "5px",
      }}
      className="form-content-parent"
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          gap: "10px",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
        >
          <Root>
            <Divider className="custome_divider" textAlign="center">
              <Chip
                label="نام فروشنده:"
                size="small"
                className="custome-chip-3"
              />
            </Divider>
          </Root>
          <span className="persian-span">{`${information.name} ${information.last_name}`}</span>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
        >
          <Root>
            <Divider className="custome_divider" textAlign="center">
              <Chip
                label="نام کاربری:"
                size="small"
                className="custome-chip-3"
              />
            </Divider>
          </Root>
          <span className="english-number-span">{information.username}</span>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "5px",
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip label="نام کالا:" size="small" className="custome-chip-3" />
          </Divider>
        </Root>
        <span className="persian-span">{information.product_title}</span>
      </Grid>
    </Grid>
  );
}
function ShowFeedBackMessages({ information }) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: "1px",
      }}
    >
      {information.messeges.map((element, index) => (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            gap: "5px",
          }}
        >
          <Checkbox
            disabled
            style={{ padding: "5px" }}
            size="medium"
            color={information.rating >= 3 ? "success" : "error"}
            defaultChecked={element}
          />
          <Typography
            color={information.rating >= 3 ? "green" : "red"}
            variant="caption"
          >
            {information.rating >= 3
              ? feedbackMessege.good_feedback.messeges[index].content
              : feedbackMessege.bad_feedback.messeges[index].content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
function FeedBackMessege({ messeges, color, checked, handleChange }) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: "1px",
      }}
    >
      {checked.map((element, index) => (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            gap: "5px",
          }}
        >
          <Checkbox
            style={{ padding: "5px" }}
            size="medium"
            value={element}
            onChange={() => handleChange(index)}
            color={color === "success" ? "success" : "error"}
          />
          <Typography
            color={color === "success" ? "green" : color}
            variant="caption"
          >
            {messeges.messeges[index].content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
export function GetAddress({
  openGetAddress,
  handleCloseModal,
  winnerInfo,
  winnerAddress,
}) {
  return (
    <Modal
      open={openGetAddress}
      onClose={handleCloseModal}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: {
            xs: "20px 5px",
            sm: "20px 10px",
            md: "20px 15px",
            lg: "20px",
          },
          gap: "10px",
          width: { xs: "340px", sm: "580px", md: "600px" },
        }}
        className="modal-Parent-get-address"
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 id="parent-modal-title" style={{ marginBottom: "0" }}>
            Get Winner Address
          </h1>
          <CancelIcon id="arrowIcon" onClick={handleCloseModal} />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
        >
          <Root>
            <Divider className="custome_divider">
              <Chip label="اطلاعات شخصی برنده" size="small" />
            </Divider>
          </Root>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              padding: { xs: "5px" },
            }}
            xs={12}
            className="form-content-parent"
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              xs={12}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="نام:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">{winnerInfo.name}</span>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingRight: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="نام خانوادگی:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">{winnerInfo.last_name}</span>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              xs={12}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="نام کاربری:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">{winnerInfo.username}</span>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingRight: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="شماره همراه:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="english-number-span">
                  {winnerAddress.phone}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Root>
            <Divider className="custome_divider">
              <Chip label=" آدرس ارسال کالا:" size="small" />
            </Divider>
          </Root>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              padding: { xs: "5px" },
            }}
            xs={12}
            className="form-content-parent"
          >
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              xs={12}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="استان:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">{winnerAddress.state}</span>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingRight: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="شهر:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">{winnerAddress.city}</span>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="نشانی آدرس:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="persian-span">
                  {winnerAddress.address_detials}
                </span>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              xs={12}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="پلاک:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="english-number-span">
                  {winnerAddress.plaque}
                </span>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingRight: "5px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="واحد:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="english-number-span">
                  {winnerAddress.floor}
                </span>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                gap: { xs: "5px", md: "0" },
              }}
              xs={12}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingLeft: { xs: "0", md: "5px" },
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="کدپستی:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="english-number-span">
                  {winnerAddress.postal_code}
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  gap: "5px",
                  paddingRight: { xs: "0", md: "5px" },
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      label="تلفن ثابت:"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <span className="english-number-span">
                  {winnerAddress.land_line_phone}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
          className="notice_parent"
        >
          <ErrorIcon color="error" />
          <p className="notice_account">
            چنان‌چه که در موعد مقرر کالا را به شرکت پستی تحویل ندهید، مشمول به
            پرداخت جریمه خواهید شد!
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            className=""
            color="warning"
            size="medium"
            onClick={handleCloseModal}
          >
            متوجه شدم!
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
export function CancellAuctionModal({
  open,
  handleClose,
  penaltyInfo,
  productTitle,
  produtPrice,
  productID,
}) {
  async function handleClickOnPayPenalty() {
    warningMessage("جریمه پرداخت شد!");
    console.log(productID);
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: {
            xs: "20px 5px",
            sm: "20px 10px",
            md: "20px 15px",
            lg: "20px",
          },
          gap: "10px",
        }}
        className="modal-Parent-cancel-auction"
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 id="parent-modal-title" style={{ marginBottom: "0" }}>
            Cancel Auction
          </h1>
          <CancelIcon id="arrowIcon" onClick={handleClose} />
        </Grid>
        <Root>
          <Divider className="custome_divider">
            <Chip label="لغو مزایده" size="small" />
          </Divider>
        </Root>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: { xs: "5px" },
            gap: "5px",
          }}
          xs={12}
          className="form-content-parent"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="نام کالا:"
                  size="small"
                  className="custome-chip-3"
                />
              </Divider>
            </Root>
            <span className="persian-span">{productTitle}</span>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="ارزش کل مزایده:"
                  size="small"
                  className="custome-chip-3"
                />
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                gap: "8px",
              }}
              className="price-parent"
            >
              <span className="english-number-span">
                {produtPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span className="price-unit-span">تومان</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
          className="notice_parent"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip label=" مبلغ پرداختی جریمه:" size="small" color="error" />
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <span className="english-number-span">
                {penaltyInfo.penalty_cancell_pay.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </span>
              <span
                style={{ color: "red", fontSize: "14px", fontWeight: "500" }}
              >
                تومان
              </span>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="درصد جریمه به کل ارزش مزایده:"
                  size="small"
                  color="error"
                />
              </Divider>
            </Root>
            <span className="english-number-span">{`${penaltyInfo.penalty_precent}%`}</span>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
        >
          <Grid
            xs={12}
            item
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              gap: "5px",
            }}
            className="info_parent"
          >
            <InfoIcon color="info" />
            <p className="info_p">
              قبل از پرداخت موجودی کیف پول خود را بررسی کنید!
            </p>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            className=""
            size="medium"
            color="error"
            onClick={handleClickOnPayPenalty}
          >
            پرداخت جریمه از کیف پول بیدوین
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
export function SeeWinnerFeedBack({
  open,
  handleClose,
  winnerInfo,
  feedBackInfo,
  productTitle,
}) {
  console.log(feedBackInfo);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="forget-modal-title"
      aria-describedby="forget-modal-description"
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: {
            xs: "20px 5px",
            sm: "20px 10px",
            md: "20px 15px",
            lg: "20px",
          },
          gap: "10px",
        }}
        className="modal-Parent-feedback"
      >
        <Grid
          xs={12}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 id="parent-modal-title" style={{ marginBottom: "0" }}>
            Show Feedback
          </h1>
          <CancelIcon id="arrowIcon" onClick={handleClose} />
        </Grid>
        <Root>
          <Divider className="custome_divider">
            <Chip label="مشاهده بازخورد ثبت‌شده" size="small" />
          </Divider>
        </Root>
        <Grid
          item
          xs={12}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
            padding: "5px",
          }}
          className="form-content-parent"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              gap: "10px",
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                gap: "5px",
              }}
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    label="نام برنده:"
                    size="small"
                    className="custome-chip-3"
                  />
                </Divider>
              </Root>
              <span className="persian-span">{`${winnerInfo.name} ${winnerInfo.last_name}`}</span>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                gap: "5px",
              }}
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    label="نام کاربری:"
                    size="small"
                    className="custome-chip-3"
                  />
                </Divider>
              </Root>
              <span className="english-number-span">{winnerInfo.username}</span>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="نام کالا:"
                  size="small"
                  className="custome-chip-3"
                />
              </Divider>
            </Root>
            <span className="persian-span">{productTitle}</span>
          </Grid>
        </Grid>
        <Root>
          <Divider className="custome_divider">
            <Chip label="جزئیات بازخورد ثبت‌شده" size="small" />
          </Divider>
        </Root>
        <Grid
          item
          xs={12}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
            padding: "5px",
          }}
          className="form-content-parent"
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="میزان رضایت‌مندی:"
                  size="small"
                  className="custome-chip-3"
                />
              </Divider>
            </Root>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              xs={12}
            >
              {feedBackInfo !== undefined ? (
                <Rating
                  name="read-only"
                  dir="ltr"
                  value={feedBackInfo.rating}
                  readOnly
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Root sx={{ padding: "5px 0" }}>
            <Divider className="custome_divider-2"></Divider>
          </Root>
          {feedBackInfo !== undefined ? (
            <ShowFeedBackMessages information={feedBackInfo} />
          ) : (
            <></>
          )}
          <Root sx={{ padding: "5px 0" }}>
            <Divider className="custome_divider-2"></Divider>
          </Root>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  label="جزئیات بازخورد:"
                  size="small"
                  className="custome-chip-3"
                />
              </Divider>
            </Root>
            <span className="persian-span">
              {feedBackInfo !== undefined ? feedBackInfo.feedback_content : ""}
            </span>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="success"
            onClick={handleClose}
          >
            مشاهده شد
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default ForgetPasswordModal;
const feedbackMessege = {
  length: 4,
  good_feedback: {
    color: "green",
    messeges: [
      { content: "دریافت به موقع کد رهگیری" },
      { content: "دریافت کالای سالم" },
      { content: "مطابقت کالا با جزئیات ثبت‌شده" },
      { content: "برخورد مناسب مشتری" },
    ],
  },
  bad_feedback: {
    color: "red",
    messeges: [
      { content: "دریافت با تاخیر کد رهگیری" },
      { content: "دریافت کالای معیوب" },
      { content: "عدم مطابقت کالا با جزئیات ثبت‌شده" },
      { content: "برخورد نامناسب مشتری" },
    ],
  },
};
