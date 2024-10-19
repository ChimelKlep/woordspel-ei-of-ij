function makeChoice(choice) {
    let correctWord = wordData['Correcte Spelling'][currentWordIndex].toLowerCase();
    choice = choice.toLowerCase(); // Maak de keuze ook lowercase

    // Haal de ontbrekende letters ("ei" of "ij") uit de zin om te controleren
    let missingPart = wordData['Zin'][currentWordIndex].match(/\.\.\.(ei|ij)/)[1];
    
    // Controleer of het ontbrekende deel in de zin overeenkomt met de keuze
    let isCorrect = (choice === missingPart);

    // Update de tabel met resultaten
    addToTable(choice, wordData['Correcte Spelling'][currentWordIndex], isCorrect);

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
