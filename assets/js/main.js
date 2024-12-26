    /*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 // showMenu('nav-toggle','nav-menu')
 /*=============== SHOW MENU ===============*/
 // Navbar HTML dosyası yüklendiğinde çağrılacak olan fonksiyon
const initializeNavbar = () => {
     /*=============== SHOW DROPDOWN MENU ===============*/
 const dropdownItems = document.querySelectorAll('.dropdown__item')
 
 // 1. Select each dropdown item
 dropdownItems.forEach((item) =>{
     const dropdownButton = item.querySelector('.dropdown__button') 
 
     // 2. Select each button click
     dropdownButton.addEventListener('click', () =>{
         // 7. Select the current show-dropdown class
         const showDropdown = document.querySelector('.show-dropdown')
         
         // 5. Call the toggleItem function
         toggleItem(item)
 
         // 8. Remove the show-dropdown class from other items
         if(showDropdown && showDropdown!== item){
             toggleItem(showDropdown)
         }
     })
 })
 
 // 3. Create a function to display the dropdown
 const toggleItem = (item) =>{
     // 3.1. Select each dropdown content
     const dropdownContainer = item.querySelector('.dropdown__container')
 
     // 6. If the same item contains the show-dropdown class, remove
     if(item.classList.contains('show-dropdown')){
         dropdownContainer.removeAttribute('style')
         item.classList.remove('show-dropdown')
     } else{
         // 4. Add the maximum height to the dropdown content and add the show-dropdown class
         dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
         item.classList.add('show-dropdown')
     }
 }
 
 /*=============== DELETE DROPDOWN STYLES ===============*/
 const mediaQuery = matchMedia('(min-width: 1118px)'),
       dropdownContainer = document.querySelectorAll('.dropdown__container')
 
 // Function to remove dropdown styles in mobile mode when browser resizes
 const removeStyle = () =>{
     // Validate if the media query reaches 1118px
     if(mediaQuery.matches){
         // Remove the dropdown container height style
         dropdownContainer.forEach((e) =>{
             e.removeAttribute('style')
         })
 
         // Remove the show-dropdown class from dropdown item
         dropdownItems.forEach((e) =>{
             e.classList.remove('show-dropdown')
         })
     }
 }
 
 addEventListener('resize', removeStyle);

};
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
const slidesPerView = window.innerWidth <= 768 ? 1 : 4; // Responsive için 1 veya 4 görsel
const totalSlides = slides.length - slidesPerView + 1; // Kaydırılabilir toplam index

// Slider'ı güncelle
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

// Sol oka tıklama
prevButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    updateSlider();
    resetAutoSlide();
});

// Sağ oka tıklama
nextButton.addEventListener('click', () => {
    currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    updateSlider();
    resetAutoSlide();
});

// Dotlara tıklama
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    });
});

// Otomatik kaydırma
let autoSlide = setInterval(() => {
    currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    updateSlider();
}, 3000); // 3 saniye aralık

// Otomatik kaydırmayı sıfırla
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        updateSlider();
    }, 3000);
}

// Slider'ı başlat
updateSlider();

// Ekran boyutu değişikliğini dinle
window.addEventListener('resize', () => {
    const slidesPerViewNew = window.innerWidth <= 768 ? 1 : 4;
    if (slidesPerView !== slidesPerViewNew) {
        currentIndex = 0; // Responsive değişim sonrası sıfırla
        location.reload(); // Sayfayı yeniden yükle (istenirse kaldırılabilir)
    }
});
