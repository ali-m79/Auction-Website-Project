import * as React from "react";
import { useState, useEffect } from "react";

//Style
import "./ProfileStyle.css";

//MUI Components
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

//Components
import Footer from "../../components/FooterComp/Footer.jsx";
import RightNavBar from "../../components/ProfileComponents/Navbar/RightNavbar.jsx";
import Header from "../../components/ProfileComponents/Header/Header.jsx";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../components/Toast/ToastCustom";
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";
import { IP } from "../../App.jsx";
import BreadCrumbsAll from "../../components/ProfileComponents/BreadCrumbsComp/BreadCrumbsAll.jsx";
import { CustomSeparator } from "../../components/ProfileComponents/BreadCrumbsComp/BreadCrumbsAll.jsx";
import { useParams } from "react-router-dom";

//Tab Content Components
import TitleComponent from "../../components/ProfileComponents/TitleComponents/TitleComponent.jsx";
import PersonalInfoComp from "../../components/ProfileComponents/PersonalInformation/PersonalInfoComp.jsx";
import HistoryBuyComponent from "../../components/ProfileComponents/HistoryBuyComp/HistoryBuyComponent.jsx";
import HistorySellComponent from "../../components/ProfileComponents/HistorySellComp/HistorySellComponent.jsx";
import MyAdsComponent from "../../components/ProfileComponents/MyAdsComp/MyAdsComponent.jsx";
import MyWalletComponent from "../../components/ProfileComponents/MyWalletComp/MyWalletComponent.jsx";
import MyInterestComponent from "../../components/ProfileComponents/MyInterestComp/MyInterestComponent.jsx";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="profile-parent"
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            flexDirection: "column",
            paddingTop: { xs: "10px", sm: "15px", md: "18px", lg: "20px" },
            paddingBottom: { xs: "10px", sm: "15px", md: "18px", lg: "20px" },
          }}
          className="container-custome"
        >
          {children}
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ProfilePage({ personalInformation }) {
  const number = useParams();
  var numberAsInt = parseInt(number.activeTab, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [tabNumber, setTabNumber] = useState(numberAsInt);
  function handdleChange() {
    setIsOpen((elm) => !elm);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        sx={{
          display: "flex",
        }}
      >
        <ToastContainerCustom />
        <Grid item sx={{ display: { xs: "none", lg: "block" } }}>
          <RightNavBar
            isOpen={isOpen}
            handdleChange={handdleChange}
            activeTab={tabNumber}
            setTab={setTabNumber}
            navItems={navItems}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Header
            isOpen={isOpen}
            activeTab={tabNumber}
            setTab={setTabNumber}
            navItems={navItems}
          />
          <Grid
            item
            xs={12}
            container
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CustomTabPanel value={tabNumber} index={0} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"اطلاعات شخصی"}
                    iconNumber={1}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <PersonalInfoComp setTab={setTabNumber} />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={1} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"سابقه خرید"}
                    iconNumber={3}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <HistoryBuyComponent />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={2} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"سابقه فروش"}
                    iconNumber={3}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <HistorySellComponent />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={3} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"مزایده‌های من"}
                    iconNumber={4}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <MyAdsComponent />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={4} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"کیف پول"}
                    iconNumber={5}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <MyWalletComponent />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={5} navItems={navItems}>
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
                className="contentCardParent"
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
                  <BreadCrumbsAll tabNumber={tabNumber} key={tabNumber}>
                    <CustomSeparator
                      tabNumber={tabNumber}
                      information={navItems}
                      key={tabNumber}
                      breadCrumbsItems={breadCrumbsItems}
                    />
                  </BreadCrumbsAll>
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <TitleComponent
                    title={"علاقه‌مندی‌ها"}
                    iconNumber={6}
                    titleClassName={"titleClass"}
                  />
                  <Divider
                    color="#d8c3a5"
                    style={{ width: "100%", height: "2px" }}
                  />
                  <MyInterestComponent />
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ProfilePage;

const breadCrumbsItems = [
  {
    key: 1,
    title: "بیدوین",
    className: "breadCrumbsNavlink",
    toLink: "/",
    isTheLastItem: false,
  },
  {
    key: 2,
    title: "صفحه کاربری",
    className: "breadCrumbsNavlink",
    toLink: "/profile/0",
    isTheLastItem: false,
  },
  {
    key: 3,
    title: "",
    className: "breadCrumbsLastItem",
    isTheLastItem: true,
  },
];
const navItems = [
  {
    tabNumber: 0,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "اطلاعات شخصی",
    iconNumber: 1,
    insideIconColor: "",
  },
  {
    tabNumber: 1,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "سابقه خرید",
    iconNumber: 2,
    insideIconColor: "",
  },
  {
    tabNumber: 2,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "سابقه فروش",
    iconNumber: 3,
    insideIconColor: "",
  },
  {
    tabNumber: 3,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "مزایده‌های من",
    iconNumber: 4,
    insideIconColor: "",
  },
  {
    tabNumber: 4,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "کیف پول",
    iconNumber: 5,
    insideIconColor: "",
  },
  {
    tabNumber: 5,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "علاقه‌مندی‌ها",
    iconNumber: 6,
    insideIconColor: "",
  },
];
