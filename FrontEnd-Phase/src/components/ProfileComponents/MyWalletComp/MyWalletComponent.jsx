import * as React from "react";
import { useState, useEffect, useContext } from "react";

//MUI Components
import { Grid, Typography, Box, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import PropTypes, { func } from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";

//Style
import "./MyWalletStyle.css";

//MUI Icons
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";

//Manual Components
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../Toast/ToastCustom";

//Images
import MelliLogo from "../../../images/Banks/Melli.jpg";
import MelatLogo from "../../../images/Banks/Mellat.png";
import PasargadLogo from "../../../images/Banks/Pasargad.png";
import { LinearColor } from "../HistoryBuyComp/HistoryBuyComponent";
import { IP } from "../../../App";
import axios from "axios";
import AuthContext from "../../../AuthService";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

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

function MyWalletComponent() {
  let { authTokens } = useContext(AuthContext);

  const [tabValue, setTabValue] = React.useState(0);
  const [userWallet, setUserWallet] = useState(undefined);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  async function handleFetchWalletInfo() {
    const accessToken = authTokens.access;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(`${IP}/user/wallet_info/`, {
        headers,
      });
      if (response.status === 200) {
        setUserWallet(response.data);
      }
    } catch (error) {
      errorMessage("خطا در اتصال به شبکه");
    }
  }
  useEffect(() => {
    handleFetchWalletInfo();
  }, []);
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {userWallet === undefined ? (
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
            padding: "20px",
          }}
          className="top-charge"
        >
          {" "}
          <LinearColor />
        </Grid>
      ) : (
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
          className="top-charge"
        >
          <Grid
            item
            xs={12}
            md={6}
            xl={5}
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", xl: "space-around" },
              alignItems: "center",
              flexDirection: { xs: "row" },
              width: "100%",
            }}
          >
            <Grid
              item
              xs={6}
              xl={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "5px" },
              }}
            >
              <MoneyBox
                key={1}
                toolTipTittle="مبلغی که بستانکار هستید!"
                cardTittle="موجودی شارژ"
                price={userWallet.inventory_money}
              />
            </Grid>
            <Grid
              item
              xs={6}
              xl={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "5px" },
              }}
            >
              <MoneyBox
                key={2}
                toolTipTittle="مبلغی که اکنون قابل برداشت است!"
                cardTittle="قابل برداشت"
                price={userWallet.withdrawn_money}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={5}
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", xl: "space-around" },
              alignItems: "center",
              flexDirection: { xs: "row" },
              width: "100%",
              padding: { xs: "5px" },
            }}
          >
            <Grid
              item
              xs={6}
              xl={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "5px" },
              }}
            >
              <MoneyBox
                key={3}
                toolTipTittle="سهم شما از فروش‌هایی که هنوز توسط خریدار کامل پرداخت نشده است!"
                cardTittle="در حال بررسی"
                price={userWallet.pending_money}
              />
            </Grid>
            <Grid
              item
              xs={6}
              xl={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "5px" },
              }}
            >
              <MoneyBox
                key={4}
                toolTipTittle="مبلغی به دلیل شرکت در مزایدات فعال توسط بیدوین قفل شده است!"
                cardTittle="قفل‌شده"
                price={userWallet.locked_money}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={2}
            container
            sx={{
              display: "flex",
              justifyContent: { xs: "center", xl: "space-evenly" },
              alignItems: "center",
              flexDirection: { xs: "row" },
              width: "100%",
            }}
          >
            <Grid
              item
              xs={6}
              xl={11}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "5px" },
              }}
            >
              <MoneyBox
                key={5}
                toolTipTittle="مجموع مبالغ جریمه شده توسط بیدوین!"
                cardTittle="مجموع جریمه‌ها"
                price={userWallet.penalty_money}
              />
            </Grid>
          </Grid>
        </Grid>
      )}

      <Root>
        <Divider className="custome_divider-2"></Divider>
      </Root>
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
            label={"حساب کاربری ویژه"}
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="شارژ حساب "
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="برداشت از حساب"
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
          <SpecialAccount />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <ChargeTheAccount handleRender={handleFetchWalletInfo} key={1} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <WithdrawnComponent information={userWalletInfo} />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}
