let wordData;
let currentWordIndex = 0;
let category = localStorage.getItem('selectedCategory');

// Logging to check if the script is loaded correctly
console.log('script.js is geladen op opdracht.html');

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
        let sentence = wordData.Zin[currentWordIndex]; // Weergeven volledige zin
        document.getElementById('sentence').innerHTML = sentence; // Toon de zin in de HTML
    } else {
        document.getElementById('sentence').innerHTML = "Alle woorden zijn behandeld.";
    }
}

function makeChoice(choice) {
    console.log('makeChoice is aangeroepen met keuze:', choice);

    let correctWord = wordData['Correcte Spelling'][currentWordIndex].toLowerCase();
    choice = choice.toLowerCase();

    // Controleer of de keuze (ei/ij) in het correcte woord zit
    if (correctWord.includes(choice)) {
        // Als correct, toon "Correct" en update de tabel
        document.getElementById('sentence').innerHTML = "Correct!";
        addToTable(choice, correctWord, true);
    } else {
        // Als incorrect, toon de correcte spelling en update de tabel
        document.getElementById('sentence').innerHTML = `Incorrect, het juiste antwoord is: ${correctWord}`;
        addToTable(choice, correctWord, false);
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

    // Alleen bijwerken van de correcte kolom op basis van de keuze (ei of ij)
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
