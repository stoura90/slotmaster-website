import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import UserVerification from "./verification/verification";


const Guest = () =>{

    return (
        <div>
            <SignIn/>
            <SignUp/>
            <UserVerification/>
        </div>
    )

}
export default Guest