import Config from "./../config.json";

class GoogleCalendarApi {
  constructor() {
    this.sign = false;
    this.gapi = null;
    this.onLoadCallback = null;
    this.calendar = "primary";
    try {
      this.handleClientLoad();
    } catch (e) {
      console.log(e);
    }
  }

  updateSigninStatus = (isSignedIn) => {
    this.sign = isSignedIn;
  };

  initClient = () => {
    this.gapi = window.gapi;
    this.gapi.client
      .init(Config)
      .then(() => {
        this.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.updateSigninStatus);

        this.updateSigninStatus(
          this.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleClientLoad = () => {
    this.gapi = window.gapi;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    script.onload = () => {
      window.gapi.load("client:auth2", this.initClient);
    };
  };

  handleAuthClick = () => {
    if (this.gapi) {
      return this.gapi.auth2.getAuthInstance().signIn();
    } else {
      console.log("Error: this.gapi not loaded");
    }
  };

  setCalendar = (newCalendar) => {
    this.calendar = newCalendar;
  };

  listenSign = (callback) => {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    } else {
      console.log("Error: this.gapi not loaded");
    }
  };

  onLoad = (callback) => {
    if (this.gapi) {
      callback();
    } else {
      this.onLoadCallback = callback;
    }
  };

  handleSignoutClick = () => {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().signOut();
    } else {
      console.log("Error: this.gapi not loaded");
    }
  };

  createEventForSlot = ({ dateObj, ...rest }) => {
    const event = {
      start: {
        dateTime: new Date(dateObj).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(new Date(dateObj).getTime() + 1800000),
        timeZone: "Asia/Kolkata",
      },
      ...rest,
    };
    return this.gapi.client.calendar.events.insert({
      calendarId: this.calendar,
      resource: event,
    });
  };
}

let googleCalendarApi;

try {
  googleCalendarApi = new GoogleCalendarApi();
} catch (e) {
  console.log(e);
}
export default googleCalendarApi;
