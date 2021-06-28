const $main = document.querySelector('main');

// Chequeo si el browser puede usar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
      .then(reg => {
        console.log("Service worker esta listo!");
      });
}
else {
  console.log("Service worker no soportado.");
}

// Event Listener para Offline/ Online Status
window.addEventListener('offline', event => {
  $main.classList.add('offline');
});

window.addEventListener('online', event => {
  $main.classList.remove('offline');
});

// A veces este evento falla, x ello se agrega method 2 a partir de linea 26
if (!navigator.onLine) {
  $main.classList.add('offline');
}

const isOnline = async () => {
  try {
    // El "cache no-store" es para que el fetch no guarde en cache el request
    // Si esto pasara, responderia el cache del browser y no el resultado de tener conexion
    const response = await fetch('https://code.jquery.com/jquery-3.6.0.slim.min.js', {cache: "no-store"});
    
    if (response.url == "https://find-artist-app.vercel.app/offline.html"){
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('offline and rejected', error)
    return false;
  }
}

isOnline().then(
  // Resolve, estamos online
  resp => {
    if (resp){
      // Creo un evento
      var evento = new CustomEvent("onInitOnline", {});

      // Lo Disparo!
      document.dispatchEvent(evento);
    } else {
      $main.classList.add('offline');
    }
  },
  // Reject, estamos offline
  ()=> {$main.classList.add('offline');}
);