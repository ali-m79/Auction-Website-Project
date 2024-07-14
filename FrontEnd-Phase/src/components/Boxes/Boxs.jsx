import React, { useState } from 'react'
import {Box,
    Grid,
    Typography,
    Button, 
    Avatar,
    createTheme,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'; 
import style from './PriceBox.module.css';
import { ThemeProvider, styled } from '@mui/material/styles';
import BidwinLogo from '../../images/logo.png';
import {warningMessage} from '../Toast/ToastCustom'
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { successMessage } from '../Toast/ToastCustom';
// import Keyboard from '../Keyboard/Keyboard';

export function PriceBox({price}) {

    const [currentBid,setCurrentBid]=useState(price.highestBid);

    const BigGrayText=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        color:'#00000080',
        [theme.breakpoints.up('xs')]:{
            fontSize:'14px',
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'22px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'18px'
        }
    }));

    const BigPriceText=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        color:'#B6013C',
        [theme.breakpoints.up('xs')]:{
            fontSize:'14px',
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'22px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'18px'
        }
    }));

    

    const SmallGrayPrompt=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        color:'#00000080',
        [theme.breakpoints.up('xs')]:{
            fontSize:'12px'
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'16px'
        }
    }))

    const SmallBlackPrice=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        color:'black',
        [theme.breakpoints.up('xs')]:{
            fontSize:'14px'
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'18px'
        }
    }))
  return (
    <Box id={style.priceBox} sx={{height:'156px'}} >
        <Grid container alignItems='center' sx={{width:'100%'}} rowGap={{xs:4,sm:2}}>
            <Grid item sx={{textAlign:'center'}} xs={6}>
                <SmallGrayPrompt style={{fontSize:'20px'}} display="inline" >قیمت پایه:</SmallGrayPrompt>
            </Grid>
            <Grid item sx={{textAlign:'center'}} xs={6}>
                <SmallBlackPrice display="inline" >{price.baseBid} تومان</SmallBlackPrice>
            </Grid>

            <Grid item sx={{textAlign:'center'}} xs={4}>
                <BigGrayText>بالاترین پیشنهاد:</BigGrayText>
            </Grid>
            <Grid item sx={{textAlign:'center'}} xs={4}>
                <BigPriceText>{currentBid} تومان</BigPriceText>
            </Grid>
            <Grid sx={{padding:'16px'}} item xs={4}>
                <BidDialog current={currentBid} set={setCurrentBid}/>
            </Grid>
        </Grid>
    </Box>
  )
}

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

function BidDialog({current,set,Close}){
    const [open, setOpen] = React.useState(false);
    const [currentInput,SetCurrentInput]=useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Button onClick={handleClickOpen} color='darkRed' variant="contained"sx={{
            [theme.breakpoints.up('xs')]:{
                fontSize:'14px',
                marginTop:'-6px',
                width:'90px',
                height:'40px'
            },
            [theme.breakpoints.up('sm')]:{
                fontSize:'16px',
                width:'80%',
                height:'40px'
            },
            [theme.breakpoints.up('md')]:{
                fontSize:'14px',
                fontWeight:'bold',
                width:'100%'
            },
            [theme.breakpoints.up('lg')]:{
                fontSize:'18px'
            }
        }}>
            <Typography
              sx={{
                textAlign: "center",
                color: "white",
                fontFamily: "B_nazanin",
              }}
              variant="h6"
            >
            ثبت پیشنهاد
            </Typography>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
                height: "30vh",
            },
          }}
        >
          <DialogTitle>ثبت پیشنهاد</DialogTitle>
          <DialogContent>
            <DialogContentText>
                مقدار پیشنهاد خود را وارد کنید
            </DialogContentText>
            <PriceInput setInput={SetCurrentInput}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{set(currentInput);setOpen(false);successMessage("پیشنهاد شما ثبت شد");}} color="darkRed" type="submit">
            ثبت
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

function PriceInput({setInput}){
    const [currentValue, setCurrentValue] = useState("");
    const AddValue = (value) => {
        setCurrentValue(value);
    };
    const handleChangeAmount = (event) => {
        const value = event.target.value.replace(/\D+/g, ""); // Allowing only digits
        const numberWithCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (value <= 200000000) {
          setCurrentValue(numberWithCommas);
          setInput(numberWithCommas);
        } else {
          warningMessage(
            " بیشتر از مبلغ دویست میلیون تومان نمی‌توانید وارد کنید! "
          );
        }
    }; 

    return(
        <>
            <FilledInput
                    id="filled-adornment-amount"
                    value={currentValue}
                    onChange={handleChangeAmount}
                    placeholder="ثبت مبلغ درخواستی"
                    endAdornment={
                      <InputAdornment position="end">تومان</InputAdornment>
                    }
                    sx={{width:'90%',margin:'10px 25px 0 0'}}
                  />
        </>
    )

}

