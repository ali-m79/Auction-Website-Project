import style from "./sorter_drawer.module.css"


import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

function Sorter_drawer(props) {


    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    window.addEventListener("resize",(e)=>{
        var cur_width = window.innerWidth
        if(cur_width >= 1200){
            setOpen(false)
        }
    })

 
    const [color_styled , set_color_styled] = React.useState(props.sorts)
    const [temp , set_temp] = React.useState(false)

        

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
        props.set_sorts(new_color_style)
        if(temp) set_temp(false)
        else set_temp(true)
    }


    return(
        <div id={style.dra_main_container}>
            <button onClick={toggleDrawer(true)} id={style.drawer_button}>ترتیب نمایش<i className="bi bi-sort-down-alt"></i></button>
            <Drawer open={open}
                     onClose={toggleDrawer(false)} 
                     anchor={"right"}>
                <div id={style.drawer_main_cont}>
                    <p>ترتیب نمایش</p>
                    <div id={style.options_container}>
                        {
                            props.sorts_list.map((item)=>(
                                <button className={temp} onClick={select_filter(item.id)} style={{color:color_styled[item.id-1]}}>{item.title}</button>
                            ))
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    )
    
}

export default Sorter_drawer