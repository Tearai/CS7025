function emailSend(event) {
    event.preventDefault();  // Prevent form submission to handle manually

    // Get the values from the html
    let parms = {
        name: document.getElementById('Name').value,
        email: document.getElementById('Email').value,
        message: document.getElementById('Message').value,
        subject: document.getElementById('Subject').value,
    };

    // Check if all fields are filled then send it with notification
    if (parms.name && parms.email && parms.message && parms.subject) {
        emailjs.send("service_jacs58v", "template_5chpgfm", parms)
            .then(function(response) {
                swal("Thank you!", "Message Sent!", "success");
            }, function(error) {
                swal("Error", "There was an error sending your message. Please try again.", "error");
            });
    } else {
        swal("Error", "Please fill all fields before submitting.", "error");
    }
}
