// iTunes API base URL
const apiUrl = "https://itunes.apple.com/search";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

// Fetch data from iTunes API
async function fetchSongs(query) {
  try {
    const response = await fetch(`${apiUrl}?term=${query}&entity=musicTrack&limit=10`);
    if (!response.ok) throw new Error("Failed to fetch data.");

    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Display fetched results
function displayResults(songs) {
  resultsDiv.innerHTML = "";
  if (songs.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("result");
    songDiv.innerHTML = `
      <img src="${song.artworkUrl100}" alt="${song.trackName}">
      <div class="result-info">
        <p><strong>${song.trackName}</strong></p>
        <p>${song.artistName}</p>
        <p>${song.collectionName}</p>
      </div>
    `;
    resultsDiv.appendChild(songDiv);
  });
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchSongs(query);
});
