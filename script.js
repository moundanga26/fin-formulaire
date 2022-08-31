var currentTab = 0; // L'onglet actuel est défini comme le premier onglet (0)
showTab(currentTab); // Afficher l'onglet en cours

function showTab(n) {
  // Cette fonction affichera l'onglet spécifié du formulaire ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... et corrigez les boutons Précédent/Suivant :
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... et exécutez une fonction qui affiche l'indicateur de pas correct:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // Cette fonction déterminera quel onglet afficher
  var x = document.getElementsByClassName("tab");
  // Quittez la fonction si un champ de l'onglet actuel n'est pas valide :
  if (n == 1 && !validateForm()) return false;
  // Masquez l'onglet actuel :
  x[currentTab].style.display = "none";
  // Augmenter ou diminuer l'onglet actuel de 1 :
  currentTab = currentTab + n;
  // si vous avez atteint la fin du formulaire... :
  if (currentTab >= x.length) {
    //...le formulaire est soumis:
    document.getElementById("regForm").submit();
    return false;
  }
  // Sinon, affichez le bon onglet :
  showTab(currentTab);
}

function validateForm() {
  // Cette fonction traite de la validation des champs du formulaire
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // Une boucle qui vérifie chaque champ de saisie dans l'onglet actuel :
  for (i = 0; i < y.length; i++) {
    // Si un champ est vide...
    if (y[i].value == "") {
      // ajoutez une classe "invalide" au champ :
      y[i].className += " invalid";
      // et définissez le statut valide actuel sur false :
      valid = false;
    }
  }
  // Si le statut valide est vrai, marquez l'étape comme terminée et valide :
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // retourner le statut valide
}

function fixStepIndicator(n) {
  // Cette fonction supprime la classe "active" de toutes les étapes...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... et ajoute la classe "active" à l'étape courante:
  x[n].className += " active";
}

/*-------------------------------------------------FIN DE LA MANIPULATION DU MULTISTEEP----------------------------------- *\
/*-------------------------------------------------DEBUT DE LA RECUPERATION DES DONNEES DU FORMULAIRE----------------------------------- */

/*-------Declaration du tableau de stokage des objets------- */
let eleves = [];

/*-------Declaration du tableau de stokage des objets------- */
window.addEventListener("load", () => {
  eleves = JSON.parse(localStorage.getItem("eleves")) || [];
  viewer();
});

/*-------Recuperation des donnees dans le localStorage a travers la methode 'getItem' parser ces donnees JSON en utilisent JSON.arse
puis stocker des donnees dans la variable stockEleve. ------- */
let Informstions = JSON.parse(localStorage.getItem("eleves"));

/*-------Declaration de la fonction viewer qui a l'interieur je vais ajouter la boucle for qui permetra 
a chaque fois que la variable index est strictement inferieure a 0 par rapport a la longueur totale de l'objet tableau------- */
function viewer() {
  for (let index = 0; index < Informstions.length; index++) {
    let table = document.getElementById("eleve");

    /*-------Ajout d'un tableau me permettent de toujours stocker les informations enregistré en amont dans le tableau "table"------- */
    table.innerHTML += `
    <tr>
       <td>${Informstions[index].nom}</td>
       <td>${Informstions[index].prenom}</td>
       <td>${Informstions[index].sexe}</td>
       <td>${Informstions[index].date}</td>
       <td>${Informstions[index].lieu}</td>
       <td>${Informstions[index].classe}</td>
       <td>${Informstions[index].nom_t}</td>
       <td>${Informstions[index].prenom_t}</td>
       <td>${Informstions[index].prefession}</td>
       <td>${Informstions[index].tel}</td>
       <td>${Informstions[index].email}</td>
    </tr>
       `;
  }
}

/*-------Declaration de la fonction 'recuperer' appelée en html du bouton (Valider) a travers la proprietee onClick------- */
function recuperer() {
  event.preventDefault();
  /*-------Recuperation de chaque valeur saisie dans des input en utlisant la propriete (document.getElementById)------- */
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let sexe = document.getElementById("sexe").value;
  let date = document.getElementById("date").value;
  let lieu = document.getElementById("lieu").value;
  let classe = document.getElementById("pet-select").value;

  let nom_t = document.getElementById("nom_t").value;
  let prenom_t = document.getElementById("prenom_t").value;
  let prefession = document.getElementById("prefession").value;
  let tel = document.getElementById("tel").value;
  let email = document.getElementById("email").value;

  /*-------Creation de l'objet eleve qui vas contenir les informatios recuperées plus haut------- */
  const eleve = {
    nom: nom,
    prenom: prenom,
    sexe: sexe,
    date: date,
    lieu: lieu,
    classe: classe,

    nom_t: nom_t,
    prenom_t: prenom_t,
    prefession: prefession,
    tel: tel,
    email: email,
  };

  /*-------Envois de l'objet eleve dans le tableau eleves creer plus haut------- */
  eleves.push(eleve);

  /*-------Stackage des informations dans le localStorage avec la methode setItem en meme temps transformer 
  les informations stockees dans le tableau eleves en string (chaine de carractere) avec la methode JSON.stringfy------- */
  localStorage.setItem("eleves", JSON.stringify(eleves));

  /*-------Recuperation du tableau créé en html et le stocker dans la variable (table) ------- */
  let table = document.getElementById("eleve");

  /*-------creation d'un tableau vide puis concatener les nouvelles valeurs saisis et les afficher dans le document 
  a travers la methode (.innerHTML)------- */
  table.innerHTML += `
  <tr>
    <td>${nom}</td>
    <td>${prenom}</td>
    <td>${sexe}</td>
    <td>${date}</td>
    <td>${lieu}</td>
    <td>${classe}</td>
    <td>${nom_t}</td>
    <td>${prenom_t}</td>
    <td>${prefession}</td>
    <td>${tel}</td>
    <td>${email}</td>
    </tr>`;
}

/*-------------------------------------------------DEBUT DE LA RECUPERATION DES DONNEES DU FORMULAIRE----------------------------------- */