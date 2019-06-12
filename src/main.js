$(".slider").slick({

    // normal options...
    infinite: false,
    dots: true,
    speed: 500,
    fade: true,
    arrows: true,
    swipe: true,
    touchMove: true,
    cssEase: 'linear',

    // the magic
    responsive: [{
        breakpoint: 300,
        settings: {
            slidesToShow: 1,
        }
    }]
});




//Burger menu
document.querySelector(".burger_menu").addEventListener("click", function (e){
    this.classList.toggle("active");
    document.querySelector(".menu_wrapper").classList.toggle("show")
}

 );

document.querySelector(".menu_triangle").addEventListener("click", function (i){
  this.classList.toggle('active_content')  ;
  document.querySelector(".content_menu_wrapper").classList.toggle("show_content_menu")
}

);