import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";

//MUI Components
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

//Style
import "./PersonalInfoStyle.css";

//Import Images
import defaultImage from "../../../images/profile/defaultImage.png";

//MUI Icons
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

//Manual Components
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../Toast/ToastCustom";
import { states } from "./CityInformation";
import { LinearColor } from "../HistoryBuyComp/HistoryBuyComponent.jsx";

import { ModalCustomLogin } from "../../ModalTest/ModalCom.jsx";
import { ConfirmCodeModalLogIn } from "../../ModalTest/ModalCom.jsx";
import ForgetPasswordModal from "../../ModalTest/ModalCom.jsx";
import { AuthenticationModal } from "../../ModalTest/ModalCom.jsx";
import { IP } from "../../../App.jsx";
import axios from "axios";
import AuthContext from "../../../AuthService.jsx";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Grid
          item
          xs={12}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </Grid>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
function PersonalInfoComp({ setTab, children }) {
  const [profileInformation, setProfileInformation] =
    useState(personalInformation);
  const [tabValue, setTabValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Grid
      item
      container
      xs={12}
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
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          sx={{
            padding: { xs: "5px", sm: "5px 10px" },
          }}
        >
          <Tab
            label="نمایش اطلاعات کاربری"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="ویرایش اطلاعات کاربری"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label={`${
              profileInformation.address_available
                ? "ویرایش آدرس"
                : "افزودن آدرس"
            }`}
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
        </Tabs>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          width: "100%",
          padding: { xs: "10px", sm: "15px" },
        }}
        className="flex-column-custom"
      >
        <CustomTabPanel value={tabValue} index={0}>
          <ShowInfo setTab={setTab} information={profileInformation} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <EditInfo information={profileInformation} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <AddAndEditAddress
            type={`${profileInformation.address_available ? "edit" : "add"}`}
            address={profileInformation.address}
          />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}

export default PersonalInfoComp;

