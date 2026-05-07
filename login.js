function login(){

    let email =
    document.querySelector('input[type="email"]').value;

    let password =
    document.querySelector('input[type="password"]').value;

    if(email === "" || password === ""){

        alert("Please enter valid credentials");

    }

    else{

        document
        .getElementById("loader")
        .style.display = "flex";

        setTimeout(() => {

            window.location.href =
            "dashboard.html";

        },2000);

    }

}