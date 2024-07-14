
import style from "./auctions_card.module.css";

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

import TimeLeftAuction from "../../components/time_left_auctions/time_left_auctions";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  successMessage,
  warningMessage,
  defaultMessage,
  errorMessage,
} from "../Toast/ToastCustom";

import {CalculateEndTime} from '../Time/TimeLeft';


function Auctions_card(props) {
  const navigate = useNavigate();
  const [interested, set_interested] = useState("");
  const [first_in, set_first_in] = useState(true);
  const [heart_color, set_heart_color] = useState("");

  var end_year = Number(
    props.end_time[0] +
      props.end_time[1] +
      props.end_time[2] +
      props.end_time[3]
  );
  var end_month = Number(props.end_time[5] + props.end_time[6]);
  var end_day = Number(props.end_time[8] + props.end_time[9]);
  var end_hour = Number(props.end_time[11] + props.end_time[12]);
  var end_minute = Number(props.end_time[14] + props.end_time[15]);
  var end_second = Number(props.end_time[17] + props.end_time[18]);
  const [time, set_time] = useState([
    end_year,
    end_month,
    end_day,
    end_hour,
    end_minute,
    end_second,
  ]);
  const [temp, set_temp] = useState(false);

  const handleClickOnShareItem = (text) => (event) => {
    event.stopPropagation();
    console.log(text);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        successMessage("لینک محصول با موفقیت کپی شد :)");
      })
      .catch((err) => {
        warningMessage("مشکل در کپی‌کردن لینک محصول :(");
      });
  };

  useEffect(() => {

      if (props.interested) {
        set_interested("bi-heart-fill");
        set_heart_color("red");
      } else {
        set_interested("bi-heart");
        set_heart_color("black");
      }

    if (props.info_sorted) {
      var h_icon = document.getElementById(`heart_${props.id}`);
      if (props.interested && !h_icon.classList.contains("bi-heart-fill")) {
        set_interested("bi-heart-fill");
        set_heart_color("red");
      } else if (
        !props.interested &&
        h_icon.classList.contains("bi-heart-fill")
      ) {
        set_interested("bi-heart");
        set_heart_color("black");
      }
    }

    set_first_in(false);
    props.set_info_sorted(false);
    var new_end_year = Number(
      props.end_time[0] +
        props.end_time[1] +
        props.end_time[2] +
        props.end_time[3]
    );
    var new_end_month = Number(props.end_time[5] + props.end_time[6]);
    var new_end_day = Number(props.end_time[8] + props.end_time[9]);
    var new_end_hour = Number(props.end_time[11] + props.end_time[12]);
    var new_end_minute = Number(props.end_time[14] + props.end_time[15]);
    var new_end_second = Number(props.end_time[17] + props.end_time[18]);
    set_time([
      new_end_year,
      new_end_month,
      new_end_day,
      new_end_hour,
      new_end_minute,
      new_end_second,
    ]);
  }, [props]);


  
  function add_interested(event) {
    event.stopPropagation();

    var temp_prod = props.list_of_products;
    temp_prod.map((prod) => {
      if (prod.id == props.id) {
        prod.interested = !prod.interested;
      }
    });
    props.set_list_of_products(temp_prod);
    if (event.target.classList.contains("bi-heart-fill")) {
      set_interested("bi-heart");
      set_heart_color("black");
    } else {
      set_interested("bi-heart-fill");
      set_heart_color("red");
    }
  }

  function go_product() {
    navigate(`/product/${props.id}`, { replace: true });
  }

  return (
    <div className="col-12 pt-4" id={style.card_container}>
      <div onClick={go_product}>
        <div className=" d-flex h-100" id={style.card_d}>
          <div className="col-4 " id={style.imag}>
            <div id={style.image_cont}>
              <div style={{ backgroundImage: `url(${props.image})` }}></div>
            </div>
          </div>
          <div className="col-8" id={style.info}>
            <div className="row">
              <div className="col-lg-8 col-md-7 col-6">
                <h2>{props.title}</h2>
              </div>
              <div className="col-lg-4 col-md-5 col-6 row" id={style.edit}>
                <div
                  id={style.s_co}
                  className={`col-6 ${style.edit_tag}`}
                  onClick={handleClickOnShareItem(props.link)}
                >
                  <i className="bi bi-share-fill" id={style.share}></i>
                </div>
                <div
                  id={style.h_co}
                  className={`col-6 ${style.edit_tag}`}
                  onClick={add_interested}
                >
                  <i
                    className={`bi ${interested} ${style.heart_icons}`}
                    style={{ color: heart_color }}
                    id={`heart_${props.id}`}
                  ></i>
                </div>
              </div>
            </div>
            <pre id={style.price}>
              قیمت نهایی: <span>{props.highest_price} تومان</span>
            </pre>
            <p id={style.description}>{props.description}</p>
            <TimeLeftAuction
              end_time={time}
              time_text={"زمان باقی مانده:"}
              margin={"10px"}
              padding={"5px"}
              text_size={"16px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Search_Card(props) {
  const [timeLeft,SetTimeLeft]=useState(CalculateEndTime(props.end_time));
  useEffect(()=>{
    const interval = setInterval(() => {
      SetTimeLeft(CalculateEndTime(props.end_time));
      console.log(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  },[props.end_time,timeLeft])
  return (
    <div className="col-12 pt-4" id={style.card_container}>
      <a style={{textDecoration:'none'}} href={`http://localhost:8080/product/${props.id}`}>
        <div
          className="d-flex h-100"
          style={{
            backgroundColor: "white",
            boxShadow: "0 0 0 0",
            border: "solid #d8c3a5 1px",
            padding: "15px",
          }}
          id={style.card_d}
        >
          <div className="col-3 " id={style.imag}>
            <img src={props.image} alt="" />
          </div>
          <div
            className="col-9"
            style={{ backgroundColor: "white" }}
            id={style.info}
          >
            <div className="row">
              <div className="col-lg-8 col-md-7 col-6">
                <h4 style={{textDecoration:'none'}}>{props.title}</h4>
              </div>
            </div>
            <pre id={style.price}>
              آخرین پیشنهاد: <span>{props.lastBid} تومان</span>
            </pre>
            <p id={style.description}>{props.description}</p>
            {
              timeLeft.seconds?<pre id={style.reaction}>
              زمان باقی‌مانده: <p>{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</p>
              </pre>:
              <pre id={style.reaction}>
              زمان باقی‌مانده: <p>{timeLeft}</p>
              </pre>
            }
          </div>
        </div>
      </a>
    </div>
  );
}

export default Auctions_card;
