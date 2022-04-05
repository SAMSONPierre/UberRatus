$(document).ready (function () {
	let ec = $("select[name=etatcivil]");
	let n = $("input[name=nom]");
	let p = $("input[name=prénom]");
	let nC = $("input[name=complet]");
	let niveau = $("input[name=niveau]");
	let lvl = $("output[name=lvl]");
	let check = $("input[name=affiche]");
    let cesar = $("input[name=cesar]");
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
    let entrees = document.getElementById("entrées");
    let sauce = $('<select name="sauce" id="sauce"><option value="Ketchup">Ketchup</option><option value="Mayo">Mayo</option></select>');
    cesar.change(function(){
        if(cesar.prop("checked")){
            
            entrees.append(sauce);
        }
        else{
            sauce.remove(entrees);
        }
    })

});