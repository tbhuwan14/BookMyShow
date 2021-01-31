import { useEffect } from "react";
import { isSignedIn, signOut } from "../services/auth";

function SignOut(props) {
  useEffect(() => {
    (async function () {
      await signOut();
      window.location = "/";
    })();
  }, []);

  if (!isSignedIn()) props.history.replace("/");

  return null;
}

export default SignOut;
