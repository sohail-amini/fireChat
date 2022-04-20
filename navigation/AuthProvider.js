import React, {createContext, useState,useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myId, setMyId] = useState();


    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                login: async(email, password) => {
                    try {
                        console.log(email)
                        await auth().signInWithEmailAndPassword(email, password)
                        

                    } catch(e) {
                        alert(e)
                        console.log(e)
                    }
                },
                register: async (fname, lname, email, password) => {
                try {
                    
                    await auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                    //Once the user creation has happened successfully, we can add the currentUser into firestore
                    //with the appropriate details.
                    firestore().collection('users').doc(auth().currentUser.uid)
                    .set({
                        uid: auth().currentUser.uid,
                        fname: fname,
                        lname: lname,
                        email: email,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                        userImg: 'https://i.ibb.co/dfzCX8D/User-Avatar-Transparent.png',
                    })
                    //ensure we catch any errors at this stage to advise us if something does go wrong
                    .catch(error => {
                        console.log('Something went wrong with added user to firestore: ', error);
                    })
                    })
                    //we need to catch the whole sign up process if it fails too.
                    .catch(error => {
                        console.log('Something went wrong with sign up: ', error);
                    });
                    

                } catch (e) {
                    alert(e);
                    console.log(e)
                }
                },
                fbLogin: async() => {
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);
                    } catch(e) {
                        console.log({e})
                    }
                },
                logout: async() => {
                    try {
                        await auth().signOut();
                    } catch(e) {
                        alert(e)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

