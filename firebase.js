
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyAlo2xmzuYyfVnybbv8Phm4KitkMAzS4zs",
          authDomain: "challenge-d59d2.firebaseapp.com",
          projectId: "challenge-d59d2",
          storageBucket: "challenge-d59d2.appspot.com",
          messagingSenderId: "95492201217",
          appId: "1:95492201217:web:36472ee7d283db66e39900",
          measurementId: "G-GG4H4XLEVK"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const db = getFirestore(app);

        export{db}

        