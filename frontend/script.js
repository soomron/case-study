const name = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('form');
const phoneNumber = document.getElementById('phonenumber');
const errorElement = document.getElementById('error');
const forms=document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            } else {
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
            }
        })
    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // prevents form submission
        forms.classList.toggle("show-register");
    })
} )

forms.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ')
    }
    
})