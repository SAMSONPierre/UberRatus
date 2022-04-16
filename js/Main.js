$(document).ready (function () {
	let total = 0;


	document.querySelectorAll('.pizza').forEach(function(elem) {
		var id = elem.id;
		id = id.replace("div_","");
		pizzas(id);
	});

	document.querySelectorAll('.boisson').forEach(function(elem) {
		var id = elem.id;
		id = id.replace("div_","");
		boisson(id);
	});

	document.querySelectorAll('.entree').forEach(function(elem) {
		var id = elem.id;
		id = id.replace("div_","");
		entrees(id);
	});
	
	

	function boisson(nom){
		let boisson = document.getElementById("div_"+nom);
		let b = $("input[name="+nom+"]");

		b.change(function(){
			if(b.prop("checked")){
				document.getElementById("quant_"+nom).hidden = false;
				update_price(true,nom,1);
			}
			else{
				document.getElementById("quant_"+nom).hidden = true;
				update_price(false,nom,1);
			}
		});

		
	}
	function entrees(nom_plat){
		let entrees = document.getElementById("div_"+nom_plat);
		let cesar = $("input[name="+nom_plat+"]");

		
		cesar.change(function(){
			if(cesar.prop("checked")){
				
				document.getElementById("sauce_"+nom_plat).hidden = false;
				document.getElementById("quant_"+nom_plat).hidden = false;
				update_price(true,nom_plat,1);
			}
			else{
				document.getElementById("sauce_"+nom_plat).hidden = true;
				document.getElementById("quant_"+nom_plat).hidden = true;
				update_price(false,nom_plat,1);
			}
		})
	}
	function pizzas(nom_plat){
		let entrees = document.getElementById("div_"+nom_plat);
		let cesar = $("input[name="+nom_plat+"]");
		let sauce = document.createElement("select");
		sauce.id = nom_plat+"_mySauce";
		for(var i = 0;i< sauceListe.length;i++){
			var option = document.createElement("option");
			option.value = sauceListe[i];
			option.text = sauceListe[i];
			sauce.appendChild(option);
		}
		let quantité = document.createElement("input");
		quantité.setAttribute("type","number");
		quantité.className = "quantité"
		quantité.value = 1;
		quantité.min = 1;

		
		cesar.change(function(){
			if(cesar.prop("checked")){
				
				document.getElementById("size_"+nom_plat).hidden = false;
				document.getElementById("quant_"+nom_plat).hidden = false;
				update_price(true,nom_plat,1);
			}
			else{
				document.getElementById("size_"+nom_plat).hidden = true;
				document.getElementById("quant_"+nom_plat).hidden = true;
				update_price(false,nom_plat,1);
			}
		})
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
				update_price(true,nom_plat,1);
			}
			else{
				sauce.remove();
				update_price(false,nom_plat,1);
			}
		})
	}


	function update_price(flag,nom_plat,quantité){
		let price = document.getElementById("price_"+nom_plat);
		if(flag){
			total += quantité * parseInt(price.textContent);
		}
		else{
			total -= quantité * parseInt(price.textContent);
		}
		let prix = document.getElementById("prix_total");
		prix.textContent = "Total : " + total + " $."
	}

	let ingredients = ["Thon","Anchois","Jambon","Pepperoni","Boeuf",
		"Mozzarella","Bleu d'Auvergne","Emmental","Chèvre",
	"Artichaut","Aubergine","Olive","Poivron"];
	sauce("cesar",["Huile d'olive","Vinaigrette"]);
	sauce("wings",["Ketchup","Mayo"]);
	sauce("charcut",["Moutarde Forte","Moutarde Douce"]);
	sauce("margherita",["MEDIUM","LARGE","EXTRA LARGE"]);
	sauce("calzone",["MEDIUM","LARGE","EXTRA LARGE"]);
	sauce("napolitaine",["MEDIUM","LARGE","EXTRA LARGE"]);
	composition("ingredient1",ingredients);
	composition("ingredient2",ingredients);
	composition("ingredient3",ingredients);
	composition("supplement1",ingredients);
	composition("supplement2",ingredients);
	composition("supplement3",ingredients);

	boisson("coca");
	boisson("fanta");
	boisson("oasis");


	
	
    

});