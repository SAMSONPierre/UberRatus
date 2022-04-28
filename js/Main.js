$(document).ready (function () {
	let total = 0;
	let cpt = 0;

	$(document).on('click','.button_panier',function(){
		let b = this.parentNode;
		const nom_plat = b.innerHTML.split(' ')[0];
		b.parentNode.removeChild(b);
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
	
	function boisson(nom_plat){
		let boisson = $("input[name="+nom_plat+"]");
		boisson.click(function(){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			new_element.textContent = nom_plat + " " + getVolume(nom_plat) + "cL " + getPrice(nom_plat) + "$";
			new_element.className = "panier";

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			panier.append(new_element);
			update_price(true,nom_plat);

			button.on("click",function(){
				alert(button.value);
			});
		});	
	}
	
	function entrees(nom_plat){
		let entree = $("input[name="+nom_plat+"]");
		entree.click(function(){
			let panier = document.getElementById("panier");
			let new_element = document.createElement("li");
			new_element.textContent = nom_plat + " " + getSauce(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.className = "panier";

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

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
			new_element.textContent = nom_plat + " " + getTaille(nom_plat) + " " + getPrice(nom_plat) + "$";
			new_element.className = "panier";

			let button = document.createElement("input");
			button.type = "button";
			button.className = "button_panier";
			button.value = "Supprimer du panier";
			new_element.append(button);

			panier.append(new_element);
			update_price(true,nom_plat);

			button.on("click",function(){
				alert(button.value);
			});
		});
	}

	function pizzaComp(){
		let pizzaComp = document.getElementById("div_pizzaComp");
		let button = $("input[name=pizzaComp]");
		button.change(function(){
			if(button.prop("checked")){
				document.getElementById("ingr_pizzaComp").hidden = true;
			}
			else{
				document.getElementById("ingr_pizzaComp").hidden = false;

			}
		});
	}
	function composition(nom_plat,sauceListe){
		let plat = document.getElementById("div_"+nom_plat);
		let cesar = $("input[name="+nom_plat+"]");
		let sauce = document.createElement("select");
		sauce.id = nom_plat+"_mySauce";
		for(var i = 0;i< sauceListe.length;i++){
			var option = document.createElement("option");
			option.value = sauceListe[i];
			option.text = sauceListe[i];
			sauce.appendChild(option);
		}

		cesar.change(function(){
			if(cesar.prop("checked")){
				plat.append(sauce);
				update_price(true,nom_plat);
			}
			else{
				sauce.remove();
				update_price(false,nom_plat);
			}
		})
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
		return taille.value;
	}

	function getVolume(nom_plat){
		let volume = document.getElementById("vol_"+nom_plat);
		return volume.value;
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