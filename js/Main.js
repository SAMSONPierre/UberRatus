$(document).ready (function () {
	let total = 0;
	let cpt = 0;
	let price_base = [];

	price_base["custom"] = getPrice("custom");
	for(var i =0;i<3;i++){
		var id = "supplement_list"+i;
		$(document).on('change','#'+id,function(){
			let res = 0;
			for(var j=0;j<3;j++){
				var idj = "supplement_list"+j;
				res += parseInt(document.getElementById(idj).value[0]);
			}
			update_price_elem("custom",res);
			
	   });
	}
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
		price_base[id] = getPrice(id);
		$(document).on('change','#size_'+id,function(){
			var elem = document.getElementById("size_"+id);
			var x = parseInt(elem.value[0])
			update_price_elem(id,x);
		});

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
	pizzaComp("custom");
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
		});
	}

	function pizzaComp(nom_plat){
		let comp = $("input[name="+nom_plat+"]");
		comp.click(function (){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			let ingredient0 = getIngredient(0);
			let ingredient1 = getIngredient(1);
			let ingredient2 = getIngredient(2);
			let supplement0 = getSupplement(0);
			let supplement1 = getSupplement(1);
			let supplement2 = getSupplement(2);
			let list= ingredient0+" "+ingredient1 +" "+ingredient2 + " " + supplement0 + " " + supplement1 + " " + supplement2;
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = "panier";
			input.value = "custom" + "  " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
			new_element.textContent = "custom " + getTaille(nom_plat) + " " +list+" "+ getPrice(nom_plat) + "$";
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

			$(document).on('change','#size_'+nom_plat,function(){
				var elem = document.getElementById("size_"+nom_plat);
				var x = parseInt(elem.value[0])
				update_price_elem(nom_plat,x);
			});
		});
	}

	function update_price_elem(nom_plat,x){
		let price = document.getElementById("price_"+nom_plat);
		let new_price = price_base[nom_plat] + x;
		price.innerHTML = new_price + "$";
	}
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