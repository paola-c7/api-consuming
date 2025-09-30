function mostraMessaggio(testo, tipo = "successo") {
  const div = document.getElementById("messaggio");
  div.textContent = testo;
  div.className = `messaggio ${tipo}`;
  setTimeout(() => {
    div.textContent = "";
    div.className = "messaggio";
  }, 3000);
}

async function aggiungiAlbum() {
  const titolo = document.getElementById("titolo-nuovo").value;
  const utente = document.getElementById("utente-nuovo").value;

  if (!titolo || !utente) {
    mostraMessaggio("Inserisci titolo e ID utente!", "errore");
    return;
  }

  try {
    await fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({ title: titolo, userId: utente }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    mostraMessaggio("Album aggiunto con successo!");
    document.getElementById("titolo-nuovo").value = "";
    document.getElementById("utente-nuovo").value = "";
  } catch (errore) {
    mostraMessaggio("Errore nell'aggiunta dell'album!", "errore");
    console.error(errore);
  }
}

async function aggiornaAlbum() {
  const id = document.getElementById("update-id").value;
  const title = document.getElementById("update-title").value;
  const userId = document.getElementById("update-userId").value;

  if (!id || !title || !userId) {
    mostraMessaggio("Compila tutti i campi richiesti per aggiornare!", "errore");
    return;
  }

  try {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id: id, title: title, userId: userId }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    mostraMessaggio(`Album con ID ${id} aggiornato con successo!`);
  } catch (errore) {
    mostraMessaggio("Errore durante l'aggiornamento!", "errore");
    console.error(errore);
  }
}

async function cancellaAlbum() {
  const id = document.getElementById("delete-id").value;

  if (!id) {
    mostraMessaggio("Inserisci un ID da cancellare!", "errore");
    return;
  }

  try {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    });

    mostraMessaggio(`Album con ID ${id} cancellato con successo!`);
    document.getElementById("delete-id").value = "";
  } catch (errore) {
    mostraMessaggio("Errore durante la cancellazione!", "errore");
    console.error(errore);
  }
}
