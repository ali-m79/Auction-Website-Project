import React from 'react'
import { Breadcrumbs,Typography } from '@mui/material'


export const CustomBreadcrumbs = ({path}) => {
  const breadcrumbs=path.map((names)=>{
    return(
        <Typography key='3' color='black' sx={{ fontFamily:'IRANSansWeb'}}>{names}</Typography>
    )
  })

  return (
        <Breadcrumbs style={{marginRight:'40px',marginTop:'15px',marginBottom:'15px'}} separator=">">
            {breadcrumbs}
        </Breadcrumbs>
  )
}
