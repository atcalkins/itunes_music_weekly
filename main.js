/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
const initialUrl = "https://itunes.apple.com/search?term=";
const songsFound = document.querySelector(".results");
const searchBar = document.querySelector(".search-input");
const button = document.querySelector("button");

document.getElementById("search-button").addEventListener("click", function(e) {
//   if(e.target && e.target.nodeName == "LI") {
//   const x = document.getElementByClass("music-player");
//
// function playAudio() {
//     x.play();
// } ;
// 	}
  let userSearch = initialUrl + searchBar.value;
  e.preventDefault();

  fetch(userSearch).then(function(response) {
    if (response.status !== 200) {
      return;
    }
    response.json().then(function(data) {
      let resultsContainer = "";
      data.results.forEach(function(items) {
        if (items.kind === "song") {
          let template = `
              <ul>
                <li>
                  <img src="${items.artworkUrl100}" alt="">
                  <div class="song-title"><a href="${items.trackViewUrl}">${items.trackName}</div>
                  <p><a href="${items.artistViewUrl}">${items.artistName}</p>
                </li>
              </ul>
            `;
          resultsContainer += template;
        }
      });
      songsFound.innerHTML = resultsContainer;
      searchBar.value = "";

      //working on getting audio to play messing around with the following code but dont know placement
      //document.getElementById('yourAudioTag').play();
    });
  });
});
