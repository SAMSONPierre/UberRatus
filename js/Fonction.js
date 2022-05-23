$(document).ready (function () {
	let total = 0;
	let price_base = [];
	let price_supplement = [];
	let price_taille= 0;

	/* 
		Pour gérer le changement de suppléments et le changement du prix
	*/
	price_base["custom"] = getPrice("custom");
	for(var i =0;i<3;i++){
		var id = "supplement_list"+i;
		$(document).on('change','#'+id,function(){
			let res = 0;
			for(var j=0;j<3;j++){
				var idj = "supplement_list"+j;
				let x =  parseInt(document.getElementById(idj).value[0]);
				price_supplement[i] = x;
				res += x;
			}
			update_price_elem_custom(res+price_taille);
			
	   });
	}

	/* 
		Suppression d'un article du panier 
	*/
	$(document).on('click','.button_panier',function(){
		let b = this.parentNode;
		let nom_plat = b.innerHTML.split(' ')[0];
		if(nom_plat === "menu") nom_plat = b.innerHTML.split(' ')[1];
		
		b.parentNode.removeChild(b);
		/* On peut pas passer à la page d'après si le panier est vide */
		if(getNbElements() == 0){
			var valider = document.getElementById("submit");
			valider.disabled = true;
		}
		update_price(false,nom_plat);
	});


	$(document).on('change','#size_custom',function(){
		var elem = document.getElementById("size_custom");
		var x = parseInt(elem.value[0]);
		price_taille = x;
		let res = 0;
		for(var j=0;j<3;j++){
			var idj = "supplement_list"+j;
			let x2 =  parseInt(document.getElementById(idj).value[0]);
			price_supplement[i] = x2;
			res += x2;
		}
		update_price_elem_custom(price_taille+res);
	});
	
	
	/*
		Pour ajouter les éléments au panier
	*/
	document.querySelectorAll('.boisson').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		addPanier(id,"boisson");
	});

	document.querySelectorAll('.entree').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		addPanier(id,"entree");
	});

	document.querySelectorAll('.menu').forEach(function(elem){
		let id = elem.id;
		id = id.replace("div_","");
		addPanier(id,"menu");
	});

	document.querySelectorAll('.pizza').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		addPanier(id,"pizza");
		price_base[id] = getPrice(id);
		$(document).on('change','#size_'+id,function(){
			var elem = document.getElementById("size_"+id);
			var x = parseInt(elem.value[0])
			update_price_elem(id,x);
		});

	});

	addPanier("custom","custom");
	
	/** 
	* @param nom_plat est le nom du plat et type est le type de plat {boisson,entree,pizza,menu,custom}
	* @return permet d'ajouter au panier chaque élément du site
	*/
	function addPanier(nom_plat,type){
		let boisson = $("input[name="+nom_plat+"]");
		/* Si on clique sur le bouton Ajouter au panier du plat */
		boisson.click(function(){
			/* Création d'un élément */
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			switch(type){
				case "boisson":
					input.value = "boisson" + " " + nom_plat + " " + 
					getVolume(nom_plat) + " " + getPrice(nom_plat) + "$";
				
					new_element.textContent = nom_plat + " " + getVolume(nom_plat)
					 + " " + getPrice(nom_plat) + "$";
					break;
				case "entree":
					input.value = "entree" + " " + nom_plat + " " + 
				getSauce(nom_plat) + " " + getPrice(nom_plat) + "$";
				
				new_element.textContent = nom_plat + " " + getSauce(nom_plat)
				 + " " + getPrice(nom_plat) + "$";
					break;
				case "menu":
					let list=getMenu(nom_plat);
					input.value = "menu " + nom_plat + " " +list + getPrice(nom_plat) + "$";
					new_element.textContent = "menu " + nom_plat + " " +list+" "+ getPrice(nom_plat) + "$";
					break;
				case "pizza":
					input.value = "pizza" + " " + nom_plat + " " + 
					getTaille(nom_plat) + " " + getPrice(nom_plat) + "$";
				
					new_element.textContent = nom_plat + " " + 
					getTaille(nom_plat) + " " + getPrice(nom_plat) + "$";
					break;
				case "custom":
					list = getIngredientsAndSupplements();
					input.value = "custom" + "  " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
					new_element.textContent = "custom " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
					break;
			}	
			new_element.name = "panier";

			new_element.append(input);

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			let valider = document.getElementById("submit");
			valider.disabled = false;
			/* Ajout au panier de l'élément */
			panier.append(new_element);
			/* On met à jour le prix total */
			update_price(true,nom_plat);
		});	
	}

	/** 
	* @param nom_plat est le nom du plat et x le montant à rajouter au prix
	* @return permet de mettre à jour le prix des pizzas dynamiquement sur la page selon la taille
	*/
	function update_price_elem(nom_plat,x){
		let price = document.getElementById("price_"+nom_plat);
		let new_price = price_base[nom_plat] + x;
		price.innerHTML = new_price + "$";
	}
	/** 
	* @param flag est si il faut ajouter ou retire au prix et nom_plat est le nom du plat et x le montant à rajouter au prix
	* @return permet de mettre à jour le total du panier
	*/
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
	
	/** 
	* Fonction unique à custom puisque que la gestion du prix est un peu différente.
	* @param x est le prix à ajouter
	* @return permet de mettre à jour le prix de la pizza custom en prenant en compte les suppléments et la taille.
	*/
	function update_price_elem_custom(x){
		let price = document.getElementById("price_custom");
		let new_price = price_base["custom"] + x;
		price.innerHTML = new_price + "$";
	}

	/*
		GETTERS
	*/
	function getPrice(nom_plat){
		let price = document.getElementById("price_"+nom_plat);
		return parseInt(price.textContent);
	}

	function getSauce(nom_plat){
		let sauce = document.getElementById("sauce_"+nom_plat);
		return sauce.value;
	}

	function getTaille(nom_plat){
		let taille = document.getElementById("size_"+nom_plat);
		let taille_split = taille.value.split(" ");
		return taille_split[1];
	}
	function getIngredient(numero){
		let compo = document.getElementById("ingredient_list"+numero);
		return compo.value;
	}

	function getSupplement(numero){
		let supp = document.getElementById("supplement_list"+numero);
		let res = supp.value.split(" ")
		return res[1];
	}

	function getIngredientsAndSupplements(){
		let list = "";
		for(var i=0;i<3;i++){
			list += getIngredient(i) + " ";
		}
		for(var i=0;i<2;i++){
			list += getSupplement(i) + " ";
		}
		return list + getSupplement(2);
	}

	function getVolume(nom_plat){
		let volume = document.getElementById("vol_"+nom_plat);
		return volume.textContent;
	}

	function getNbElements(){
		return $("#panier li").length;
	}

	function getMenu(nom_menu){
		let menu = "";
		document.querySelectorAll(".entree_"+nom_menu).forEach(function(elem){
			menu += elem.value + " ";
		});
		document.querySelectorAll(".pizza_"+nom_menu).forEach(function(elem){
			menu += elem.value + " ";
		});
		document.querySelectorAll(".boisson_"+nom_menu).forEach(function(elem){
			menu += elem.value + " ";
		});
		return menu;
	}
});