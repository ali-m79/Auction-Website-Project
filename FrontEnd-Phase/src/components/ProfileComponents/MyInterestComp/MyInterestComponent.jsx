import * as React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../AuthService.jsx";

//MUI Components
import { Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

//MUI Icons
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

//Style
import "./MyInterestStyle.css";

//Manual Components
import TimeLeftAuction from "../../time_left_auctions/time_left_auctions";
import { NavLink } from "react-router-dom";
import { LinearColor } from "../HistoryBuyComp/HistoryBuyComponent";
import {
  successMessage,
  warningMessage,
  defaultMessage,
  errorMessage,
} from "../../Toast/ToastCustom";
import { IP } from "../../../App.jsx";
import axios from "axios";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
function MyInterestComponent() {
  let { authTokens } = useContext(AuthContext);

  const [interestInformation, setInterestInformation] = useState(undefined);

  async function handleClickOnDelete(id) {
    try {
      const accessToken = authTokens.access;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${IP}/user/delete_from_interested_item/?id=${id}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage(
          "مزایده با موفقیت از لیست علاقه‌مندی‌های شما حذف گردید!"
        );
        fetchInterestedAds();
      }
    } catch (error) {
      errorMessage("خطا در اتصال به سرور");
    }
  }

  const fetchInterestedAds = async () => {
    const accessToken = authTokens.access;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(`${IP}/user/get_interested_item/`, {
        headers,
      });
      if (response.status === 200) {
        setInterestInformation(response.data);
        console.log(response.data);
      }
    } catch (error) {
      if (error.response.status === 400) errorMessage("خطا در اتصال به شبکه");
    }
  };
  useEffect(() => {
    fetchInterestedAds();
  }, []);
  if (interestInformation === undefined) {
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
          margin: "20px 15px",
        }}
        className="parentAllCards"
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
        alignItems: "center",
        width: "100%",
      }}
      className="parentAllCards"
    >
      {interestInformation.length === 0 ? (
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
            margin: "20px",
          }}
          className="info_parent"
        >
          <InfoIcon color="info" />
          <p className="info_p">
            هیچ مزایده‌ای در لیست علاقه‌مندی‌های شما وجود ندارد!
          </p>
        </Grid>
      ) : (
        interestInformation.map((card, index) => (
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              padding: "10px 10px",
            }}
          >
            <InterestedCArd
              information={card}
              key={index}
              handleDeleteItem={handleClickOnDelete}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default MyInterestComponent;
function InterestedCArd({ information, handleDeleteItem }) {
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
  function handleClickOnShareItem(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        defaultMessage("لینک محصول با موفقیت کپی شد :)");
      })
      .catch((err) => {
        warningMessage("مشکل در کپی‌کردن لینک محصول :(");
      });
  }
  const handleDelete = (id) => {
    handleDeleteItem(id);
  };
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
          src={information.images[0]}
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
          padding: "5px",
        }}
        className="content-left-parent"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
          className="left-time-parent"
        >
          <span
            className="time-title-span"
            style={{ display: "flex", width: "100%" }}
          >
            زمان باقی‌مانده:
          </span>
          <TimeLeftAuction end_time={time} padding={"5px"} text_size={"16px"} />
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
                src={information.images[0]}
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
              flexDirection: "row",
              width: "100%",
              padding: "5px",
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
                gap: "8px",
              }}
              className="price-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="قیمت مزایده"
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
                <span className="price-span">{information.price}</span>
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
                gap: "8px",
              }}
              className="suggest-parent"
            >
              <Root>
                <Divider className="custome_divider" textAlign="center">
                  <Chip
                    className="custome-chip"
                    label="تعداد پیشنهاد"
                    size="small"
                  />
                </Divider>
              </Root>
              <span className="suggest-number-sapn">
                {information.bid_number}
              </span>
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
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              gap: "5px",
              padding: "5px 0",
            }}
          >
            <LightTooltip title="حذف">
              <IconButton
                aria-label="delete"
                size="medium"
                onClick={() => handleDelete(information.id)}
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
            </LightTooltip>
            <LightTooltip title="اشتراک گذاری">
              <IconButton
                aria-label="share"
                size="medium"
                onClick={() => handleClickOnShareItem(information.link)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#eae7dc"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.63118 10.4344C8.05656 9.2874 6.87023 8.5 5.5 8.5C3.567 8.5 2 10.067 2 12C2 13.933 3.567 15.5 5.5 15.5C6.87023 15.5 8.05656 14.7126 8.63118 13.5656M8.63118 10.4344C8.86718 10.9055 9 11.4372 9 12C9 12.5628 8.86718 13.0945 8.63118 13.5656M8.63118 10.4344L15.3688 7.06559M8.63118 13.5656L15.3688 16.9344M15.3688 7.06559C15.9434 8.2126 17.1298 9 18.5 9C20.433 9 22 7.433 22 5.5C22 3.567 20.433 2 18.5 2C16.567 2 15 3.567 15 5.5C15 6.06276 15.1328 6.59451 15.3688 7.06559ZM15.3688 16.9344C15.1328 17.4055 15 17.9372 15 18.5C15 20.433 16.567 22 18.5 22C20.433 22 22 20.433 22 18.5C22 16.567 20.433 15 18.5 15C17.1298 15 15.9434 15.7874 15.3688 16.9344Z"
                    stroke="#8e8d8a"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </IconButton>
            </LightTooltip>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NavLink to={information.link} className="link-class">
              <span className="view-span-prodduct">مشاهده محصول</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9H11V7.20377C11 6.34461 9.98808 5.88543 9.3415 6.45119L4.72017 10.4948C3.80952 11.2917 3.80952 12.7083 4.72017 13.5052L9.3415 17.5488C9.98808 18.1146 11 17.6554 11 16.7962V15H19C20.1046 15 21 14.1046 21 13V11C21 9.89543 20.1046 9 19 9Z"
                  stroke="#a59a33"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
