import style from "./interested_card.module.css"


function Interested_card() {

    return(
        <div className="col-lg-6 col-12 p-3" id={style.card_container}>
            <a href="#">
            <div className=" d-flex h-100" id={style.card_d}>
                <div className="col-3 " id={style.imag}></div>
                <div className="col-9" id={style.info}>
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-6">
                            <h2>لورم ایپسوم</h2>
                        </div>
                        <div className="col-lg-4 col-md-5 col-6 row" id={style.edit}>
                            <a href="#" id={style.s_co} className={`col-6 ${style.edit_tag}`}><i className="bi bi-share-fill" id={style.share}></i></a>
                            <a href="#" id={style.h_co} className={`col-6 ${style.edit_tag}`}><i className="bi bi-heart-fill" id={style.heart}></i></a>
                        </div>
                    </div>
                    <pre id={style.price}>قیمت نهایی: <span>120000 تومان</span></pre>
                    <p id={style.description}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز لورم ایپسوم متن ساختگی با تولید سادگی نام...</p>
                    <a href="#"><button className="btn">تلفن همراه</button></a>
                    <a href="#"><button className="btn">تکنولوژی</button></a>
                    <a href=""><button className="btn">فناوری</button></a>
                    <pre id={style.reaction}>زمان باقی‌مانده: <p>01:03:34</p></pre>
                </div>
            </div>
            </a>
        </div>
    )
    
}


export default Interested_card