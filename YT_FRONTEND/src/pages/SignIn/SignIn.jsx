import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/axiosInstance";
import './signin.css';

function SignIn() {
    // const [email, setEmail] = useState("");
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle email input change
    /*function handleEmailChange(event) {
        setEmail(event.target.value);
    }*/

    // handel loginValue eitther user name or email..
    function handelLoginValue(event) {
        setLoginValue(event.target.value);
    }

    // Handle password input change
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    // Handle form submit
    async function handleSubmit(event) {
        event.preventDefault();
        setError(""); // Clear previous error

        try {
            /*const response = await axios.post("/user/login", {
                email: email.trim().toLowerCase(), // normalized email
                password: password.trim(),
            });
            */
            const response = await axios.post("/user/login", {
                //! loginValue: loginValue.trim().toLowerCase(), // bug .. if user is writing username like this BingoLive then in db username is saved as it is so we need to login with the same name other wise it is throwing error that regisitration is failed.
                loginValue: loginValue.trim(),
                password: password.trim(),
            });

            // ! auth.login(response.data.data.user); // bug not parsing the token ..
            // console.log("user data doing logout and then login agian is : ", response.data);
            // console.log("User after doing log out and then login again :", response.data.data.user);

            const userInfo = {
                ...response.data.data.user,
                token: response.data.token,
            };
            console.log("user info that is saved in context after calling api /user/login login is : ",userInfo);

            auth.login(userInfo);


            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials");
        }
    }

    return (
        <div className="signin-container">
            <h2 className="signin-heading">Sign In</h2>

            {error && <p className="signin-error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="signin-form">
                <input
                    type="text"
                    placeholder="Email or userName"
                    value={loginValue}
                    onChange={handelLoginValue}
                    className="signin-text-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="signin-text-input"
                />
                <button type="submit" className="signin-submit-button">
                    Sign In
                </button>
            </form>

            <p className="signin-footer-text">
                Don’t have an account?{" "}
                <Link to="/signup" className="signin-link">
                    Register here
                </Link>
            </p>
        </div>
    );
    
}

export default SignIn;



// return (
//     <div className="container">
//         <h2 className="heading">Sign In</h2>

//         {error && <p className="error-message">{error}</p>}

//         <form onSubmit={handleSubmit}>
//             {/* <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="text-input"
//             /> */}
//             <input
//                 type="text"
//                 placeholder="Email or userName"
//                 value={loginValue}
//                 onChange={handelLoginValue}
//                 className="text-input"
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className="text-input"
//             />
//             <button type="submit" className="submit-button">
//                 Sign In
//             </button>
//         </form>

//         <p className="footer-text">
//             Don't have an account?{" "}
//             <Link to="/signup" className="link">
//                 Register here
//             </Link>
//         </p>
//     </div>
// );