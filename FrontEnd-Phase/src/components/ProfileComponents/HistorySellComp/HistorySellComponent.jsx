import * as React from "react";
import { useState, useEffect } from "react";

//MUI Components
import { Grid, Button, Typography, LinearProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";

//Style
import "./HistorySellStyle.css";

//MUI Icons
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";

//Manual Components
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
  
} from "../../../components/Toast/ToastCustom";
import { LinearColor } from "../HistoryBuyComp/HistoryBuyComponent";
import { WaitingToPayCard } from "../HistoryBuyComp/HistoryBuyComponent";
import TimeLeftAuction from "../../time_left_auctions/time_left_auctions";
import {
  GetAddress,
  CancellAuctionModal,
  SeeWinnerFeedBack,
} from "../../ModalTest/ModalCom";

//Import Images
import imageS24 from "../../../images/HistorySellsImages/S24.webp";
import imageMi12pro from "../../../images/HistorySellsImages/mi12pro.webp";
import imageIsusROG from "../../../images/HistorySellsImages/isusrog.webp";
import imagePlayStation5 from "../../../images/HistorySellsImages/playstation5.webp";
import imagexbox from "../../../images/HistorySellsImages/xboxserix.webp";
import imageiphone13 from "../../../images/HistorySellsImages/iphone13.webp";
import imagegalaxya55 from "../../../images/HistorySellsImages/galaxya55.webp";
import imagemsi from "../../../images/HistorySellsImages/msicyborg.webp";
import imagemac1 from "../../../images/HistorySellsImages/macbook1.webp";
import imagemac2 from "../../../images/HistorySellsImages/macbook2.webp";
import imagemac3 from "../../../images/HistorySellsImages/macbook3.webp";
import imagemac4 from "../../../images/HistorySellsImages/macbook4.webp";

//Import Tooltip Components
import {
  LightTooltip,
  DangerTooltip,
} from "../HistoryBuyComp/HistoryBuyComponent";


//Other Components
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
            <p className="info_p">{props.infoContent}</p>
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

function HistorySellComponent() {
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
            label=" ناموفق"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          /> */}
          <Tab
            label="فروش‌های موفق و ناموفق"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          {/* <Tab
            label="در انتظار دریافت بازخورد و تسویه"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          /> */}
          <Tab
            label="ارسال به خریدار"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="در انتظار پرداخت"
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
            "کالاهای که به دلیل مشخصی مرجوع شده‌اند یا توسط خودتان لغو گردیده است."
          }
        ></CustomTabPanel> */}
        <CustomTabPanel
          value={tabValue}
          index={0}
          infoContent={
            "همه کالاهایی که تاکنون در بیدوین با موفقیت به فروش رسانده‌اید و با شما تسویه شده است و محصولاتی که به دلایلی لغو شده‌اند!"
          }
        >
          <AllSellHistoryComponent />
        </CustomTabPanel>
        {/* <CustomTabPanel
          value={tabValue}
          index={2}
          infoContent={
            "کالاهایی که به خریدار تحویل شده است و خریدار طبق زمان باقیمانده برای ثبت فیدبک و نظر خود مهلت دارد."
          }
        ></CustomTabPanel> */}
        <CustomTabPanel
          value={tabValue}
          index={1}
          infoContent={
            "کالاهایی که شما هنوز مهلت دارید تا کالا را به شرکت پستی(حمل و نقل، پیک و ...) تحویل دهید و بارنامه را ثبت کنید."
          }
        >
          <SendToBuyer />
        </CustomTabPanel>
        <CustomTabPanel
          value={tabValue}
          index={2}
          infoContent={
            "مزایداتی که برنده دارد و باید در مهلت مقرر توسط برنده پرداخت شود."
          }
        >
          <WaitingToPayInSells />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}
