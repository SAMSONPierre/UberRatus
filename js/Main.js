$(document).ready (function () {
	let total = 0;
	let cpt = 0;

	function getNbElements(){
		return $("#panier li").length;
	}
	$(document).on('click','.button_panier',function(){
		let b = this.parentNode;
		const nom_plat = b.innerHTML.split(' ')[0];
		b.parentNode.removeChild(b);
		if(getNbElements() == 0){
			var valider = document.getElementById("submit");
			valider.disabled = true;
		}
		update_price(false,nom_plat);
	});

	document.querySelectorAll('.pizza').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		pizzas(id);

	});

	document.querySelectorAll('.boisson').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		boisson(id);
	});

	document.querySelectorAll('.entree').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		entrees(id);
	});
	document.querySelectorAll('.custom').forEach(function (elem){
		let id = elem.id;
		id = id.replace("custom","");
		pizzaComp(id);
	});
	
	function boisson(nom_plat){
		let boisson = $("input[name="+nom_plat+"]");
		boisson.click(function(){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			input.value = "boisson" + " " + nom_plat + " " + getVolume(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.textContent = nom_plat + " " + getVolume(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.name = "panier";

			new_element.append(input);

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			let valider = document.getElementById("submit");
			valider.disabled = false;

			panier.append(new_element);
			update_price(true,nom_plat);
			getNbElements();
		});	
	}
	
	function entrees(nom_plat){
		let entree = $("input[name="+nom_plat+"]");
		entree.click(function(){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			input.value = "entree" + " " + nom_plat + " " + getSauce(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.textContent = nom_plat + " " + getSauce(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.name = "panier";

			new_element.append(input);

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			let valider = document.getElementById("submit");
			valider.disabled = false;

			panier.append(new_element);
			update_price(true,nom_plat);

			button.on("click",function(){
				alert(button.value);
			});
		});
	}
	function pizzas(nom_plat){
		let pizza = $("input[name="+nom_plat+"]");
		pizza.click(function(){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");

			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			input.value = "pizza" + " " + nom_plat + " " + getTaille(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.textContent = nom_plat + " " + getTaille(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.name = "panier";

			new_element.append(input);

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			let valider = document.getElementById("submit");
			valider.disabled = false;

			panier.append(new_element);
			update_price(true,nom_plat);

			button.on("click",function(){
				alert(button.value);
			});
		});
	}
	//TODO afficher le prix de base est seulement les trois premiers ingredient
	//puis bouton + pour rajouter supplément max 6
	function pizzaComp(nom_plat){
		let comp = $("input[name="+nom_plat+"]");
		comp.click(function (){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			let ingredient0 = getIngredient(0);
			let ingredient1 = getIngredient(2);
			let ingredient2 = getIngredient(2);
			let list= ingredient0+" "+ingredient1 +" "+ingredient2;
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			input.value = "compo" + "  " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
			new_element.textContent = "compo " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
			new_element.name = "panier";

			new_element.append(input);

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			let valider = document.getElementById("submit");
			valider.disabled = false;

			panier.append(new_element);
			update_price(true,nom_plat);

			button.on("click",function(){
				alert(button.value);
			});
		});
	}
	function getPrice(nom_plat){
		let price = document.getElementById("price_"+nom_plat);
		return parseInt(price.textContent);
	}
	function getNomComplet(nom_plat){
		let nomComplet = document.getElementById("nom_"+nom_plat);
		return nomComplet.textContent;
	}
	function getSauce(nom_plat){
		let sauce = document.getElementById("sauce_"+nom_plat);
		return sauce.value;
	}

	function getTaille(nom_plat){
		let taille = document.getElementById("size_"+nom_plat);
		return taille.value;
	}
	function getIngredient(numero){
		let compo = document.getElementById("ingredient_list"+numero);
		return compo.value;
	}

	function getSupplement(numero){
		let supp = document.getElementById("supplement_list"+numero);
	}

	function getVolume(nom_plat){
		let volume = document.getElementById("vol_"+nom_plat);
		return volume.textContent;
	}


	function update_price(flag,nom_plat){
		let price = getPrice(nom_plat);
		if(flag){
			total +=  price;
		}
		else{
			total -=  price;
		}
		let prix = document.getElementById("prix_total");
		prix.textContent = "Total : " + total + " $."
	}
});