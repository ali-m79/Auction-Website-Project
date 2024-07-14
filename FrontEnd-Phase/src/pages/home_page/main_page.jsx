import style from "./main_page.module.css";
import Header from "../../components/ProfileComponents/Header/Header";
import Footer from "../../components/FooterComp/Footer";
import Right_tab from "../../components/right-tab/tab";
import Personal_detail from "../../components/porsonal-detail/personal_detail";
import Buy_history from "../../components/buy-history/buy-history";
import Sell_history from "../../components/sell-history/sell_history";
import My_ad from "../../components/my-ad/my_ad";
import Interested from "../../components/interested/interested";
import Slide_show from "../../components/slide_show/slide_show";
import New_auctions from "../../components/new_auctions_home/new_auctions";
import Two_categories from "../../components/two_categories_home/two_categories";
import One_ad from "../../components/one_ad_section_home/one_ad";
import { useEffect, useState, Link } from "react";

import image_phone from "../../images/iphone_product.png";
import image_laptop from "../../images/laptop.png";
import image_console from "../../images/console.png";

import A52 from "../../images/A52.png";
import asus_rog from "../../images/asus_rog.png";
import ps4 from "../../images/console.png";
import ps5 from "../../images/ps5.png";
import hp_laptop from "../../images/hp_laptop.png";
import redmi8 from "../../images/redmi8.png";
import xbox from "../../images/xbox.png";
import asus_laptop from "../../images/asus_laptop.png";
import iphone_15 from "../../images/iphone_15.png";
import ps4_pro from "../../images/ps4_pro.png";

import axios from "axios";
import { IP } from "../../App";

