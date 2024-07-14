import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";

//Style
import "./StyleTabComponents/AddAdsStyle.css";

import { IP } from "../../../../App.jsx";
import axios from "axios";
import AuthContext from "../../../../AuthService.jsx";
import { LinearColor } from "../../HistoryBuyComp/HistoryBuyComponent.jsx";

//Mui Components
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali"; // For Persian date handling
import { DatePicker, LocalizationProvider } from "@mui/lab";

moment.loadPersian({ dialect: "persian-modern" });

//MUI Icons
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

//Manual Components
import { ChipAndContent } from "../../PersonalInformation/PersonalInfoComp.jsx";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../../Toast/ToastCustom";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

function MobileAds() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [oSystem, setOSystem] = useState("");
  const [ram, setRam] = useState("");
  const [internalSpace, setInternalSpace] = useState("");
  const [camera, setCamera] = useState("");
  const [sim, setSim] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [firstPrice, setFirstPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");

  const [days, setDays] = useState("");
  const [futureDate, setFutureDate] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [futureDateTime, setFutureDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState(
    moment().format("jYYYY/jMM/jDD HH:mm:ss")
  );

  const handleDaysChange = (event) => {
    const daysValue = event.target.value;
    setDays(daysValue);
    if (daysValue >= 1 && daysValue <= 10) {
      const currentDate = moment();
      const futureMoment = currentDate.add(daysValue, "days");
      const formattedJalaaliDate = futureMoment.format("jYYYY/jMM/jDD");
      setFutureDate(formattedJalaaliDate);
    } else {
      setFutureDate("");
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeOS = (event) => {
    setOSystem(event.target.value);
  };
  const handleChangeRam = (event) => {
    setRam(event.target.value);
  };
  const handleChangeInternalSpace = (event) => {
    setInternalSpace(event.target.value);
  };
  const handleChangeCamera = (event) => {
    setCamera(event.target.value);
  };
  const handleChangeSIM = (event) => {
    setSim(event.target.value);
  };

  const handleChangeFirstPrice = (event) => {
    setFirstPrice(event.target.value);
  };
  const handleChangeReservePrice = (event) => {
    setReservePrice(event.target.value);
  };
  async function handleSumbitCreateAds(event) {
    event.preventDefault();
  }

  const calculateFutureDateTime = () => {
    if (day && hours && minutes) {
      const futureDate = new Date(selectedDate);
      futureDate.setDate(futureDate.getDate() + parseInt(day, 10));
      futureDate.setHours(parseInt(hours, 10));
      futureDate.setMinutes(parseInt(minutes, 10));

      const jalaaliDate = moment(futureDate).format("jYYYY/jMM/jDD HH:mm");
      setFutureDateTime(jalaaliDate);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("jYYYY/jMM/jDD HH:mm:ss"));
    }, 1000); // Update current time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    calculateFutureDateTime();
  }, [day, hours, minutes, selectedDate]);

  return (
    <Grid
      item
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: { xs: "10px" },
        padding: { xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "10px" },
      }}
      className="main-parent-ads"
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={5}
    >
      <Root>
        <Divider className="custome_divider">
          <Chip label="مشخصات تلفن همراه" size="small" />
        </Divider>
        <Box
          component="form"
          noValidate
          onSubmit={handleSumbitCreateAds}
          className="parent-form"
        >
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
            xs={12}
            className="form-style"
          >
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">{`عنوان(حداقل سه کلمه*):`}</span>
                </Divider>
              </Root>
              <Grid
                item
                xs={12}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <TextField
                  hiddenLabel
                  id="textfilled1"
                  variant="filled"
                  size="small"
                  value={title}
                  onChange={handleChangeTitle}
                  placeholder="برای مثال: گوشی Galaxy A35 "
                  color="warning"
                  margin="dense"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">اطلاعات فنی:</span>
              </Divider>
            </Root>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    برند
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={brand}
                    onChange={handleChangeBrand}
                    fullWidth
                    label="برند"
                  >
                    {phoneInfo.mobile_brands.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.id}
                        className="english-li"
                      >
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                  className="test2"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    سیستم عامل
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={oSystem}
                    onChange={handleChangeOS}
                    fullWidth
                    label="سیستم عامل"
                  >
                    {phoneInfo.operating_system_options.map(
                      (element, index) => (
                        <MenuItem
                          key={index}
                          value={element.id}
                          className="english-li"
                        >
                          {element.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    حافظه اصلی
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={ram}
                    onChange={handleChangeRam}
                    fullWidth
                    label="حافظه اصلی"
                  >
                    {phoneInfo.ram_options.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.id}
                        className="english-li"
                      >
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    حافظه داخلی
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={internalSpace}
                    onChange={handleChangeInternalSpace}
                    fullWidth
                    label="حافظه داخلی"
                  >
                    {phoneInfo.internal_space_options.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.id}
                        className="english-li"
                      >
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    کیفیت دوربین
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={camera}
                    onChange={handleChangeCamera}
                    fullWidth
                    label="کیفیت دوربین"
                  >
                    {phoneInfo.camera_pixel_options.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.id}
                        className="english-li"
                      >
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    تعداد سیم‌کارت
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sim}
                    onChange={handleChangeSIM}
                    fullWidth
                    label="تعداد سیم‌کارت"
                  >
                    {phoneInfo.sim_options.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.id}
                        className="english-li"
                      >
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "felx",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">جزئیات محصول:</span>
                </Divider>
              </Root>
              <textarea
                value={productDetails}
                onChange={() => setProductDetails()}
                id="detailTextArea2"
                placeholder="جزئیات کالای خود را وارد نمایید! توجه شود حداقل شامل بیست کاراکتر."
              ></textarea>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "felx",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">عکس‌ها و ویدئو محصول:</span>
                </Divider>
              </Root>
              <FileUploadComponent />
            </Grid>
          </Grid>
          <Root>
            <Divider className="custome_divider">
              <Chip label="اطلاعات مزایده" size="small" />
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
            }}
            xs={12}
            className="form-style"
          >
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "10px", md: "0" },
                marginTop: "5px",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  paddingLeft: { xs: "0", md: "10px" },
                  gap: "5px",
                }}
              >
                <Root>
                  <Divider textAlign="left">
                    <span className="custome-chip">قیمت اولیه:</span>
                  </Divider>
                </Root>
                <Grid
                  item
                  xs={6}
                  md={8}
                  sx={{ width: "100%" }}
                  className="flex-row-custom"
                >
                  <TextField
                    fullWidth
                    hiddenLabel
                    id="textfilled3"
                    variant="filled"
                    size="small"
                    value={firstPrice}
                    onChange={handleChangeFirstPrice}
                    placeholder="به تومان وارد کنید!"
                    color="warning"
                    margin="dense"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  paddingLeft: { xs: "0", md: "10px" },
                  gap: "5px",
                }}
              >
                <Root>
                  <Divider textAlign="left">
                    <span className="custome-chip">قیمت رزرو:</span>
                  </Divider>
                </Root>
                <Grid
                  item
                  xs={6}
                  md={8}
                  sx={{ width: "100%" }}
                  className="flex-row-custom"
                >
                  <TextField
                    fullWidth
                    hiddenLabel
                    id="textfilled3"
                    variant="filled"
                    size="small"
                    value={reservePrice}
                    onChange={handleChangeReservePrice}
                    placeholder="به تومان وارد کنید!"
                    color="warning"
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "10px" },
                marginTop: "5px",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">
                    زمان به پایان‌رسیدن مزایده:
                  </span>
                </Divider>
              </Root>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  className="custome-chip"
                >
                  زمان فعلی :
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="center"
                  className="english-li"
                >
                  {currentTime}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Grid
                  item
                  xs={4}
                  sx={{ width: "100%" }}
                  className="flex-row-custom"
                >
                  <FormControl
                    sx={{ m: 1, minWidth: 120, width: "100%" }}
                    size="small"
                    color="warning"
                  >
                    <InputLabel id="demo-simple-select"> روز آینده</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      fullWidth
                      label="روز آینده"
                    >
                      {[...Array(11).keys()].map((day) => (
                        <MenuItem
                          key={day}
                          value={day.toString()}
                          className="english-li"
                        >
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ width: "100%" }}
                  className="flex-row-custom"
                >
                  <FormControl
                    sx={{ m: 1, minWidth: 120, width: "100%" }}
                    size="small"
                    color="warning"
                  >
                    <InputLabel id="demo-simple-select">ساعت</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      fullWidth
                      label="ساعت"
                    >
                      {[...Array(24).keys()].map((hour) => (
                        <MenuItem
                          key={hour}
                          value={hour.toString()}
                          className="english-li"
                        >
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ width: "100%" }}
                  className="flex-row-custom"
                >
                  <FormControl
                    sx={{ m: 1, minWidth: 120, width: "100%" }}
                    size="small"
                    color="warning"
                  >
                    <InputLabel id="demo-simple-select">دقیقه</InputLabel>
                    <Select
                      labelId="minutes-label"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      fullWidth
                      label="دقیقه"
                    >
                      {[...Array(60).keys()].map((minute) => (
                        <MenuItem
                          key={minute}
                          value={minute.toString()}
                          className="english-li"
                        >
                          {minute}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                {futureDateTime && (
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className="custome-chip"
                  >
                    تاریخ دقیق پایان مزایده:
                  </Typography>
                )}
                {futureDateTime && (
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className="english-li"
                  >
                    {futureDateTime}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "10px" },
                marginTop: "5px",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">تاریخ ارسال محصول :</span>
                </Divider>
              </Root>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select"> روز آینده</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={days}
                    onChange={handleDaysChange}
                    fullWidth
                    label="روز آینده"
                  >
                    {[...Array(10).keys()].map((day) => (
                      <MenuItem
                        key={day + 1}
                        value={day + 1}
                        className="english-li"
                      >
                        {day + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                {futureDate && (
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className="custome-chip"
                  >
                    تاریخ ارسال:
                  </Typography>
                )}
                {futureDate && (
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className="english-li"
                  >
                    {futureDate}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            id="createAdsButton"
          >
            ثبت مزایده در بیدوین
          </Button>
        </Box>
      </Root>
    </Grid>
  );
}

const FileUploadComponent = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - imageFiles.length);
    if (files.length > 0) {
      setImageFiles([...imageFiles, ...files]);
      setImagePreviews([
        ...imagePreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upload Video and Pictures
        </Typography>

        <Box mt={2}>
          <Typography variant="h6">Images ({imageFiles.length}/4)</Typography>
          {imageFiles.length > 0 && (
            <Box mt={2}>
              {imageFiles.map((file, index) => (
                <Box
                  key={index}
                  mt={2}
                  p={2}
                  border="1px dashed"
                  borderColor="grey.500"
                  display="flex"
                  justifyContent="space-between"
                  position="relative"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <img
                        src={imagePreviews[index]}
                        alt={`preview ${index}`}
                        width="100%"
                      />
                    </Grid>
                  </Grid>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveImage(index)}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
          {imageFiles.length < 4 && (
            <Box
              mt={2}
              p={2}
              border="1px dashed"
              borderColor="grey.500"
              textAlign="center"
              sx={{ cursor: "pointer" }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                style={{ width: "100%", height: "100%" }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CloudUploadIcon style={{ fontSize: 50, marginRight: 8 }} />
                  <Typography variant="h6">
                    Upload New Image ({imageFiles.length}/4)
                  </Typography>
                </Box>
              </label>
            </Box>
          )}
        </Box>

        <Box mt={4}>
          <Typography variant="h6">Video ({videoFile ? 1 : 0}/1)</Typography>
          {videoFile && (
            <Box
              mt={2}
              p={2}
              border="1px dashed"
              borderColor="grey.500"
              display="flex"
              justifyContent="space-between"
              position="relative"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {videoPreview && (
                    <video width="100%" controls>
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Grid>
              </Grid>
              <IconButton
                color="secondary"
                onClick={handleRemoveVideo}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {!videoFile && (
            <Box
              mt={2}
              p={2}
              border="1px dashed"
              borderColor="grey.500"
              textAlign="center"
              sx={{ cursor: "pointer" }}
            >
              <input
                accept="video/*"
                style={{ display: "none" }}
                id="video-upload"
                type="file"
                onChange={handleVideoChange}
              />
              <label
                htmlFor="video-upload"
                style={{ width: "100%", height: "100%" }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CloudUploadIcon style={{ fontSize: 50, marginRight: 8 }} />
                  <Typography variant="h6">
                    Upload New Video ({videoFile ? 1 : 0}/1)
                  </Typography>
                </Box>
              </label>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
export default MobileAds;
const phoneInfo = {
  camera_pixel_options: [
    { id: 1, value: "12mp", name: "12 MP" },
    { id: 2, value: "24mp", name: "24 MP" },
    { id: 3, value: "48mp", name: "48 MP" },
    { id: 4, value: "64mp", name: "64 MP" },
    { id: 5, value: "108mp", name: "108 MP" },
    { id: 6, value: "other", name: "Other" },
  ],
  operating_system_options: [
    { id: 1, value: "android10", name: "Android 10" },
    { id: 2, value: "android11", name: "Android 11" },
    { id: 3, value: "android12", name: "Android 12" },
    { id: 4, value: "ios14", name: "iOS 14" },
    { id: 5, value: "ios15", name: "iOS 15" },
    { id: 6, value: "other", name: "Other" },
  ],
  sim_options: [
    { id: 1, value: "single_sim", name: "Single SIM" },
    { id: 2, value: "dual_sim", name: "Dual SIM" },
    { id: 3, value: "triple_sim", name: "Triple SIM" },
    { id: 4, value: "other", name: "Other" },
  ],
  ram_options: [
    { id: 1, value: "2gb", name: "2 GB" },
    { id: 2, value: "3gb", name: "3 GB" },
    { id: 3, value: "4gb", name: "4 GB" },
    { id: 4, value: "6gb", name: "6 GB" },
    { id: 5, value: "8gb", name: "8 GB" },
    { id: 6, value: "12gb", name: "12 GB" },
    { id: 7, value: "16gb", name: "16 GB" },
    { id: 8, value: "32gb", name: "32 GB" },
    { id: 9, value: "64gb", name: "64 GB" },
    { id: 10, value: "other", name: "Other" },
  ],
  internal_space_options: [
    { id: 1, value: "32gb", name: "32 GB" },
    { id: 2, value: "64gb", name: "64 GB" },
    { id: 3, value: "128gb", name: "128 GB" },
    { id: 4, value: "256gb", name: "256 GB" },
    { id: 5, value: "512gb", name: "512 GB" },
    { id: 6, value: "1tb", name: "1 TB" },
    { id: 7, value: "other", name: "Other" },
  ],
  mobile_brands: [
    { id: 1, value: "apple", name: "Apple", rank: 1 },
    { id: 2, value: "samsung", name: "Samsung", rank: 2 },
    { id: 3, value: "huawei", name: "Huawei", rank: 3 },
    { id: 4, value: "xiaomi", name: "Xiaomi", rank: 4 },
    { id: 5, value: "oppo", name: "Oppo", rank: 5 },
    { id: 6, value: "vivo", name: "Vivo", rank: 6 },
    { id: 7, value: "oneplus", name: "OnePlus", rank: 7 },
    { id: 8, value: "nokia", name: "Nokia", rank: 8 },
    { id: 9, value: "sony", name: "Sony", rank: 9 },
    { id: 10, value: "lg", name: "LG", rank: 10 },
    { id: 11, value: "motorola", name: "Motorola", rank: 11 },
    { id: 12, value: "google", name: "Google", rank: 12 },
    { id: 13, value: "asus", name: "Asus", rank: 13 },
    { id: 14, value: "realme", name: "Realme", rank: 14 },
    { id: 15, value: "lenovo", name: "Lenovo", rank: 15 },
    { id: 16, value: "other", name: "Other", rank: 16 },
  ],
};
