import * as React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

//MUI Components
import { Grid, Button, Typography, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

//MUI Icons

import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//Style
import "./HistoryBuyStyle.css";

//Manual Components
import { FeedBackModal, CancellAuctionModal } from "../../ModalTest/ModalCom";
import TimeLeftAuction from "../../time_left_auctions/time_left_auctions";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../Toast/ToastCustom";

//Import Images
import image from "../../../images/InterestTab/image.webp";

//Other Components
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
export const DangerTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "red",
    boxShadow: theme.shadows[1],
    fontSize: 11,
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
            flexDirection: "colum",
            width: "100%",
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
            className="info_parent"
          >
            <InfoIcon color="info" />
            <Typography
              sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
              variant="caption"
              className="info_p"
            >
              {props.infoContent}
            </Typography>
          </Grid>
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

function HistoryBuyComponent({ children }) {
  const [feeBackModal, setFeedBackModal] = useState(false);
  const handleOpenFeedBackModal = () => setFeedBackModal(true);
  const handleCloseFeedBackModal = () => setFeedBackModal(false);
  const [tabValue, setTabValue] = React.useState(2);
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
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          style={{ direction: "ltr" }}
        >
          {/* <Tab
            label="خریدهای ناموفق"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          /> */}
          <Tab
            label="خریدهای موفق و ناموفق"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="ارسال بازخورد فروشنده"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          {/* <Tab
            label="در انتظار دریافت"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          /> */}
          <Tab
            label="در حال پرداخت"
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
          padding: { xs: "10px", sm: "15px", md: "15px 40px", lg: "10px 40px" },
        }}
        className="flex-column-custom"
      >
        {/* <CustomTabPanel
          value={tabValue}
          index={0}
          infoContent={
            "خریدهایی که برای شما ارسال نشده‌اند یا که به فروشنده مرجوع شده‌اند و وجه آن‌ها به حساب بیدوین شما عودت داده شده است."
          }
        ></CustomTabPanel> */}
        <CustomTabPanel
          value={tabValue}
          index={0}
          infoContent=" همه کالاهایی که تاکنون در مزایده‌ها برنده شدید!"
        >
          <AllHistoryComponent information={allHistoryItem} />
        </CustomTabPanel>
        {/* <CustomTabPanel
          value={tabValue}
          index={2}
          infoContent="کالاهای تحویل شده‌ای که شما باید فیدبک و نظر خود را ثبت کنید."
        >
          <Button onClick={handleOpenFeedBackModal}>open modal</Button>
        </CustomTabPanel> */}
        <CustomTabPanel
          value={tabValue}
          index={1}
          infoContent="کالاهایی که در مسیر تحویل به شما در دست شرکت پستی(حمل و نقل، پیک و ...) می‌باشد، یا دریافت کرده‌اید و بایستی بازخورد فروشنده را ثبت کنید!"
        >
          <WaitingToAchieveAndFeedBack information={setFeedBackCardInfo} />
        </CustomTabPanel>

        <CustomTabPanel
          value={tabValue}
          index={2}
          infoContent="مزایداتی که برنده شده‌اید و باید پرداخت کنید. درصورت عدم پرداخت جریمه خواهید شد!"
        >
          <WaitingToPay information={cardInfo} />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}

export default HistoryBuyComponent;

//Tab Components
export function AllHistoryComponent({ information }) {
  const [infoCards, setInfoCards] = useState(undefined);
  useEffect(() => {
    setInfoCards(information);
  }, [information]);

  if (infoCards === undefined) {
    return <LinearColor />;
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
      }}
    >
      {infoCards.map((card, index) => (
        <Grid
          item
          xs={12}
          md={8}
          lg={7}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: { xs: "10px 0", sm: "10px 5px", xl: "10px 10px" },
          }}
        >
          <AllHistoryCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}
export function WaitingToAchieveAndFeedBack({ information }) {
  const [infoCards, setInfoCards] = useState(undefined);
  useEffect(() => {
    setInfoCards(information);
  }, [information]);

  if (infoCards === undefined) {
    return <LinearColor />;
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
      }}
    >
      {infoCards.map((card, index) => (
        <Grid
          item
          xs={12}
          md={8}
          lg={7}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: { xs: "10px 0", sm: "10px 5px", xl: "10px 10px" },
          }}
        >
          <SetFeedBackCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}
