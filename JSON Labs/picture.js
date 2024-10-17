document.addEventListener("DOMContentLoaded", () => {
    const imageElement = document.getElementById("randombibi");
    const jsonUrl = 'bibi.json'; // Adjust path if necessary
    let images = [];
    let currentIndex = 0; // Initialize index

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.images && Array.isArray(data.images)) {
                images = data.images;
                changeImage();
                setInterval(changeImage, 8000); // Change image every 5 seconds
            } else {
                console.error("Unexpected JSON structure:", data);
            }
        })
        .catch(error => console.error("Error loading JSON:", error));

    function changeImage() {
        if (images.length > 0) {
            imageElement.style.opacity = '0'; // Start fade out

            setTimeout(() => {
                const selectedImage = images[currentIndex];
                imageElement.src = selectedImage.filename;
                imageElement.alt = selectedImage.description;

                currentIndex = (currentIndex + 1) % images.length; // Loop back to the start

                imageElement.style.opacity = '1'; // Fade in
            }, 1000); // Match this duration to the CSS transition time
        }
    }
});