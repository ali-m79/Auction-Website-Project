import style from "./new_auctions.module.css"

import A52 from "../../images/A52.png"
import asus_rog from "../../images/asus_rog.png"
import ps4 from "../../images/console.png"
import ps5 from "../../images/ps5.png"
import hp_laptop from "../../images/hp_laptop.png"
import redmi8 from "../../images/redmi8.png"
import xbox from "../../images/xbox.png"
import asus_laptop from "../../images/asus_laptop.png"
import iphone_15 from "../../images/iphone_15.png"

import TimeLeftAuction from '../../components/time_left_auctions/time_left_auctions';
import { LinearColor } from "../../components/ProfileComponents/HistoryBuyComp/HistoryBuyComponent";


import { Swiper, SwiperSlide } from 'swiper/react';
import { React, useEffect } from 'react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useState } from "react";




function New_auctions(props) {

    const [slide_num, set_slide_num] = useState(5)
    const [right_arrow, set_right_arrow] = useState("bi bi-caret-right")
    const [left_arrow, set_left_arrow] = useState("bi bi-caret-left")



        window.addEventListener("resize", (e)=>{
            var current_size = window.innerWidth;
            if(current_size >= 1250) set_slide_num(5)
            else if(current_size <1250 && current_size >=1000){
                set_slide_num(4)
            }
            else if(current_size <1000 && current_size >=820){
                set_slide_num(3)
            }
            else if(current_size <820 && current_size >=610){
                set_slide_num(2)
            }
            else if(current_size <610){
                set_slide_num(1)
            }
        })

        const change_slide = (direction, fill) => (event) =>{
            if(direction){
                if(fill) set_right_arrow("swiper_button_prev bi bi-caret-right")
                else set_right_arrow("swiper_button_prev bi bi-caret-right-fill")
            }
            else{
                if(fill) set_left_arrow("swiper_button_prev bi bi-caret-left")
                else set_left_arrow("swiper_button_prev bi bi-caret-left-fill")
            }
        }


        
        if(props.product == undefined)
        {
         //return <LinearColor />
        }
    return(
        <div id={style.firts_container}>
            <p id={style.new_auction_title}>{props.title}</p>
            
            <span className={`swiper_button_prev_${props.id}`} id={style.right_but} onMouseEnter={change_slide(true,false)} onMouseOut={change_slide(true,true)}>
                <i className={`${right_arrow}`}  onMouseEnter={change_slide(true,false)}></i>
            </span>
            <span  className={`swiper_button_next_${props.id}`} id={style.left_but} onMouseEnter={change_slide(false,false)} onMouseOut={change_slide(false,true)}>
                <i className={`${left_arrow}`} onMouseEnter={change_slide(false,false)}></i>
            </span>
            
             <Swiper
             modules={[Navigation]}
            spaceBetween={30}
             slidesPerView={slide_num}
             navigation={{ nextEl: `.swiper_button_next_${props.id}`, prevEl: `.swiper_button_prev_${props.id}`, loop: true}}
            >
                {
                   props.products.map((product) =>(
                    
                    
                    <SwiperSlide className={style.swiper_container}>
                    <a href={`product/${product.id}`} className={style.link_container}>
                     <div className={style.auction_product_container}>
                         <div className={style.image_container}>
                             <img src={product.image} alt="picture is not available" />
                         </div>
                         <div className={style.title}>
                             <p>{product.title}</p>
                         </div>
                         <div className={style.last_price}>
                             <p>بالاترین قیمت: {product.price} تومان</p>
                         </div>
                         <div className={style.remain_time}>
                             <span className={`${style.time}`}>{<TimeLeftAuction end_time = {[
                                                                                                Number(product.expiration_date[0]+product.expiration_date[1]+product.expiration_date[2]+product.expiration_date[3]),
                                                                                                Number(product.expiration_date[5]+product.expiration_date[6]),
                                                                                                Number(product.expiration_date[8]+product.expiration_date[9]),
                                                                                                Number(product.expiration_date[11]+product.expiration_date[12]),
                                                                                                Number(product.expiration_date[14]+product.expiration_date[15]),
                                                                                                Number(product.expiration_date[17]+product.expiration_date[18])
                                                                                             ]}
                                                                                 time_text = {<span className={`bi bi-clock ${style.clock_icon}`}></span>}
                                                                                 margin = {"0px"}
                                                                                 padding = {"0px"}
                                                                                 text_size = {"16px"}
                                                                                      />}
                             </span>
                         </div>
                     </div>
                     </a>
                    </SwiperSlide>
                    
                   ))
                }
            </Swiper>
        </div>
    )
}

export default New_auctions