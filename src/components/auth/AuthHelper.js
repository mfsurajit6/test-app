import axios from "axios";

const API = "http://localhost:5000/users"

export const signin = (email, password) => {
    // console.log(email, password);
    return axios
    .get(`${API}?q=`+email,{
        email: email,
    })
    .then(res => {
        // console.log(res);
        if(res.data[0].password === password){
            // console.log("Login Success")
            localStorage.setItem("test_token",res.data[0].token)
            return "success";
        } else {
            console.log("Invalid Username or Password");
            return "error";
        }
    })
    .catch(err => console.log(err))

}

export const signup = (name, email, password) => {
    // console.log(name, email, password);
    let token = (Math.random() + 1).toString(36).substring(2);
    // console.log("random", token);
    return axios
    .post("http://localhost:5000/users",{
        name: name,
        email: email,
        password: password,
        token: token
    })
    .then(res => {
        // console.log("Status:"+res.status)
        if(res.status === 201 ){
            return "Account Created"
        } else {
            return "error"
        }
    })
    .catch(err => console.log(err))
}

export const signout = (next) => {
    // const navigate = useNavigate();
    if(isAuthenticated){
        localStorage.removeItem("test_token");
        // <Navigate replace to="/" />
        // navigate("/");
        next();
    }
}

export const isAuthenticated = () => {
    if(localStorage.getItem("test_token")){
        // console.log(localStorage.getItem("test_token"));
        return localStorage.getItem("test_token");
    } else {
        return false;
    }
}