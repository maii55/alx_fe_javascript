let quotes = [
         { text: "The only way to do great work is to love what you do.", category: "Motivation" },
         { text: "Life is what happens when you're busy making other plans.", category: "Life" },
         { text: "Stay hungry, stay foolish.", category: "Motivation" },
         { text: "You miss 100% of the shots you don't take.", category: "Sports" }
     ];

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
     }

     function createAddQuoteForm() {
         // Form is already in HTML as specified, so we'll just handle the addQuote function
     }

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
         
         // Clear form inputs
         document.getElementById('newQuoteText').value = '';
         document.getElementById('newQuoteCategory').value = '';
         
         // Display the new quote immediately
         showRandomQuote();
     }

     // Event listener for showing new quote
     document.getElementById('newQuote').addEventListener('click', showRandomQuote);

     // Initial quote display
     showRandomQuote();