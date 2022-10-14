import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { updatePassword, sendEmailVerification } from "firebase/auth";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import firebaseAuth from "../../utils/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation
    const user = firebaseAuth.currentUser;
    // console.log(user);
    updatePassword(user, enteredNewPassword)
      .then(() => {
        // Update successful.
        console.log("Update successful.");
        history.replace("/");
      })
      .catch((error) => {
        // An error ocurred
        console.log("An error ocurred.");
        // ...
      });
  };

  const sendEmailVerificationLink = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("Email verification sent!");
      sendEmailVerification(user);
    });
    // const user = firebaseAuth.currentUser;
    // sendEmailVerification(user)
    //   .then(() => {
    //     console.log("Email verification sent!");
    //     console.log(user.emailVerified);

    //     // ...
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const isVerified =
    authCtx.isVerified === "true" || authCtx.isVerified === true;
  // const isAdmin = authCtx.isAdmin === "true" || authCtx.isAdmin === true;
  // console.log(authCtx.isAdmin);
  // console.log(isAdmin);

  return (
    <>
      {!!isVerified && (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              minLength="7"
              ref={newPasswordInputRef}
            />
          </div>
          <div className={classes.action}>
            <button>Change Password</button>
          </div>
        </form>
      )}
      {!!!isVerified && (
        <div className={classes.action}>
          <p>Please verify you email address to change your profile.</p>
          <button onClick={sendEmailVerificationLink}>
            Send email verification link.
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
