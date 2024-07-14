import style from "./accordings.module.css"


import * as React from 'react';
import Price_filter from "../categories_price_filter/price_filter"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { IP } from "../../App";


import A52 from "../../images/A52.png"
import asus_rog from "../../images/asus_rog.png"
import ps4 from "../../images/console.png"
import ps5 from "../../images/ps5.png"
import hp_laptop from "../../images/hp_laptop.png"
import redmi8 from "../../images/redmi8.png"
import xbox from "../../images/xbox.png"
import asus_laptop from "../../images/asus_laptop.png"
import iphone_15 from "../../images/iphone_15.png"



import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from "react";
import { useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };






export default function AccordionUsage(props) {

    var ind = 0

    const [checked_check_box , set_checked_check_box] = useState(props.check_box_activated)
    const [price_value, set_price_value] = React.useState([0, 100000000]);
    const [post_back, set_post_back] = React.useState([]);
    const [temp , set_temp] = useState(false)


   const change_select =(but_id, filt_id, id) =>(e) =>{
    var index = 0
    var final_index = 0
    props.filters.map((filter) =>{

            filter.buttons.map((button)=>{
                if (button.id == but_id && filter.id == filt_id)
                {
                    final_index = index
                }
                index++
            })
    })
    var new_check_box = checked_check_box
    var cb = document.getElementById(id)

    if(new_check_box[final_index])
    {
        new_check_box[final_index] = false
        cb.checked = false
    }
    else {
        new_check_box[final_index] = true
        cb.checked = true
    }
    
    
    set_checked_check_box(new_check_box)
    props.set_filter_selected(true)
    handle_filters()
   }

   async function handle_filters() {
    var counter = 0
    var temp_post = []
    props.filters.map((filter)=>{
        var new_list = []
        filter.buttons.map((button) =>{
            if(checked_check_box[counter]){
                new_list.push(button.value)
            }
            counter++
        })
        var item = {
            title : filter.title,
            filters_list : new_list}
        temp_post.push(item)
    })

    

    //its sends all filters as [{title: filter_title, filter_list: [list]}]
    set_post_back(temp_post)
    set_temp(!temp)
    //props.set_list_of_products(temp_products) 

    var post = {}
    if(props.category == "phone"){
        post = { title: props.category,
          min_price: price_value[0],
          max_price: price_value[1],
          brand: temp_post[0].filters_list,
          ram: temp_post[1].filters_list, 
          camera: temp_post[2].filters_list, 
          os: temp_post[3].filters_list, 
          sim_number: temp_post[4].filters_list, 
          storage: temp_post[5].filters_list,  
         };
      }
  
      else if(props.category == "console"){
        post = { title: props.category,
          min_price: price_value[0],
          max_price: price_value[1],
          brand: temp_post[0].filters_list,
          ram: temp_post[1].filters_list, 
          generation: temp_post[2].filters_list, 
          controler_number: temp_post[3].filters_list, 
          region: temp_post[4].filters_list, 
          storage: temp_post[5].filters_list,  
         };
      }
  
      else if(props.category == "laptop"){
        post = { title: props.category,
          min_price: price_value[0],
          max_price: price_value[1],
          brand: temp_post[0].filters_list,
          ram: temp_post[1].filters_list, 
          cpu: temp_post[2].filters_list, 
          os: temp_post[3].filters_list, 
          gpu: temp_post[4].filters_list, 
          storage: temp_post[5].filters_list,  
         };
      }

      props.set_list_of_products(temp_products) 
    // try {
    //   const response = await axios.post(
    //     `http://${IP}:8000/item/filter/?category=${props.category}`,
    //     post
    //   );
    //   if (response.status === 200) {
    //     props.set_list_of_products(response.data)   // get data from server and set to page
    //     set_temp(!temp)
    //   }
    // } catch (e) {
    //     }
  }



  return (
    <div id={style.main_cont}>
        {
            
            props.filters.map((filter) =>(
                <Accordion id={style.accordins_cont}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className={style.title}>
                        {filter.title}
                        </div>
                    </AccordionSummary>
                    
                        <AccordionDetails>
                        <div id={style.check_box_container}>
                            <FormGroup>
                            {filter.buttons.map((button) =>
                                
                                (
                                <FormControlLabel control={<Checkbox onClick={change_select(button.id, filter.id, ind)} id={ind} checked={checked_check_box[ind++]} className={temp}/>} label={button.title}  />
                                )
                                
                            )
                            }
                            </FormGroup>
                        </div>
                    </AccordionDetails>
                    
                </Accordion>
            ))
        }
        <Accordion id={style.accordins_cont}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className={style.title}>
                        محدوده قیمت
                        </div>
                    </AccordionSummary>
                    
                        <AccordionDetails>
                        <div id={style.price_container}>
                            <Price_filter 
                                    list_of_products ={props.list_of_products}
                                    set_list_of_products ={props.set_list_of_products}
                                    price_value ={price_value}
                                    set_price_value ={set_price_value}
                                    checked_check_box={checked_check_box}
                                    category ={props.category}
                                    post_back ={post_back}/>
                        </div>
                    </AccordionDetails>
                    
                </Accordion>
      
    </div>
  );
}


const temp_products = [
   {
        id: 5,
        title: "لپتاپ asus",
        price: 53000000,
        expiration_date: "2024-04-17T22:23:54",
        images: asus_laptop,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 6,
        title: "لپتاپ asus",
        price: 53000000,
        expiration_date: "2024-04-17T22:23:54",
        images: asus_laptop,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: true
    },
]