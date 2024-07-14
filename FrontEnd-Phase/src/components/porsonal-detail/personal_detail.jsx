import style from "./personal_detail.module.css"



function Personal_detail() {


    return(

        <div id={style.pd_container}>
            <p><i className="bi bi-person-circle"></i>اطلاعات شخصی</p>
            <div></div>
            <ul>
                <li><a href="#">تغییر عکس پروفایل</a></li>
                <li><a href="#">نمایش نام و نام خوانوادگی</a></li>
                <li><a href="#">نمایش ایمیل</a></li>
                <li><a href="#">تغییر نام کاربری</a></li>
                <li><a href="#">تغییر رمز</a></li>
                <li> <a href="#">تاریخ عضویت</a></li>
            </ul>
        </div>
    )
    
}


export default Personal_detail