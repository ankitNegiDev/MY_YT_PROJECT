// import axios from "../../utils/axiosInstance.js";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import './signup.css'

// function Signup() {
//     var [userName, setUserName] = useState("");
//     var [email, setEmail] = useState("");
//     var [password, setPassword] = useState("");
//     var [confirmPassword, setConfirmPassword] = useState("");
//     var [profilePhoto, setProfilePhoto] = useState(null);
//     var [previewPhoto, setPreviewPhoto] = useState(null);
//     var [errorMessage, setErrorMessage] = useState("");
//     var [isLoading, setIsLoading] = useState(false);  // <-- new loading state

//     var navigate = useNavigate();
//     var auth = useContext(AuthContext);

//     function handleUserNameChange(event) {
//         setUserName(event.target.value);
//     }


//     function handleEmailChange(event) {
//         setEmail(event.target.value);
//     }

//     function handlePasswordChange(event) {
//         setPassword(event.target.value);
//     }

//     function handleConfirmPasswordChange(event) {
//         setConfirmPassword(event.target.value);
//     }

//     function handlePhotoChange(event) {
//         const file = event.target.files[0];
//         if (file) {
//             setProfilePhoto(file);

//             // Preview image
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewPhoto(reader.result);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setProfilePhoto(null);
//             setPreviewPhoto(null);
//         }
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();
//         setErrorMessage("");
//         setIsLoading(true);  // <-- start loading

//         if (userName.trim() === "") {
//             setErrorMessage("Username is required");
//             setIsLoading(false);
//             return;
//         }
//         if (email.trim() === "") {
//             setErrorMessage("Email is required");
//             setIsLoading(false);
//             return;
//         }
//         if (password === "") {
//             setErrorMessage("Password is required");
//             setIsLoading(false);
//             return;
//         }
//         if (password !== confirmPassword) {
//             setErrorMessage("Passwords do not match");
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append("userName", userName);
//             formData.append("email", email);
//             formData.append("password", password);
//             if (profilePhoto) {
//                 formData.append("profilePhoto", profilePhoto);
//             }

//             // api call ....
//             const response = await axios.post("/user/signup", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             console.log("response.data in /user/singup in singup component api call repsonse is ==============> ",response.data);
//             console.log("response.data.data in /user/singup in singup component api call repsonse is ==============> ", response.data.data);
//             console.log("response.data.data.user in /user/singup in singup component api call repsonse is ==============> ", response.data.data.user);


//             auth.login(response.data.data.user);
            
//             navigate("/signin");
//         } catch (err) {
//             console.error(err);
//             setErrorMessage("Registration failed. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="signup-container">
//             <h2 className="signup-heading">Sign Up</h2>

//             {errorMessage && (
//                 <div className="signup-error-message">{errorMessage}</div>
//             )}

//             <form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
//                 <div className="signup-photo-preview-container">
//                     {previewPhoto ? (
//                         <img
//                             src={previewPhoto}
//                             alt="Profile Preview"
//                             className="signup-photo-preview"
//                         />
//                     ) : (
//                         <div className="signup-photo-placeholder">No Photo</div>
//                     )}
//                 </div>

//                 <div className="signup-form-group">
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handlePhotoChange}
//                         className="signup-file-input"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <div className="signup-form-group">
//                     <label htmlFor="username" className="signup-label">
//                         Username
//                     </label>
//                     <input
//                         id="username"
//                         type="text"
//                         value={userName}
//                         onChange={handleUserNameChange}
//                         className="signup-text-input"
//                         placeholder="Enter username"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <div className="signup-form-group">
//                     <label htmlFor="email" className="signup-label">
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         className="signup-text-input"
//                         placeholder="Enter email"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <div className="signup-form-group">
//                     <label htmlFor="password" className="signup-label">
//                         Password
//                     </label>
//                     <input
//                         id="password"
//                         type="password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                         className="signup-text-input"
//                         placeholder="Enter password"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <div className="signup-form-group">
//                     <label htmlFor="confirm-password" className="signup-label">
//                         Confirm Password
//                     </label>
//                     <input
//                         id="confirm-password"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={handleConfirmPasswordChange}
//                         className="signup-text-input"
//                         placeholder="Confirm password"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="signup-submit-button"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? "Please wait Signing Up..." : "Sign Up"}
//                 </button>
//             </form>
//         </div>
//     );

// }

// export default Signup;


import axios from "../../utils/axiosInstance.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './signup.css';

