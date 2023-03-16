const firebaseConfig = {
  apiKey: "AIzaSyAP_COHInv-LCXT4abavZawiTbLmjWOBw8",
  authDomain: "hotel-af610.firebaseapp.com",
  databaseURL: "https://hotel-af610-default-rtdb.firebaseio.com",
  projectId: "hotel-af610",
  storageBucket: "hotel-af610.appspot.com",
  messagingSenderId: "847210646489",
  appId: "1:847210646489:web:e733ed4535a3544cf8a7c8",
  measurementId: "G-N5VK02PBJH",
};

firebase.initializeApp(firebaseConfig);

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getArrayFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function updateDataInFirebaseByID(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

function removeElementFromFirebase(REF, id) {
  firabase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}
