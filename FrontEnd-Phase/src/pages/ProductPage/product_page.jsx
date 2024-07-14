import React, { useEffect, useState } from "react";
import Header from "../../components/ProfileComponents/Header/Header";
import Footer from "../../components/FooterComp/Footer";
import { CustomBreadcrumbs } from "../../components/BreadCrumbs/CustomBreadcrumbs";
import {
  Divider,
  Grid,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
  Tabs,
  Tab,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import TimeLeft from "../../components/Time/TimeLeft";
import PreviewPictures from "../../components/PreviewPictures/PreviewPictures";
import { PriceBox, SellerBox } from "../../components/Boxes/Boxs";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthProvider } from "../../AuthService";



const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },
  },
  palette: {
    darkRed: {
      main: "#e85a4f",
    },
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductPage() {

  const [data,setData]=useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const {id}=useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/item/get_item_by_link/?id=${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error while reading the json file', error));
  }, []);
  
  if(!data){
    return <div>Loading</div>
  }
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  // const categories = data.category.map((category) => {
  //   return (
  //     <Button
  //       sx={{ fontFamily: "B_nazanin", color: "white", marginLeft: "10px" }}
  //       size="small"
  //       color="darkRed"
  //       variant="contained"
  //       disableElevation
  //     >
  //       {category}
  //     </Button>
  //   );
  // });
  // const comments = data.comments.map((comment)=>{
  //   return(
  //     <CommnetBox Id={comment.senderName} Text={comment.comment}/>
  //   )
  // })
  const Title = styled(Typography)(({ theme }) => ({
    marginBottom: "15px",
    fontFamily: "IRANSansWeb",
    [theme.breakpoints.up("xs")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  }));

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
      {/* <CustomBreadcrumbs path={data.breadcrumbsNames} /> */}
      <Grid container columnGap={5} style={{ paddingTop: "10px" }}>
        <Grid
          item
          sx={{ marginLeft: "auto", marginRight: "auto" }}
          xs={11}
          sm={11}
          md={5.5}
        >
          <PreviewPictures pics={data.images}/>
        </Grid>
        <Grid
          item
          sx={{ marginLeft: "auto", marginRight: "auto" }}
          xs={11}
          sm={11}
          md={5.5}
        >
          <TimeLeft finishDateInput={data.release_date} />
          <Divider
            sx={{
              marginTop: "15px",
              marginBottom: "15px",
              borderColor: "black",
            }}
          />
          <Title>{data.title}</Title>
          <Grid container spacing={1}>
            <Grid item>
              <Typography sx={{ fontFamily: "B_nazanin" }}>
                دسته بندی
              </Typography>
            </Grid>
            {/* <Grid item>
              <ThemeProvider theme={theme}>{categories}</ThemeProvider>
            </Grid> */}
          </Grid>
          <PriceBox price={data.price}/>
          <Typography
            variant="h5"
            sx={{ color: "#00000080", fontFamily: "B_nazanin" }}
          >
            اطلاعات فروشنده:
          </Typography>
          <SellerBox seller={data.owner} />
          <Grid container>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "B_nazanin", color: "#00000080" }}
                display="inline"
              >
                فروش موفق:{" "}
              </Typography>
              <Typography
                variant="h7"
                sx={{ fontFamily: "B_nazanin", color: "black" }}
                display="inline"
              >
                105 مورد
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "B_nazanin", color: "#00000080" }}
                display="inline"
              >
                تاریخ عضویت:{" "}
              </Typography>
              <Typography
                variant="h7"
                sx={{ fontFamily: "B_nazanin", color: "black" }}
                display="inline"
              >
                1398/03/24
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "15px" }}>
            <Grid item xs={6} sx={{ textAlign: "left" }}>
              <FormDialog />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button variant="text">
                <Stack direction="column">
                  <ShareOutlinedIcon
                    fontSize="large"
                    sx={{ alignSelf: "center", color: "black" }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "black",
                      fontFamily: "B_nazanin",
                    }}
                    variant="h6"
                  >
                    اشتراک گذاری
                  </Typography>
                  <Divider
                    sx={{
                      marginTop: "8px",
                      marginBottom: "15px",
                      borderColor: "black",
                    }}
                  />
                </Stack>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        sx={{ marginTop: "8px", marginBottom: "15px", borderColor: "black" }}
      />
      <Info />
      <Divider
        variant="middle"
        sx={{ marginTop: "8px", marginBottom: "15px", borderColor: "black" }}
      />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            sx={{ ".Mui-selected": { color: "rgb(182, 1, 60)" } }}
            TabIndicatorProps={{
              style: { backgroundColor: "rgb(182, 1, 60)" },
            }}
            value={currentTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="اطلاعات" {...a11yProps(0)} />
            <Tab label="نظرات" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel
          style={{ color: "black", margin: "50px 50px 20px 0px" }}
          value={currentTab}
          index={0}
        >
          <Typography variant="h5">
            <Box fontWeight="fontWeightBold">مشخصات کالا</Box>
          </Typography>
          <Typography variant="subtitle1">
            {data.description}
          </Typography>
        </CustomTabPanel>
        <CustomTabPanel style={{color:'black',padding:'20px',marginBottom:'40px'}} value={currentTab} index={1}>
            {/* {comments} */}
            <textarea
                color='darkRed'
                type="text"
                rows = {8}
                placeholder='ارسال نظر'
                style={{ display:'block',width:'95%', marginBottom:'15px', borderRadius:'15px',padding:'10px',position:'relative', left:'-50%',top:'15px', transform:'translateX(50%)'}}
            />
            <ThemeProvider theme={theme}>
                <Button color='darkRed'  sx={{color:'white',width:'150px', height:'40px', position:'absolute', left:'60px',marginTop:'15px'}} variant='contained'>ارسال نظر</Button>
            </ThemeProvider>
        </CustomTabPanel>
      </Box>
      <AuthProvider>
        <Footer />
      </AuthProvider>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

export const Info = () => {
  const TextPrompt = styled(Typography)(({ theme }) => ({
    fontFamily: "B_nazanin",
    color: "#00000080",
    [theme.breakpoints.up("xs")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px",
    },
  }));
  const TextInfo = styled(Typography)(({ theme }) => ({
    fontFamily: "B_nazanin",
    color: "black",
    [theme.breakpoints.up("xs")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  }));

  const BuyButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontFamily: "B_nazanin",
    height: "50px",
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.up("xs")]: {
      fontSize: "14px",
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
      width: "85%",
    },
  }));

  const FlexBox = styled("div")(() => ({
    display: "flex",
    justifyItems: "center",
  }));

  return (
    <Grid container alignItems="center">
      <Grid
        item
        xs={5.5}
        sx={{ textAlign: "center", paddingTop: "16px", paddingBottom: "16px" }}
      >
        <TextPrompt>زمان تقریبی رسیدن کالا:</TextPrompt>
        <WbSunnyOutlinedIcon />
        <TextInfo display="inline"> 5 روز کاری</TextInfo>
      </Grid>
      <Divider
        variant="middle"
        flexItem
        orientation="vertical"
        sx={{ borderColor: "black" }}
      />
      <Grid
        item
        xs={5.5}
        sx={{ textAlign: "center", paddingTop: "16px", paddingBottom: "16px" }}
      >
        <TextPrompt>تعداد پیشنهادات:</TextPrompt>
        <TextInfo>120 پیشنهاد</TextInfo>
      </Grid>
    </Grid>
  );
};

