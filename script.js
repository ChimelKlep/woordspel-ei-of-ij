let wordData;
let currentWordIndex = 0;
let category = localStorage.getItem('selectedCategory');

// Fetch data from the JSON file
fetch('structured_word_data.json')
    .then(response => response.json())
    .then(data => {
        wordData = data[category];
        showNextWord();
    });

function showNextWord() {
    if (currentWordIndex < wordData.words.length) {
        let sentence = wordData.sentences[currentWordIndex];
        document.getElementById('sentence').innerHTML = sentence;
    } else {
        document.getElementById('sentence').innerHTML = "Alle woorden zijn behandeld.";
    }
}

function makeChoice(choice) {
    let correctWord = wordData.words[currentWordIndex];
    let option = wordData.options[currentWordIndex];

    // Check if the choice is correct
    if ((choice === 'ei' && option.includes('(ei)')) || (choice === 'ij' && option.includes('(ij)'))) {
        addToTable(choice, correctWord);
    } else {
        addToTable(choice, correctWord, false);
    }

    currentWordIndex++;
    showNextWord();
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
