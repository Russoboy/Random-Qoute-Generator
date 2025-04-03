// Select DOM elements
const randomQuote = document.getElementById('Quote');
const authorQuote = document.getElementById('Author');
const qouteCategory = document.getElementById('Category')
const generateQuote = document.getElementById('Generate');
const copyText = document.getElementById('copyText');
const quoteContainer = document.getElementById('quote-container');
const loadingSpinner = document.getElementById('loading-spinner');
const refreshBtn = document.getElementById('refresh-Btn');
const fontSelector = document.getElementById('fontSelector');
const darkMode = document.getElementById('darkmode')
const faveQuote = document.getElementById('favourite-quote')
const saveButton = document.getElementById('saveBtn')
const tweetButton = document.getElementById('tweetBtn')
// Load saved quotes from localStorage on page load

document.addEventListener("DOMContentLoaded", loadSavedQuotes);

saveButton.addEventListener("click", () => {
  const quoteText = randomQuote.textContent;
  const authorText = authorQuote.textContent;
  const categoryText = qouteCategory.textContent;

  if (!quoteText || !authorText) {
      alert("No quote to save!");
      return;
  }

  let savedQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

  // Check for duplicates
  const exists = savedQuotes.some(q => q.quote === quoteText);
  if (exists) {
      alert("This quote is already saved!");
      return;
  }

  // Add new quote to the array
  savedQuotes.push({ quote: quoteText, author: authorText, category: categoryText });

  // Save to localStorage
  localStorage.setItem("favoriteQuotes", JSON.stringify(savedQuotes));

  // Refresh the saved quotes section
  loadSavedQuotes();
});

// Function to load saved quotes
function loadSavedQuotes() {
  faveQuote.innerHTML = "<h3>Saved Quotes:</h3>"; // Clear existing content

  let savedQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

  if (savedQuotes.length === 0) {
      faveQuote.innerHTML += "<p>No saved quotes.</p>";
      return;
  }

  savedQuotes.forEach((item, index) => {
      const quoteDiv = document.createElement("div");
      quoteDiv.innerHTML = `
          <p><strong>${item.quote}</strong> - ${item.author} (${item.category})</p>
          <button onclick="removeQuote(${index})">Remove</button>
      `;
      faveQuote.appendChild(quoteDiv);
  });
}

// Function to remove a saved quote
function removeQuote(index) {
  let savedQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
  savedQuotes.splice(index, 1); // Remove quote from array
  localStorage.setItem("favoriteQuotes", JSON.stringify(savedQuotes));
  loadSavedQuotes(); // Refresh the saved quotes display
}

fontSelector.addEventListener('change', () => {
    const selectedFont = fontSelector.value;
    randomQuote.style.fontFamily = selectedFont;
    localStorage.setItem('selectedFont', selectedFont); // Save preference
});

darkMode.addEventListener('click', () =>{
  const titleText = document.getElementById('title')
  document.querySelector('.container').style.border = "1px solid white"
  document.body.classList.toggle('darkModeBtnToggle')
  randomQuote.style.color = "white";
  authorQuote.style.color = "white";
  title.style.color = "white";
})

// Apply stored font when page loads
const savedFont = localStorage.getItem('selectedFont');
if (savedFont) {
    randomQuote.style.fontFamily = savedFont;
    fontSelector.value = savedFont;
}


tweetButton.addEventListener("click", ()=>{
  const quoteContent = randomQuote.textContent;
  const authorQuoteName = authorQuote.textContent;
  const mergeContent = `${quoteContent} - ${authorQuoteName}`
  const tweetUrl =  `https://twitter.com/intent/tweet?text=${encodeURIComponent(mergeContent)}`; 
  window.open(tweetUrl, "_blank")
})

function fadeIn() {
  randomQuote.style.opacity = "1";
  authorQuote.style.opacity = "1";
}


copyText.addEventListener('click', () => {
  // Get text content from the Quote, Author, and Category elements
  const textToCopy = `${randomQuote.textContent} - ${authorQuote.textContent} (${qouteCategory.textContent})`;

  // Copy text to clipboard
navigator.clipboard.writeText(textToCopy)
      .then(() => alert('Text copied to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
});

function loadingSpinning() {
  loadingSpinner.style.display = 'block';
}
refreshBtn.addEventListener('click', ()=>{
  location.reload();
})

function getQuote() {
  const apiKey = '6XzgFsZcI+xh/D5f1HANng==4jJWF90T3zbeu1M4';  // Replace with your valid API key if needed
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes'; 
  loadingSpinning() 
  fadeIn()
  fetch(apiUrl, {headers: { 'X-Api-Key': apiKey }})
  // Fetch from the API with proper headers

  .then((response) => {
      if (!response.ok) {
        console.log("Raw Response:", response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {  
      console.log("Fetched Data:", data); 
      // The API returns an array; get the first quote object.
      if (data && data.length > 0) {
      
        // if (data && data.length > 0) Checks if data exist and and contains at least one quote
        displayQuote(data[0]);
      } else {
        randomQuote.textContent = "No quote found.";
        authorQuote.textContent = "";
      }
    })
    .finally(() => loadingSpinner.style.display = 'none')
    .catch((error) => {
      console.error('Error fetching quote:', error);
      randomQuote.textContent = "Error fetching data. Please check your connection.";
      randomQuote.style.color = "red";
      authorQuote.textContent = "";
    });
}

// windows.addEventListener("scroll", ()=>{
//   if (windows.innerHeight + window.scrollY >= document.body.offsetHeight - 100 ) {
//       getQuote();
//   }
// })

function displayQuote(quoteObject) {
  // Extract quote and author from the quote object.
  const quote = quoteObject.quote;
  const authorName = quoteObject.author;
  const category = quoteObject.category;

  // Update the DOM elements with the new quote and author.
  randomQuote.textContent = quote;
  authorQuote.textContent = authorName;
  qouteCategory.textContent = category;

   // Apply fade-out effect before changing the text
   randomQuote.classList.add('fade-out');
   authorQuote.classList.add('fade-out');
   qouteCategory.classList.add('fade-out');

   setTimeout(() => {
       // Update the text
       randomQuote.textContent = quote;
       authorQuote.textContent = authorName;
       qouteCategory.textContent = category;

       // Remove fade-out and add fade-in
       randomQuote.classList.remove('fade-out');
       authorQuote.classList.remove('fade-out');
       qouteCategory.classList.remove('fade-out');

       randomQuote.classList.add('fade-in');
       authorQuote.classList.add('fade-in');
       qouteCategory.classList.add('fade-in');
   }, 500); // Wait 500ms before updating text
}

// Add the event listener to the button.
generateQuote.addEventListener('click', getQuote);

// Optionally, fetch a quote when the page first loads.
getQuote();
