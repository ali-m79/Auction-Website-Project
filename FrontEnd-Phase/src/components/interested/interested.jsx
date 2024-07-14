import style from "./interested.module.css"
import Interested_card from "../interested_card/interested_card"

function Interested() {


    return(
        <div id={style.bh_container}>
        <div className="row">
            <div className="col-lg-10 col-md-9 col-sm-7 col-7">
             <p id={style.header}><i className="bi bi-postcard-heart"></i>علاقه مندی ها</p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5 col-5" id={style.filters}>
                <a href="#" ><i className="bi bi-funnel"></i></a>
                <a href="#" ><i className="bi bi-arrow-down-up"></i></a>
            </div>
        </div>
        <div id={style.line}></div>
        <div className="row container" id={style.b_container}>
            <Interested_card />
            <Interested_card />
            <Interested_card />
            <Interested_card />
            <Interested_card />
        </div>
    </div>
    )
    
}


export default Interested