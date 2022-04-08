
export const environment = {
    production: false,
    autocompleteAPI: {
        url: (input) => { return `http://localhost:8080/autocomplete?input=${input}` },
    },
    firebase: {
        apiKey: "AIzaSyBz1EI6tLnKz13yuwaWXF9DH_90V-VtnsE",
        authDomain: "xe-dev-alex.firebaseapp.com",
        projectId: "xe-dev-alex",
        storageBucket: "xe-dev-alex.appspot.com",
        messagingSenderId: "502780015094",
        appId: "1:502780015094:web:4283dd5961eeca114a17d7"
    },
};