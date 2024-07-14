import { Divider, Grid, Typography, Button } from "@mui/material";
import Navbar from "../../components/navbar/navbar";
import Right_tab from "../../components/right-tab/tab";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { styled } from "@mui/material/styles";
import MelliLogo from "../../images/Banks/Melli.png";
import MelatLogo from "../../images/Banks/Mellat.png";
import PasargadLogo from "../../images/Banks/Pasargad.png";
import { useState } from "react";

export default function PaymentPage() {
  const [currentBank, setCurrentBank] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const AddValue = (value) => {
    setCurrentValue(value);
  };
  const BankClick = (name) => {
    setCurrentBank(name);
  };
  const Title = styled(Typography)(() => ({
    fontSize: "30px",
    textAlign: "right",
    width: "98%",
  }));
  const WalletIcon = styled(WalletOutlinedIcon)(() => ({
    width: "30px",
    height: "30px",
  }));
  const Container = styled("div")(() => ({
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    margin: "20px 20px 0px 0px",
  }));

  const CreditBox = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      padding: "0px 20px 0px 20px ",
    },

    marginTop: "8px",
    border: "1px solid #828282",
    borderRadius: "4px",
    width: "50%",
    height: "300px",
    flexWrap: "wrap",
  }));
  const inputStyle = {
    textAlign: "right",
    padding: "5px",
    width: "90%",
    height: "70%",
    marginLeft: "center",
    marginRight: "center",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    border: "none",
    backgroundColor: "#F5F5F5",
  };
  const PlaceholderDiv = styled("div")(() => ({
    display: "flex",
    backgroundColor: "#DEDEDE",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    width: "20%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  }));
  const PriceButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      fontSize: "12px",
    },
    border: "1px solid black",
    color: "black",
    "&:hover": {
      border: "1px solid black",
    },
    "&:active": {
      border: "1px solid rgb(182, 1, 60)",
    },
  }));
  const LogoButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("xs")]: {
      width: "80px",
      height: "100px",
    },
  }));
  const LogoImg = styled("img")(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("md")]: {
      width: "80px",
      height: "80px",
    },
  }));
  const ChosenLogoButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("xs")]: {
      width: "80px",
      height: "100px",
    },
    border: "1px solid black",
  }));
  const PayButton = styled(Button)(() => ({
    backgroundColor: "#B6013C",
    width: "10%",
    height: "40px",
    color: "white",
    marginTop: "20px",

    "&:hover": {
      backgroundColor: "#B6013C",
    },
    "&:active": {
      backgroundColor: "#B6013C",
    },
  }));

  return (
    <div>
      <Navbar />
      <div className="row m-0">
        <div className="col-lg-2 col-md-3  pe-0">
          <Right_tab />
        </div>
        <div className="col-lg-10 col-md-9 ">
          <Container>
            <WalletIcon />
            <Title>کیف پول</Title>
          </Container>
          <Divider
            variant="middle"
            sx={{
              marginTop: "8px",
              marginBottom: "15px",
              borderColor: "black",
            }}
          />
          <div style={{ textAlign: "right" }}>موجودی شما: 20000 تومان</div>
          <Divider
            variant="middle"
            sx={{
              marginTop: "8px",
              marginRight: "25%",
              marginBottom: "15px",
              borderColor: "black",
              width: "50%",
            }}
          />
          <div style={{ textAlign: "right" }}>افزایش موجودی کیف پول بیدوین</div>
          <div style={{ textAlign: "right", fontSize: "10px" }}>
            شما میتوانید با این بخش کیف پول خود را شارژ کنید
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CreditBox container rowSpacing={0}>
              <Grid display="flex" alignItems="center" item xs={12}>
                <Typography sx={{ height: "15px" }} variant="h6">
                  مبلغ
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                xs={12}
              >
                <NumberInput
                  value={currentValue}
                  setValue={setCurrentValue}
                  STYLE={inputStyle}
                  max={10}
                />
                <PlaceholderDiv>ریال</PlaceholderDiv>
              </Grid>
              <Grid
                display="flex"
                gap="15px"
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
              >
                <PriceButton
                  onClick={() => AddValue("300,000")}
                  variant="outlined"
                >
                  300,000 ریال
                </PriceButton>
                <PriceButton
                  onClick={() => AddValue("1,000,000")}
                  variant="outlined"
                >
                  1,000,000 ریال
                </PriceButton>
                <PriceButton
                  onClick={() => AddValue("5,000,000")}
                  variant="outlined"
                >
                  5,000,000 ریال
                </PriceButton>
              </Grid>
              <Grid
                display="flex"
                gap="25px"
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
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
                  <LogoButton
                    onClick={() => BankClick("Pasrgod")}
                    variant="text"
                  >
                    <LogoImg alt="logo" src={PasargadLogo} />
                  </LogoButton>
                )}
              </Grid>
            </CreditBox>
            <PayButton variant="outline">پرداخت</PayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const NumberInput = ({ STYLE, max, placeholder, select, value, setValue }) => {
  const handleInputChange = (event) => {
    const value = event.target.value.replace(/\D+/g, ""); // Allowing only digits
    const numberWithCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (value.length <= max) {
      setValue(numberWithCommas);
    }
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      maxLength={max}
      placeholder={placeholder}
      style={STYLE}
    />
  );
};
