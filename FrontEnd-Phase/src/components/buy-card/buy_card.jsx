import style from "./buy_card.module.css"


function Buy_card() {

    return(
        <div className="col-lg-6 col-12 p-3" id={style.card_container}>
            <a href="#">
            <div className=" d-flex h-100" id={style.card_d}>
                <div className="col-3 " id={style.imag}></div>
                <div className="col-9" id={style.info}>
                    <h2>لورم ایپسوم</h2>
                    <pre>قیمت نهایی: <span>120000 تومان</span></pre>
                    <p id={style.description}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز لورم ایپسوم متن ساختگی با تولید سادگی نام...</p>
                    <a href="#"><button className="btn">تلفن همراه</button></a>
                    <a href="#"><button className="btn">تکنولوژی</button></a>
                    <a href="#"><button className="btn">فناوری</button></a>
                    <p id={style.reaction}>آیا از خرید خود راضی بوده‌اید؟ <a href="#">ثبت بازخورد</a></p>
                    <p id={style.no_reaction}>بازخورد شما با موفقیت ثبت شد</p>
                </div>
            </div>
            </a>

        </div>
    )
    
}


export default Buy_card