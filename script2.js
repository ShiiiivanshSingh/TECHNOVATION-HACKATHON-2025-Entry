document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.querySelector('.sign-in button');

    signInButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form from submitting
        window.location.href = "index_main.html";
    });
});
