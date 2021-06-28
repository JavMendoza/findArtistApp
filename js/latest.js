const $latestContainer = document.querySelector('.latest-artists');
const $noArtists = document.querySelector('.no-artists-yet');
const $headingLatest = document.querySelector('.heading-latest');

window.addEventListener('load', () => {
  getArtistsFromLocalStorage();
});

function getArtistsFromLocalStorage() {
  const artists = JSON.parse(localStorage.getItem('artists'));
  if (artists) {
    showArtistsInDOM(artists);
  } else {
    $headingLatest.classList.add('hidden');
    $noArtists.classList.add('show');
  }
}

function showArtistsInDOM(artists) {
  artists.forEach(artist => {
    const divArtist = document.createElement('div');
    divArtist.classList.add('row', 'featurette', 'artist-latest');

    divArtist.innerHTML = 
    `
      <div class="col-lg-3 artist-image"><img src="${artist.strArtistThumb}" alt="${artist.strArtist} is an ${artist.strGenre} from ${artist.strCountry}" /></div>
      <div class="col-lg-9">
        <h3 class="featurette-heading artist-name">${artist.strArtist}</h3>
        <ul class="artist-list artist-info">
          <li><strong>Genre:</strong> ${artist.strGenre}</li>
          <li><strong>Website:</strong> <a href="http://${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></li>
        </ul>
        <ul class="artist-list artist-social-networks">
          <li><a href="http://${artist.strFacebook}" target="_blank"><img src="./imgs/face.png" alt="Facebook logo"></a></li>
          <li><a href="http://${artist.strTwitter}" target="_blank"><img src="./imgs/twit.png" alt="Twitter logo"></a></li>
        </ul>
        <p class="lead artist-bio">${artist.strBiographyEN.slice(0, 550)}...</p>
      </div>
    `;

    $latestContainer.appendChild(divArtist);
  });
}