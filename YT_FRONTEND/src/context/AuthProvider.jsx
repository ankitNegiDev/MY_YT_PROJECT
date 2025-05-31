import {useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// now creating our own custom provider which si nothing but a react component.

function AuthProvider(props) {
    // creating a state...
    const [user, setUser] = useState(null); // initial value for user is null.

    // checking is there any user is present in localtSorage... and we do outside work in useEffect.
    // load it only at mouting time.
    useEffect(function callback() {
        let storedUser = localStorage.getItem('user');
        // console.log("stored user is : ",storedUser); //! if stored user is undefined then check local storage we might add undefined..
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // converting string user into json format.
        }
    }, []);

    // login function..
    function login(userData) {
        console.log("userData received in login() in auth provider  context --------------->:", userData);
        localStorage.setItem('user', JSON.stringify(userData)); // here 'user' is key and userData is value which we are converting into the string.. setItem(key,value(alwys in string))
        setUser(userData); // this will trigeer the re-render.(state is changed)
    }

    // logout function
    function logout() {
        localStorage.removeItem('user'); // only key name
        setUser(null); // it will also trigger re-render we can set logic what to show when user is logout and loged in.
    }
    // Safely extract accessToken from user
    const accessToken = user?.token || "";
    console.log("access token in the auth provider is : ",accessToken);
    // props.children is nothing but that component outside which we will wrap out context.provider and in our cse it is app ocmpnent.
    return (
        <>
            <AuthContext.Provider value={{ user: user, login: login, logout: logout }}>
                {props.children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthProvider;