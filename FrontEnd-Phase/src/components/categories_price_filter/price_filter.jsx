import style from "./price_filter.module.css"

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from "axios"
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





function Price_filter(props) {



  const handleChange = (event, newValue) => {
    props.set_price_value(newValue);

  };

  async function handle_price() {
    var post = {}
    
    if(props.category == "phone"){
      post = { title: props.category,
        min_price: props.price_value[0],
        max_price: props.price_value[1],
        brand: props.post_back[0].filters_list,
        ram: props.post_back[1].filters_list, 
        camera: props.post_back[2].filters_list, 
        os: props.post_back[3].filters_list, 
        sim_number: props.post_back[4].filters_list, 
        storage: props.post_back[5].filters_list,  
       };
    }

    else if(props.category == "console"){
      post = { title: props.category,
        min_price: props.price_value[0],
        max_price: props.price_value[1],
        brand: props.post_back[0].filters_list,
        ram: props.post_back[1].filters_list, 
        generation: props.post_back[2].filters_list, 
        controler_number: props.post_back[3].filters_list, 
        region: props.post_back[4].filters_list, 
        storage: props.post_back[5].filters_list,  
       };
    }

    else if(props.category == "laptop"){
      post = { title: props.category,
        min_price: props.price_value[0],
        max_price: props.price_value[1],
        brand: props.post_back[0].filters_list,
        ram: props.post_back[1].filters_list, 
        cpu: props.post_back[2].filters_list, 
        os: props.post_back[3].filters_list, 
        gpu: props.post_back[4].filters_list, 
        storage: props.post_back[5].filters_list,  
       };
    }
    
    console.log(post)

    

    
    

    props.set_list_of_products(temp_products)
    try {
      const response = await axios.post(
        `http://${IP}:8000/item/filter/`,
        post
      );
      if (response.status === 200) {
        props.set_list_of_products(response.data)
        console.log(response);
      }
    } catch (e) {
      console.log(1)
        }
  }



    return(
        <div>
            <div className="row">
                <div className="col-10" id={style.max_price}>100000000 تومان</div>
                <div className="col-2" id={style.min_price}>0 تومان</div>
            </div>
             <Box sx={{ width: "100%" }}>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={props.price_value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000000}
                step={100000}
                id={style.box_container}
              />
            </Box>
            <div id={style.but_container}>
                <button id={style.submit_button} onClick={handle_price}>اعمال محدودیت قیمت</button>
            </div>
        </div>
    )
    
}

export default Price_filter


const temp_products = [
  {
      id: 1,
      title: "کنسول بازی ps4",
      highest_price: 200000,
      end_time: "02:03:23:32",
      image: ps4,
      description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
      interested: false
  },
  {
      id: 2,
      title: "گوشی سامسونگ A52",
      highest_price: 1000000,
      end_time: "00:14:42:02",
      image: A52,
      description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
      interested: true
  }
]