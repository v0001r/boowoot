import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const prodConfig = {
  apiKey: "AIzaSyBcTPvgOcuLoUrFvMJvFTFqMzxhJC5mSNM",
  authDomain: "bowoot-be754.firebaseapp.com",
  databaseURL: "https://bowoot.firebaseio.com/",
  projectId: "bowoot-be754",
  storageBucket: "bowoot-be754.appspot.com",
  messagingSenderId: "300482239919",
  appId: "1:300482239919:web:7fa29e50bd389f84",
  measurementId: "G-X0B2WP80EK"
};

const devConfig = {
  apiKey: "AIzaSyDunjSQB2jlb6HeGu1isrtKv6g5WsEUuOg",
  authDomain: "bowoot-test.firebaseapp.com",
  databaseURL: "https://bowoot-test.firebaseio.com",
  projectId: "bowoot-test",
  storageBucket: "bowoot-test.appspot.com",
  messagingSenderId: "109691704068",
  appId: "1:109691704068:web:49c17f9ca34b4059a07651",
  measurementId: "G-YHZPSN066F"
};


const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(prodConfig);
}
export { firebase };
