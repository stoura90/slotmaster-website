const pidIsValid=(pid)=>{
    const re =/^[0-9]{11}$/;
    return re.test(String(pid).toLowerCase());
}
const  emailIsValid = (email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const  usernameIsValid = (value)=> {
    const re =/^[a-zA-Z0-9][a-zA-Z0-9]$/;
    return re.test(String(value).toLowerCase());
}
const  passwordIsValid = (password)=> {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(password).toLowerCase());
}

export default {
    pidIsValid,
    emailIsValid,
    usernameIsValid,
    passwordIsValid
}
