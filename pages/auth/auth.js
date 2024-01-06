document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(".auth-form")

    form.addEventListener("submit", (e) => {
        e.preventDefault(); //  отменить стандартное поведение

        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;

        if (user.login === login && user.password === password) {
            const token = "1234"
            localStorage.setItem("authToken", token)
            window.location.href = "../../index.html" 
            return;
        } else {
          alert("Не верные значения")
          console.log(login)
          console.log(password)
        }
        
    })
})