export function SellerBox({seller}){

    const ResponsiveAvatar=styled(Avatar)(({theme})=>({
        [theme.breakpoints.up('xs')]:{
            width:'50px',
            height:'50px'
        },
        [theme.breakpoints.up('sm')]:{
            width:'80px',
            height:'80px'
        },
        [theme.breakpoints.up('md')]:{
            width:'80px',
            height:'80px'
        }
    }));
    const SellerInfoText=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        [theme.breakpoints.up('xs')]:{
            fontSize:'15px'
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'20px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'15px'
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:'20px'
        }
    }));
    const SmallerSellerInfoText=styled(Typography)(({theme})=>({
        fontFamily:'B_nazanin',
        [theme.breakpoints.up('xs')]:{
            fontSize:'14px',
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'20px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'14px',
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:'20px'
        }
    }));
    
    return(
        <Box id={style.priceBox} sx={{height:'120px'}}>
            <Grid container alignItems='center' rowSpacing={0} columnGap={1}>
                <Grid item xs={7}>
                    <Grid container alignItems='center' columnSpacing={{xs:1}}>
                        <Grid item>
                            <ResponsiveAvatar src={seller.sellerIcon}/>
                        </Grid>
                        <Grid item sx={{marginTop:'7px'}}>
                            <SellerInfoText >{seller.sellerName}</SellerInfoText>
                            <SellerInfoText display='inline' sx={{color:'#00000080'}}>رضایت خرید: </SellerInfoText>
                            <SellerInfoText display='inline' sx={{color:'#00DD00'}}>{seller.satisfactionRate}%</SellerInfoText>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4.5}>
                    <Grid container rowGap={{xs:1.5}}>
                        <Grid item xs={12}>
                            <Grid container alignItems='center'>
                                <Grid item xs={3}>
                                <SellerInfoText sx={{textAlign:'center'}} >{seller.satisfactions}</SellerInfoText>
                                </Grid>
                                <Grid item xs={3}>
                                    <ThumbUpOffAltIcon fontSize='large' sx={{color:'#00DD00',fontSize:{xs:'36px',md:'25px'}}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <SmallerSellerInfoText sx={{textAlign:'right'}}>رضایت</SmallerSellerInfoText>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        <Grid container alignItems='center'>
                                <Grid item xs={3}>
                                    <SellerInfoText sx={{textAlign:'center'}} >3</SellerInfoText>
                                </Grid>
                                <Grid item xs={3}>
                                    <ThumbDownOffAltIcon sx={{color:'red',fontSize:{xs:'36px',md:'25px'}}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <SmallerSellerInfoText sx={{textAlign:'right'}}>عدم رضایت</SmallerSellerInfoText>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export function PaymentReceptionBox(){
    const Container=styled(Box)(()=>({
        backgroundColor:'white',
        width:'89%',
        height:'25%',
        borderRadius:'10px',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'10px'
    }));
    const Title=styled('div')(()=>({
        display:'flex',
        backgroundColor:'#7E7E7E',
        width:'14%',
        height:'18%',
        borderTopRightRadius:'10px',
        borderBottomLeftRadius:'10px',
        color:'white',
        alignItems:'center',
        justifyContent:'center'
    }));

    const LogoBox=styled('div')(()=>({
        display:'flex',
        backgroundColor:'#AFAFAFE5',
        width:'100%',
        height:'100%',
        borderTopLeftRadius:'10px',
        borderBottomLeftRadius:'10px',
        justifyContent:'space-between',
        padding:'20px 30px 20px 30px',
        
        alignItems:'center'

    }))

    const LogoTypography=styled (Typography)(()=>({
        fontFamily: 'Bilbo Swash Caps',
        fontSize: '48px',
        fontWeight: '400',
        background: 'linear-gradient(90deg, #B6013C 0%, #F78901 50.5%, #00AFEE 100%)',
        WebkitBackgroundClip:'text',
        WebkitTextFillColor:'transparent'

    }))

    const Logo=styled('img')(()=>({
        width:'48px',
        height:'48px'
    }))

    const TextPrompt=styled(Typography)(()=>({
        fontFamily:'B_nazanin',
        fontSize:'16px',
        display:'inline',
        color:'#7E7E7E',
    }))
    const TextAnswer=styled(Typography)(()=>({
        fontFamily:'B_nazanin',
        fontSize:'18px',
        display:'inline',
        color:'black',
        fontWeight:'bold'
    }))
    const PricePrompt=styled('div')(()=>({
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        padding:'0 40px 0 40px'

    }))
    const PricePromptText=styled(Typography)(()=>({
        color:'#28AD56',
        fontFamily:'B_nazanin',
        fontSize:'24px',
        fontWeight:'bold'
    }))
    return(
        <Container>
            <Title>
                اطلاعات پذیرنده
            </Title>
            <Grid container columnGap={1.5}>
                <Grid item xs={2.6}>
                    <LogoBox>
                        <LogoTypography>BidWin</LogoTypography>
                        <Logo src={BidwinLogo} alt='logo'/>
                    </LogoBox>
                </Grid>
                <Grid item xs={8.9}>
                    <div>
                        <TextPrompt>نام فروشگاه: </TextPrompt>
                        <TextAnswer>بیدوین</TextAnswer>
                    </div>
                    <div>
                        <TextPrompt>شماره سفارش: </TextPrompt>
                        <TextAnswer>56156456</TextAnswer>
                    </div>
                    <div>
                        <TextPrompt>شماره پذیرنده: </TextPrompt>
                        <TextAnswer>123456789</TextAnswer>
                    </div>
                    <div>
                        <TextPrompt>وبسایت فروشگاه: </TextPrompt>
                        <TextAnswer>Bidwin.xxx</TextAnswer>
                    </div>
                </Grid>
            </Grid>
            <Divider style={{borderBottom:'dashed black'}}/>
            <PricePrompt>
                <PricePromptText>مبلغ قابل پرداخت</PricePromptText>
                <PricePromptText>500,000 ریال</PricePromptText>
            </PricePrompt>
        </Container>
    )
}