const userWalletInfo = {
  username: "mah23th",
  name: "مهدی",
  last_name: "توسلی",
  account_type: "special",
  special_account_details: {
    id: "4321",
    date_of_start: "۱۴۰۳/۰۲/۲۲",
    date_of_end: "۱۴۰۳/۰۴/۲۲",
    remaining_day: 60,
    account_duration: 3,
    price: "300000",
  },
  withdrawn_requested: true,
  withdranwn_details: {
    id: 1234,
    amount: "156,000",
    bank_name: "بانک آینده",
    date_of_accept: "۱۴۰۳/۰۲/۲۲",
    date_of_clearing: "۱۴۰۳/۰۲/۲۳",
    last_name_of_owner: "توسلی",
    name_of_owner: "مهدی",
    shaba_number: "1111222233334444",
    time_of_accept: "۱۲:۴۸:۳۱",
    time_of_clearing: "۰۰:۴۸:۳۱",
  },
  bank_account_accepted: true,
  bank_account_details: {
    shaba_number: "1111222233334444",
    bank_name: "بانک آینده",
    name_of_owner: "مهدی",
    last_name_of_owner: "توسلی",
  },
  inventory_money: "300,000",
  withdrawn_money: "156,000",
  pending_money: "2,000,000",
  locked_money: "355,000",
  penalty_money: "0.00",
};
export default MyWalletComponent;
function SpecialAccount() {
  let { authTokens } = useContext(AuthContext);

  const [userSpecail, setUserSpecial] = useState(undefined);
  const getSpecailUser = async () => {
    const accessToken = authTokens.access;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(`${IP}/user/special_account/`, {
        headers,
      });
      if (response.status === 200) {
        setUserSpecial(response.data);
      }
    } catch (error) {
      errorMessage("خطا در اتصال به شبکه");
    }
  };
  useEffect(() => {
    getSpecailUser();
  }, []);
  if (userSpecail === undefined) {
    return (
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          width: "100%",
          padding: "20px",
        }}
      >
        <LinearColor />
      </Grid>
    );
  }
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        gap: { xs: "10px", md: "0" },
      }}
    >
      <Grid
        item
        container
        xs={12}
        md={8}
        lg={7}
        xl={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexDirection: { xs: "column" },
          gap: "15px",
          paddingLeft: { xs: "0", md: "5px", lg: "10px" },
          order: { xs: 2, md: 1 },
        }}
        className="buy-account-parent"
      >
        <Root>
          <Divider className="custome_divider">
            <Chip
              label="خرید حساب کاربری ویژه"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <BuyNewAccount
          disabled={userSpecail.is_premium === true ? true : false}
          handleRender={getSpecailUser}
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={4}
        lg={5}
        xl={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexDirection: { xs: "column" },
          gap: "15px",
          paddingRight: { xs: "0", md: "5px", lg: "10px" },
          order: { xs: 1, md: 2 },
        }}
        className="show-account-parent"
      >
        <Root>
          <Divider className="custome_divider">
            <Chip
              label="جزئیات حساب کاربری ویژه"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        {userSpecail.is_premium === true ? (
          <ShowSpecialAccount information={userSpecail} />
        ) : (
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
            <p className="info_p">داده‌ای برای نمایش وجود ندارد.</p>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
function BuyNewAccount({ disabled, handleRender }) {
  let { authTokens } = useContext(AuthContext);
  const [sixMonthPrice, setSixMonthPrice] = useState(549000);
  const [threeMonthPrice, threeThreeMonthPrice] = useState(299000);

  const [discountCode, setDiscountCode] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const handleChangeDiscountCode = (e) => {
    const value = e.target.value.replace(/\D+/g, "");
    if (value.length <= 6) {
      setDiscountCode(value);
    } else {
      errorMessage("کد تخفیف یک عدد 6 رقمی است!");
    }
  };
  async function handleActDiscountCode() {
    if (discountCode === "" || discountCode === undefined) {
      errorMessage("لطفا کد تخفیف را وارد نمایید!");
      return;
    } else if (discountCode.length !== 6) {
      errorMessage("لطفا کد تخفیف را به درستی وارد نمایید!");
      return;
    }
    try {
      const information = {
        discount_code: discountCode,
      };
      const accessToken = authTokens.access;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${IP}/user/check_discount`,
        information,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("کد تخفیف با موفقیت اعمال شد.");
        setDiscountCode("");
        setDiscountPercentage(10);
        setIsDiscounted(true);
      }
    } catch (e) {
      errorMessage("کد تخفیف وارد‌شده معتبر نمی‌باشد!");
      setDiscountCode("");
    }
  }
  useEffect(() => {
    setSixMonthPrice((amount) => amount * ((100 - discountPercentage) / 100));
    threeThreeMonthPrice(
      (amount) => amount * ((100 - discountPercentage) / 100)
    );
  }, [discountPercentage]);

  async function handleClickOnBuyFromWallet() {
    if (selectedType === "" || selectedType === undefined) {
      warningMessage("لطفا نوع حساب را انتخاب کنید!");
      return;
    }
    try {
      const price = Number(
        selectedType === 1 ? threeMonthPrice : sixMonthPrice
      );
      const duration = Number(selectedType === 1 ? 90 : 180);
      const information = {
        price: price,
        duration: duration,
      };
      console.log(information);
      const accessToken = authTokens.access;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${IP}/user/buy_special_account`,
        information,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("پرداخت با موفقیت انجام شد!");
        setDiscountCode("");
        setDiscountPercentage(0);
        setIsDiscounted(false);
        setSelectedType("");
        handleRender();
      }
    } catch (e) {
      errorMessage("خطا در اتصال به سرور!");
    }
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
      className="box-withdrawn-component"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          gap: "5px",
        }}
        className="buy-account-title"
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: {
              xs: "16px",
              sm: "18px",
              md: "20px",
              lg: "22px",
              xl: "24px",
            },
          }}
        >
          مزایای خرید حساب کاربری ویژه بیدوین
        </Typography>
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
          ></path>
        </svg>
      </Grid>
      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
        className="buy-account-description"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <LooksOneIcon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            با داشتن حساب کاربری ویژه بیدوین، تنها
            <small className="english-number-span">&nbsp;1.25%&nbsp;</small>
            کمیسیون به جای
            <small className="english-number-span">&nbsp;2.25%&nbsp;</small>
            از فروش محصولات به مزایده گذاشته‌شده توسط شما کسر می‌شود!
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <LooksTwoIcon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            به‌هنگام برداشت حساب از کیف پول بیدوین در کمتر از
            <small className="english-number-span">&nbsp;12&nbsp;</small>
            ساعت واریزی شما انجام خواهد شد! که برای کاربران عادی تا
            <small className="english-number-span">&nbsp;48&nbsp;</small>
            ساعت به طول خواهد انجامید!
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <Looks3Icon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            مقدار جریمه برای کاربران ویژه برابر با
            <small className="english-number-span">&nbsp;50%&nbsp;</small>
            مقدار جریمه تعیین شده برای کاربران عادی است!
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <Looks4Icon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            در صورت برنده شدن در مزایده، کاربران ویژه
            <small className="english-number-span">&nbsp;24&nbsp;</small>
            ساعت مهلت تسویه حساب کامل دارند که این زمان برای کاربران عادی
            <small className="english-number-span">&nbsp;12&nbsp;</small>
            ساعت می‌باشد!
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <Looks5Icon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            کاربران ویژه بیدوین
            <small className="english-number-span">&nbsp;15&nbsp;</small>
            دقیقه قبل از به پایان رسیدن مزایده‌های ذخیره شده در لیست
            علاقه‌مندی‌ها پیامک اطلاع‌رسانی دریافت خواهند کرد.
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: { xs: "0", md: "0 10px" },
            gap: "10px",
          }}
        >
          <Looks6Icon style={{ alignSelf: "self-start" }} color="warning" />
          <p>
            کاربران ویژه{" "}
            <small className="english-number-span">&nbsp;48&nbsp;</small>
            ساعت مهلت تحویل مرسوله فروخته‌شده به اداره پست دارند که این مهلت
            برای کاربران عادی
            <small className="english-number-span">&nbsp;24&nbsp;</small>
            ساعت می‌باشد!
          </p>
        </Grid>
      </Grid>
      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      {disabled ? (
        <></>
      ) : (
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
            gap: { xs: "20px", md: "0" },
          }}
          className="buy-account-type"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              padding: { xs: "0", md: "0 5px", lg: "0" },
            }}
          >
            <SpecialCard
              type={1}
              duration={3}
              price={threeMonthPrice}
              selected={selectedType}
              setSelected={setSelectedType}
              discount={isDiscounted}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              padding: { xs: "0", md: "0 5px", lg: "0" },
            }}
          >
            <SpecialCard
              type={2}
              duration={6}
              price={sixMonthPrice}
              selected={selectedType}
              setSelected={setSelectedType}
              discount={isDiscounted}
            />
          </Grid>
        </Grid>
      )}
      {disabled ? (
        <></>
      ) : (
        <Root sx={{ padding: "10px 0" }}>
          <Divider className="custome_divider-2"></Divider>
        </Root>
      )}
      {disabled ? (
        <></>
      ) : (
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            gap: "10px",
          }}
          className="buy-account-buttons"
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={12}
            lg={10}
            xl={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "10px", sm: "0" },
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
                padding: { xs: "0 10px", sm: "0 20px" },
              }}
            >
              <TextField
                value={discountCode}
                onChange={handleChangeDiscountCode}
                fullWidth
                id="disscountTextFilled"
                placeholder="برای مثال:۴۸۱۲۳۱ "
                variant="filled"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "0 10px", sm: "0 20px" },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleActDiscountCode}
                color="info"
                disabled={discountCode.length !== 6}
              >
                اعمال کد تخفیف
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            md={12}
            lg={10}
            xl={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "10px", sm: "0" },
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
                padding: { xs: "0 10px", sm: "0 20px" },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleClickOnBuyFromWallet}
                color="warning"
              >
                پرداخت از کیف پول
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: { xs: "0 10px", sm: "0 20px" },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClickOnBuyFromWallet}
                color="success"
              >
                پرداخت مستقیم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
function SpecialCard({
  type,
  price,
  duration,
  selected,
  setSelected,
  discount,
}) {
  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={12}
      lg={10}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
      className={`special_card_parent ${type === selected ? "selected" : ""}`}
      onClick={() => setSelected(type)}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Chip
          label="حساب کابری ویژه بیدوین"
          size="small"
          className="custome-chip-3"
        />
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "row" },
            gap: "5px",
          }}
        >
          <span
            className="english-number-span"
            style={{ textDecoration: "underLine" }}
          >
            {duration}
          </span>
          <Chip label="ماه" size="small" className="custome-chip-3" />
        </Grid>
      </Grid>
      <Root sx={{ padding: "5px 0" }}>
        <Divider
          className={
            type === selected ? "custome_divider-selected" : "custome_divider-4"
          }
        ></Divider>
      </Root>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Chip
          label={discount ? "قیمت با اعمال کد تخفیف" : "هزینه پرداختی"}
          size="small"
          className="custome-chip-3"
        />
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "row" },
            gap: "5px",
          }}
        >
          <span className="english-number-span">{price}</span>
          <Chip label="تومان" size="small" className="custome-chip-3" />
        </Grid>
      </Grid>
    </Grid>
  );
}

function ShowSpecialAccount({ information }) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
      className="box-withdrawn-component"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "space-evenly" },
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "row" },
        }}
      >
        <Chip
          label="مدت زمان اشتراک:"
          size="small"
          className="custome-chip-3"
        />
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            flexDirection: { xs: "row" },
            gap: "5px",
          }}
        >
          <span className="english-number-span">
            {information.account_duration}
          </span>
          <span>ماه</span>
        </Grid>
      </Grid>
      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip
              label="تاریخ خریداری:"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <span className="date-time-span">
          {information.date_of_start.split("-").join("/")}
        </span>
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
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip
              label="تاریخ اتمام اشتراک"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <span className="date-time-span ">
          {information.date_of_end.split("-").join("/")}
        </span>
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
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip
              label="هزینه پرداختی:"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: { xs: "row" },
            gap: "5px",
          }}
        >
          <span className="english-number-span">{information.price}</span>
          <span>تومان</span>
        </Grid>
      </Grid>

      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "space-evenly" },
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "row" },
        }}
      >
        <Chip
          label="تعداد روز باقی‌مانده:"
          size="small"
          className="custome-chip-3"
        />
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            flexDirection: { xs: "row" },
            gap: "5px",
          }}
        >
          <span className="english-number-span">
            {information.remaining_days}
          </span>
          <span>روز</span>
        </Grid>
      </Grid>
    </Grid>
  );
}
function WithdrawnComponent({ information }) {
  const [requestValue, setRequestValue] = useState("");

  const handleChangeAmount = (event) => {
    const value = event.target.value.replace(/\D+/g, ""); // Allowing only digits
    const numberWithCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (value <= 200000000) {
      setRequestValue(numberWithCommas);
    } else {
      warningMessage(
        " بیشتر از مبلغ دویست میلیون تومان نمی‌توانید وارد کنید! "
      );
    }
  };
  //Async Function
  async function handleSubmitSendWithdrawnRequest(event) {
    event.preventDefault();
    if (requestValue === "" || requestValue === undefined) {
      errorMessage("لطفا مبلغ برداشت را وارد نمایید!");
      return;
    } else if (requestValue > information.withdrawn_money) {
      errorMessage(
        "مبلغ درخواستی شما بیش از مبلغ قابل برداشت در کیف پول شماست!"
      );
      return;
    }
    const timeNow = getIranianDateTime("time");
    const dateNow = getIranianDateTime("date");
    var budgetTime = "";
    var budgetDate = "";
    if (information.account_type === "special") {
      budgetTime = addHoursToIranianDateTime(12, "time");
      budgetDate = addHoursToIranianDateTime(12, "date");
    } else {
      budgetTime = addHoursToIranianDateTime(48, "time");
      budgetDate = addHoursToIranianDateTime(48, "date");
    }
    const requestJson = {
      shaba_number: information.bank_account_details.shaba_number,
      bank_name: information.bank_account_details.bank_name,
      name_of_owner: information.bank_account_details.name_of_owner,
      last_name_of_owner: information.bank_account_details.last_name_of_owner,
      amount: requestValue,
      date_of_accept: dateNow,
      date_of_clearing: budgetDate,
      time_of_accept: timeNow,
      time_of_clearing: budgetTime,
    };
    console.log(requestJson);
    successMessage("درخواست شما با موفقیت ثبت گردید.");
    setRequestValue("");
  }

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: "20px",
      }}
      className="withdrawn"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "15px", md: "0" },
        }}
        className="top-withdrawn"
      >
        <Grid
          item
          container
          xs={12}
          md={8}
          xl={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: { xs: "column" },
            gap: { xs: "10px" },
            paddingLeft: { xs: "0", md: "5px", xl: "10px" },
          }}
        >
          <Root>
            <Divider className="custome_divider">
              <Chip
                label="برداشت از حساب بیدوین"
                size="small"
                className="custome-chip-3"
              />
            </Divider>
          </Root>
          {information.bank_account_accepted ? (
            <></>
          ) : (
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
              <ErrorIcon color="warning" />
              <p className="notice_account">
                برای برداشت از کیف پول، لازم است تا در بخش زیر اطلاعات حساب خود
                را وارد نمایید!
              </p>
            </Grid>
          )}
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
            }}
            className="box-withdrawn-component"
          >
            <Grid
              item
              container
              xs={12}
              md={6}
              lg={7}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: { xs: "row" },
              }}
            >
              <span className="span-manual">پرداخت حداکثر تا&nbsp; </span>

              {information.account_type === "special" ? (
                <Box>
                  <span className="span-number">12</span>
                  <span className="span-manual">{` ساعت کاری(حساب کاربری ویژه `}</span>
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
                  <span className="span-manual">{`)`}</span>
                </Box>
              ) : (
                <Box>
                  <span className="span-number">48</span>
                  <span className="span-manual">{` ساعت کاری(حساب کاربری عادی) `}</span>
                </Box>
              )}
              <span className="span-manual">
                بعد از درخواست شما انجام می‌شود.
              </span>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: { xs: "column" },
                gap: "10px",
              }}
            >
              {information.withdrawn_requested ? (
                <Grid
                  xs={12}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                  className="notice_parent"
                >
                  <ErrorIcon color="warning" />
                  <p className="notice_account">
                    لطفا منتظر پاسخ درخواست قبلی خود باشید!
                  </p>
                </Grid>
              ) : (
                <></>
              )}

              <Box
                component="form"
                onSubmit={handleSubmitSendWithdrawnRequest}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "100%",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="left">
                    <Chip
                      label="مبلغ"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <FormControl
                  color="success"
                  size="small"
                  fullWidth
                  variant="filled"
                >
                  <FilledInput
                    id="filled-adornment-amount"
                    value={requestValue}
                    onChange={handleChangeAmount}
                    placeholder="ثبت مبلغ درخواستی"
                    endAdornment={
                      <InputAdornment position="end">تومان</InputAdornment>
                    }
                    disabled={
                      information.withdrawn_requested ||
                      !information.bank_account_accepted
                    }
                  />
                </FormControl>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  className="submit-button"
                  disabled={
                    information.withdrawn_requested ||
                    !information.bank_account_accepted
                  }
                >
                  پرداخت
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={4}
          xl={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: { xs: "column" },
            gap: { xs: "10px" },
            paddingRight: { xs: "0", md: "5px", xl: "10px" },
          }}
        >
          <Root>
            <Divider className="custome_divider">
              <Chip
                label="درخواست ثبت‌شده"
                size="small"
                className="custome-chip-3"
              />
            </Divider>
          </Root>
          {information.withdrawn_requested ? (
            <AcceptedRequest information={information.withdranwn_details} />
          ) : (
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
              <p className="info_p">هیچ درخواستی ثبت نشده است!</p>
            </Grid>
          )}
        </Grid>
      </Grid>
      <AddAndEditBankAccount
        information={information}
        type={information.bank_account_accepted ? "eddit" : "add"}
      />
    </Grid>
  );
}
function AcceptedRequest({ information }) {
  async function handleCancelRequest() {
    console.log(`You have canceled the request with ID ${information.id}`);
    successMessage("درخواست شما با موفقیت لغو شد.");
  }
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: { xs: "column" },
      }}
      className="box-withdrawn-component"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "space-evenly" },
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "row" },
        }}
      >
        <Chip label="مبلغ:" size="small" className="custome-chip-3" />
        <span className="english-number-span">{information.amount}</span>
      </Grid>
      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip label="شماره شبا:" size="small" className="custome-chip-3" />
          </Divider>
        </Root>
        <span className="english-number-span">{`IR ${information.shaba_number.replace(
          /\B(?=(\d{4})+(?!\d))/g,
          "-"
        )}`}</span>
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
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip label="صاحب حساب:" size="small" className="custome-chip-3" />
          </Divider>
        </Root>
        <span className="date-time-span ">{`${information.name_of_owner} ${information.last_name_of_owner}`}</span>
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
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip label="تاریخ ثبت" size="small" className="custome-chip-3" />
          </Divider>
        </Root>
        <span className="date-time-span ">{`${information.time_of_accept.substring(
          0,
          5
        )}  ${information.date_of_accept}`}</span>
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
          flexDirection: { xs: "column" },
        }}
      >
        <Root>
          <Divider className="custome_divider" textAlign="left">
            <Chip
              label="تاریخ حدودی واریزی"
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <span className="date-time-span ">{`${information.time_of_clearing.substring(
          0,
          5
        )}  ${information.date_of_clearing}`}</span>
      </Grid>
      <Root sx={{ padding: "10px 0" }}>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Grid
        item
        container
        xs={12}
        sm={6}
        md={12}
        xl={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column" },
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleCancelRequest}
        >
          لغو درخواست
        </Button>
      </Grid>
    </Grid>
  );
}
function AddAndEditBankAccount({ type, information }) {
  const [bankName, setBankName] = useState("");
  const [shabaNumber, setShabaNumber] = useState("");

  //Set Function
  const handleChangeBankName = (event) => {
    const value = event.target.value;
    setBankName(value);
  };
  const handleChangeShabaNumber = (event) => {
    const value = event.target.value.replace(/\D+/g, ""); // Allowing only digits
    const numberWithdash = value.replace(/\B(?=(\d{4})+(?!\d))/g, "-");

    if (value.length <= 24) {
      setShabaNumber(numberWithdash);
    } else {
      warningMessage("شماره شبا یک عدد 24 رقمی می‌باشد!");
    }
  };

  async function handleSubmitInfoBankAccount(event) {
    event.preventDefault();
    if (bankName === "" || bankName === undefined) {
      errorMessage("لطفا بانک مورد نظر خود را انتخاب کنید!");
      return;
    } else if (setShabaNumber === "" || shabaNumber === undefined) {
      errorMessage("لطفا شماره شبا خود را وارد کنید!");
      return;
    }
    const shaba = shabaNumber.split("-").join("");

    if (shaba.length !== 24) {
      warningMessage("شماره شبا یک عدد 24 رقمی می‌باشد!");
      return;
    }
    const bankItem = iranianBanks.find((element, index) =>
      element ? element.id === bankName.id : ""
    );

    if (type === "eddit") {
      if (!handleCheckChanges()) {
        warningMessage("لطفا تغییرات خود را اعمال کنید!");
        return;
      }
    } else if (type === "add") {
    }
  }
  useEffect(() => {
    if (type === "eddit") {
      handleEdit();
    }
  }, []);
  const handleEdit = () => {
    const bankItem = iranianBanks.find((element, index) =>
      element ? element.name === information.bank_account_details.bank_name : ""
    );
    setBankName(bankItem.id);
    setShabaNumber(
      information.bank_account_details.shaba_number.replace(
        /\B(?=(\d{4})+(?!\d))/g,
        "-"
      )
    );
  };
  const handleCheckChanges = () => {
    const bankItem = iranianBanks.find((element, index) =>
      element ? element.name === information.bank_account_details.bank_name : ""
    );
    const shaba = shabaNumber.split("-").join("");
    if (
      bankItem.id !== bankName ||
      information.bank_account_details.shaba_number !== shaba
    ) {
      return true;
    } else return false;
  };
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        flexDirection: { xs: "column" },
      }}
      className="bottom-withdrawn"
    >
      <Grid
        item
        container
        xs={12}
        md={12}
        lg={10}
        xl={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column" },
          gap: { xs: "10px" },
          paddingLeft: { xs: "0", md: "5px", xl: "10px" },
        }}
      >
        <Root>
          <Divider className="custome_divider">
            <Chip
              label={
                type === "eddit"
                  ? "ویرایش مشخصات بانکی ثبت‌شده"
                  : "ثبت مشخصات بانکی جدید"
              }
              size="small"
              className="custome-chip-3"
            />
          </Divider>
        </Root>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: { xs: "column" },
          }}
          className="box-withdrawn-component"
        >
          <Box
            xs={12}
            onSubmit={handleSubmitInfoBankAccount}
            component="form"
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              flexDirection: { xs: "column" },
              gap: { xs: "10px" },
              paddingBottom: "10px",
            }}
          >
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={5}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: { xs: "column" },
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="left">
                    <Chip
                      label="نام بانک"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <FormControl
                  sx={{ m: 1, minWidth: 120, width: "100%" }}
                  size="small"
                  color="warning"
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    بانک
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={bankName}
                    onChange={handleChangeBankName}
                    fullWidth
                    label="بانک"
                  >
                    {iranianBanks.map((element, index) => (
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
                md={7}
                lg={8}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: { xs: "column" },
                  gap: "8px",
                  paddingRight: { xs: "0", sm: "5px", md: "10px", lg: "20px" },
                }}
              >
                <Root>
                  <Divider className="custome_divider" textAlign="left">
                    <Chip
                      label="شماره شبا"
                      size="small"
                      className="custome-chip-3"
                    />
                  </Divider>
                </Root>
                <FormControl
                  color={type === "eddit" ? "warning" : "success"}
                  size="small"
                  fullWidth
                  variant="filled"
                >
                  <FilledInput
                    id="shaba-textFilled"
                    value={shabaNumber}
                    onChange={handleChangeShabaNumber}
                    placeholder="شماره شبا"
                    endAdornment={
                      <InputAdornment position="end" className="IRClassName">
                        IR
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              lg={4}
              xl={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                className="submit-button"
                disabled={
                  bankName === "" ||
                  shabaNumber.split("-").join("").length !== 24
                }
              >
                {type === "eddit" ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
              </Button>
            </Grid>
          </Box>
          <Root>
            <Divider className="custome_divider-2"></Divider>
          </Root>
          <Grid
            xs={12}
            item
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: { xs: "column" },
              padding: "10px 0",
              gap: "10px",
            }}
          >
            <Typography variant="subtitle1" className="shaba-notice-title">
              نکات ثبت شماره شبا
            </Typography>
            <Typography variant="subtitle2" className="shaba-notice-des">
              شماره شبای وارد شده بایستی با نام و نام خانوادگی ثبت شده در سایت
              مطابقت داشته باشد.
            </Typography>
            <Typography variant="subtitle2" className="shaba-notice-des">
              در صورتی که نام خانوادگی شما دارای پسوند یا پیشوند است، از طریق
              گزینه "ویرایش اطلاعات شخصی" در منوی سمت راست اطلاعات خود را تصحیح
              نمایید تا در واریز وجه خطایی بوجود نیاید.
            </Typography>
            <Typography variant="caption" className="shaba-notice-caption">
              برای دریافت شماره شبا، وارد سایت بانک خود شوید و بر روی لینک
              دریافت/محاسبه شماره شبا کلیک نمایید.
            </Typography>
            <Typography variant="caption" className="shaba-notice-caption">
              لطفا در ورود شماره شبا دقت فرمایید. مسئولیت وارد نمودن شماره شبای
              نادرست با شماست.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function ChargeTheAccount({ handleRender }) {
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: { xs: "10px" },
      }}
      className="charge-parent"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
        className="bottom-charge"
      >
        <ChargingWallet handleRender={handleRender} />
      </Grid>
    </Grid>
  );
}
export function ChargingWallet({ handleRender }) {
  let { authTokens } = useContext(AuthContext);

  const [currentBank, setCurrentBank] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const AddValue = (value) => {
    setCurrentValue(value);
  };
  const BankClick = (name) => {
    setCurrentBank(name);
  };
  const handleChangeAmount = (event) => {
    const value = event.target.value.replace(/\D+/g, ""); // Allowing only digits
    const numberWithCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (value <= 200000000) {
      setCurrentValue(numberWithCommas);
    } else {
      warningMessage(
        " بیشتر از مبلغ دویست میلیون تومان نمی‌توانید وارد کنید! "
      );
    }
  };
  async function handleSubmitChargingWallet(event) {
    event.preventDefault();
    const value = currentValue.split(",").join("");
    if (!currentValue || currentValue === "") {
      errorMessage("لطفا مبلغ مورد نظر خود را وارد کنید!");
      return;
    } else if (value < 30000) {
      errorMessage("حداقل میزان شارژ، سی هزار تومان است!");
      return;
    } else if (!currentBank || currentBank === "") {
      errorMessage("لطفا بانک مورد نظر خود را انتخاب کنید!");
      return;
    }

    try {
      const number = Number(currentValue.split(",").join(""));
      const information = {
        amount: number,
      };
      const accessToken = authTokens.access;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${IP}/user/charge_account`,
        information,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("پرداخت با موفقیت انجام شد!");
        setCurrentBank("");
        setCurrentValue("");
        handleRender();
      }
    } catch (e) {
      errorMessage("مشکل در اتصال به سرور!");
    }
  }
  const LogoButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "70px",
    },
    [theme.breakpoints.up("md")]: {
      width: "80px",
      height: "100px",
    },
  }));
  const LogoImg = styled("img")(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "50px",
      height: "50px",
      margin: "5px",
    },
    [theme.breakpoints.up("md")]: {
      width: "70px",
      height: "70px",
      margin: "5px",
    },
  }));
  const ChosenLogoButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "70px",
    },
    [theme.breakpoints.up("md")]: {
      width: "80px",
      height: "100px",
    },
    border: "2px solid #e98074",
  }));
  return (
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={10}
      lg={8}
      xl={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
      className="charing-wallet-parent"
    >
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          paddingBottom: "12px",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          className="charge-title"
          sx={{
            fontSize: {
              xs: "20px",
              sm: "22px",
              md: "24px",
              lg: "26px",
              xl: "28px",
            },
          }}
        >
          افزایش موجودی کیف پول بیدوین
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          className="charge-span"
          sx={{
            fontSize: {
              xs: "12px",
              sm: "14px",
              md: "15px",
            },
          }}
        >
          شما می‌توانید در این بخش کیف پول خود را شارژ کنید!
        </Typography>
      </Grid>
      <Root>
        <Divider className="custome_divider-2"></Divider>
      </Root>
      <Box
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "20px",
        }}
        component="form"
        onSubmit={handleSubmitChargingWallet}
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
            flexDirection: "column",
            gap: "10px",
            paddingTop: "10px",
          }}
        >
          <Grid
            item
            xs={12}
            lg={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <FormControl
              color="success"
              size="small"
              fullWidth
              sx={{ m: 1 }}
              variant="filled"
            >
              <FilledInput
                id="filled-adornment-amount"
                value={currentValue}
                onChange={handleChangeAmount}
                placeholder="!مقدار مورد نظر خود را وارد کنید"
                endAdornment={
                  <InputAdornment position="end">تومان</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              gap: { xs: "5px" },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => AddValue("300,000")}
              className="price-button"
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" },
              }}
            >
              <span>300,000</span>
              <span>تومان</span>
            </Button>
            <Button
              variant="outlined"
              onClick={() => AddValue("1,000,000")}
              className="price-button"
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" },
              }}
            >
              <span>1,000,000</span>
              <span>تومان</span>
            </Button>
            <Button
              variant="outlined"
              onClick={() => AddValue("10,000,000")}
              className="price-button"
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" },
              }}
            >
              <span>10,000,000</span>
              <span>تومان</span>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              gap: { xs: "5px", md: "10px" },
            }}
          >
            {currentBank === "Melat" ? (
              <ChosenLogoButton onClick={() => BankClick("")}>
                <LogoImg alt="logo" src={MelatLogo} />
              </ChosenLogoButton>
            ) : (
              <LogoButton onClick={() => BankClick("Melat")} variant="text">
                <LogoImg alt="logo" src={MelatLogo} />
              </LogoButton>
            )}

            {currentBank === "Melli" ? (
              <ChosenLogoButton onClick={() => BankClick("")}>
                <LogoImg alt="logo" src={MelliLogo} />
              </ChosenLogoButton>
            ) : (
              <LogoButton onClick={() => BankClick("Melli")} variant="text">
                <LogoImg alt="logo" src={MelliLogo} />
              </LogoButton>
            )}

            {currentBank === "Pasrgod" ? (
              <ChosenLogoButton onClick={() => BankClick("")}>
                <LogoImg alt="logo" src={PasargadLogo} />
              </ChosenLogoButton>
            ) : (
              <LogoButton onClick={() => BankClick("Pasrgod")} variant="text">
                <LogoImg alt="logo" src={PasargadLogo} />
              </LogoButton>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="submit-button"
            disabled={currentValue === "" || currentBank === ""}
          >
            پرداخت
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
function MoneyBox({
  toolTipTittle = "tooltipContent",
  cardTittle = "title ",
  price = 0,
}) {
  return (
    <Tooltip
      title={toolTipTittle}
      followCursor
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
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
          gap: "10px",
        }}
        className="money-box-parent"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span className="card-title">{cardTittle}</span>
        </Grid>
        <Root>
          <Divider className="custome_divider-2"></Divider>
        </Root>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <span className="card-price">{price}</span>
          <span className="card-currency">تومان</span>
        </Grid>
      </Grid>
    </Tooltip>
  );
}
function addHoursToIranianDateTime(hours, option) {
  // Create a new Date object
  const now = new Date();
  // Add hours to the current date and time
  now.setHours(now.getHours() + hours);

  // Specify options for Persian (Iran) calendar
  const options = {
    timeZone: "Asia/Tehran",
    calendar: "persian",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Convert the updated date to Persian (Iran) format
  const updatedDateTime = now
    .toLocaleString("fa-IR", options)
    .replace(/\u200E/g, ""); // Remove any LTR characters

  // Convert the date to Persian (Iran) format based on the option
  if (option === "date") {
    return updatedDateTime.substring(0, 10);
  } else if (option === "time") {
    return updatedDateTime.substring(12, 20);
  } else {
    return 'Invalid option! Please choose "date" or "time".';
  }
}
function getIranianDateTime(option) {
  // Create a new Date object
  const now = new Date();

  // Specify options for Persian (Iran) calendar
  const options = {
    timeZone: "Asia/Tehran",
    calendar: "persian",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Convert the date to Persian (Iran) format based on the option
  if (option === "date") {
    return now.toLocaleDateString("fa-IR", options).substring(0, 10);
  } else if (option === "time") {
    return now.toLocaleTimeString("fa-IR", options).substring(12, 20);
  } else {
    return 'Invalid option! Please choose "date" or "time".';
  }
}
const iranianBanks = [
  { id: 0, name: "بانک آینده", label: "Future Bank" },
  { id: 1, name: "بانک اقتصاد نوین", label: "Novin Bank" },
  { id: 2, name: "بانک انصار", label: "Ansar Bank" },
  { id: 3, name: "بانک ایران زمین", label: "Iran Zamin Bank" },
  { id: 4, name: "بانک پارسیان", label: "Parsian Bank" },
  { id: 5, name: "بانک پاسارگاد", label: "Pasargad Bank" },
  { id: 6, name: "بانک تات", label: "Taat Bank" },
  { id: 7, name: "بانک تجارت", label: "Tajarat Bank" },
  { id: 8, name: "بانک توسعه تعاون", label: "Tose'e Taavon Bank" },
  {
    id: 9,
    name: "بانک توسعه صادرات ایران",
    label: "Export Development Bank of Iran",
  },
  { id: 10, name: "بانک حکمت ایرانیان", label: "Hekmat Iranian Bank" },
  { id: 11, name: "بانک خاورمیانه", label: "Middle East Bank" },
  { id: 12, name: "بانک دی", label: "Day Bank" },
  { id: 13, name: "بانک رفاه", label: "Refah Bank" },
  { id: 14, name: "بانک سامان", label: "Saman Bank" },
  { id: 15, name: "بانک سپه", label: "Sepah Bank" },
  { id: 16, name: "بانک سرمایه", label: "Sarmayeh Bank" },
  { id: 17, name: "بانک سینا", label: "Sina Bank" },
  { id: 18, name: "بانک شهر", label: "Shahr Bank" },
  { id: 19, name: "بانک صادرات ایران", label: "Export Bank of Iran" },
  { id: 20, name: "بانک صنعت و معدن", label: "Industry and Mine Bank" },
  { id: 21, name: "بانک قرض الحسنه رسالت", label: "Rasalat Goodwill Bank" },
  { id: 22, name: "بانک قوامین", label: "Ghavamin Bank" },
  { id: 23, name: "بانک گردشگری", label: "Tourism Bank" },
  { id: 24, name: "بانک مسکن", label: "Maskan Bank" },
  { id: 25, name: "بانک ملت", label: "Mellat Bank" },
  { id: 26, name: "بانک ملی ایران", label: "National Bank of Iran" },
  { id: 27, name: "بانک مهر ایران", label: "Mehr Iran Bank" },
  { id: 28, name: "بانک کارآفرین", label: "Karafarin Bank" },
  { id: 29, name: "بانک کشاورزی", label: "Keshavarzi Bank" },
  { id: 30, name: "پست بانک ایران", label: "Post Bank of Iran" },
  {
    id: 31,
    name: "موسسه اعتباری توسعه",
    label: "Development Credit Institution",
  },
  {
    id: 32,
    name: "موسسه اعتباری ملل",
    label: "International Credit Institution",
  },
  { id: 33, name: "موسسه اعتباری نور", label: "Noor Credit Institution" },
  {
    id: 34,
    name: "موسسه مالی و اعتباری عسکریه",
    label: "Military Financial and Credit Institution",
  },
  {
    id: 35,
    name: "موسسه مالی و اعتباری کوثر",
    label: "Kosar Financial and Credit Institution",
  },
];
