// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submitButton').addEventListener('click', submitForm);
    // loadAnswers();
});

function submitForm() {
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

async function saveToFirebase(name, country, share) {
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

async function loadAnswers() {
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

