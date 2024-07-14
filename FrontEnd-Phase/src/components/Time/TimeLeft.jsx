import React, { useEffect, useState,useMemo } from 'react'
import { Grid,Typography } from '@mui/material'
import { styled } from '@mui/material/styles';


export function CalculateEndTime(finishDate) {
    const finishDateObj = new Date(finishDate);
    const difference = finishDateObj.getTime() - new Date().getTime();

    if(difference<=0){
        return('پایان‌یافته');
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}


export default function TimeLeft({finishDateInput}) {
    
    const [endTime,SetEndTime]=useState(CalculateEndTime(finishDateInput));




    useEffect(() => {
        const interval = setInterval(() => {
          SetEndTime(CalculateEndTime(finishDateInput));
        }, 1000);

        return () => clearInterval(interval);
      }, [finishDateInput,endTime]);
      const TimeLeftText=styled(Typography)(({theme})=>({
        fontFamily:'IRANSansWeb',
        [theme.breakpoints.up('xs')]:{
            fontSize:'20px'
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'24px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'20px'
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:'25px'
        }
      }))
      const FlexBox=styled('div')(({theme})=>({
        display:'flex',
        [theme.breakpoints.up('xs')]:{
            gap:'8px'
        },
        [theme.breakpoints.up('sm')]:{
            gap:'12px'
        },
        [theme.breakpoints.up('md')]:{
            gap:'8px'
        },
        [theme.breakpoints.up('lg')]:{
            gap:'14px'
        }
      }));
      const TimeLeftProp=styled(Typography)(({theme})=>({
        fontFamily:'IRANSansWeb',
        [theme.breakpoints.up('xs')]:{
            fontSize:'11px',
            marginRight:'-5px'
        },
        [theme.breakpoints.up('sm')]:{
            fontSize:'14px'
        },
        [theme.breakpoints.up('md')]:{
            fontSize:'12px'
        },
        [theme.breakpoints.up('lg')]:{
            fontSize:'16px'
        }
      }))

    return (
        <>
            <Grid container spacing={1} sx={{marginTop:'10px'}}>
                <Grid item xs={8.5}>
                    <TimeLeftText sx={{paddingTop:'15px'}}> زمان باقی مانده:</TimeLeftText>
                </Grid>
                <Grid item xs={2}>
                    <Grid container>
                        <Grid item xs={10}>
                            {endTime.seconds?
                            <TimeLeftText sx={{color:'#B6013C'}} >{`${endTime.days}:${endTime.hours}:${endTime.minutes}:${endTime.seconds}`}</TimeLeftText>:
                            <TimeLeftText sx={{color:'#B6013C'}} >{endTime}</TimeLeftText>}
                        </Grid>
                        <Grid style={{display:'flex',paddingRight:'10px'}} item xs={10}>
                            {endTime.seconds?
                                <FlexBox>
                                <TimeLeftProp>ثانیه</TimeLeftProp>
                                <TimeLeftProp>دقیقه</TimeLeftProp>
                                <TimeLeftProp>ساعت</TimeLeftProp>
                                <TimeLeftProp>روز</TimeLeftProp>
                            </FlexBox>:
                            <></>}
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}
