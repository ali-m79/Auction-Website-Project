import style from "./sell_history.module.css"
import Sell_card from "../sell-card/sell_card"


function Sell_history() {
    

    return(
        <div id={style.bh_container}>
        <div className="row">
            <div className="col-lg-10 col-md-9 col-sm-7 col-7">
             <p id={style.header}><i className="bi bi-coin"></i> سابقه فروش</p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5 col-5" id={style.filters}>
                <a href="#" ><i className="bi bi-funnel"></i></a>
                <a href="#" ><i className="bi bi-arrow-down-up"></i></a>
            </div>
        </div>
        <div id={style.line}></div>
        <div className="row container" id={style.b_container}>
            <Sell_card />
            <Sell_card />
            <Sell_card />
            <Sell_card />
            <Sell_card />
        </div>
    </div>
    )
}


export default Sell_history