import style from "./one_ad.module.css"


import laptop_image from "../../images/laptop_ad.jpg"

function One_ad() {


    return(
        <div className="row" id={style.main_cont}>
            <div className="col-md-4 col-6 pe-md-5" id={style.text_cont}>
                <p id={style.title}>انتخابی مناسب </p>
                <p id={style.text}>انواع لپتاپ</p>
                <a href="/categories/laptop">
                    <button>دیدن محصولات</button>
                </a>
            </div>
            <div className="col-md-8 col-6 " id={style.image_cont}>
                <img src={laptop_image} alt="laptop picture" />
            </div>
        </div>
    )
    
}

export default One_ad