//Tab Component Of Sells History
function WaitingToPayInSells() {
  const [information, setInformation] = useState(undefined);
  useEffect(() => {
    setInformation(WaitingToPayCardInfo);
  }, [information]);
  if (information === undefined) {
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
      {information.map((card, index) => (
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
          <WaitingToPayFromWinnerCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}

function SendToBuyer() {
  const [information, setInformation] = useState(undefined);
  useEffect(() => {
    setInformation(sendToWinner);
  }, [information]);
  if (information === undefined) {
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
      {information.map((card, index) => (
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
          <SendToWinnerCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}

function AllSellHistoryComponent() {
  const [information, setInformation] = useState(undefined);
  useEffect(() => {
    setInformation(allHistoryItem);
  }, [information]);
  if (information === undefined) {
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
      {information.map((card, index) => (
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
          <AllHistorySellsCard information={card} key={index} />
        </Grid>
      ))}
    </Grid>
  );
}

//Card Component Of Tab Components

export function SendToWinnerCard({ information }) {
  //State to store information of modals
  const [winnerInfo, setWinnerInfo] = useState(undefined);
  const [winnerAddress, setWinnerAddress] = useState(undefined);
  const [penaltyInfo, setPenaltyInfo] = useState(undefined);

  //Modals States
  const [recieveAddressModal, setAddressModal] = useState(false);
  const [cancellAuction, setCancellAuctionModal] = useState(false);

  //Handle Close And Open Modals
  const handleCloseRecieveAddress = () => {
    setAddressModal(false);
  };
  const handleCloseCancellAuctionModal = () => {
    setCancellAuctionModal(false);
  };

  function handleClickOnCancellAuction() {
    setCancellAuctionModal(true);
  }
  function handleClickRecieveAddress() {
    setAddressModal(true);
  }

  const [time, setTime] = useState(["", "", "", "", "", ""]);

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
    setWinnerInfo(information.winner_info);
    setWinnerAddress(information.winner_address);
    setPenaltyInfo(information.penalaty_details);
  }, [information]);
  if (penaltyInfo === undefined) {
    return <LinearColor />;
  }
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
      <GetAddress
        openGetAddress={recieveAddressModal}
        handleCloseModal={handleCloseRecieveAddress}
        winnerInfo={winnerInfo}
        winnerAddress={winnerAddress}
      />
      <CancellAuctionModal
        open={cancellAuction}
        handleClose={handleCloseCancellAuctionModal}
        penaltyInfo={penaltyInfo}
        productID={information.uuid}
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
            flexDirection: "column",
            width: "100%",
          }}
        >
          <DangerTooltip
            title={
              "در صورت عدم تحویل کالا به شرکت پستی در موعد مقرر، مجبور به پرداخت جریمه خواهید شد!"
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
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="مدت زمان باقی‌مانده برای تحویل کالا به پست :"
                    size="small"
                  />
                </Divider>
              </Root>
              <Grid
                item
                sx={{
                  display: "felx",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "5px 0",
                }}
                className="left-time-parent"
              >
                <TimeLeftAuction
                  end_time={time}
                  padding={"5px"}
                  text_size={"16px"}
                />
              </Grid>
            </Grid>
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
                    label="مشخصات برنده:"
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
                  {information.winner_info.name}
                </span>
                <span className="price-unit-span">
                  {information.winner_info.last_name}
                </span>
                <span className="price-span">
                  {`(${information.winner_info.username})`}
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
                    label="قیمت نهایی بیدوین:"
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
                      label="تسویه‌شده:"
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
                    {information.left_monry.replace(
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
            <DangerTooltip
              title={`در صورت لغو مزایده، به مبلغ ${penaltyInfo.penalty_cancell_pay.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )} تومان معادل ${
                penaltyInfo.penalty_precent
              } درصد از کل مبلغ کالا، به عنوان جریمه از کیف پول بیدوین شما کسر خواهد شد و باید چنین مبلغی در کیف پول خود داشته باشد تا فرآینده با موفقیت انجام شود!`}
            >
              <Button
                fullWidth
                color="error"
                variant="outlined"
                onClick={handleClickOnCancellAuction}
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
                }}
              >
                لغو مزایده
              </Button>
            </DangerTooltip>
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
              variant="text"
              onClick={handleClickRecieveAddress}
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "13px", xl: "15px" },
              }}
            >
              دریافت آدرس برنده
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function WaitingToPayFromWinnerCard({ information }) {
  const [cancellAuction, setCancellAuctionModal] = useState(false);
  const [penaltyInfo, setPenaltyInfo] = useState(undefined);

  function handleClickOnCancellAuction() {
    setCancellAuctionModal(true);
  }
  const handleCloseCancellAuctionModal = () => {
    setCancellAuctionModal(false);
  };

  const [time, setTime] = useState(["", "", "", "", "", ""]);

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
    setPenaltyInfo(information.penalaty_details);
  }, [information]);
  if (penaltyInfo === undefined) {
    return <LinearColor />;
  }

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
        productID={information.uuid}
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
            <LightTooltip title="در صورت به پایان رسیدن زمان و عدم پرداخت توسط برنده، شخص مورد نظر جریمه شده و مبلغی از جریمه به شما تعلق خواهد گرفت!">
              <span className="time-title-span-2">
                زمان باقی‌مانده برای تسویه برنده:
              </span>
              <TimeLeftAuction
                end_time={time}
                padding={"5px"}
                text_size={"16px"}
              />
            </LightTooltip>
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
                    label="مشخصات  برنده:"
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
                  {information.winner_info.name}
                </span>
                <span className="price-unit-span">
                  {information.winner_info.last_name}
                </span>
                <span className="price-span">
                  {`(${information.winner_info.username})`}
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
                      label="پرداخت‌شده:"
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
        <DangerTooltip title="در صورت لغو مزایده جریمه خواهید شد!">
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
              color="error"
              variant="outlined"
              onClick={handleClickOnCancellAuction}
            >
              پرداخت جریمه و لغو مزایده
            </Button>
          </Grid>
        </DangerTooltip>
      </Grid>
    </Grid>
  );
}
export function AllHistorySellsCard({ information }) {
  const [feedback, setFeedBack] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [feedBackModal, setFeedBackModal] = useState(false);

  function openFeedBackModal() {
    setFeedBackModal(true);
  }
  const closeFeedBackModal = () => {
    setFeedBackModal(false);
  };

  const handleClickOnSeeFeedBack = () => {
    openFeedBackModal();
  };
  useEffect(() => {
    setUserInfo(information.winner_info);
    if (information.feedback_has_accepted) {
      setFeedBack(information.feedback_details);
    }
  }, [information]);
  if (userInfo === undefined) {
    return <LinearColor />;
  }
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
      <SeeWinnerFeedBack
        open={feedBackModal}
        handleClose={closeFeedBackModal}
        winnerInfo={userInfo}
        feedBackInfo={feedback}
        productTitle={information.title}
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
                    label="مشخصات برنده:"
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
                <span className="price-unit-span">{userInfo.name_}</span>
                <span className="price-unit-span">{userInfo.last_name}</span>
                <span className="price-span">{`(${userInfo.username})`}</span>
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
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
              width: "100%",
              flexDirection: "column",
              paddingLeft: "5px",
              gap: "5px",
            }}
            className="price-parent"
          >
            <Root>
              <Divider className="custome_divider" textAlign="center">
                <Chip
                  className="custome-chip"
                  label="بازخورد به فروشنده:"
                  size="small"
                />
              </Divider>
            </Root>
            {feedback === undefined ? (
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
                className="notice_parent"
              >
                <span className="price-unit-span notice_account">
                  ثبت نشده!
                </span>
              </Grid>
            ) : (
              <Button
                fullWidth
                variant="text"
                color="success"
                size="large"
                onClick={handleClickOnSeeFeedBack}
              >
                مشاهده بازخورد
              </Button>
            )}
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
              paddingRight: "5px",

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
              <LightTooltip title="مقدار مبلغی که از حساب برنده کسر و به حساب شما افزوده شده است!">
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
                  <span className="price-unit-span success_account">تومان</span>
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
                  <span className="price-unit-span notice_account">تومان</span>
                </Grid>
              </DangerTooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HistorySellComponent;
