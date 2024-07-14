import style from "./hot_auctions_page.module.css"
import A52 from "../../images/A52.png"
import asus_rog from "../../images/asus_rog.png"
import ps4 from "../../images/console.png"
import ps5 from "../../images/ps5.png"
import hp_laptop from "../../images/hp_laptop.png"
import redmi8 from "../../images/redmi8.png"
import xbox from "../../images/xbox.png"
import asus_laptop from "../../images/asus_laptop.png"
import iphone_15 from "../../images/iphone_15.png"
import { LinearColor } from "../../components/ProfileComponents/HistoryBuyComp/HistoryBuyComponent";

import axios from "axios"
import { IP } from "../../App";



import Filters from "../../components/auctions_filter/auctions_filter"
import Header from "../../components/ProfileComponents/Header/Header"
import Footer from "../../components/FooterComp/Footer"
import Auction_card from "../../components/hot_auctions_card/auctions_card"
import { useEffect, useState } from "react"
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";

function Hot_auctions() {


    const [list_of_products, set_list_of_products] = useState()
    const [info_sorted , set_info_sorted] = useState(true)

    const [temp , set_temp] = useState(false)

    useEffect(()=>{
        get__hot_auctions_data()
    },[])

    function sort_all(){
        set_list_of_products(list_of_products.sort(function(a, b){return a.id - b.id}))
        set_temp(!temp)
        set_info_sorted(true)
    }

    function sort_low_price(){
        
        set_list_of_products(list_of_products.sort(function(a, b){return a.price - b.price}))
        set_temp(!temp)
        set_info_sorted(true)
    }

    function sort_high_price(){
        set_list_of_products(list_of_products.sort(function(a, b){return b.price - a.price}))
        set_temp(!temp)
        set_info_sorted(true)
    }

    function sort_remained_time(){
        
        set_list_of_products(list_of_products.sort(function(a, b){
            //"2024-04-16T09:29:38"
            var year_a = Number(a.expiration_date[0]+a.expiration_date[1]+a.expiration_date[2]+a.expiration_date[3])
            var year_b = Number(b.expiration_date[0]+b.expiration_date[1]+b.expiration_date[2]+b.expiration_date[3])
            var month_a = Number(a.expiration_date[5]+a.expiration_date[6])
            var month_b = Number(b.expiration_date[5]+b.expiration_date[6])
            var day_a = Number(a.expiration_date[8]+a.expiration_date[9])
            var day_b = Number(b.expiration_date[8]+b.expiration_date[9])
            var hour_a = Number(a.expiration_date[11]+a.expiration_date[12])
            var hour_b = Number(b.expiration_date[11]+b.expiration_date[12])
            var minute_a = Number(a.expiration_date[14]+a.expiration_date[15])
            var minute_b = Number(b.expiration_date[14]+b.expiration_date[15])
            var second_a = Number(a.expiration_date[17]+a.expiration_date[18])
            var second_b = Number(b.expiration_date[17]+b.expiration_date[18])


            if( year_a != year_b) return year_a - year_b
            else if( month_a != month_b) return month_a - month_b
            else if( day_a != day_b) return day_a - day_b
            else if( hour_a != hour_b) return hour_a - hour_b
            else if( minute_a != minute_b) return minute_a - minute_b
            else if( second_a != second_b) return second_a - second_b
            return 0
        }
            ))
        set_temp(!temp)
        set_info_sorted(true)
    }

    async function get__hot_auctions_data() {
        try {
          const response = await axios.post(
            `http://${IP}:8000/hot`,{}
          );
          if (response.status === 200) {
            set_list_of_products(response.data)
            console.log(response);
          }
        }
        catch (e) {
            set_list_of_products(hot_auctions_products)
          console.log(list_of_products)}
      }

    

    const [sorts, set_sorts] = useState(["black", "black", "black", "black"])

    return(
        <div>
            <Header />
            <ToastContainerCustom />
            <div id={style.main_container}>
            <Filters sorts_list = {sorts_list}
                                 sorts={sorts}
                                 set_sorts ={set_sorts}
                                 sort_low_price={sort_low_price}
                                 sort_high_price = {sort_high_price}
                                 sort_all={sort_all}
                                 sort_remained_time={sort_remained_time}/>
                {list_of_products === undefined ? <LinearColor />:<div className="row" id={style.cards_cont}>
                    {
                        list_of_products.map((product) =>(
                            <div className="col-lg-4 col-md-6 col-12">
                                 <Auction_card id={product.id}
                                               title={product.title}
                                               highest_price={product.price}
                                               end_time={product.expiration_date}
                                               image={product.image}
                                               description={product.description}
                                               interested={product.interested}
                                               set_info_sorted = {set_info_sorted}
                                               info_sorted = {info_sorted}
                                               set_list_of_products = {set_list_of_products}
                                               list_of_products ={list_of_products}/>
                            </div>
                        ))
                    }
                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default Hot_auctions


const hot_auctions_products = [
    {
        id: 1,
        title: "کنسول بازی ps4",
        price: 200000,
        expiration_date: "2024-07-18T13:32:34",
        image: ps4,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 2,
        title: "گوشی سامسونگ A52",
        price: 1000000,
        expiration_date: "2024-07-21T08:32:43",
        image: A52,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: true
    },
    {
        id: 3,
        title: "کنسول بازی xbox",
        price: 5000000,
        expiration_date: "2024-07-23T12:43:41",
        image: xbox,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 4,
        title: "گوشی iphone 15",
        price: 20000000,
        expiration_date: "2024-07-19T22:21:43",
        image: iphone_15,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 5,
        title: "لپتاپ asus",
        price: 53000000,
        expiration_date: "2024-07-20T15:32:43",
        image: asus_laptop,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 6,
        title: "کنسول بازی ps5",
        price: 15000000,
        expiration_date: "2024-07-22T09:35:35",
        image: ps5,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 7,
        title: "لپتاپ hp",
        price: 18000000,
        expiration_date: "2024-07-17T22:23:54",
        image: hp_laptop,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: true
    },
    {
        id: 8,
        title: "گوشی شیائومی redmi 8",
        price: 2000000,
        expiration_date: "2024-07-20T12:11:45",
        image: redmi8,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
    {
        id: 9,
        title: "لپتاپ asus ROG",
        price: 60000000,
        expiration_date: "2024-07-18T14:53:12",
        image: asus_rog,
        description: "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
        interested: false
    },
]

const sorts_list = [
    {
        id: 1,
        title: "همه"
    },
    {
        id: 2,
        title: "ارزانترین"
    },
    {
        id: 3,
        title: "گرانترین"
    },
    {
        id: 4,
        title: "کمترین زمان باقی مانده"
    }
]