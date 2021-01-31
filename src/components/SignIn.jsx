import { useEffect } from "react";
import { isSignedIn, signIn } from "../services/auth";

function SignIn(props) {
  useEffect(() => {
    (async function () {
      try {
        await signIn();
        window.location = "/";
      } catch (ex) {
        console.log(ex);
        props.history.replace("/");
      }
    })();
  }, [props.history]);

  if (isSignedIn()) props.history.replace("/");

  return null;
}

export default SignIn;
