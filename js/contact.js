document.getElementById("sendBtn").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const car = document.getElementById("car").value;
    const dates = document.getElementById("dates").value;
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    // Basic validation
    if (!name || !email || !car || !dates || !message) {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.className = "form-message error";
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("car", car);
    formData.append("dates", dates);
    formData.append("message", message);
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    // Submit using fetch to FormSubmit
    fetch("https://formsubmit.co/aamirullah.edu.pk@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          formMessage.textContent = "Your message has been sent successfully!";
          formMessage.className = "form-message success";
          
          // Delay clearing inputs and reset message to give time for success message to show
          setTimeout(() => {
            // Clear inputs after a slight delay
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("car").value = "";
            document.getElementById("dates").value = "";
            document.getElementById("message").value = "";
          }, 1500); // Wait 1.5 seconds before clearing fields
        } else {
          throw new Error("Submission failed.");
        }
      })
      .catch(() => {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.className = "form-message error";
      });
  });
