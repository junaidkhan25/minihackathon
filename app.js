//----------------------signup------------------//
let userSignup = () => {
    let username = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let city = document.getElementById("city");
    let password = document.getElementById("password");


    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                city: city.value,
                password: password.value
            }

            firebase.database().ref(`signup/${res.user.uid}`).set(user)
                .then(() => {
                    alert("User Signup Succeccfully")
                    window.location = "userLogin.html"
                })

        })
        .catch((err) => {
            console.log(err.message)
        })
}

//-------------------------login---------------//

let login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)

    .then((res) => {
            firebase.database().ref(`signup/${res.user.uid}`).once('value', (data) => {
                localStorage.setItem("userBio",data.val().username);
                // console.log(data.val())
                alert("successfully")
                window.location.href="index.html";
            })
        })
        .catch((err) => {
            alert("enter correct email and password",err)
        })

}


let popped = 0;

document.addEventListener('mouseover', function(e){
    
    if (e.target.className === "balloon"){
        
                e.target.style.backgroundColor = "#ededed";
                e.target.textContent = "POP!";
                popped++;
                removeEvent(e);
                checkAllPopped();
    }   
});

function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

function checkAllPopped(){
    if (popped === 24){
        console.log('all popped!');
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }
};