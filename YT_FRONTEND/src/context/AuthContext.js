// creatinga context..
/**
 * in this auth context we are checking for is there any user in the localstorage if yes then set that user to current user and for  it we obisouly maintain a state globally here in context and if there is user in local storage set that user as current user and if not then set it null 
 * and when user click on logout then remove user from the local storage.
 * at last we are just making sure that authContext.provider give user info , login(), logout() function info to whatever the component is wrapped inside it ..
 ** steps ---> 
        *? Step 1 : => when App loads then AuthProvider mounts.
        *? Step 2 : =>	then inside useEffect we will check for user in loclastorage -> localStorage.getItem('user').
        *? Step 3 : =>	If user is found then we will parse it (becuse in localstorage whatever we store it is stored in the form of string) JSON.parse() it and set it into state via setUser.
        *? Step 4 : =>	else if user is not found then user remains null.
        *? Step 5 : =>	Next using  <AuthContext.Provider>  the current  user that we fetch from localstorage either it is null or a valid user we will make them avilable for child component of this authContent.provider along with login() and logout() functions inforamtion...
 */


/**
 * in summery we are creating a seprate storage box like authcontext and since react gives us a provider function and we will not use it instead we will use our custom provider so that we can easly handel the login logout functionality other wise if we use default provider then either we have to maintain individual states (which is too complex) or a state in parent which is also not good 
 ** We are creating a separate "storage box" using createContext() (i.e., AuthContext).
 * Since React gives us a built-in .Provider, we don’t use it directly.
 * Instead, we wrap it in our own custom provider component (AuthProvider) so we can easily manage login/logout logic.
 * If we used the default provider directly, we would either have to maintain multiple separate states 
 * or keep the state in a parent component — both of which can become messy and hard to scale.
 */

import { createContext } from "react";
// creating a context object using createContext a inbuilt function given by react..
export const AuthContext = createContext();

// authProvider code is in seprate file