export function WaitingToPay({ information }) {
  const [infoCards, setInfoCards] = useState(undefined);
  useEffect(() => {
    setInfoCards(information);
  }, [information]);

  if (infoCards === undefined) {
    return <LinearColor />;
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
      }}
    >
      {infoCards.map((card, index) => (
        <Grid
          item
          xs={12}
          md={8}
          lg={7}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: { xs: "10px 0", sm: "10px 5px", xl: "10px 10px" },
          }}
        >
          <WaitingToPayCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}
export function AllHistoryCard({ information }) {
  return (
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
      className="interestCardParent"
    >
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="interestCardImageParent"
      >
        <img
          src={information.image_URL}
          alt="savedProduct"
          className="imageCard"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "0 5px",
          gap: "5px",
        }}
        className="content-left-parent"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
        >
          <Root>
            <Divider className="custome_divider" textAlign="center">
              <Chip
                className="custome-chip"
                label="نتیجه مزایده:"
                size="small"
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
            }}
            className={
              information.resualt === "success"
                ? "success_parent"
                : "notice_parent"
            }
          >
            <Typography
              variant="body2"
              className={
                information.resualt === "success"
                  ? "success_account"
                  : "notice_account"
              }
            >
              {information.reseon}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
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
              flexDirection: "row",
              width: "100%",
              padding: "5px",
              minHeight: { sm: "75px" },
            }}
          >
            <Grid
              item
              xs={8}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                className="titleClassName"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "18px", lg: "18px" },
                }}
              >
                {information.title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              className="image-parent-xs"
            >
              <img
                src={information.image_URL}
                alt="savedProduct"
                className="imageCard-xs"
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
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
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
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="مشخصات فروشنده:"
                    size="small"
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
              >
                <span className="price-unit-span">
                  {information.name_owner}
                </span>
                <span className="price-unit-span">
                  {information.last_name_owner}
                </span>
                <span className="price-span">
                  {`(${information.username_owner})`}
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
                flexDirection: "row",
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
                  width: "100%",
                  flexDirection: "column",
                }}
                className="price-parent"
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      className="custome-chip"
                      label="قیمت نهایی:"
                      size="small"
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
                >
                  <span className="price-span">
                    {information.final_price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </span>
                  <span className="price-unit-span">تومان</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
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
            padding: "10px 0 0 0",
          }}
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
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                gap: "5px",
              }}
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="مقدار جریمه:"
                    size="small"
                  />
                </Divider>
              </Root>
              {information.penalty_type === "possetive" ? (
                <LightTooltip title="مقدار مبلغی که از حساب فروشنده کسر و به حساب شما افزوده شده است!">
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
                      cursor: "pointer",
                    }}
                    className="success_parent"
                  >
                    <span className="price-span success_account">
                      {information.penalty_amount}
                    </span>
                    <span className="price-unit-span success_account">
                      تومان
                    </span>
                  </Grid>
                </LightTooltip>
              ) : (
                <DangerTooltip
                  title={
                    "مقدار مبلغی که به دلیل تخلف ذکر شده از کیف پول شما کسر گردیده است!"
                  }
                >
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
                      cursor: "pointer",
                    }}
                    className="notice_parent"
                  >
                    <span className="price-span notice_account">
                      {information.penalty_amount}
                    </span>
                    <span className="price-unit-span notice_account">
                      تومان
                    </span>
                  </Grid>
                </DangerTooltip>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function SetFeedBackCard({ information }) {
  const [feedBackModal, setFeedBackModal] = useState(false);
  const [time, setTime] = useState(["", "", "", "", "", ""]);
  const handleCloseFeedBackModal = () => {
    setFeedBackModal(false);
  };
  const [sellerInfo, setSellerInfo] = useState(undefined);
  async function handleClickOnPayByWallet() {}
  async function handleClickPayByDirect() {
    setFeedBackModal(true);
  }
  useEffect(() => {
    var end_year = Number(
      information.expiration_date[0] +
        information.expiration_date[1] +
        information.expiration_date[2] +
        information.expiration_date[3]
    );
    var end_month = Number(
      information.expiration_date[5] + information.expiration_date[6]
    );
    var end_day = Number(
      information.expiration_date[8] + information.expiration_date[9]
    );
    var end_hour = Number(
      information.expiration_date[11] + information.expiration_date[12]
    );
    var end_minute = Number(
      information.expiration_date[14] + information.expiration_date[15]
    );
    var end_second = Number(
      information.expiration_date[17] + information.expiration_date[18]
    );
    setTime([end_year, end_month, end_day, end_hour, end_minute, end_second]);

    const feedBackModalInfo = {
      name: information.name_owner,
      last_name: information.last_name_owner,
      username: information.username_owner,
      product_title: information.title,
    };
    setSellerInfo(feedBackModalInfo);
  }, [information.expiration_date, information]);
  return (
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
      className="interestCardParent"
    >
      <FeedBackModal
        openFeedBack={feedBackModal}
        handleCloseModal={() => handleCloseFeedBackModal()}
        sellerInfo={sellerInfo}
      />
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="interestCardImageParent"
      >
        <img
          src={information.image_URL}
          alt="savedProduct"
          className="imageCard"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "0 5px",
        }}
        className="content-left-parent"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
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
              width: "100%",
              flexDirection: "column",
              cursor: "pointer",
              gap: "3px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  className="custome-chip"
                  label="مدت زمان حدودی تحویل مرسوله:"
                  size="small"
                />
              </Divider>
            </Root>
            <LightTooltip title="در صورت به پایان رسیدن زمان و عدم دریافت محصول از طرف فروشنده از طریق گزینه عدم دریافت محصول قادر به ثبت بررسی‌ کالا توسط بیدوین هستید!">
              <Grid
                item
                sx={{
                  display: "felx",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="left-time-parent"
              >
                <TimeLeftAuction
                  end_time={time}
                  padding={"5px"}
                  text_size={"16px"}
                />
              </Grid>
            </LightTooltip>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
              cursor: "pointer",
              gap: "3px",
            }}
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  className="custome-chip"
                  label="مدت زمان باقی‌مانده ثبت بازخورد:"
                  size="small"
                />
              </Divider>
            </Root>
            <DangerTooltip title="در صورت به پایان رسیدن زمان و عدم ثبت بازخورد فروشنده، طبق قوانین بیدوین جریمه خواهید شد!">
              <Grid
                item
                sx={{
                  display: "felx",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="left-time-parent"
              >
                <TimeLeftAuction
                  end_time={time}
                  padding={"5px"}
                  text_size={"16px"}
                />
              </Grid>
            </DangerTooltip>
          </Grid>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
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
              flexDirection: "row",
              width: "100%",
              padding: "5px",
              minHeight: { sm: "75px" },
            }}
          >
            <Grid
              item
              xs={8}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                className="titleClassName"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "18px", lg: "18px" },
                }}
              >
                {information.title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              className="image-parent-xs"
            >
              <img
                src={information.image_URL}
                alt="savedProduct"
                className="imageCard-xs"
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
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
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
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="مشخصات فروشنده:"
                    size="small"
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
              >
                <span className="price-unit-span">
                  {information.name_owner}
                </span>
                <span className="price-unit-span">
                  {information.last_name_owner}
                </span>
                <span className="price-span">
                  {`(${information.username_owner})`}
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
                width: "100%",
                flexDirection: "column",
              }}
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="قیمت نهایی پرداخت شده:"
                    size="small"
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
              >
                <span className="price-span">
                  {information.final_price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </span>
                <span className="price-unit-span">تومان</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
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
            padding: "10px 0 0 0",
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
              color="error"
              variant="contained"
              onClick={handleClickOnPayByWallet}
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
              }}
            >
              عدم دریافت محصول
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
              color="success"
              variant="contained"
              onClick={handleClickPayByDirect}
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
              }}
            >
              ثبت بازخورد
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function WaitingToPayCard({ information }) {
  const [cancellAuction, setCancellAuctionModal] = useState(false);
  const [penaltyInfo, setPenaltyInfo] = useState(information.penalaty_details);

  function handleClickOnCancellAuction() {
    setCancellAuctionModal(true);
  }
  const handleCloseCancellAuctionModal = () => {
    setCancellAuctionModal(false);
  };

  // const [time, setTime] = useState(["2024", "04", "18", "13", "00", "00"]);
  var end_year = Number(
    information.expiration_date[0] +
      information.expiration_date[1] +
      information.expiration_date[2] +
      information.expiration_date[3]
  );
  var end_month = Number(
    information.expiration_date[5] + information.expiration_date[6]
  );
  var end_day = Number(
    information.expiration_date[8] + information.expiration_date[9]
  );
  var end_hour = Number(
    information.expiration_date[11] + information.expiration_date[12]
  );
  var end_minute = Number(
    information.expiration_date[14] + information.expiration_date[15]
  );
  var end_second = Number(
    information.expiration_date[17] + information.expiration_date[18]
  );
  const [time, set_time] = useState([
    end_year,
    end_month,
    end_day,
    end_hour,
    end_minute,
    end_second,
  ]);
  async function handleClickOnPayByWallet() {}
  async function handleClickPayByDirect() {}

  return (
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
      className="interestCardParent"
    >
      <CancellAuctionModal
        open={cancellAuction}
        handleClose={handleCloseCancellAuctionModal}
        penaltyInfo={penaltyInfo}
        productID={information.id}
        productTitle={information.title}
        produtPrice={information.final_price}
      />
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="interestCardImageParent"
      >
        <img
          src={information.image_URL}
          alt="savedProduct"
          className="imageCard"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "0 5px",
        }}
        className="content-left-parent"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              display: "felx",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
            className="left-time-parent"
          >
            <DangerTooltip title="در صورت به پایان رسیدن زمان و عدم پرداخت مشمول به پرداخت جریمه خواهید شد!">
              <span className="time-title-span-2">
                زمان باقی‌مانده برای تسویه:
              </span>
              <TimeLeftAuction
                end_time={time}
                padding={"5px"}
                text_size={"16px"}
              />
            </DangerTooltip>
          </Grid>
          <DangerTooltip title="در صورت لغو مزایده جریمه خواهید شد!">
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={handleClickOnCancellAuction}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8V18C5 20.2091 6.79086 22 9 22H15C17.2091 22 19 20.2091 19 18V8M14 11V17M10 11L10 17M16 5L14.5937 2.8906C14.2228 2.3342 13.5983 2 12.9296 2H11.0704C10.4017 2 9.7772 2.3342 9.40627 2.8906L8 5M16 5H8M16 5H21M8 5H3"
                  stroke="red"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
          </DangerTooltip>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
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
              flexDirection: "row",
              width: "100%",
              padding: "5px",
              minHeight: { sm: "75px" },
            }}
          >
            <Grid
              item
              xs={8}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                className="titleClassName"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "18px", lg: "18px" },
                }}
              >
                {information.title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              className="image-parent-xs"
            >
              <img
                src={information.image_URL}
                alt="savedProduct"
                className="imageCard-xs"
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
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
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
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="مشخصات فروشنده:"
                    size="small"
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
              >
                <span className="price-unit-span">
                  {information.name_owner}
                </span>
                <span className="price-unit-span">
                  {information.last_name_owner}
                </span>
                <span className="price-span">
                  {`(${information.username_owner})`}
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
                  flexDirection: "column",
                }}
                className="price-parent"
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      className="custome-chip"
                      label="قیمت نهایی:"
                      size="small"
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
                >
                  <span className="price-span">
                    {information.final_price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </span>
                  <span className="price-unit-span">تومان</span>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
                className="suggest-parent"
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      className="custome-chip"
                      label="تعداد کل پیشنهادات:"
                      size="small"
                    />
                  </Divider>
                </Root>
                <span className="suggest-number-sapn">
                  {information.total_bid_number}
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
                  flexDirection: "column",
                }}
                className="price-parent"
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      className="custome-chip"
                      label="بیعانه:"
                      size="small"
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
                >
                  <span className="price-span">
                    {information.has_paid.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="price-unit-span">تومان</span>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
                className="price-parent"
              >
                <Root>
                  <Divider className="custome_divider" textAlign="center">
                    <Chip
                      className="custome-chip"
                      label="مبلغ باقی‌مانده:"
                      size="small"
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
                >
                  <span className="price-span">
                    {information.have_to_pay.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </span>
                  <span className="price-unit-span">تومان</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          color="#a5a9ac33"
          style={{
            width: "100%",
            height: "3px",
          }}
        />
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
            padding: "10px 0 0 0",
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
              color="warning"
              variant="outlined"
              onClick={handleClickOnPayByWallet}
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
              }}
            >
              پرداخت از کیف پول
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
              color="success"
              variant="contained"
              onClick={handleClickPayByDirect}
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
              }}
            >
              پرداخت مستقیم
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
//Loading Components
export function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
export function LinearColor() {
  return (
    <Stack
      sx={{ width: "100%", color: "#a59a33", padding: "20px 0" }}
      spacing={2}
    >
      <LinearProgress color="warning" />
      <LinearProgress color="inherit" />
      <LinearProgress color="success" />
    </Stack>
  );
}
const cardInfo = [
  {
    id: 1,
    title: "1 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-05-19T22:21:43",
    final_price: "800000",
    total_bid_number: 32,
    has_paid: "30000",
    have_to_pay: "270000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
    penalaty_details: {
      penalty_cancell_pay: "2000",
      penalty_precent: "0.25",
    },
  },
  {
    id: 2,
    title: "2 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-05-19T22:21:11",
    final_price: "400000",
    total_bid_number: 32,
    has_paid: "100000",
    have_to_pay: "400000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
    penalaty_details: {
      penalty_cancell_pay: "1000",
      penalty_precent: "0.25",
    },
  },
  {
    id: 3,
    title: "3 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-05-21T12:21:23",
    final_price: "1200000",
    total_bid_number: 32,
    has_paid: "120000",
    have_to_pay: "1080000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
    penalaty_details: {
      penalty_cancell_pay: "6000",
      penalty_precent: "0.5",
    },
  },
  {
    id: 4,
    title: "باندل سی پی یو Xeon X5650 به همراه 12GB رم DDR3",
    image_URL: `${image}`,
    expiration_date: "2024-05-20T22:21:43",
    final_price: "100000000",
    total_bid_number: 32,
    has_paid: "30000000",
    have_to_pay: "70000000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
    penalaty_details: {
      penalty_cancell_pay: "250000",
      penalty_precent: "0.25",
    },
  },
];
const setFeedBackCardInfo = [
  {
    id: 1,
    title: "1 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "300000",
    name_owner: "سید علی",
    last_name_owner: "خراسانی",
    username_owner: "alikhorasani",
  },
  {
    id: 2,
    title: "2 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "400000",

    name_owner: "علی",
    last_name_owner: "مشایخ",
    username_owner: "alijon",
  },
  {
    id: 3,
    title: "3 ساعت مچی",
    image_URL: `${image}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "1200000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
  },
  {
    id: 4,
    title: "باندل سی پی یو Xeon X5650 به همراه 12GB رم DDR3",
    image_URL: `${image}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "100000000",
    name_owner: "احسان",
    last_name_owner: "اکبری",
    username_owner: "ehsanjj",
  },
];
const allHistoryItem = [
  {
    id: 1,
    title: "تلفن همراه مدل mi 11T PRO",
    image_URL: `${image}`,
    final_price: "300000",
    name_owner: "مهدی",
    last_name_owner: "توسلی",
    username_owner: "mah23th",
    resualt: "success",
    penalty_amount: "50,000",
    penalty_type: "negative",
    reseon: "عدم ثبت بازخورد فروشنده ",
  },
  {
    id: 2,
    title: "لپتاپ مدل lenovo L340",
    image_URL: `${image}`,
    final_price: "40,200,000",
    name_owner: "علی",
    last_name_owner: "مشایخ",
    username_owner: "AliMashayekh",
    resualt: "unsuccess",
    penalty_amount: "100,000",
    penalty_type: "possetive",
    reseon: "عدم ارسال کالا توسط فروشنده",
  },
  {
    id: 3,
    title: "کنسول بازی مدل XBox Seri X 1000GB",
    image_URL: `${image}`,
    final_price: "34,000,000",
    name_owner: "احسان",
    last_name_owner: "اکبری",
    username_owner: "ehsanjj",
    resualt: "success",
    penalty_amount: "0.0",
    penalty_type: "possetive",
    reseon: "کالا به با موفقیت در مزایده به فروش رفت.",
  },
  {
    id: 4,
    title: "تلفن همراه مدل Apple Iphone 15 Pro Max",
    image_URL: `${image}`,
    final_price: "78,000,000",
    name_owner: "سید علی",
    last_name_owner: "خراسانی",
    username_owner: "alikhorasani",
    resualt: "unsuccess",
    penalty_type: "negative",
    penalty_amount: "150,000",
    reseon: "عدم پرداخت مابقی هزینه کالا",
  },
];
