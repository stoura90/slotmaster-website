import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import UserVerification from "./verification/verification";
import Recover from "./recover/Recover";


const Guest = () =>{

    return (
        <div>
            <SignIn/>
            <SignUp/>
            <UserVerification/>
            <Recover/>
        </div>
    )

}
export default Guest
