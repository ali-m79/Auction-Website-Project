import React, { useState } from 'react'
import { Grid,Stack} from '@mui/material'
import style from './PreviewPictures.module.css'
import ReactImageMagnify from 'react-image-magnify';

function PreviewPictures({pics}) {
  const [currentPicture,setCurrentPicture]=useState(pics[0]);
  const changeCurrentPicture=(key)=>{
    setCurrentPicture(key);
  }
  const previews=pics.map((pic)=>{
    return(
      <img src={pic} alt='item pic' onClick={()=>changeCurrentPicture(pic)} className={style.smallIcon} loading='lazy'/>
    )
  })

  return (
    <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <ReactImageMagnify alt='big pic' imageStyle={{borderRadius:'15px'}} enlargedImageContainerStyle={{backgroundColor:"black"}} {...{
              smallImage: {
                  isFluidWidth: true,
                  src: currentPicture,
              },
              largeImage: {
                  src: currentPicture,
                  width: 1000,
                  height:1000,
              },
              enlargedImagePosition: 'over'
          }} />
        </Grid>
        <Grid item xs={12}>
            <Stack className={style.smallIconContainer} direction='row' spacing={2} useFlexGap>
              {
                previews
              }
            </Stack>
        </Grid>
    </Grid>
  )
}

export default PreviewPictures