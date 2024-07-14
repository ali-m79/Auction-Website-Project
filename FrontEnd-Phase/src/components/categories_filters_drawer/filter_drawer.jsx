import style from "./filter_drawer.module.css"


import Accordings from "../categories_according/accordings"


import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


function Filter_drawer(props) {

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

  
    return(
        <div id={style.dra_main_container}>
            <button onClick={toggleDrawer(true)} id={style.drawer_button}> فیلترها<i className="bi bi-funnel-fill"></i></button>
            <Drawer open={open}
                     onClose={toggleDrawer(false)} 
                     anchor={"right"}>
                <div id={style.drawer_main_cont}>
                    <Accordings filters ={props.filters}
                                set_check_box_activated = {props.set_check_box_activated}
                                check_box_activated = {props.check_box_activated}
                                list_of_products ={props.list_of_products}
                                set_list_of_products ={props.set_list_of_products}
                                set_filter_selected ={props.set_filter_selected}
                                category ={props.category}/>
                </div>
            </Drawer>
        </div>
    )
}

export default Filter_drawer


