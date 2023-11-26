// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';



document.addEventListener('DOMContentLoaded', function () {

const firebaseConfig = {
  apiKey: "AIzaSyDM6wIbjfeLwRjGH2cPRDzBsSdyE0z2NJY",
  authDomain: "worldtourparty-f4c4d.firebaseapp.com",
  projectId: "worldtourparty-f4c4d",
  storageBucket: "worldtourparty-f4c4d.appspot.com",
  messagingSenderId: "337150884763",
  appId: "1:337150884763:web:fcaad60d8fad1c7c35bf3e",
  measurementId: "G-RB26EDRQN7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('submitButton').addEventListener('click', submitForm);

 function submitForm() {
	console.log("Lets submit");
        const name = document.getElementById('name').value;
        const country = document.getElementById('country').value;
        const share = document.getElementById('share').value;

        if (name && country && share) {
            saveToFirebase(name, country, share);
            clearForm();
            loadAnswers();
        } else {
            alert('Please enter all fields.');
        }
    }
});


function saveToFirebase(name, country, share) {
    try {
        const docRef = await addDoc(collection(db, 'travelers'), {
            name: name,
            country: country,
            share: share
        });

        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

function loadAnswers() {
    const answersList = document.getElementById('answersList');
    answersList.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, 'travelers'));

        querySnapshot.forEach((doc) => {
            const answer = doc.data();
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${answer.name}</strong> - ${answer.country} - ${answer.share} <button onclick="updateAnswer('${doc.id}')">Update</button>`;
            answersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('country').value = '';
    document.getElementById('share').value = '';
}

async function updateAnswer(docId) {
    const newName = prompt('Enter new name:');
    const newCountry = prompt('Enter new country:');
    const newShare = prompt('Enter new share item:');

    if (newName !== null && newCountry !== null && newShare !== null) {
        try {
            await updateDoc(doc(db, 'travelers', docId), {
                name: newName,
                country: newCountry,
                share: newShare
            });

            console.log('Document successfully updated!');
            loadAnswers();
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }
}

