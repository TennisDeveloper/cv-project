//function takes the code from MyFirstTemplate in emailjs.com. If I click on Test it inside the template
//I will see the code to copy to javascript. The code is replaced by the attributes from the Form
// in the contact.html


function sendMail(contactForm) {
    emailjs.send("BFgmail", "Rosie1", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}