function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    function handleUserNameChange(event) {
        setUserName(event.target.value);
        setFieldErrors(prev => ({ ...prev, userName: "" }));
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
        setFieldErrors(prev => ({ ...prev, email: "" }));
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setFieldErrors(prev => ({ ...prev, password: "" }));
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
        setFieldErrors(prev => ({ ...prev, confirmPassword: "" }));
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePhoto(null);
            setPreviewPhoto(null);
        }
    }

    function validateForm() {
        const errors = {};

        if (userName.trim() === "") {
            errors.userName = "Username is required";
        }

        if (email.trim() === "") {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.email = "Enter a valid email address";
            }
        }

        if (password === "") {
            errors.password = "Password is required";
        } else {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(password)) {
                errors.password = "Password must be 6+ chars, 1 uppercase & 1 number";
            }
        }

        if (confirmPassword === "") {
            errors.confirmPassword = "Confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);
        setFieldErrors({});

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("email", email);
            formData.append("password", password);
            if (profilePhoto) {
                formData.append("profilePhoto", profilePhoto);
            }

            const response = await axios.post("/user/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("response.data:", response.data);
            auth.login(response.data.data.user);
            navigate("/signin");
        } catch (err) {
            console.error(err);
            setErrorMessage("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="signup-container">
            <h2 className="signup-heading">Sign Up</h2>

            {errorMessage && (
                <div className="signup-error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
                <div className="signup-photo-preview-container">
                    {previewPhoto ? (
                        <img
                            src={previewPhoto}
                            alt="Profile Preview"
                            className="signup-photo-preview"
                        />
                    ) : (
                        <div className="signup-photo-placeholder">No Photo</div>
                    )}
                </div>

                <div className="signup-form-group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="signup-file-input"
                        disabled={isLoading}
                    />
                </div>

                <div className="signup-form-group">
                    <label htmlFor="username" className="signup-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={userName}
                        onChange={handleUserNameChange}
                        className="signup-text-input"
                        placeholder="Enter username"
                        disabled={isLoading}
                    />
                    {fieldErrors.userName && (
                        <div className="signup-field-error">{fieldErrors.userName}</div>
                    )}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="signup-text-input"
                        placeholder="Enter email"
                        disabled={isLoading}
                    />
                    {fieldErrors.email && (
                        <div className="signup-field-error">{fieldErrors.email}</div>
                    )}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="signup-text-input"
                        placeholder="Enter password"
                        disabled={isLoading}
                    />
                    {fieldErrors.password && (
                        <div className="signup-field-error">{fieldErrors.password}</div>
                    )}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="confirm-password" className="signup-label">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="signup-text-input"
                        placeholder="Confirm password"
                        disabled={isLoading}
                    />
                    {fieldErrors.confirmPassword && (
                        <div className="signup-field-error">{fieldErrors.confirmPassword}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="signup-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Please wait Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}

export default Signup;









































// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";


// function SignUp() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [profilePhoto, setProfilePhoto] = useState(null);
//     const [previewPhoto, setPreviewPhoto] = useState(null);
//     const [error, setError] = useState("");
//     const auth = useContext(AuthContext);
//     const navigate = useNavigate();

//     function handleUsernameChange(e) {
//         setUsername(e.target.value);
//     }

//     function handleEmailChange(e) {
//         setEmail(e.target.value);
//     }

//     function handlePasswordChange(e) {
//         setPassword(e.target.value);
//     }

//     function handlePhotoChange(e) {
//         const file = e.target.files[0];
//         if (file) {
//             setProfilePhoto(file);

//             // Create a preview URL to show the image immediately on frontend
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewPhoto(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     }

//     /*
//     async function handleSubmit(event) {
//         event.preventDefault();
//         setError("");

//         try {
//             const response = await axios.post("/user/signup", {
//                 userName: username,
//                 email: email,
//                 password: password
//             });
//             console.log("repsonse object is : ",response);

//             console.log("repsosne after signup is : \n\n",response.data.data.user);

//             // Auto-login after successful registration
//             auth.login(response.data.data.user);
//             navigate("/");
//         } catch (err) {
//             console.error(err);
//             setError("Registration failed");
//         }
//     }
//     */
//     async function handleSubmit(event) {
//         event.preventDefault();
//         setError("");

//         try {
//             // Use FormData to send file + other data
//             const formData = new FormData();
//             formData.append("userName", username);
//             formData.append("email", email);
//             formData.append("password", password);
//             if (profilePhoto) {
//                 formData.append("profilePhoto", profilePhoto);
//             }
//             console.log("form data before calling the /user/signup api is : ");
//             console.log("FormData before API call:");
//             for (let [key, value] of formData.entries()) {
//                 console.log(`${key}:`, value);
//             }

//             const response = await axios.post("/user/signup", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log("response after signup:", response.data.data.user);

//             auth.login(response.data.data.user);
//             navigate("/signin");
//         } catch (err) {
//             console.error(err);
//             setError("Registration failed");
//         }
//     }


//     return (
//         <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Sign Up</h2>

//             {error && <p className="text-red-500 mb-2">{error}</p>}

//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="mb-4 flex justify-center">
//                     {previewPhoto ? (
//                         <img
//                             src={previewPhoto}
//                             alt="Profile Preview"
//                             className="w-24 h-24 rounded-full object-cover border"
//                         />
//                     ) : (
//                         <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border">
//                             No Photo
//                         </div>
//                     )}
//                 </div>

//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="mb-4"
//                 />

//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={handleUsernameChange}
//                     className="w-full mb-3 p-2 border rounded"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     className="w-full mb-3 p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     className="w-full mb-3 p-2 border rounded"
//                 />
//                 <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default SignUp;


// // sonal
// // sonal9104@gmail.com
// // 123

