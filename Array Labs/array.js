let catpicture = ["photo/bibi1.JPG", "photo/bibi2.JPG", "photo/bibi3.JPG"];




document.addEventListener("DOMContentLoaded", (event) => {
    
      console.log("DOM fully loaded and parsed");

    /* linking the button and iamge */
    const myImg = document.getElementById("randombibi");
    const myButton = document.getElementById("generateimage");

    myButton.addEventListener("click", function() {
        myImg.src = catpicture[randomiamge(catpicture.length)];
      });
  });

  function randomiamge(max)
  {
    return Math.floor(Math.random() * max);
  }