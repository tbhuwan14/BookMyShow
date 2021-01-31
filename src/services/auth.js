import googleCalendarApi from "../utils/googleCalendarApi";

export async function signOut() {
  await googleCalendarApi.handleSignoutClick();
  sessionStorage.removeItem("isSignedIn");
}

export async function signIn() {
  await googleCalendarApi.handleAuthClick();
  sessionStorage.setItem("isSignedIn", true);
}

export function isSignedIn() {
  return sessionStorage.getItem("isSignedIn");
}
