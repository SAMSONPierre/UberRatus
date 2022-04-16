$(document).ready (function () {
	let total = 0;
	const tool = require('./Tool');

	document.querySelectorAll('.pizza').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		tool.pizzas(id);
	});

	document.querySelectorAll('.boisson').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		tool.boisson(id);
	});

	document.querySelectorAll('.entree').forEach(function(elem) {
		let id = elem.id;
		id = id.replace("div_","");
		tool.entrees(id);
	});
	
	
/*
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


	function update_price(flag,nom_plat,quantity){
		let price = document.getElementById("price_"+nom_plat);
		if(flag){
			total += quantity * parseInt(price.textContent);
		}
		else{
			total -= quantity * parseInt(price.textContent);
		}
		let prix = document.getElementById("prix_total");
		prix.textContent = "Total : " + total + " $."
	}

	let ingredients = ["Thon","Anchois","Jambon","Pepperoni","Boeuf",
		"Mozzarella","Bleu d'Auvergne","Emmental","Chèvre",
	"Artichaut","Aubergine","Olive","Poivron"];
	composition("ingredient1",ingredients);
	composition("ingredient2",ingredients);
	composition("ingredient3",ingredients);
	composition("supplement1",ingredients);
	composition("supplement2",ingredients);
	composition("supplement3",ingredients);

	boisson("coca");
	boisson("fanta");
	boisson("oasis");


	
	*/
    

});