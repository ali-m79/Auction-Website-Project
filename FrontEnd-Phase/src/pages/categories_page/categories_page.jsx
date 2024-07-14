import style from "./categories_page.module.css";

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

import Header from "../../components/ProfileComponents/Header/Header";
import Filters from "../../components/auctions_filter/auctions_filter";
import Auction_card from "../../components/hot_auctions_card/auctions_card";
import Accordings from "../../components/categories_according/accordings";
import Filter_drawer from "../../components/categories_filters_drawer/filter_drawer";
import Sorter_drawer from "../../components/sorter_drawer/sorter_drawer";
import Footer from "../../components/FooterComp/Footer";
import { LinearColor } from "../../components/ProfileComponents/HistoryBuyComp/HistoryBuyComponent";
import axios from "axios";
import { IP } from "../../App";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";

function Categories_page() {
  var category_id = useParams();

  const [drawer_display, set_drawer_display] = useState("");
  const [according_display, set_according_display] = useState("");
  const [sorter_display, set_sorter_display] = useState("");
  const [sorter_drawer_display, set_sorter_drawer_display] = useState("");
  const [filter_selected, set_filter_selected] = useState(false);
  const [info_sorted, set_info_sorted] = useState(true);

  const [list_of_products, set_list_of_products] = useState(undefined);
  const [list_of_filters, set_list_of_filters] = useState([]);

  useEffect(() => {
    //window.location.assign(`/categories/${category_id.id}`)
    var first_window_size = window.innerWidth;
    if (first_window_size >= 1200) {
      set_drawer_display("none");
      set_according_display("block");
      set_sorter_display("block");
      set_sorter_drawer_display("none");
    } else {
      set_drawer_display("block");
      set_according_display("none");
      set_sorter_display("none");
      set_sorter_drawer_display("block");
    }

    
      if (category_id.id == "laptop") {
        set_list_of_products(laptop_products);
        set_list_of_filters(filters_laptop);
      } else if (category_id.id == "console") {
        set_list_of_products(console_products);
        set_list_of_filters(filters_console);
      } else if (category_id.id == "phone") {
        set_list_of_products(mobile_products);
        set_list_of_filters(filters_phone);
      }

      get_first_data(category_id.id);
  }, [category_id]);

  window.addEventListener("resize", (e) => {
    var cur_width = window.innerWidth;
    if (cur_width < 1200) {
      set_drawer_display("block");
      set_according_display("none");
      set_sorter_display("none");
      set_sorter_drawer_display("block");
    } else if (cur_width >= 1200) {
      set_drawer_display("none");
      set_according_display("block");
      set_sorter_display("block");
      set_sorter_drawer_display("none");
    }
  });

  const [check_box_activated, set_check_box_activated] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [sorts, set_sorts] = useState(["black", "black", "black", "black"]);
  const [temp, set_temp] = useState(false);

  function sort_all() {
    set_list_of_products(
      list_of_products.sort(function (a, b) {
        return a.id - b.id;
      })
    );
    set_temp(!temp);
    set_info_sorted(true);
  }

  function sort_low_price() {
    set_list_of_products(
      list_of_products.sort(function (a, b) {
        return a.price - b.price;
      })
    );
    set_temp(!temp);
    set_info_sorted(true);
  }

  function sort_high_price() {
    set_list_of_products(
      list_of_products.sort(function (a, b) {
        return b.price - a.price;
      })
    );
    set_temp(!temp);
    set_info_sorted(true);
  }

  function sort_remained_time() {
    set_list_of_products(
      list_of_products.sort(function (a, b) {
        //"2024-04-16T09:29:38"
        var year_a = Number(
          a.expiration_date[0] +
            a.expiration_date[1] +
            a.expiration_date[2] +
            a.expiration_date[3]
        );
        var year_b = Number(
          b.expiration_date[0] +
            b.expiration_date[1] +
            b.expiration_date[2] +
            b.expiration_date[3]
        );
        var month_a = Number(a.expiration_date[5] + a.expiration_date[6]);
        var month_b = Number(b.expiration_date[5] + b.expiration_date[6]);
        var day_a = Number(a.expiration_date[8] + a.expiration_date[9]);
        var day_b = Number(b.expiration_date[8] + b.expiration_date[9]);
        var hour_a = Number(a.expiration_date[11] + a.expiration_date[12]);
        var hour_b = Number(b.expiration_date[11] + b.expiration_date[12]);
        var minute_a = Number(a.expiration_date[14] + a.expiration_date[15]);
        var minute_b = Number(b.expiration_date[14] + b.expiration_date[15]);
        var second_a = Number(a.expiration_date[17] + a.expiration_date[18]);
        var second_b = Number(b.expiration_date[17] + b.expiration_date[18]);

        if (year_a != year_b) return year_a - year_b;
        else if (month_a != month_b) return month_a - month_b;
        else if (day_a != day_b) return day_a - day_b;
        else if (hour_a != hour_b) return hour_a - hour_b;
        else if (minute_a != minute_b) return minute_a - minute_b;
        else if (second_a != second_b) return second_a - second_b;
        return 0;
      })
    );
    set_temp(!temp);
    set_info_sorted(true);
  }

  async function get_first_data(id) {
    try {
      const response = await axios.get(
        `http://${IP}:8000/item/item_by_categories/?category=${id}`
      );
      if (response.status === 200) {
        set_list_of_products(response.data);
      }
    } catch (e) {
    }
  }

  return (
    <div>
      <Header />
      <ToastContainerCustom />
      <div className="row p-xl-5 p-3">
        <div
          className="col-xl-3 col-0 ps-xl-4 ps-3 pe-xl-0 pe-3"
          id={style.filter_main_cont}
        >
          <div
            id={style.according_container}
            style={{ display: according_display }}
          >
            <Accordings
              filters={list_of_filters}
              set_check_box_activated={set_check_box_activated}
              check_box_activated={check_box_activated}
              list_of_products={list_of_products}
              set_list_of_products={set_list_of_products}
              set_filter_selected={set_filter_selected}
              category={category_id.id}
            />
          </div>
          <div id={style.filter_drawer} style={{ display: drawer_display }}>
            <Filter_drawer
              filters={list_of_filters}
              set_check_box_activated={set_check_box_activated}
              check_box_activated={check_box_activated}
              list_of_products={list_of_products}
              set_list_of_products={set_list_of_products}
              set_filter_selected={set_filter_selected}
              category={category_id.id}
            />
          </div>
        </div>
        <div className="col-xl-9 col-12">
          <div id={style.sorter_container} style={{ display: sorter_display }}>
            <Filters
              sorts_list={sorts_list}
              sorts={sorts}
              set_sorts={set_sorts}
              sort_low_price={sort_low_price}
              sort_high_price={sort_high_price}
              sort_all={sort_all}
              sort_remained_time={sort_remained_time}
            />
          </div>
          <div
            id={style.sorter_drawer}
            style={{ display: sorter_drawer_display }}
          >
            <Sorter_drawer
              sorts_list={sorts_list}
              sorts={sorts}
              set_sorts={set_sorts}
              sort_low_price={sort_low_price}
              sort_high_price={sort_high_price}
              sort_all={sort_all}
              sort_remained_time={sort_remained_time}
            />
          </div>
          {list_of_products === undefined ? <LinearColor />:<div className="row" id={style.cards_cont}>
            {
            list_of_products.map((product) => (
              <div className="col-lg-6 col-md-6 col-12">
                <Auction_card
                  id={product.id}
                  title={product.title}
                  highest_price={product.price}
                  end_time={product.expiration_date}
                  image={product.images}
                  link={product.link}
                  description={product.description}
                  interested={product.interested}
                  set_info_sorted={set_info_sorted}
                  info_sorted={info_sorted}
                  set_list_of_products={set_list_of_products}
                  list_of_products={list_of_products}
                />
              </div>
            ))}
          </div>}
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories_page;

const laptop_products = [
  {
    id: 5,
    title: "لپتاپ asus",
    price: 53000000,
    expiration_date: "2024-07-17T22:23:54",
    images: asus_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
    link: "sadfisdhfsiudfhoaseidfjawoeifhwero:DSFawejrfbwaeyf",
  },
  {
    id: 7,
    title: "لپتاپ hp",
    price: 18000000,
    expiration_date: "2024-07-25T11:00:01",
    images: hp_laptop,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 9,
    title: "لپتاپ asus ROG",
    price: 60000000,
    expiration_date: "2024-07-22T08:10:10",
    images: asus_rog,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
];
const console_products = [
  {
    id: 1,
    title: "کنسول بازی ps4",
    price: 200000,
    expiration_date: "2024-07-15T15:34:43",
    images: ps4,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 3,
    title: "کنسول بازی xbox",
    price: 5000000,
    expiration_date: "2024-07-18T02:21:14",
    images: xbox,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 6,
    title: "کنسول بازی ps5",
    price: 15000000,
    expiration_date: "2024-07-17T23:00:02",
    images: ps5,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 10,
    title: "کنسول بازی ps4 pro",
    price: 22000000,
    expiration_date: "2024-07-19T04:43:01",
    images: ps4_pro,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
];
const mobile_products = [
  {
    id: 2,
    title: "گوشی سامسونگ A52",
    price: 1000000,
    expiration_date: "2024-07-16T09:29:38",
    images: A52,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: true,
  },
  {
    id: 4,
    title: "گوشی iphone 15",
    price: 20000000,
    expiration_date: "2024-07-17T15:18:47",
    images: iphone_15,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
  {
    id: 8,
    title: "گوشی شیائومی redmi 8",
    price: 2000000,
    expiration_date: "2024-07-17T20:17:48",
    images: redmi8,
    description:
      "یسسه یسهبتسهی سیهخب سیخت سیخب سیخبست یحخستیح خسیبهی بحخیحبخرتیحبخ تیبخل تسیحبخلت سیحبخ لتس خسح خلتسیحلخت سهبل سیخهلاسیهل ی خیخ بنسیحبخ تسبهخ تیحبخلتی حخس تخیب تسیحخب تحسیخب لتسیحخب لتحیهلحیخلت یحسبخلتیحبخ  حختسیب حخستیحب ختسی خحختسیحلختیحبلخ ثجق حلنجبنجحبنحشص ش   شن  نبج خقنب جشحقنبجش سحبنشج حجش حن",
    interested: false,
  },
];

const filters_laptop = [
  {
    id: 1,
    title: "برند محصول",
    buttons: [
      {
        id: 1,
        title: "ASUS",
        value: "ASUS",
      },
      {
        id: 2,
        title: "HP",
        value: "HP",
      },
      {
        id: 3,
        title: "APPLE",
        value: "APPLE",
      },
      {
        id: 4,
        title: "ACER",
        value: "ACER",
      },
      {
        id: 5,
        title: "LENOVO",
        value: "LENOVO",
      },
      {
        id: 6,
        title: "DELL",
        value: "DELL",
      },
    ],
  },
  {
    id: 2,
    title: "حافظه RAM",
    buttons: [
      {
        id: 1,
        title: "1 GB",
        value: 1,
      },
      {
        id: 2,
        title: "2 GB",
        value: 2,
      },
      {
        id: 3,
        title: "4 GB",
        value: 4,
      },
      {
        id: 4,
        title: "8 GB",
        value: 8,
      },
    ],
  },
  {
    id: 3,
    title: "تعداد هسته CPU",
    buttons: [
      {
        id: 1,
        title: "1",
        value: 1,
      },
      {
        id: 2,
        title: "2",
        value: 2,
      },
      {
        id: 3,
        title: "4",
        value: 4,
      },
    ],
  },
  {
    id: 4,
    title: "سیستم عامل",
    buttons: [
      {
        id: 1,
        title: "mac",
        value: "mac",
      },
      {
        id: 2,
        title: "windows",
        value: "window",
      },
    ],
  },
  {
    id: 5,
    title: "حافظه GPU",
    buttons: [
      {
        id: 1,
        title: "1",
        value: 1,
      },
      {
        id: 2,
        title: "2",
        value: 2,
      },
      {
        id: 3,
        title: "4",
        value: 4,
      },
      {
        id: 4,
        title: "8",
        value: 8,
      },
    ],
  },
  {
    id: 6,
    title: "حافظه داخلی ",
    buttons: [
      {
        id: 1,
        title: "128 GB",
        value: 128,
      },
      {
        id: 2,
        title: "256 GB",
        value: 256,
      },
      {
        id: 3,
        title: "512 GB",
        value: 512,
      },
      {
        id: 4,
        title: "1 TB",
        value: 1024,
      },
      {
        id: 5,
        title: "2 TB",
        value: 2024,
      },
    ],
  },
];

const filters_console = [
  {
    id: 1,
    title: "برند محصول",
    buttons: [
      {
        id: 1,
        title: "Play station",
        value: "Play station",
      },
      {
        id: 2,
        title: "XBOX",
        value: "XBOX",
      },
      {
        id: 3,
        title: "Nintendo",
        value: "Nintendo",
      },
    ],
  },
  {
    id: 2,
    title: "حافظه RAM",
    buttons: [
      {
        id: 1,
        title: "1 GB",
        value: "1",
      },
      {
        id: 2,
        title: "2 GB",
        value: "2",
      },
      {
        id: 3,
        title: "4 GB",
        value: "4",
      },
      {
        id: 4,
        title: "8 GB",
        value: "8",
      },
    ],
  },
  {
    id: 3,
    title: "نسل",
    buttons: [
      {
        id: 1,
        title: "7",
        value: 7,
      },
      {
        id: 2,
        title: "8",
        value: 8,
      },
      {
        id: 3,
        title: "9",
        value: 9,
      },
    ],
  },
  {
    id: 4,
    title: "تعداد دسته",
    buttons: [
      {
        id: 1,
        title: "1",
        value: 1,
      },
      {
        id: 2,
        title: "2",
        value: 2,
      },
      {
        id: 3,
        title: "3",
        value: 3,
      },
      {
        id: 4,
        title: "4",
        value: 4,
      },
    ],
  },
  {
    id: 5,
    title: "ریجن کنسول",
    buttons: [
      {
        id: 1,
        title: "1",
        value: 1,
      },
      {
        id: 2,
        title: "2",
        value: 2,
      },
      {
        id: 3,
        title: "3",
        value: 3,
      },
    ],
  },
  {
    id: 6,
    title: "حافظه داخلی ",
    buttons: [
      {
        id: 1,
        title: "512 GB",
        value: 512,
      },
      {
        id: 2,
        title: "1 TB",
        value: 1024,
      },
      {
        id: 3,
        title: "2 TB",
        value: 2024,
      },
    ],
  },
];

const filters_phone = [
  {
    id: 1,
    title: "برند محصول",
    buttons: [
      {
        id: 1,
        title: "APPLE",
        value: "APPLE",
      },
      {
        id: 2,
        title: "SAMSUNG",
        value: "SAMSUNG",
      },
      {
        id: 3,
        title: "HUAWEI",
        value: "HUAWEI",
      },
      {
        id: 4,
        title: "xiaomi",
        value: "xiaomi",
      },
      {
        id: 5,
        title: "LG",
        value: "LG",
      },
      {
        id: 6,
        title: "NOKIA",
        value: "NOKIA",
      },
    ],
  },
  {
    id: 2,
    title: "حافظه RAM",
    buttons: [
      {
        id: 1,
        title: "1 GB",
        value: 1,
      },
      {
        id: 2,
        title: "2 GB",
        value: 2,
      },
      {
        id: 3,
        title: "4 GB",
        value: 4,
      },
      {
        id: 4,
        title: "8 GB",
        value: 8,
      },
    ],
  },
  {
    id: 3,
    title: "کیفیت دوربین",
    buttons: [
      {
        id: 1,
        title: "12 pixel",
        value: 12,
      },
      {
        id: 2,
        title: "16 pixel",
        value: 16,
      },
      {
        id: 3,
        title: "32 pixel",
        value: 32,
      },
      {
        id: 4,
        title: "64 pixel",
        value: 64,
      },
      {
        id: 5,
        title: "108 pixel",
        value: 108,
      },
    ],
  },
  {
    id: 4,
    title: "سیستم عامل",
    buttons: [
      {
        id: 1,
        title: "android",
        value: "android",
      },
      {
        id: 2,
        title: "ios",
        value: "ios",
      },
    ],
  },
  {
    id: 5,
    title: " تعداد سیمکارت",
    buttons: [
      {
        id: 1,
        title: "1",
        value: 1,
      },
      {
        id: 2,
        title: "2",
        value: 2,
      },
      {
        id: 3,
        title: "3",
        value: 3,
      },
    ],
  },
  {
    id: 6,
    title: "حافظه داخلی ",
    buttons: [
      {
        id: 1,
        title: "16 GB",
        value: 16,
      },
      {
        id: 2,
        title: "32 GB",
        value: 32,
      },
      {
        id: 3,
        title: "64 GB",
        value: 64,
      },
      {
        id: 4,
        title: "128 TB",
        value: 128,
      },
      {
        id: 5,
        title: "256 TB",
        value: 256,
      },
      {
        id: 5,
        title: "512 TB",
        value: 512,
      },
    ],
  },
];

const sorts_list = [
  {
    id: 1,
    title: "همه",
  },
  {
    id: 2,
    title: "ارزانترین",
  },
  {
    id: 3,
    title: "گرانترین",
  },
  {
    id: 4,
    title: "کمترین زمان باقی مانده",
  },
];
