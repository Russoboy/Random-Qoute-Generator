// script.js
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');

// API URL for random quotes
const apiUrl = 'https://api.quotable.io/random';

// Function to fetch a random quotes
async function getQuote() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    quoteText.textContent = data.content;
    authorText.textContent = `— ${data.author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Failed to fetch quote. Please try again.';
    authorText.textContent = '';
  }
}

// Event listener for the button
generateBtn.addEventListener('click', getQuote);

// Fetch a quote when the page loads
getQuote();