function Main_page({ personalInformation }) {
  const [userLoged, setUserLoged] = useState(true);

  useEffect(() => {
    handle_info();
   
  }, []);

  const [last_au, set_last_au] = useState([]);
  const [suggested_prod, set_suggested_products] = useState([]);
  const [popular_prod, set_popular_products] = useState([]);

  async function handle_info() {
    const post = {};
    try {
      const response = await axios.get(`${IP}/home/`);
      if (response.status === 200) {
        set_last_au(response.data[0].list);
        set_suggested_products(response.data[1].list);
        set_popular_products(response.data[2].list);
      }
    } catch (e) {
      set_last_au(last_auctions);
      set_suggested_products(suggested_products);
      set_popular_products(popular_products);
    }
  }

  return (
    <div>
      <Header userLoged={userLoged} information={personalInformation} />
      <div id={style.slider_first_container}>
        <div className="col-12" id={style.right_images_cont}>
          <div id={style.move_slide_show}>
            <Slide_show />
          </div>
        </div>
      </div>
      <div>
        <div className="row" id={style.three_categories}>
          <p id={style.category_main_title}>چه محصولی مد نظر شماست؟</p>
          <div className="col-lg-4 col-md-6 col-12">
            <a href="/categories/phone" className={style.category_container} data-testid="test_1">
              <div className="col-5">
                <img src={image_phone} alt="image is not available" />
              </div>
              <div className="col-7 text-center p-lg-2 p-md-2 p-1 ">
                <p className={style.category_title}>گوشی هوشمند</p>
                <p className={style.category_description}>
                  اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید
                  به متن های برخورده اید که با نام لو نبیمی ن مبمیبم یبمینبمیبم
                  بنیبمنیبم ییب یمبن یمب ن
                </p>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <a href="/categories/console" className={style.category_container}>
              <div className="col-5">
                <img src={image_console} alt="image is not available" />
              </div>
              <div className="col-7 text-center p-lg-2 p-md-2 p-1 pt-2 ">
                <p className={style.category_title}>کنسول بازی</p>
                <p className={style.category_description}>
                  اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید
                  به متن های برخورده اید که با نام لو نبیمی ن مبمیبم یبمینبمیبم
                  بنیبمنیبم ییب یمبن یمب ن
                </p>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <a href="/categories/laptop" className={style.category_container}>
              <div className="col-5">
                <img src={image_laptop} alt="image is not available" />
              </div>
              <div className="col-7 text-center p-lg-2 p-md-2 p-1 pt-2 ">
                <p className={style.category_title}>لپتاپ</p>
                <p className={style.category_description}>
                  اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید
                  به متن های برخورده اید که با نام لو نبیمی ن مبمیبم یبمینبمیبم
                  بنیبمنیبم ییب یمبن یمب ن
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div id={style.new_auction_cont}>
        <New_auctions title={"آخرین مزایدات"} products={last_au} id={1} />
      </div>
      <div id={style.two_categories}>
        <Two_categories />
      </div>
      <div id={style.new_auction_cont}>
        <New_auctions
          title={"محصولات پیشنهادی"}
          products={suggested_prod}
          id={2}
        />
      </div>
      <div id={style.one_ad_cont}>
        <One_ad />
      </div>
      <div id={style.most_popular}>
        <New_auctions
          title={"محبوب ترین ها"}
          products={popular_prod}
          id={3}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Main_page;

const last_auctions = [
  {
    id: 1,
    title: "کنسول بازی ps4",
    price: 200000,
    expiration_date: "2024-06-28T13:32:34",
    image: ps4,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 2,
    title: "گوشی سامسونگ A52",
    price: 1000000,
    expiration_date: "2024-06-27T08:32:43",
    image: A52,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 3,
    title: "کنسول بازی xbox",
    price: 5000000,
    expiration_date: "2024-07-23T12:43:41",
    image: xbox,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 4,
    title: "گوشی iphone 15",
    price: 20000000,
    expiration_date: "2024-07-19T22:21:43",
    image: iphone_15,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 5,
    title: "لپتاپ asus",
    price: 53000000,
    expiration_date: "2024-07-20T15:32:43",
    image: asus_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 6,
    title: "کنسول بازی ps5",
    price: 15000000,
    expiration_date: "2024-07-22T09:35:35",
    image: ps5,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 7,
    title: "لپتاپ hp",
    price: 18000000,
    expiration_date: "2024-07-17T22:23:54",
    image: hp_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 8,
    title: "گوشی شیائومی redmi 8",
    price: 2000000,
    expiration_date: "2024-07-20T12:11:45",
    image: redmi8,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 9,
    title: "لپتاپ asus ROG",
    price: 60000000,
    expiration_date: "2024-07-18T14:53:12",
    image: asus_rog,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
];

const suggested_products = [
  {
    id: 1,
    title: "کنسول بازی ps4",
    price: 200000,
    expiration_date: "2024-07-18T13:32:34",
    image: ps4,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 2,
    title: "گوشی سامسونگ A52",
    price: 1000000,
    expiration_date: "2024-07-21T08:32:43",
    image: A52,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 3,
    title: "کنسول بازی xbox",
    price: 5000000,
    expiration_date: "2024-07-23T12:43:41",
    image: xbox,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 4,
    title: "گوشی iphone 15",
    price: 20000000,
    expiration_date: "2024-07-19T22:21:43",
    image: iphone_15,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 5,
    title: "لپتاپ asus",
    price: 53000000,
    expiration_date: "2024-07-20T15:32:43",
    image: asus_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 6,
    title: "کنسول بازی ps5",
    price: 15000000,
    expiration_date: "2024-07-22T09:35:35",
    image: ps5,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 7,
    title: "لپتاپ hp",
    price: 18000000,
    expiration_date: "2024-07-17T22:23:54",
    image: hp_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 8,
    title: "گوشی شیائومی redmi 8",
    price: 2000000,
    expiration_date: "2024-07-20T12:11:45",
    image: redmi8,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 9,
    title: "لپتاپ asus ROG",
    price: 60000000,
    expiration_date: "2024-07-18T14:53:12",
    image: asus_rog,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
];

const popular_products = [
  {
    id: 1,
    title: "کنسول بازی ps4",
    price: 200000,
    expiration_date: "2024-07-18T13:32:34",
    image: ps4,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 2,
    title: "گوشی سامسونگ A52",
    price: 1000000,
    expiration_date: "2024-07-21T08:32:43",
    image: A52,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 3,
    title: "کنسول بازی xbox",
    price: 5000000,
    expiration_date: "2024-07-23T12:43:41",
    image: xbox,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 4,
    title: "گوشی iphone 15",
    price: 20000000,
    expiration_date: "2024-07-19T22:21:43",
    image: iphone_15,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 5,
    title: "لپتاپ asus",
    price: 53000000,
    expiration_date: "2024-07-20T15:32:43",
    image: asus_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 6,
    title: "کنسول بازی ps5",
    price: 15000000,
    expiration_date: "2024-07-22T09:35:35",
    image: ps5,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 7,
    title: "لپتاپ hp",
    price: 18000000,
    expiration_date: "2024-07-17T22:23:54",
    image: hp_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 8,
    title: "گوشی شیائومی redmi 8",
    price: 2000000,
    expiration_date: "2024-07-20T12:11:45",
    image: redmi8,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 9,
    title: "لپتاپ asus ROG",
    price: 60000000,
    expiration_date: "2024-07-18T14:53:12",
    image: asus_rog,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
];
