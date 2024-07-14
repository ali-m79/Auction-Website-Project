import style from "./navbar.module.css"

import logo from "../../images/logo.jpg"


function Navbar() {
    

    return(

        <div id={style.main_container}>
            <nav  class="navbar navbar-expand-xl pt-xl-4 p-1 pb-2 d-block" id={style.nav_container}>

                <div  class="container-fluid" id={style.fluid}>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a id={style.logo} class="navbar-brand" href="#"><img src={logo} alt="nothing"/></a>
                    

                <div class={`collapse navbar-collapse`} id="navbarTogglerDemo03">
                <div className="d-flex flex-xl-row flex-row-reverse flex-wrap-reverse w-100 ">

                  <div className="col-xl-9 col-12 pt-xl-0 pt-3 pe-xl-5" id={style.search_main_cont}>
                    <div className="col-xl-10 col-12" >
                    <form id={style.search_form} class="d-flex   w-100" role="search">
                      <button id={style.search_submit} type="submit"> جستجو</button>
                      <div className="d-flex" id={style.search_input_cont}>
                        <i class="bi bi-search"></i>
                        <input id={style.search} class=" " type="search" placeholder="جستجو حراجی..." aria-label="Search"/>
                      </div>
                      <button id={style.filter} ><i class="bi bi-funnel"></i></button>
                    </form>
                    </div>
                    <div className="col-xl-10 col-12">
                     <ul id={style.un_list} class="navbar-nav ">
                       <li class="nav-item">
                         <a class="nav-link " aria-current="page" href="#"><i className="bi bi-house-fill" id={style.icons}></i>خانه</a>
                       </li>
                       <li class="nav-item">
                         <a class="nav-link " aria-current="page" href="#"><i className="bi bi-list" id={style.category_icon}></i>دسته بندی ها</a>
                       </li>
                       <li class="nav-item">
                         <a class="nav-link" href="#"><i className="bi bi-fire" id={style.icon_fire}></i>مزایدات داغ</a>
                       </li>
                       <li class="nav-item">
                         <a class="nav-link" aria-disabled="true"><i className="bi bi-basket2" id={style.icons}></i>سبد خرید</a>
                       </li>
                     </ul>
                      </div>  
                  </div>

                    <div className="col-xl-3 col-12 pt-0 row" id={style.profile_card_cont}>
                    <div id={style.profile_card} className="col-xl-12 col-lg-3 col-md-4 col-sm-5 ms-xl-0 ms-3">
                      <div className="col-2" id={style.person_icon_cont}>
                        <i className="bi bi-person"></i>
                      </div>
                      <div className="col-8" id={style.username}>
                        <span>نام کاربری</span>
                      </div>
                      <div id={style.profile_image} className="col-2">
                      </div>
                    </div>
                    <div id={style.wallet_card}  className="col-xl-12 col-lg-3 col-md-4 col-sm-5 mt-xl-2">
                      <div className="col-2" id={style.wallet_icon_cont}>
                          <i className="bi bi-wallet2"></i>
                        </div>
                        <div className="col-10" id={style.wallet_balance}>
                          <span>20000 ریال</span>
                        </div>
                    </div>
                    </div>

                  
                </div>
      
    </div>
    
                </div>
            </nav> 
        </div>

    )
}


export default Navbar