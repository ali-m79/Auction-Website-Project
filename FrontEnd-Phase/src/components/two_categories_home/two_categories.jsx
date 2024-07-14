import style from "./two_categories.module.css"


import image_right from "../../images/PS4_home_ad.jpg"
import image_left from "../../images/mobile_home_ad.jpg"

function Two_categories() {
    

    return(
        <div className="row">
            <div className="col-lg-6 col-12 mb-lg-0 mb-4" id={style.category_cont}>
                <div id={style.second_cont}>
                    <div className="col-5" id={style.text_cont}>
                        <p id={style.title}>با کیفیت خرید کنید</p>
                        <p id={style.text}>انواع کنسول</p>
                        <a href="/categories/console">
                            <button>دیدن محصولات</button>
                        </a>
                    </div>
                    <div className="col-7" id={style.image_cont}>
                        <img src={image_right} alt="product image" />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-12 " id={style.category_cont}>
            <div id={style.second_cont}>
                    <div className="col-5" id={style.text_cont}>
                        <p id={style.title}>با کیفیت خرید کنید</p>
                        <p id={style.text}>انواع موبایل</p>
                        <a href="/categories/phone">
                            <button>دیدن محصولات</button>
                        </a>
                    </div>
                    <div className="col-7" id={style.image_cont}>
                        <img src={image_left} alt="product image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Two_categories