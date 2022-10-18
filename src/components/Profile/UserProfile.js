import { FormattedMessage } from "react-intl";

import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>
        <FormattedMessage
          id="userProfile.yourUserProfile"
          defaultMessage="Your User Profile"
        />
      </h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
