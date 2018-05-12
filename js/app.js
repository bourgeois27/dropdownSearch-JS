const villes = ['Acton Val','Alma','Amos','Amqui','Asbestos','Baie-Comeau','Baie-d\'Urfé','Baie-Saint-Paul','Barkmere','Beaconsfield','Beauceville','Beauharnois','Beaupré','Bécancour','Bedford','Belleterre','Beloeil','Berthierville','Blainville','Bois-des-Filion','Boisbriand','Bonaventure','Boucherville','Lac-Brome','Bromont','Brossard','Brownsburg-Chatham','Cabano','Candiac','Cap-Chat','Cap-Santé','Carignan','Carleton-sur-Mer','Causapscal','Chambly','Chandler','Chapais','Charlemagne','Châteauguay','Château-Richer','Chibougamau','Clermont','Coaticook','Contrecoeur','Cookshire-Eaton','Côte-Saint-Luc','Coteau-du-Lac','Cowansville','Danville','Daveluyville','Dégelis','Delson','Desbiens','Deux-Montagnes','Disraeli','Dolbeau-Mistassini','Dollard-des-Ormeaux','Donnacona','Dorval','Drummondville','Dunham','Duparquet','East Angu','Estérel','Farnham','Fermont','Forestville','Fossambault-sur-le-Lac','Gaspé','Gatineau','Gracefield','Granby','Grande-Rivière','Hampstead','Hudson','Huntingdon','L\'Île-Cadieux','L\'Île-Dorval','L\'Île-Perrot','Joliette','Kingsey','Kirkland','Lac-Delage','Lac-Mégantic','Lac-Saint-Joseph','Lac-Sergent','Lachute','L\'Ancienne-Lorette','L\'Assomption','L\'Épiphanie','La Malbai','La Pocatièr','La Prairi','La Sarr','La Tuqu','Laval','Lavaltrie','Lebel-sur-Quévillon','Léry','Lévis','L\'Île-Perrot','Longueuil','Lorraine','Louiseville','Macamic','Magog','Malartic','Maniwaki','Marieville','Mascouche','Matagami','Matane','Mercier','Métabetchouan–Lac-à-la-Croix','Métis-sur-Mer','Mirabel','Mont-Joli','Mont-Laurier','Mont-Saint-Hilaire','Mont-Tremblant','Montmagny','Montréal','Montréal-Est','Montréal-Ouest','Mont-Royal','Murdochville','Neuville','New Richmon','Nicolet','Normandin','Notre-Dame-de-l\'Île-Perrot','Notre-Dame-des-Prairies','Notre-Dame-du-Lac','Otterburn Par','Paspébiac','Percé','Pincourt','Plessisville','La Pocatièr','Pohénégamook','Pointe-Claire','Pont-Rouge','Port-Cartier','Portneuf','La Prairi','Princeville','Prévost','Québec','Repentigny','Richelieu','Richmond','Rimouski','Rivière-du-Loup','Rivière-Rouge','Roberval','Rosemère','Rouyn-Noranda','Saguenay','Sainte-Adèle','Sainte-Agathe-des-Monts','Sainte-Anne-de-Beaupré','Sainte-Anne-de-Bellevue','Sainte-Anne-des-Monts','Sainte-Anne-des-Plaines','Saint-Augustin-de-Desmaures','Saint-Basile','Saint-Basile-le-Grand','Saint-Bruno-de-Montarville','Sainte-Catherine','Sainte-Catherine-de-la-Jacques-Cartier','Saint-Césaire','Saint-Constant','Saint-Eustache','Saint-Félicien','Saint-Gabriel','Saint-Georges','Saint-Hyacinthe','Saint-Jean-sur-Richelieu','Saint-Jérôme','Saint-Joseph-de-Beauce','Saint-Joseph-de-Sorel','Sainte-Julie','Saint-Lambert','Saint-Lazare','Saint-Lin-Laurentides','Saint-Marc-des-Carrières','Sainte-Marguerite-du-Lac-Masson','Sainte-Marie','Sainte-Marthe-sur-le-Lac','Saint-Ours','Saint-Pamphile','Saint-Pascal','Saint-Pie','Saint-Raymond','Saint-Rémi','Saint-Sauveur','Sainte-Thérèse','Saint-Tite','Salaberry-de-Valleyfield','La Sarr','Schefferville','Scotstown','Senneterre','Sept-Îles','Shawinigan','Sherbrooke','Sorel-Tracy','Stanstead','Sutton','Témiscaming','Terrebonne','Thetford Mine','Thurso','Trois-Pistoles','Trois-Rivières','La Tuqu','Val-d\'Or','Valcourt','Varennes','Vaudreuil-Dorion','Victoriaville','Ville-Marie','Warwick','Waterloo','Waterville','Westmount','Windsor'];

let dialog = document.querySelector('div .dialog');

let inputTextBox = document.getElementById('textInput');

inputTextBox.addEventListener('keyup', townFilter);
inputTextBox.addEventListener('keyup', showClearButton);
inputTextBox.addEventListener('keyup', toggleDisplayIfEmpty);

function toggleDisplayIfEmpty() {
  dialog.style.display = (inputTextBox.value.length) ? 'block' : 'none';
}

function townFilter() {
  let villesValides = new Array();
  for(let i = 0; i < villes.length; i++) {
    if(villes[i].toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
      villesValides.push(String(villes[i]));
    }
  }
  let nombreOptionsValides = getNombreOptionsValides(villesValides);
  hasValidOptions(nombreOptionsValides, villesValides);
}

function showClearButton() {
  let clearButton = document.getElementById('close');
  clearButton.style.visibility = (inputTextBox.value.length) ? 'visible' : 'hidden';
  clearButton.onclick = function() {
    this.style.visibility = 'hidden';
    dialog.style.display = 'none';
    inputTextBox.value = '';
  };
}

function getNombreOptionsValides(villesValides) {
  return villesValides.length;
}

// Pas très belle fonction... moyen de la retravailler !
function hasValidOptions(nombreOptionsValides, villesValides) {
  dialog.innerHTML = '';
  dialog.style.display = 'none';
  if(nombreOptionsValides == 0) {
    dialog.style.display = 'block';
    dialog.innerHTML = '<div class="alert">Aucune ville correspondante!</div>';
  } 
  else {
    for(let i = 0; i < villesValides.length; i++) {
      dialog.innerHTML += '<div class="elem">' + villesValides[i] + '</div>';
      var suggestionsInputsValides = document.querySelectorAll('.dialog div');
      for(let i = 0; i < suggestionsInputsValides.length; i++) {
        suggestionsInputsValides[i].addEventListener('click', selectItem);
      }
    }
    dialog.style.display = 'block';
  }
}

function getInputText() {
  let villeChoisie = inputTextBox.value;
  console.log(villeChoisie);
}

function selectItem() {
  inputTextBox.value = String(this.textContent);
  dialog.style.display = 'none';
}