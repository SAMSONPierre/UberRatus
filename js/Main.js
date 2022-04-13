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

	function myFunction(){
		alert("test");
	}
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
	function sauce(nom_plat){
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
	sauce("cesar");
	sauce("wings");
	sauce("charcut");
	pizzas("margherita");
	pizzas("calzone");
	pizzas("napolitaine");
	boisson("coca");
	boisson("fanta");
	boisson("oasis");


	
	
    

});