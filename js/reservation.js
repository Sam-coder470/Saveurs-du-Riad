document.addEventListener("DOMContentLoaded", function () {
  // Set minimum date to today
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  document.getElementById("date").min = formattedDate;
  document.getElementById("date").value = formattedDate;

  // Form submission handling
  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "block";

    // Get form data
    const formData = new FormData(form);
    const reservationData = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      guests: formData.get("guests"),
      occasion: formData.get("occasion"),
      special_requests: formData.get("special-requests"),
      newsletter: formData.has("newsletter") ? "Oui" : "Non",
    };

    // FormSubmit URL (replace with your email)
    const formSubmitUrl = "https://formsubmit.co/samloik.codotoafode.77@edu.uiz.ac.ma";

    // Prepare data to send
    const data = new URLSearchParams();
    for (const [key, value] of Object.entries(reservationData)) {
      data.append(key, value);
    }

    // Add special fields for FormSubmit
    data.append(
      "_subject",
      `Nouvelle réservation - ${reservationData.name} ${reservationData.lastname}`
    );
    data.append("_template", "table");
    data.append("_captcha", "false");

    // Add email for customer copy
    data.append("_cc", reservationData.email);

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
          document.getElementById("reservationSuccess").style.display = "block";
          document.getElementById("reservationError").style.display = "none";
          form.reset();

          // Reset date field to today
          document.getElementById("date").value = formattedDate;

          // Show success message with SweetAlert
          Swal.fire({
            title: "Réservation confirmée !",
            text: `Merci ${reservationData.name} pour votre réservation. Un email de confirmation a été envoyé à ${reservationData.email}. Nous avons hâte de vous accueillir le ${reservationData.date} à ${reservationData.time}.`,
            icon: "success",
            confirmButtonText: "Parfait !",
            confirmButtonColor: "#F78536",
          });

          // Scroll to top of form
          document
            .getElementById("fh5co-reservation-form")
            .scrollIntoView({ behavior: "smooth" });
        } else {
          // Error handling
          document.getElementById("reservationSuccess").style.display = "none";
          document.getElementById("reservationError").style.display = "block";

          // Show error message with SweetAlert
          Swal.fire({
            title: "Erreur",
            text: "Un problème est survenu lors de votre réservation. Veuillez réessayer ou nous contacter directement par téléphone.",
            icon: "error",
            confirmButtonText: "Réessayer",
            confirmButtonColor: "#F78536",
          });
        }
      })
      .catch((error) => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("reservationSuccess").style.display = "none";
        document.getElementById("reservationError").style.display = "block";

        console.error("Error:", error);

        // Show error message with SweetAlert
        Swal.fire({
          title: "Erreur",
          text: "Un problème est survenu lors de votre réservation. Veuillez réessayer ou nous contacter directement par téléphone.",
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
