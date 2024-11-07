

document.addEventListener("DOMContentLoaded", (event) => {
    
    console.log("DOM fully loaded and parsed");

    const myText = document.getElementById("clicked")
    const myButton = document.getElementById("checker");
    const resetButton = document.getElementById("reset");
    let clicked = window.localStorage.getItem('clicked');
    myText.textContent = clicked;


    myButton.addEventListener("click", function() {
        clicked++;
        console.log(clicked);
        window.localStorage.setItem('clicked', clicked);
        myText.textContent = clicked;
      });       
     
    
      resetButton.addEventListener("click", function() {
        clicked = 0;
        window.localStorage.setItem('clicked', clicked);
        myText.textContent = clicked;
      });   
      

});



