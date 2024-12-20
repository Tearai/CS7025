document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function() {
        let header = document.querySelector('.header-container');
        if (window.scrollY > 50) {  // Change 50 to the scroll distance you prefer
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
});