let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "You miss 100% of the shots you don't take.", category: "Sports" }
];

// Load quotes from localStorage on initialization
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote and store it in sessionStorage
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    // Create quote element
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${quote.text}"`;
    quoteElement.style.fontStyle = 'italic';
    
    // Create category element
    const categoryElement = document.createElement('p');
    categoryElement.textContent = `Category: ${quote.category}`;
    categoryElement.style.fontWeight = 'bold';
    
    // Append elements to display
    quoteDisplay.appendChild(quoteElement);
    quoteDisplay.appendChild(categoryElement);
    
    // Store last viewed quote in sessionStorage
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Add a new quote and save to localStorage
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Validate inputs
    if (quoteText.trim() === '' || quoteCategory.trim() === '') {
        alert('Please enter both quote and category');
        return;
    }
    
    // Add new quote to array
    quotes.push({
        text: quoteText,
        category: quoteCategory
    });
    
    // Save to localStorage
    saveQuotes();
    
    // Clear form inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Display the new quote immediately
    showRandomQuote();
}

// Export quotes as JSON file
function exportToJsonFile() {
    try {
        const jsonString = JSON.stringify(quotes, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'quotes.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Quotes exported successfully!');
    } catch (error) {
        alert('Error exporting quotes: ' + error.message);
    }
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    try {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                // Validate imported data
                if (!Array.isArray(importedQuotes)) {
                    throw new Error('Invalid JSON format: Expected an array');
                }
                for (const quote of importedQuotes) {
                    if (!quote.text || !quote.category) {
                        throw new Error('Invalid quote format: Missing text or category');
                    }
                }
                quotes.push(...importedQuotes);
                saveQuotes();
                showRandomQuote();
                alert('Quotes imported successfully!');
            } catch (error) {
                alert('Error importing quotes: ' + error.message);
            }
        };
        fileReader.readAsText(event.target.files[0]);
    } catch (error) {
        alert('Error reading file: ' + error.message);
    }
}

// Load last viewed quote from sessionStorage on page load
function loadLastQuote() {
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        const quote = JSON.parse(lastQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = '';
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `"${quote.text}"`;
        quoteElement.style.fontStyle = 'italic';
        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${quote.category}`;
        categoryElement.style.fontWeight = 'bold';
        quoteDisplay.appendChild(quoteElement);
        quoteDisplay.appendChild(categoryElement);
    } else {
        showRandomQuote();
    }
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Initialize: Load quotes and display last quote
loadQuotes();
loadLastQuote();