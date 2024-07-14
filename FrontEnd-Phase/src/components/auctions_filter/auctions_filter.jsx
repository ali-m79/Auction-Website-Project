import { useState } from "react"
import style from "./auctions_filter.module.css"


function Auctions_filter(props) {

    const [color_styled , set_color_styled] = useState(props.sorts)
    const [temp , set_temp] = useState(false)


    const select_filter =(select) =>(event) =>{
       
        var new_color_style = color_styled

        for (let i = 0; i < new_color_style.length; i++) {
            if(select-1 == i){
                new_color_style[i] = "#e85a4f"
            }
            else{
                new_color_style[i] = "black"
            }
        }

        if (select == 1) {
            props.sort_all()
        }
        if (select == 2) {
            props.sort_low_price()
        }
        if (select == 3) {
            props.sort_high_price()
        }
        if (select == 4) {
            props.sort_remained_time()
        }
        
        
        set_color_styled(new_color_style)
        set_temp(!temp)
    }

    return(
        <div id={style.main_cont}>
            <p>ترتیب نمایش</p>
            <div>
                {
                    props.sorts_list.map((item)=>(
                        <button id={`but_${item.id}`} className={temp} onClick={select_filter(item.id)} style={{color:color_styled[item.id-1]}}>{item.title}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default Auctions_filter