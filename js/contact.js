document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "block";

    // Get form data
    const formData = new FormData(form);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "Non fourni",
      subject: formData.get("subject"),
      message: formData.get("message"),
      newsletter: formData.has("newsletter") ? "Oui" : "Non",
      consent: formData.has("consent") ? "Oui" : "Non",
    };

    // FormSubmit URL (replace with your email)
    const formSubmitUrl = "https://formsubmit.co/samloik.codotoafode.77@edu.uiz.ac.ma";

    // Prepare data to send
    const data = new URLSearchParams();
    for (const [key, value] of Object.entries(contactData)) {
      data.append(key, value);
    }

    // Add special fields for FormSubmit
    data.append(
      "_subject",
      `[${contactData.subject}] Nouveau message de ${contactData.name}`
    );
    data.append("_template", "table");
    data.append("_captcha", "false");

    // Send confirmation email to user
    if (contactData.email && contactData.email.trim() !== "") {
      data.append("_cc", contactData.email);
    }

    // Send data to FormSubmit
    fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => {
        document.getElementById("loadingSpinner").style.display = "none";

        if (response.ok) {
          // Success handling
          document.getElementById("contactSuccess").style.display = "block";
          document.getElementById("contactError").style.display = "none";
          form.reset();

          // Scroll to success message
          document
            .getElementById("contactSuccess")
            .scrollIntoView({ behavior: "smooth" });

          // Show success message with SweetAlert
          Swal.fire({
            title: "Message envoyé !",
            text: "Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.",
            icon: "success",
            confirmButtonText: "Parfait !",
            confirmButtonColor: "#F78536",
          });
        } else {
          // Error handling
          document.getElementById("contactSuccess").style.display = "none";
          document.getElementById("contactError").style.display = "block";

          // Show error message with SweetAlert
          Swal.fire({
            title: "Erreur",
            text: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone.",
            icon: "error",
            confirmButtonText: "Réessayer",
            confirmButtonColor: "#F78536",
          });
        }
      })
      .catch((error) => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("contactSuccess").style.display = "none";
        document.getElementById("contactError").style.display = "block";

        console.error("Error:", error);

        // Show error message with SweetAlert
        Swal.fire({
          title: "Erreur",
          text: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone.",
          icon: "error",
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#F78536",
        });
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