const WaitingToPayCardInfo = [
  {
    id: 1,
    title: "کنسول بازی مایکروسافت مدل Xbox Series S ظرفیت 1 ترابایت",
    image_URL: `${imagexbox}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "22760000",
    total_bid_number: 9,
    has_paid: "3414000",
    have_to_pay: "19346000",
    penalaty_details: {
      penalty_cancell_pay: "56900",
      penalty_precent: "0.25",
    },
    winner_info: {
      name: "سید علی",
      last_name: "سادات خراسانی",
      username: "alikhorasani",
    },
  },
  {
    id: 2,
    title:
      "گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت - نات اکتیو",
    image_URL: `${imageiphone13}`,
    expiration_date: "2024-04-24T22:21:11",
    final_price: "37520000",
    total_bid_number: 77,
    has_paid: "5628000",
    have_to_pay: "31892000",
    penalaty_details: {
      penalty_cancell_pay: "93800",
      penalty_precent: "0.25",
    },
    winner_info: {
      name: "علی",
      last_name: "مشایخ",
      username: "alimashayekh33",
    },
  },
  {
    id: 3,
    title:
      "گوشی موبایل سامسونگ مدل Galaxy A55 دو سیم کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت - ویتنام",
    image_URL: `${imagegalaxya55}`,
    expiration_date: "2024-04-23T10:21:23",
    final_price: "18999000",
    total_bid_number: 32,
    has_paid: "2849850",
    have_to_pay: "16149150",
    penalaty_details: {
      penalty_cancell_pay: "759960",
      penalty_precent: "0.25",
    },
    winner_info: {
      name: "مهدی",
      last_name: "توسلی",
      username: "mah23th",
    },
  },
  {
    id: 4,
    title:
      "لپ تاپ 15.6 اینچی ام اس آی مدل Cyborg 15 A12VF-043US-i7 12650H 16GB 512SSD RTX4060 - کاستوم شده",
    image_URL: `${imagemsi}`,
    expiration_date: "2024-04-24T01:21:23",
    final_price: "74500000",
    total_bid_number: 3,
    has_paid: "11175000",
    have_to_pay: "63325000",
    penalaty_details: { penalty_cancell_pay: "372500", penalty_precent: "0.5" },
    winner_info: {
      name: "احسان",
      last_name: "اکبری",
      username: "ehsanjj",
    },
  },
];
const sendToWinner = [
  {
    uuid: 5,
    title:
      "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم کارت ظرفیت 512 گیگابایت و رم 12 گیگابایت - ویتنام",
    image_URL: `${imageS24}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "77350000",
    has_paid: "11600000",
    left_monry: "65750000",
    penalaty_details: { penalty_cancell_pay: "386000", penalty_precent: "0.5" },
    winner_info: {
      name: "سید علی",
      last_name: "سادات خراسانی",
      username: "alikhorasani",
    },
    winner_address: {
      phone: "09134445566",
      state: "کرمان",
      city: "رفسنجان",
      address_detials: "خیابان شهید بهشتی، کوچه لاله، بن‌بست اشرفی",
      plaque: 265,
      floor: 12,
      postal_code: "33361-31927",
      land_line_phone: "031-52402233",
    },
  },
  {
    uuid: 6,
    title:
      "گوشی موبایل شیائومی مدل 12 Pro 2201122G دو سیم کارت ظرفیت 256 گیگابایت و رم 12 گیگابایت ",
    image_URL: `${imageMi12pro}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "31300000",
    has_paid: "4695000",
    left_monry: "26605000",
    penalaty_details: {
      penalty_cancell_pay: "156000",
      penalty_precent: "0.5",
    },
    winner_info: {
      name: "علی",
      last_name: "مشایخ",
      username: "alimashayekh33",
    },
    winner_address: {
      phone: "09123334455",
      state: "اصفهان",
      city: "اصفهان",
      address_detials: "چهار باغ عباسی ",
      plaque: 265,
      floor: 1,
      postal_code: "77416-34183",
      land_line_phone: "031-52400088",
    },
  },
  {
    uuid: 7,
    title:
      "لپ تاپ 18 اینچی ایسوس مدل ROG Strix SCAR 18 G834JYR-N6060-i9 14900HX 64GB 2SSD RTX4090 - کاستوم شده",
    image_URL: `${imageIsusROG}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "278990000",
    has_paid: "41848500",
    left_monry: "237141500",
    penalaty_details: {
      penalty_cancell_pay: "697475",
      penalty_precent: "0.25",
    },
    winner_info: {
      name: "مهدی",
      last_name: "توسلی",
      username: "mah23th",
    },
    winner_address: {
      phone: "09381449633",
      state: "اصفهان",
      city: "مبارکه",
      address_detials: "خیابان شریعتی، کوچه انصار",
      plaque: 222,
      floor: 2,
      postal_code: "64871-13641",
      land_line_phone: "031-52407766",
    },
  },
  {
    uuid: 8,
    title:
      "کنسول بازی سونی مدل PlayStation 5 Slim ظرفیت یک ترابایت ریجن 2016A اروپا به همراه دسته اضافی و پایه شارژر",
    image_URL: `${imagePlayStation5}`,
    expiration_date: "2024-04-23T22:21:43",
    final_price: "35500000",
    has_paid: "5325000",
    left_monry: "30175000",
    penalaty_details: { penalty_cancell_pay: "177500", penalty_precent: "0.5" },
    winner_info: {
      name: "احسان",
      last_name: "اکبری",
      username: "ehsanjj",
    },
    winner_address: {
      phone: "09162224455",
      state: "تهران",
      city: "اکباتان",
      address_detials: "فاز 3، ساختمان 98 ضلع شرقی",
      plaque: 224,
      floor: 16,
      postal_code: "22332-12354",
      land_line_phone: "031-52409988",
    },
  },
];
const allHistoryItem = [
  {
    id: 9,
    title: "لپ تاپ 13.3 اینچی اپل مدل MacBook Air MGN63 2020-M1 8GB 256SSD",
    image_URL: `${imagemac1}`,
    final_price: "47329000",
    winner_info: {
      name: "مهدی",
      last_name: " توسلی",
      username: "mah23th",
    },
    resualt: "success",
    penalty_amount: "50,000",
    penalty_type: "possetive",
    reseon: "عدم ثبت بازخورد فروشنده ",
    feedback_has_accepted: false,
    feedback_details: {},
  },
  {
    id: 10,
    title: "لپ تاپ 14.2 اینچی اپل مدل MacBook Pro MRX53 2023-M3 Max 36GB 1SSD",
    image_URL: `${imagemac2}`,
    final_price: "209900000",
    winner_info: {
      name: "علی",
      last_name: " مشایخ",
      username: "AliMashayekh",
    },
    resualt: "unsuccess",
    penalty_amount: "100,000",
    penalty_type: "negative",
    reseon: "عدم ارسال کالا توسط فروشنده",
    feedback_has_accepted: false,
    feedback_details: {},
  },
  {
    id: 11,
    title: "لپ تاپ 13.6 اینچی اپل مدل MacBook Air-B M2 2022-M2 8GB 256SSD ",
    image_URL: `${imagemac3}`,
    final_price: "59085000",
    winner_info: {
      name: "احسان",
      last_name: " اکبری",
      username: "ehsanjj",
    },
    resualt: "success",
    penalty_amount: "0.0",
    penalty_type: "possetive",
    reseon: "کالا به با موفقیت در مزایده به فروش رفت.",
    feedback_has_accepted: true,
    feedback_details: {
      rating: 4,
      messeges: [true, true, false, false],
      feedback_content:
        "خرید خیلی خوبی بود. به موقع به دستم رسید و از فروشنده  کمال تشکر را دارم.",
    },
  },
  {
    id: 12,
    title: "لپ تاپ 15.3 اینچی اپل مدل MacBook Air MQKW3 M2 2023",
    image_URL: `${imagemac4}`,
    final_price: "73990000",
    winner_info: {
      name: "حسین ",
      last_name: " بریم نژاد",
      username: "hosseinborim",
    },
    resualt: "unsuccess",
    penalty_type: "possetive",
    penalty_amount: "150,000",
    reseon: "عدم پرداخت مابقی هزینه کالا",
    feedback_has_accepted: false,
    feedback_details: {},
  },
];
