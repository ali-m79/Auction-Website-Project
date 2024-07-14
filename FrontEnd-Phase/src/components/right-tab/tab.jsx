import style from "./tab.module.css"

function Tab() {



    return(
        <div id={style.tab_container}>
            <ul>
                <a href="#" >
                    <li >
                    <p><i className="bi bi-person-circle"></i>اطلاعات شخصی</p>
                    </li>
                </a>
                <a href="#" >

                    <li>
                        <p><i className="bi bi-bag-fill"></i>سابقه خرید</p>
                    </li>
                </a>
                <a href="#" >

                    <li>
                        <p><i className="bi bi-coin"></i>سابقه فروش</p>
                    </li>
                </a>
                <a href="#" >

                    <li>
                        <p><i className="bi bi-newspaper"></i>آگهی های من</p>
                    </li>
                </a>
                <a href="#" >

                    <li>
                        <p><i className="bi bi-postcard-heart"></i>علاقه مندی ها</p>
                    </li>
                </a>
                    <li id={style.btn_li}>
                        <button className="btn">آگهی جدید</button>
                    </li>
                <a href="#">
                    <li>
                        <p><i className="bi bi-door-open"></i>خروج</p>
                    </li>
                </a>
            </ul>
        </div>
    )
    
}


export default Tab;