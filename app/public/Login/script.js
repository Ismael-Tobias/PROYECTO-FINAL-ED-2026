const mensajeError = document.querySelector("[name='error']");

document.getElementById("login-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    console.log(user, password);
    const res  = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user, password
        })
    });
    if(!res.ok){
        mensajeError.classList.remove("escondido");
        return;
    }
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})