function ShowInfo({ setTab }) {
  const [tabInformation, setTabInformation] = useState(undefined);
  const handleClickOnBuySpecial = () => {
    setTab(4);
  };

  let { authTokens } = useContext(AuthContext);

  const fetchPersonalInfo = async () => {
    const accessToken = authTokens.access;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(`${IP}/user/profile/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data);
        setTabInformation(response.data);
      }
    } catch (error) {
      errorMessage("خطا در اتصال به شبکه");
    }
  };
  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  if (tabInformation === undefined) {
    return <LinearColor />;
  }
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
      className="showInformation"
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={5}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="image_parent"
      >
        <img
          src={`${
            tabInformation.image === null ? defaultImage : tabInformation.image
          }`}
          alt="profile"
        />
      </Grid>
      <Root>
        <Divider className="custome_divider">
          <Chip label="اطلاعات شخصی" size="small" />
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
        }}
        className="personal-info-parent"
      >
        <PersonalInfoShow personalInfo={tabInformation} />
      </Grid>
      <Root>
        <Divider className="custome_divider">
          <Chip label="آدرس" size="small" />
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
        }}
        className="address-grid"
      >
        {tabInformation.address_available === true ? (
          <AddressCardShow address={tabInformation} />
        ) : (
          <Grid
            xs={12}
            item
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
            }}
            className="notice_parent"
          >
            <ErrorIcon color="error" />
            <p className="notice_address">
              لطفا با مراجعه به بخش افزودن آدرس، آدرس محل دریافت مرسولات خود را
              وارد کنید!
            </p>
          </Grid>
        )}
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
        }}
      >
        <Root>
          <Divider className="custome_divider">
            <Chip label=" نوع حساب" size="small" />
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
          }}
          className="membership_parent"
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              padding: "0 5px",
            }}
          >
            {tabInformation.is_premium === true ? (
              <Box className="special-account">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0328 3.27141C10.8375 1.5762 13.1625 1.57619 13.9672 3.27141L15.3579 6.20118C15.6774 6.87435 16.2951 7.34094 17.0096 7.44888L20.1193 7.91869C21.9187 8.19053 22.6371 10.4895 21.3351 11.8091L19.0849 14.0896C18.5679 14.6136 18.332 15.3685 18.454 16.1084L18.9852 19.3285C19.2926 21.1918 17.4116 22.6126 15.8022 21.7329L13.0208 20.2126C12.3817 19.8633 11.6183 19.8633 10.9792 20.2126L8.19776 21.7329C6.58839 22.6126 4.70742 21.1918 5.01479 19.3286L5.54599 16.1084C5.66804 15.3685 5.43211 14.6136 4.91508 14.0896L2.66488 11.8091C1.36287 10.4895 2.08133 8.19053 3.88066 7.91869L6.99037 7.44888C7.70489 7.34094 8.32257 6.87435 8.64211 6.20118L10.0328 3.27141Z"
                    stroke="#faaf00"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>کاربر ویژه</span>
              </Box>
            ) : (
              <Box className="manual-account">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#d8c3a5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.301 18.9281L18.9215 18.5607C20.2077 17.799 21 16.3914 21 14.8681V9.13192C21 7.6086 20.2077 6.20099 18.9215 5.43932L14.0785 2.57125C12.7923 1.80958 11.2077 1.80958 9.92154 2.57125L5.07846 5.43932C3.7923 6.20099 3 7.6086 3 9.13192V14.8681C3 16.3914 3.7923 17.799 5.07846 18.5607L5.69896 18.9281M18.301 18.9281L14.0785 21.4288C12.7923 22.1904 11.2077 22.1904 9.92154 21.4288L5.69896 18.9281M18.301 18.9281C17.0431 16.6982 14.6924 15.1979 12 15.1979C9.30762 15.1979 6.95686 16.6982 5.69896 18.9281"
                    stroke="#8e8d8a"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    transform="matrix(1 0 0 -1 9 12)"
                    stroke="#8e8d8a"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>کاربر عادی</span>
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              padding: "0 5px",
            }}
          >
            {tabInformation.is_premium === "true" ? (
              <Box
                className="remaining-days"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>{tabInformation.remaining_day}</span>
                <span>روز باقی‌مانده</span>
              </Box>
            ) : (
              <Button
                id="buy-special-account"
                onClick={handleClickOnBuySpecial}
                variant="outlined"
                color="success"
              >
                خرید حساب ویژه
              </Button>
            )}
          </Grid>
        </Grid>

        <Root>
          <Divider className="custome_divider">
            <Chip label="تاریخ عضویت" size="small" />
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
          }}
          className="membership_parent"
        >
          <span className="membership_span">
            {tabInformation.date_of_membership
              .substring(0, 10)
              .split("-")
              .join("/")}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
}
function AddressCardShow({ address }) {
  return (
    <Grid
      xs={12}
      container
      item
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
      }}
      className="address-content_parent"
    >
      <Grid
        item
        xs={12}
        container
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
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={1}
            chipLabel="استان"
            spanContent={address.state}
            justifyContent="flex-start"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={2}
            chipLabel="شهر/شهرستان"
            spanContent={address.city}
            justifyContent="flex-start"
          />
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
        <ChipAndContent
          key={3}
          chipLabel="نشانی"
          spanContent={address.address_details}
          direction="column"
          alignItems="flex-start"
        />
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
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={1}
            chipLabel="پلاک"
            spanContent={address.plaque}
            justifyContent="flex-start"
            number="true"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={2}
            chipLabel="واحد"
            spanContent={address.floor}
            justifyContent="flex-start"
            number="true"
          />
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
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={2}
            chipLabel="کدپستی"
            spanContent={address.postal_code}
            justifyContent="center"
            alignItems="flex-start"
            direction="column"
            number="true"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {" "}
          <ChipAndContent
            key={2}
            chipLabel="تلفن ثابت"
            spanContent={address.land_line_phone}
            justifyContent="center"
            alignItems="flex-start"
            direction="column"
            number="true"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
function PersonalInfoShow({ personalInfo }) {
  return (
    <Grid
      xs={12}
      container
      item
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
        padding: "10px",
      }}
      className="address-content_parent"
    >
      <Grid
        item
        xs={12}
        container
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
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={1}
            chipLabel="نام"
            spanContent={personalInfo.name}
            justifyContent="flex-start"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={2}
            chipLabel="نام خانوادگی"
            spanContent={personalInfo.last_name}
            justifyContent="flex-start"
          />
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
          xs={4}
          sm={5}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={3}
            chipLabel="نام کاربری"
            spanContent={personalInfo.username}
            direction="column"
            alignItems="flex-start"
            number="true"
          />
        </Grid>
        <Grid
          item
          xs={8}
          sm={7}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={3}
            chipLabel="ایمیل"
            spanContent={personalInfo.email}
            direction="column"
            alignItems="flex-start"
            number="true"
          />
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
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={3}
            chipLabel="کد ملی"
            spanContent={personalInfo.national_code}
            direction="column"
            alignItems="flex-start"
            number="true"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={3}
            chipLabel="شماره موبایل"
            spanContent={personalInfo.phone}
            direction="column"
            alignItems="flex-start"
            number="true"
          />
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
          xs={7}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={1}
            chipLabel="تاریخ تولد"
            spanContent={
              personalInfo.dob !== null
                ? personalInfo.dob
                : personalInfo.date_of_membership
                    .substring(0, 10)
                    .split("-")
                    .join("/")
            }
            justifyContent="flex-start"
            number="true"
          />
        </Grid>
        <Grid
          item
          xs={5}
          sm={5}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ChipAndContent
            key={2}
            chipLabel="جنسیت"
            spanContent={
              personalInfo.gender === "male"
                ? "مونث"
                : personalInfo.gender === "female"
                ? "مذکر"
                : "نامشخص"
            }
            justifyContent="flex-start"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export function ChipAndContent({
  chipLabel = "",
  spanContent = "",
  direction = "row",
  justifyContent = "center",
  alignItems = "center",
  number = false,
}) {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: direction,
        gap: "5px",
        width: "100%",
      }}
      xs={12}
    >
      <span className="custome-chip">{`${chipLabel} :`}</span>
      <span className={`span-content-address ${number ? "number-font" : ""}`}>
        {spanContent}
      </span>
    </Grid>
  );
}

function AddAndEditAddress({ type, address }) {
  //useState const
  const [province, setProvince] = useState(undefined);
  const [city, setCity] = useState("");
  const [cityItem, setCityItem] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [addressDetail, setAddressDetail] = useState("");
  const [plaque, setPlaque] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prefixPhone, setPrefixPhone] = useState("");

  //handle change function
  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
    setCity("");
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangeAddressDetail = (event) => {
    setAddressDetail(event.target.value);
  };
  const handleChangePlaque = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPlaque(event.target.value);
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangeFloor = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setFloor(event.target.value);
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangePostalCode = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPostalCode(event.target.value);
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangePhoneNumber = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPhoneNumber(event.target.value);
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };

  useEffect(() => {
    const item = states.find((item, index) =>
      item.cities ? item.id === province : ""
    );
    setSelectedCity(item);
  }, [province, selectedCity]);
  useEffect(() => {
    if (selectedCity !== undefined) {
      setCityItem(selectedCity.cities);
      setPrefixPhone(selectedCity.tel_prefix);
    }
  }, [selectedCity, prefixPhone]);
  useEffect(() => {
    if (type === "edit") {
      handleEdit();
    }
  }, []);
  const handleEdit = () => {
    const state = states.find((element, index) =>
      element ? element.name === address.state : ""
    );
    setProvince(state.id);
    setSelectedCity(state);
    setCityItem(state.cities);
    const city = state.cities.find((ele, index) =>
      ele ? ele.name === address.city : ""
    );
    setCity(city.id);
    setPostalCode(address.postal_code);
    setPlaque(address.plaque);
    setFloor(address.floor);
    setAddressDetail(address.address_detials);
    let emptyArray = [];
    emptyArray = address.land_line_phone.split("-");
    setPhoneNumber(emptyArray[1]);
  };
  async function handleSubmitAddress(event) {
    event.preventDefault();
    if (!province || province === "") {
      errorMessage("لطفا استان محل سکونت خود را انتخاب کنید!");
      return;
    } else if (!city || city === "") {
      errorMessage("لطفا شهر محل سکونت خود را انتخاب کنید!");
      return;
    } else if (!addressDetail || addressDetail === "") {
      errorMessage("لطفا نشانی خود را، کامل وارد کنید!");
      return;
    } else if (addressDetail.length < 10) {
      warningMessage("حداقل ده کاراکتر در نشانی خود وارد کنید!");
      return;
    } else if (!plaque || plaque === "") {
      errorMessage("لطفا پلاک خود را وارد کنید!");
      return;
    } else if (!floor || floor === "") {
      errorMessage("لطفا واحد مکان مورد نظر را وارد کنید!");
      return;
    } else if (!postalCode || postalCode === "") {
      errorMessage("لطفا کد پستی خود را وارد کنید!");
      return;
    } else if (!phoneNumber || phoneNumber === "") {
      errorMessage("لطفا تلفن ثابت خود را وارد کنید!");
      return;
    }
    const phone = prefixPhone + "-" + phoneNumber;
    const cityName = cityItem.find((element, index) =>
      element ? element.id === city : ""
    );
    const addressInfo = {
      state: selectedCity.name,
      city: cityName.name,
      address_detials: addressDetail,
      plaque: plaque,
      floor: floor,
      postal_code: postalCode,
      land_line_phone: phone,
    };

    if (type === "edit") {
      console.log();
      if (checkChange(addressInfo, address)) {
        warningMessage("هیچ تغییری اعمال نشده است!");
        return;
      } else {
        successMessage("تغییرات با موفقیت اعمال گردید!");
      }
    } else if (type === "add") {
      console.log(addressInfo);
    }
  }
  const handleClickOnCancell = () => {
    if (type === "edit") {
      handleEdit();
    } else if (type === "add") {
      handleDeleteStates();
    }
  };
  const handleDeleteStates = () => {
    setProvince("");
    setSelectedCity("");
    setCityItem([]);
    setCity("");
    setPostalCode("");
    setPlaque("");
    setFloor("");
    setAddressDetail("");
    setPhoneNumber("");
    setPrefixPhone("");
  };
  function checkChange(address1, address2) {
    if (address1.state !== address2.state) {
      return false;
    } else if (address1.city !== address2.city) {
      return false;
    } else if (address1.address_detials !== address2.address_detials) {
      return false;
    } else if (address1.plaque !== address2.plaque) {
      return false;
    } else if (address1.floor !== address2.floor) {
      return false;
    } else if (address1.postal_code !== address2.postal_code) {
      return false;
    } else if (address1.land_line_phone !== address2.land_line_phone) {
      return false;
    } else {
      return true;
    }
  }
  if (province === undefined) {
    return <LinearColor />;
  }

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
      className="add_address_parent"
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={5}
    >
      <Root>
        <Divider className="custome_divider">
          <Chip
            label={`${type === "edit" ? "ویرایش آدرس" : "افزودن آدرس"}`}
            size="small"
          />
        </Divider>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitAddress}
          className="address_form"
        >
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
                color={type === "edit" ? "warning" : "success"}
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  استان
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={province}
                  onChange={handleChangeProvince}
                  fullWidth
                  label="استان"
                >
                  {states.map((element, index) => (
                    <MenuItem key={index} value={element.id}>
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
                color={type === "edit" ? "warning" : "success"}
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  شهر/شهرستان
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={city}
                  onChange={handleChangeCity}
                  fullWidth
                  label="شهر/شهرستان"
                  disabled={!province}
                >
                  {cityItem ? (
                    cityItem.map((element, index) => (
                      <MenuItem key={index} value={element.id}>
                        {element.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
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
              display: "felx",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">نشانی</span>
              </Divider>
            </Root>
            <textarea
              value={addressDetail}
              onChange={handleChangeAddressDetail}
              id="detailTextArea"
              placeholder="جزئیات آدرس خود را وارد نمایید!"
            ></textarea>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "felx",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              marginTop: "5px",
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                paddingLeft: "10px",
                gap: "5px",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">پلاک</span>
                </Divider>
              </Root>
              <Grid
                item
                xs={12}
                sm={10}
                md={8}
                lg={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <TextField
                  hiddenLabel
                  id="textfilled1"
                  variant="filled"
                  size="small"
                  value={plaque}
                  onChange={handleChangePlaque}
                  placeholder="شماره پلاک "
                  color={type === "edit" ? "warning" : "success"}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                paddingRight: "10px",
                gap: "5px",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">واحد</span>
                </Divider>
              </Root>
              <Grid
                item
                xs={12}
                sm={10}
                md={8}
                lg={6}
                sx={{ width: "100%" }}
                className="flex-row-custom"
              >
                <TextField
                  hiddenLabel
                  id="textfilled2"
                  variant="filled"
                  size="small"
                  value={floor}
                  onChange={handleChangeFloor}
                  placeholder="شماره واحد"
                  color={type === "edit" ? "warning" : "success"}
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
                  <span className="custome-chip">کد پستی</span>
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
                  value={postalCode}
                  onChange={handleChangePostalCode}
                  placeholder="کد پستی"
                  color={type === "edit" ? "warning" : "success"}
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
                paddingRight: { xs: "0", md: "10px" },
                gap: "5px",
              }}
            >
              <Root>
                <Divider textAlign="left">
                  <span className="custome-chip">تلفن ثابت</span>
                </Divider>
              </Root>
              <Grid
                item
                xs={10}
                sm={6}
                md={10}
                sx={{ width: "100%", gap: "10px" }}
                className="flex-row-custom"
              >
                <TextField
                  fullWidth
                  hiddenLabel
                  id="textfilled4"
                  variant="filled"
                  size="small"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                  placeholder="شماره تلفن ثابت"
                  color={type === "edit" ? "warning" : "success"}
                  margin="dense"
                />
                <TextField
                  style={{
                    minWidth: "60px",
                    maxWidth: "60px",
                    textAlign: "center",
                  }}
                  hiddenLabel
                  id="textfilled5"
                  variant="filled"
                  size="small"
                  value={prefixPhone}
                  color={type === "edit" ? "warning" : "success"}
                  margin="dense"
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} sx={{}} className="flex-row-custom">
            <Grid xs={6} item sx={{ padding: { xs: "0 5px", md: "0 10px" } }}>
              <Button
                color="error"
                variant="outlined"
                fullWidth
                onClick={handleClickOnCancell}
              >
                لغو فرآیند
              </Button>
            </Grid>
            <Grid xs={6} item sx={{ padding: { xs: "0 5px", md: "0 10px" } }}>
              <Button
                color={`${type === "edit" ? "warning" : "success"}`}
                variant="contained"
                fullWidth
                type="submit"
              >
                {type === "edit" ? "ویرایش آدرس" : "افزودن آدرس"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Root>
    </Grid>
  );
}
function EditInfo({ information }) {
  const [personalInfo, setPersonalInfo] = useState(undefined);
  //States for BirthDay
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [daysItem, setDaysItem] = useState(months[0].days);
  const [day, setDay] = useState("");

  const [openModalAuthen, setOpenModalAuthen] = React.useState(false);
  const [otpType, setOtpType] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openModalParent, setOpenModalParent] = React.useState(false);
  const [openModalChild, setOpenModalChild] = React.useState(false);
  const [openModalForget, setOpenModalForget] = React.useState(false);
  const [receivedCode, setReceivedCode] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timerSeconds, setTimerSeconds] = useState(120); // 2 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  const handleChangeYear = (event) => {
    const value = event.target.value;
    setYear(value);
  };
  const handleChangeMonth = (event) => {
    const value = event.target.value;
    setMonth(value);
    const month = months.find((element, index) =>
      element ? element.id === value : ""
    );
    setDaysItem(month.days);
  };
  const handleChangeDay = (event) => {
    const value = event.target.value;
    setDay(value);
  };
  //Authentication Modal
  const handleCloseAuthenAndDelete = () => {
    setOpenModalAuthen(false);
    setPersonalInfo((info) => ({
      ...info,
      national_code: information.national_code,
    }));
  };

  //End Authentiication

  //handle change functions
  const handleChangeName = (event) => {
    const value = event.target.value;
    setPersonalInfo((info) => ({ ...info, name: value }));
  };
  const handleChangeLastName = (event) => {
    const value = event.target.value;
    setPersonalInfo((info) => ({ ...info, last_name: value }));
  };
  function handleChangeProfileImage(image) {
    console.log("test");
    setPersonalInfo((info) => ({ ...info, profile_image_URL: image }));
  }
  const handleChangeUserName = (event) => {
    const input = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (input === "" || regex.test(input)) {
      setPersonalInfo((info) => ({ ...info, username: input }));
    } else {
      errorMessage("لطفا تنها از اعداد و ارقام انگلیسی استفاده کنید!");
    }
  };
  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    // Regular expression for validating email addresses
    const emailRegex = /^[a-zA-Z0-9.@]+$/;

    // Check if the input matches the email regular expression
    if (emailValue === "" || emailRegex.test(emailValue)) {
      setPersonalInfo((info) => ({ ...info, email: emailValue }));
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
        setPersonalInfo((info) => ({ ...info, national_code: input }));
      }
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangePhone = (event) => {
    const inputValue = event.target.value;
    // Check if the input value is numeric
    if (!isNaN(inputValue) || inputValue === "") {
      setPersonalInfo((info) => ({ ...info, phone: inputValue }));
    } else {
      errorMessage("لطفا عدد وارد کنید!");
    }
  };
  const handleChangeBirthDay = (event) => {
    const value = event.target.value;
    setPersonalInfo((info) => ({ ...info, date_of_birth: value }));
  };
  const handleChangeGender = (event) => {
    const value = event.target.value;
    setPersonalInfo((info) => ({ ...info, gender: value }));
  };
  //End of handle change function
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
  //Click On Change National Code And Phone Number
  const handleClickOnChangeNationalCode = () => {
    console.log("cliked on change");
  };

  //Click on Image profile
  const imageRef = useRef(null);
  const onClickHandeler = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleRemoveProfileImage = () => {
    setPersonalInfo((info) => ({ ...info, profile_image_URL: "" }));
  };
  //send information
  async function handleSubmitAuthentication(event) {
    event.preventDefault();
  }
  async function handleSubmitChangeNationalCode(event) {
    event.preventDefault();
    if (personalInfo.phone === information.phone) {
      warningMessage("برای ویرایش، یک شماره جدید وارد کنید!");
      return;
    }
    if (personalInfo.phone === "" || personalInfo.phone === null) {
      errorMessage("لطفا شماره تلفن‌همراه خود را وارد کنید!");
      return;
    } else if (!validatePhoneNumber(personalInfo.phone)) {
      errorMessage("لطفا شماره تلفن‌همراه خود را به درستی وارد کنید!");
      return;
    }
    const post = { mobile_number: personalInfo.phone };
    try {
      const response = await axios.post(`http://${IP}:8000/user/otp/`, post);
      if (response.status === 200) {
        successMessage(
          `کد تایید به شماره تلفن‌همراه ${personalInfo.phone} ارسال گردید.`
        );
        setOtpType(1);
        setOpenModalChild(true);
      }
    } catch (e) {
      errorMessage("مشکل در اتصال به سرور :(");
    }
  }
  async function handleSubmitEditInformation(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // try {
    //   const access = localStorage.getItem("access");
    //   const headers = {
    //     Authorization: `Bearer ${access}`,
    //   };
    //   const response = await axios.post(
    //     `http://${IP}:1000/add-employee/`,
    //     formData,
    //     {
    //       headers,
    //     }
    //   );
    //   if (response.status === 201) {
    //     fetchEmployees("1");
    //     successMessage(response.data.message);
    //   }
    // } catch (e) {
    //   errorMessage(e.message);
    // }
  }
  async function handleSubmitSendPhoneNumber(event) {
    event.preventDefault();
    if (!personalInfo.phone) {
      warningMessage("لطفا شماره موبایل خود را وارد کنید!");
      return;
    } else if (!validatePhoneNumber(personalInfo.phone)) {
      errorMessage("لطفا شماره موبایل خود را به درستی وارد کنید!");
      return;
    }
    const post = { phone: personalInfo.phone };
    try {
      const response = await axios.post(
        `http://${IP}:8000/user/does_number_exist/`,
        post
      );
      if (response.status === 200) {
        console.log(response);
        if (response.data.Message === "number does not exist") {
          errorMessage("هیچ حساب کاربری با این شماره وجود ندارد!");
        } else if (response.data.M === "Varification successful") {
          successMessage(
            `  کد 6 رقمی به شماره موبایل ${personalInfo.phone}با موفقیت ارسال شد.`
          );
          setOtpType(2);
          handleCloseParentOpenChild();
        }
      }
    } catch (e) {
      errorMessage("مشکل در اتصال به سرور :(");
    }
  }
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
      const response = await axios.post(
        `http://${IP}:8000/user/verify_otp/`,
        post
      );
      if (response.status === 200) {
        successMessage("کد وارد شده صحیح می‌باشد.");
        handleButtonClick();
        if (otpType === 2) {
          handleCloseChildOpenForget();
        } else if (otpType === 1) {
          handleCloseChild();
          setOpenModalAuthen(true);
        }
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

  useEffect(() => {
    setPersonalInfo({
      profile_image_URL: "",
      name: information.name,
      last_name: information.last_name,
      username: information.username,
      email: information.email,
      national_code: information.national_code,
      phone: information.phone,
      date_of_birth: information.date_of_birth,
      gender: information.gender,
    });
    setPhoneNumber(information.phone);
    let birth = [];
    birth = information.date_of_birth.split("-");
    setYear(birth[0]);
    setMonth(birth[1]);
    setDay(birth[2]);
  }, [information]);

  const inputRefs = useRef([]);
  useEffect(() => {
    setReceivedCode(verificationCode.join(""));
  }, [verificationCode]);
  const handleCloseForgetOpenParent = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setOpenModalForget(false);
    setOpenModalParent(true);
  };
  function onChangePhoneNumber(phone) {
    setPhoneNumber(phone);
  }
  const handleCloseChild = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setOpenModalChild(false);
  };
  const handleCloseParent = () => {
    setOpenModalParent(false);
  };
  const handleCloseParentOpenChild = () => {
    setOpenModalParent(false);
    setOpenModalChild(true);
  };
  const handleOpenParent = () => {
    setOpenModalParent(true);
  };
  const handleOpenParentCloseChild = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setOpenModalChild(false);
    if (otpType === 2) {
      setOpenModalParent(true);
    }
  };
  const handleCloseChildOpenForget = () => {
    setOpenModalForget(true);
    setVerificationCode(["", "", "", "", "", ""]);
    setOpenModalChild(false);
  };
  function validatePhoneNumber(phone) {
    // Regular expression for Iranian phone numbers (11-digit format)
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  }
  const handleCloseParentAndDelete = () => {
    setPhoneNumber("");
    setOpenModalParent(false);
  };
  const handleCloseAndDeleteForget = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setOpenModalForget(false);
  };
  const handleCloseChildAndDelete = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setOpenModalChild(false);
    setOtpType(1);
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
  if (personalInfo === undefined) {
    return <LinearColor />;
  }
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
      className="edit_info_parent"
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={5}
    >
      <AuthenticationModal
        openAuthen={openModalAuthen}
        handleCloseAuthenAndDelete={handleCloseAuthenAndDelete}
        nationalCode={personalInfo.national_code}
        phoneNumber={personalInfo.phone}
        handleSubmitAuthentication={handleSubmitAuthentication}
        handleChangeNationalCode={handleChangeNationalCode}
      />
      <ModalCustomLogin
        phoneNumber={phoneNumber}
        openParent={openModalParent}
        handleCloseParent={handleCloseParent}
        handleCloseParentOpenChild={handleCloseParentOpenChild}
        handleSubmitSendPhoneNumber={handleSubmitSendPhoneNumber}
        handleCloseParentAndDelete={handleCloseParentAndDelete}
        handleChangePhoneNumber={onChangePhoneNumber}
        disabled={true}
      />
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
        phoneNumber={phoneNumber}
        openForget={openModalForget}
        handleCloseForget={handleCloseAndDeleteForget}
        handleCloseForgetOpenParent={handleCloseForgetOpenParent}
      />
      <Root>
        <Divider className="custome_divider">
          <Chip label=" ویرایش شماره تلفن همراه و کدملی" size="small" />
        </Divider>
      </Root>
      <Box
        component="form"
        width={"100%"}
        noValidate
        onSubmit={handleSubmitChangeNationalCode}
        className="info_form"
        item
      >
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
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: { xs: "0", sm: "10px" },
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">کدملی</span>
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="flex-row-custom"
            >
              <TextField
                dir="ltr"
                hiddenLabel
                id="textfilledpro3"
                variant="filled"
                size="small"
                value={personalInfo.national_code}
                onChange={handleChangeNationalCode}
                placeholder="کدملی:**********"
                color="warning"
                margin="dense"
                disabled
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: { xs: "0", sm: "10px" },
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">شماره همراه</span>
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{ width: "100%" }}
              className="flex-row-custom"
            >
              <TextField
                dir="ltr"
                hiddenLabel
                id="textfilledpro4"
                variant="filled"
                size="small"
                value={personalInfo.phone}
                onChange={handleChangePhone}
                placeholder="۰۹** *** ** **"
                color="warning"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{}} className="flex-column-custom">
          <Grid
            item
            container
            xs={12}
            sm={6}
            sx={{
              padding: {
                xs: "0 5px",
                sm: "0 0",
              },
            }}
            className="flex-row-custom"
          >
            <Button
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
              }}
              color="warning"
              variant="outlined"
              fullWidth
              type="submit"
            >
              ویرایش کدملی و تلفن همراه
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Root>
        <Divider className="custome_divider">
          <Chip label=" ویرایش اطلاعات شخصی" size="small" />
        </Divider>
      </Root>
      <Box
        component="form"
        width={"100%"}
        noValidate
        onSubmit={handleSubmitEditInformation}
        className="info_form"
        item
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
            gap: "8px",
          }}
          className="image_parent"
        >
          <img
            src={
              personalInfo.profile_image_URL === ""
                ? defaultImage
                : personalInfo.profile_image_URL
            }
            alt="profile"
            onClick={onClickHandeler}
            id="profileimage"
          />
          <Chip
            label="ویرایش عکس کاربری"
            onClick={onClickHandeler}
            onDelete={onClickHandeler}
            deleteIcon={<AddPhotoAlternateIcon color="primary" />}
            variant="filled"
            color="warning"
            style={{ minWidth: "160px" }}
            size="small"
          />

          {personalInfo.profile_image_URL === "" ? (
            <></>
          ) : (
            <Chip
              label="حذف عکس کاربری"
              onClick={handleRemoveProfileImage}
              onDelete={handleRemoveProfileImage}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              style={{ minWidth: "160px" }}
              size="small"
            />
          )}

          <input
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            name="image"
            onChange={(e) =>
              handleChangeProfileImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingLeft: "10px",
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">نام</span>
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
                id="textfilledpro1"
                variant="filled"
                size="small"
                value={personalInfo.name}
                onChange={handleChangeName}
                placeholder="نام"
                color="warning"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingRight: "10px",
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">نام خانوادگی</span>
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
                id="textfilledpro2"
                variant="filled"
                size="small"
                value={personalInfo.last_name}
                onChange={handleChangeLastName}
                placeholder="نام خانوادگی"
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
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingLeft: { sm: "10px" },
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">نام کاربری</span>
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{ width: "100%" }}
              className="flex-row-custom"
            >
              <TextField
                dir="ltr"
                hiddenLabel
                id="textfilledpro5"
                variant="filled"
                size="small"
                value={personalInfo.username}
                onChange={handleChangeUserName}
                placeholder="نام کاربری"
                color="warning"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingRight: { sm: "10px" },
              gap: "5px",
            }}
          >
            <Root>
              <Divider textAlign="left">
                <span className="custome-chip">ایمیل</span>
              </Divider>
            </Root>
            <Grid
              item
              xs={12}
              sx={{ width: "100%" }}
              className="flex-row-custom"
            >
              <TextField
                dir="ltr"
                hiddenLabel
                id="textfilledpro6"
                variant="filled"
                size="small"
                value={personalInfo.email}
                onChange={handleChangeEmail}
                placeholder="نشانی ایمیل"
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
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Root>
            <Divider textAlign="center">
              <span className="custome-chip">تاریخ تولد</span>
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
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                <InputLabel
                  id="demo-simple-select-standard-label1"
                  color="warning"
                >
                  سال
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label1"
                  id="demo-simple-select-standard1"
                  value={year}
                  onChange={handleChangeYear}
                  label="سال"
                  color="warning"
                >
                  {Array.from({ length: 100 }, (_, index) => (
                    <MenuItem
                      className="yearItem"
                      key={index}
                      value={index + 1300}
                    >
                      {index + 1300}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
                <InputLabel
                  id="demo-simple-select-standard-label2"
                  color="warning"
                >
                  ماه
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label2"
                  id="demo-simple-select-standard2"
                  value={month}
                  onChange={handleChangeMonth}
                  label="ماه"
                  color="warning"
                  disabled={year === undefined || year === ""}
                >
                  {months.map((month, index) => (
                    <MenuItem
                      className="monthItem"
                      key={index}
                      value={month.id}
                    >
                      {month.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                <InputLabel
                  id="demo-simple-select-standard-label3"
                  color="warning"
                >
                  روز
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label3"
                  id="demo-simple-select-standard3"
                  value={day}
                  onChange={handleChangeDay}
                  label="روز"
                  color="warning"
                  disabled={
                    year === undefined ||
                    year === "" ||
                    month === undefined ||
                    month === ""
                  }
                >
                  {Array.from({ length: daysItem }, (_, index) => (
                    <MenuItem
                      className="daysItem"
                      key={index}
                      value={index + 1}
                    >
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FormControl sx={{ width: "100%" }}>
            <Root>
              <Divider textAlign="center">
                <span className="custome-chip">جنسیت</span>
              </Divider>
            </Root>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={personalInfo.gender}
              onChange={handleChangeGender}
              sx={{
                display: "felx",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
                gap: "10px",
              }}
            >
              <FormControlLabel
                value="مونث"
                control={<Radio color="warning" size="small" />}
                label="مونث"
                style={{ margin: "0" }}
              />
              <FormControlLabel
                value="مذکر"
                control={<Radio color="warning" size="small" />}
                label="مذکر"
                style={{ margin: "0" }}
              />
              <FormControlLabel
                value="نامشخص"
                control={<Radio color="warning" size="small" />}
                label="نامشخص"
                style={{ margin: "0" }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item container xs={12} sx={{}} className="flex-row-custom">
          <Grid
            item
            xs={6}
            sx={{
              padding: {
                xs: "0 5px",
              },
            }}
            className="flex-row-custom"
          >
            <Button
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
              }}
              color="warning"
              variant="outlined"
              fullWidth
              onClick={handleOpenParent}
            >
              تغییر رمز عبور
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              padding: {
                xs: "0 5px",
              },
            }}
            className="flex-row-custom"
          >
            <Button
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
              }}
              color="warning"
              variant="contained"
              fullWidth
              type="submit"
            >
              ویرایش اطلاعات فردی
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
const personalInformation = {
  // profile_image_URL: `${profile}`,
  user_id: "",
  profile_image_URL: "",
  name: "مهدی",
  last_name: "توسلی",
  username: "mah23th",
  email: "mah23th@gmail.com",
  national_code: "9999999999",
  phone: "09381449635",
  date_of_birth: "1380-1-30",
  date_of_membership: "1402-12-13",
  gender: "نامشخص",
  address_available: true,
  account_type: "special",
  remaining_day: "200",
  address: {
    address_id: "",
    state: "اصفهان",
    city: "مبارکه",
    address_detials: "خیابان سروش، کوچه لاله، بن‌بست سینما",
    plaque: "76",
    floor: 3,
    postal_code: "5445334455",
    land_line_phone: "031-52402000",
  },
};
const months = [
  { id: 1, name: "فروردین", days: 31 },
  { id: 2, name: "اردیبهشت", days: 31 },
  { id: 3, name: "خرداد", days: 31 },
  { id: 4, name: "تیر", days: 31 },
  { id: 5, name: "مرداد", days: 31 },
  { id: 6, name: "شهریور", days: 31 },
  { id: 7, name: "مهر", days: 30 },
  { id: 8, name: "آبان", days: 30 },
  { id: 9, name: "آذر", days: 30 },
  { id: 10, name: "دی", days: 30 },
  { id: 11, name: "بهمن", days: 30 },
  { id: 12, name: "اسفند", days: 29 },
];
