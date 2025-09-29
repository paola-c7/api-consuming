let albumGlobali = [];

async function caricaAlbum() {
  try {
    const risposta = await fetch('https://jsonplaceholder.typicode.com/albums');
    const dati = await risposta.json();
    albumGlobali = dati;
    mostraAlbum(albumGlobali);
  } catch (errore) {
    console.error('Errore nel recupero degli album:', errore);
  }
}

function mostraAlbum(album) {
  const contenitore = document.getElementById('album-container');
  contenitore.innerHTML = '';
  album.forEach(a => {
    const div = document.createElement('div');
    div.className = 'album';
    div.textContent = `ID ${a.id}`;
    div.addEventListener('click', () => apriModale(a));
    contenitore.appendChild(div);
  });
}

function apriModale(album) {
  document.getElementById('titolo-modale').textContent = album.title;
  document.getElementById('id-album').textContent = album.id;
  document.getElementById('id-utente').textContent = album.userId;
  document.getElementById('modale').style.display = 'flex';
}

function chiudiModale() {
  document.getElementById('modale').style.display = 'none';
}

async function aggiungiAlbum() {
  const titolo = document.getElementById('titolo-nuovo').value;
  const utente = document.getElementById('utente-nuovo').value;

  if (!titolo || !utente) {
    alert('Inserisci titolo e ID utente!');
    return;
  }

  try {
    const risposta = await fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({
        title: titolo,
        userId: utente,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const nuovo = await risposta.json();
    albumGlobali.push(nuovo);
    mostraAlbum(albumGlobali);
    alert('Album aggiunto con successo!');
    apriModale(nuovo);
    document.getElementById('titolo-nuovo').value = '';
    document.getElementById('utente-nuovo').value = '';
  } catch (errore) {
    console.error("Errore nell'aggiunta dell'album:", errore);
  }
}

async function aggiornaAlbum() {
  const id = document.getElementById('update-id').value;
  const title = document.getElementById('update-title').value;
  const userId = document.getElementById('update-userId').value;

  if (!id || !title || !userId) {
    alert("Compila tutti i campi richiesti per aggiornare!");
    return;
  }

  try {
    const risposta = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: id, title: title, userId: userId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    const aggiornato = await risposta.json();

    // aggiorno la lista locale
    albumGlobali = albumGlobali.map(a => a.id == id ? aggiornato : a);
    mostraAlbum(albumGlobali);

    console.log("Album aggiornato:", aggiornato);
    alert(`Album con ID ${id} aggiornato con successo!`);
  } catch (errore) {
    console.error("Errore aggiornamento:", errore);
    alert("Errore durante l'aggiornamento!");
  }
}

async function cancellaAlbum() {
  const id = document.getElementById('delete-id').value;

  if (!id) {
    alert("Inserisci un ID da cancellare!");
    return;
  }

  try {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    });
    console.log(`Album con ID ${id} cancellato`);

    // aggiorno lista locale
    albumGlobali = albumGlobali.filter(a => a.id != id);
    mostraAlbum(albumGlobali);

    alert(`Album con ID ${id} cancellato con successo!`);
  } catch (errore) {
    console.error("Errore cancellazione:", errore);
    alert("Errore durante la cancellazione!");
  }
}

caricaAlbum();
