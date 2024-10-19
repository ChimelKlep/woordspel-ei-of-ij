let wordData;
let currentWordIndex = 0;
let category = localStorage.getItem('selectedCategory');

// Fetch data from the JSON file
fetch('structured_word_data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        wordData = data.find(cat => cat.Categorie === category);
        if (wordData) {
            showNextWord();
        } else {
            document.getElementById('sentence').innerHTML = "Geen data voor de geselecteerde categorie.";
        }
    })
    .catch(error => {
        console.error('Error fetching the JSON:', error);
        document.getElementById('sentence').innerHTML = "Fout bij het laden van data.";
    });

function showNextWord() {
    if (currentWordIndex < wordData.Zin.length) {
        let sentence = wordData.Zin[currentWordIndex];
        document.getElementById('sentence').innerHTML = sentence;
    } else {
        document.getElementById('sentence').innerHTML = "Alle woorden zijn behandeld.";
    }
}

function makeChoice(choice) {
    let correctWord = wordData['Correcte Spelling'][currentWordIndex].toLowerCase();
    choice = choice.toLowerCase(); // Maak de keuze ook lowercase

    // Controleer of het correcte woord de gekozen spelling bevat (ei of ij)
    let isCorrect = (choice === 'ei' && correctWord.includes('ei')) || (choice === 'ij' && correctWord.includes('ij'));

    // Update de tabel met resultaten
    addToTable(choice, correctWord, isCorrect);

    if (isCorrect) {
        document.getElementById('sentence').innerHTML = "Correct!";
    } else {
        document.getElementById('sentence').innerHTML = `Incorrect, het juiste antwoord is: ${wordData['Correcte Spelling'][currentWordIndex]}`;
    }

    currentWordIndex++;
    if (currentWordIndex < wordData.Zin.length) {
        showNextWord();
    } else {
        document.getElementById('sentence').innerHTML = "Alle woorden zijn behandeld.";
    }
}

function addToTable(choice, word, isCorrect = true) {
    let table = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    if (choice === 'ei') {
        let eiCell = newRow.insertCell(0);
        eiCell.innerHTML = word;
        if (!isCorrect) eiCell.style.color = 'red';
        newRow.insertCell(1).innerHTML = '';
    } else {
        newRow.insertCell(0).innerHTML = '';
        let ijCell = newRow.insertCell(1);
        ijCell.innerHTML = word;
        if (!isCorrect) ijCell.style.color = 'red';
    }
}

function goBack() {
    localStorage.removeItem('selectedCategory');
    window.location.href = 'index.html';
}
