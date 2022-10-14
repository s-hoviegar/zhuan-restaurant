import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, child, get } from "firebase/database";

import AuthContext from "../../store/auth-context";
import firebaseAuth from "../../utils/firebase-auth";
import firebaseDb from "../../utils/firebase-db";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    if (isLogin) {
      // console.log("sign in code goes here");
      signInWithEmailAndPassword(firebaseAuth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          // console.log(firebaseAuth.currentUser.uid);

          // set(ref(firebaseDb, "admins/" + firebaseAuth.currentUser.uid), {
          //   email: firebaseAuth.currentUser.email,
          // });

          // console.log(userCredential._tokenResponse.expiresIn);
          const expirationTime = new Date(
            new Date().getTime() +
              +userCredential._tokenResponse.expiresIn * 1000
          );

          const dbRef = ref(firebaseDb);
          get(child(dbRef, `admins/${firebaseAuth.currentUser.uid}`))
            .then((snapshot) => {
              setIsLoading(false);

              if (snapshot.exists()) {
                // console.log("This user is an admin.");

                authCtx.login(
                  userCredential._tokenResponse.idToken,
                  expirationTime.toISOString(),
                  firebaseAuth.currentUser.emailVerified,
                  true
                );
              } else {
                // console.log("No such admin exists!");

                authCtx.login(
                  userCredential._tokenResponse.idToken,
                  expirationTime.toISOString(),
                  firebaseAuth.currentUser.emailVerified,
                  false
                );
              }
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(error);

              authCtx.login(
                userCredential._tokenResponse.idToken,
                expirationTime.toISOString(),
                firebaseAuth.currentUser.emailVerified,
                false
              );
            });

          history.replace("/");
          // ...
        })
        .catch((error) => {
          setIsLoading(false);

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(errorCode + ": " + errorMessage);
        });
    } else {
      // console.log("sign up code goes here");
      createUserWithEmailAndPassword(
        firebaseAuth,
        enteredEmail,
        enteredPassword
      )
        .then((userCredential) => {
          // Signed in
          setIsLoading(false);
          // console.log(userCredential._tokenResponse.idToken);
          // console.log(userCredential._tokenResponse.expiresIn);
          const expirationTime = new Date(
            new Date().getTime() +
              +userCredential._tokenResponse.expiresIn * 1000
          );
          authCtx.login(
            userCredential._tokenResponse.idToken,
            expirationTime.toISOString(),
            firebaseAuth.currentUser.emailVerified,
            false
          );

          history.replace("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(errorCode + ": " + errorMessage);
          // ..
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
