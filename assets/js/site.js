  // Simple toggle script for mobile menu
  function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  }

  var form = document.getElementById("cta-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("cta-form-status");
    var data = new FormData(event.target);

    // Reset and hide previous alerts
    status.innerHTML = "";
    status.className = "";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerHTML = `<strong class="font-bold">Success!</strong> <span class="block sm:inline">Thanks for your submission!</span>`;
        status.className = "bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative mt-4";
        form.reset();
      } else {
        const data = await response.json();
        let message = "Oops! There was a problem submitting your form";

        if (Object.hasOwn(data, 'errors')) {
          message = data.errors.map(error => error.message).join(", ");
        }

        status.innerHTML = `<strong class="font-bold">Error!</strong> <span class="block sm:inline">${message}</span>`;
        status.className = "bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded relative mt-4";
      }
    } catch (error) {
      status.innerHTML = `<strong class="font-bold">Error!</strong> <span class="block sm:inline">Oops! There was a problem submitting your form</span>`;
      status.className = "bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded relative mt-4";
    }
  }

  form.addEventListener("submit", handleSubmit);
