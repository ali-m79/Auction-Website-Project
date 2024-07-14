import style from "./slide_show.module.css"
import image_laptop from "../../images/slide_show_laptop.jpg"
import image_mobile from "../../images/slide_show_mobile.jpg"
import image_console from "../../images/slide_show_console.jpg"
function Slide_show() {
    


    return(  
        <div  id={style.main_container}>
             <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
              <div class="carousel-inner" id={style.each_slide_container}>
                <a href="/categories/laptop" class="carousel-item laptop_cont" id={`${style.items} `}>
                  <img src={image_laptop} class="d-block w-100" id={style.images} alt="slide is not available"/>
                </a>
                <a href="/categories/phone" class="carousel-item phone_cont" id={`${style.items} `}>
                  <img src={image_mobile} class="d-block w-100" id={style.images} alt="slide is not available"/>
                </a>
                <a href="/categories/console" class="carousel-item active console_cont" id={`${style.items} `}>
                  <img src={image_console} class="d-block w-100" id={style.images} alt="slide is not available"/>
                </a>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
        </div >
      )
}

export default Slide_show