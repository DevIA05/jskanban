// Code pour ouvrir le modal lorsque le bouton est cliqué
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// Code pour fermer le modal lorsque l'utilisateur clique sur le bouton de fermeture
span.onclick = function() {
  modal.style.display = "none";
}

// Code pour fermer le modal lorsque l'utilisateur clique en dehors du modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
