document.addEventListener('DOMContentLoaded', function () {
    loadAnswers();
});

function submitForm() {
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;

    if (name && country) {
        postToGoogleSheet(name, country);
        clearForm();
        loadAnswers();
    } else {
        alert('Please enter both your name and country.');
    }
}

function postToGoogleSheet(name, country) {
    // You need to replace 'YOUR_GOOGLE_SCRIPT_URL' with the URL of your Google Apps Script
    const scriptUrl = 'YOUR_GOOGLE_SCRIPT_URL';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('country', country);

    fetch(scriptUrl, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function loadAnswers() {
    // You need to replace 'YOUR_GOOGLE_SHEET_URL' with the URL of your Google Sheet
    const sheetUrl = 'YOUR_GOOGLE_SHEET_URL';

    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => displayAnswers(data))
        .catch(error => console.error('Error:', error));
}

function displayAnswers(answers) {
    const answersList = document.getElementById('answersList');
    answersList.innerHTML = '';

    answers.forEach(answer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${answer.name} - ${answer.country}`;
        answersList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('country').value = '';
}