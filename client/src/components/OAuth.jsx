import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";    
import { useNavigate } from "react-router-dom";

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const { fetchJson } = await import("../utils/fetchJson.js");
            const data = await fetchJson("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            dispatch(signInSuccess(data));
            navigate("/");


        } catch (error) {
            console.log('Could not sign in with Google' , error);
            
        }
    };

  return (
    <button onClick={handleGoogleClick} type="button" className ="bg-orange-400 text-slate-800 p-3 rounded-lg uppercase hover:opacity-95">
        Continue with Google
    </button>
  )
}

export default OAuth;