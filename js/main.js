const API = 'https://www.theaudiodb.com/api/v1/json/1/search.php';

const $inputSearch = document.querySelector('.input-search');
const $btnSearch = document.querySelector('.search-btn');
const $Aname = document.querySelector('.artist-name');
const $AgInfo = document.querySelector('.artist-general-info');
const $Ainfo = document.querySelector('.artist-info');
const $AinfoLis = $Ainfo.querySelectorAll('li');
const $Asocial = document.querySelector('.artist-social-networks');
const $AsocialLis = $Asocial.querySelectorAll('li');
const $Abio = document.querySelector('.artist-bio');
const $Aimg = document.querySelector('.artist-image');
const $pnodata = document.querySelector('.artist-not-found');

$btnSearch.addEventListener('click', e => {
  e.preventDefault();
  if ($inputSearch.value !== '') {
    searchArtist($inputSearch.value);
  }
});

function searchArtist(artist) {
  const artistPromise = fetch(`${API}?s=${artist}`);
  artistPromise
  .then(response => response.json())
  .then(data => {
    if (data.artists) {
      showArtist(data);
      saveArtistInLocalStorage(data.artists[0]);
    } else {
      showNoArtistFound();
    }
  })
  .catch(error => {
    console.log('Hubo un error al procesar la llamada', error);
    showNoArtistFound();
  });
}

function saveArtistInLocalStorage(artist) {
  const artists = JSON.parse(localStorage.getItem('artists')) || [];
  const isArtistInArray = artists.some(art => art.strArtist === artist.strArtist);
  if (!isArtistInArray) {
    artists.push(artist);
  }
  if (artists.length > 10) {
    artists.shift();
  }
  localStorage.setItem('artists', JSON.stringify(artists));
}

function showNoArtistFound() {
  $pnodata.classList.add('show');
  $AgInfo.classList.remove('show');
}

function showArtist(data) {
  $pnodata.classList.remove('show');
  const artist = data.artists[0];

  $Aname.innerHTML = artist.strArtist;

  $AgInfo.classList.add('show');

  const href = artist.strWebsite ? `http://${artist.strWebsite}` : '#';
  $AinfoLis[0].innerHTML = `<strong>Genre:</strong> ${artist.strGenre ? artist.strGenre : 'no info'}`;
  $AinfoLis[1].innerHTML = `<strong>Website:</strong> <a href="${href}" target="_blank">${artist.strWebsite ? artist.strWebsite : 'no info'}</a>`;

  $Abio.innerHTML = artist.strBiographyEN;

  showArtistImg(artist);
  showArtistSN(artist);
}

function showArtistImg(artist) {
  const img = document.createElement('img');
  while ($Aimg.firstChild) {
    $Aimg.removeChild($Aimg.firstChild);
  }
  img.src = artist.strArtistThumb;
  img.alt = `${artist.strArtist} is an ${artist.strGenre} from ${artist.strCountry}`;

  $Aimg.appendChild(img);
}

function showArtistSN(artist) {
  $AsocialLis[0].firstChild.href = artist.strFacebook ? `http://${artist.strFacebook}` : '#';
  $AsocialLis[1].firstChild.href = artist.strTwitter ? `http://${artist.strTwitter}` : '#';
}