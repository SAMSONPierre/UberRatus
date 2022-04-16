function Tool(){

    this.boisson= function (nom){
        let drink = document.getElementById("div_"+nom);
        let b = $("input[name="+nom+"]");

        b.change(function(){
            if(b.prop("checked")){
                document.getElementById("quant_"+nom).hidden = false;
                this.update_price(true,nom,1);
            }
            else{
                document.getElementById("quant_"+nom).hidden = true;
                this.update_price(false,nom,1);
            }
        });
    }

    this.entrees= function (nom_plat){
        let entrees = document.getElementById("div_"+nom_plat);
        let box = $("input[name="+nom_plat+"]");

        box.change(function(){
            if(box.prop("checked")){

                document.getElementById("sauce_"+nom_plat).hidden = false;
                document.getElementById("quant_"+nom_plat).hidden = false;
                this.update_price(true,nom_plat,1);
            }
            else{
                document.getElementById("sauce_"+nom_plat).hidden = true;
                document.getElementById("quant_"+nom_plat).hidden = true;
                this.update_price(false,nom_plat,1);
            }
        })
    }

    this.pizzas= function (nom_plat){
        let plat = document.getElementById("div_"+nom_plat);
        let box = $("input[name="+nom_plat+"]");
        let sauce = document.createElement("select");
        sauce.id = nom_plat+"_mySauce";
        for(let i = 0; i< sauceListe.length; i++){
            const option = document.createElement("option");
            option.value = sauceListe[i];
            option.text = sauceListe[i];
            sauce.appendChild(option);
        }
        let quantity = document.createElement("input");
        quantity.setAttribute("type","number");
        quantity.className = "quantité"
        quantity.value = 1;
        quantity.min = 1;


        box.change(function(){
            if(box.prop("checked")){

                document.getElementById("size_"+nom_plat).hidden = false;
                document.getElementById("quant_"+nom_plat).hidden = false;
                this.update_price(true,nom_plat,1);
            }
            else{
                document.getElementById("size_"+nom_plat).hidden = true;
                document.getElementById("quant_"+nom_plat).hidden = true;
                this.update_price(false,nom_plat,1);
            }
        })
    }

    this.update_price = function (flag,nom_plat,quantity){
        let price = document.getElementById("price_"+nom_plat);
        let total=0;
        if (flag) {
            total += quantity * parseInt(price.textContent);
        } else {
            total -= quantity * parseInt(price.textContent);
        }
        let prix = document.getElementById("prix_total");
        prix.textContent = "Total : " + total + " $."

    }
}

module.exports = new Tool();