$(document).ready (function () {
	let ec = $("select[name=etatcivil]");
	let n = $("input[name=nom]");
	let p = $("input[name=prénom]");
	let nC = $("input[name=complet]");
	let niveau = $("input[name=niveau]");
	let lvl = $("output[name=lvl]");
	let check = $("input[name=affiche]");
	let total = 0;
	ec.change(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	n.keyup(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	p.keyup(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	niveau.mousemove(function(){
		lvl.val(niveau.val());
	});

	check.change(function(){
		if(check.prop("checked")){
			$("input[name=mdp]").attr('type','text');
			$("input[name=mdp2]").attr('type','text');
		}
		else{
			$("input[name=mdp]").attr('type','password');
			$("input[name=mdp2]").attr('type','password');
		}
	});
	function sauce(nom_plat,sauceListe){
		let entrees = document.getElementById("div_"+nom_plat);
		let cesar = $("input[name="+nom_plat+"]");
		let sauce = document.createElement("select");
		sauce.id = "mySauce";
		for(var i = 0;i< sauceListe.length;i++){
			var option = document.createElement("option");
			option.value = sauceListe[i];
			option.text = sauceListe[i];
			sauce.appendChild(option);
		}
		
		cesar.change(function(){
			if(cesar.prop("checked")){
				
				entrees.append(sauce);
				update_price(true,nom_plat);
			}
			else{
				sauce.remove();
				update_price(false,nom_plat);
			}
		})
	}

	function update_price(flag,nom_plat){
		let price = document.getElementById("price_"+nom_plat);
		if(flag){
			total += parseInt(price.textContent);
		}
		else{
			total -= parseInt(price.textContent);
		}
		let prix = document.getElementById("prix_total");
		prix.textContent = "Total : " + total + " $."
	}
	var sauceListe = ["Ketchup","Mayo","Huile d'olive","Vinaigrette"];
	sauce("cesar",["Huile d'olive","Vinaigrette"]);
	sauce("wings",["Ketchup","Mayo"]);
	sauce("charcut",["Moutarde Forte","Moutarde Douce"]);
	
	
    

});