function CommnetBox({ Id, Text }) {
  const CommentBoxContainer = styled(Box)(() => ({
    width: "95%",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#eae7dc",
    placeSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "24px",
    marginTop: "24px",
    boxShadow: "0px 4px 10px 0px #00000040",
  }));
  const ResponsiveAvatar = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "50px",
      height: "50px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80px",
      height: "80px",
    },
    [theme.breakpoints.up("md")]: {
      width: "80px",
      height: "80px",
    },
  }));
  const Name = styled(Typography)(() => ({
    color: "black",
    textAlign: "right",
    marginBottom: "4px",
  }));
  const CommentText = styled(Typography)(() => ({
    color: "black",
    width: "100%",
    textAlign: "right",
  }));
  return (
    <CommentBoxContainer>
      <Grid container>
        <Grid item xs={2} md={1.5} lg={0.9}>
          <ResponsiveAvatar />
        </Grid>
        <Grid item xs={9} md={10.5} lg={11.1}>
          <Name display="block">{Id}</Name>
          <CommentText display="block">{Text}</CommentText>
        </Grid>
      </Grid>
    </CommentBoxContainer>
  );
}

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Button onClick={handleClickOpen} variant="text">
          <Stack direction="column">
            <ReportOutlinedIcon
              fontSize="large"
              sx={{ color: "red", alignSelf: "center" }}
            />
            <Typography
              sx={{
                textAlign: "center",
                color: "red",
                fontFamily: "B_nazanin",
              }}
              variant="h6"
            >
              گزارش تخلف
            </Typography>
            <Divider
              sx={{
                marginTop: "8px",
                marginBottom: "15px",
                borderColor: "red",
              }}
            />
          </Stack>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              height: "60vh",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <DialogTitle>گزارش تخلف</DialogTitle>
          <DialogContent
            sx={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <DialogContentText>
              تخلفات مشاهده شده را وارد نمایید
            </DialogContentText>
            <textarea
              color="darkRed"
              type="text"
              rows={10}
              style={{ height: "80%", flex: "1 1 auto", marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="darkRed" type="submit">
              ارسال گزارش
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
