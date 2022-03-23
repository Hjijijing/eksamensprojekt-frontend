import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
  prompt: "select_account",
});

const TwitterProvider = new TwitterAuthProvider();

TwitterProvider.setCustomParameters({
  prompt: "select_account",
});

const FacebookProvider = new FacebookAuthProvider();

FacebookProvider.setCustomParameters({
  prompt: "select_account",
});

const GithubProvider = new GithubAuthProvider();

GithubProvider.setCustomParameters({
  prompt: "select_account",
});

export { GoogleProvider, TwitterProvider, FacebookProvider, GithubProvider };
