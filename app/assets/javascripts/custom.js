function setPocketsToInterior() {  
  var allPockets = ["pocket_r1", "pocket_r2", "pocket_l1", "pocket_l2", "pocket_l3", "pocket_r3", "pocket_materials"];
  
  for (var i = 0; i < allPockets.length; i++) {         
    document.forms.custom_product[allPockets[i]].value = document.forms.custom_product.interior_materials.value;
  }
}

function setPocketsToPocketMaterials() {  
  var allPockets = ["pocket_r1", "pocket_r2", "pocket_l1", "pocket_l2", "pocket_l3", "pocket_r3"];
  
  for (var i = 0; i < allPockets.length; i++) {         
    document.forms.custom_product[allPockets[i]].value = document.forms.custom_product.pocket_materials.value;
  }
}

function sameAsInterior() {

	if (document.forms.custom_product["pockets_interior"].checked) {
		document.getElementById("pockets_same").className = "hidden_field";
		document.forms.custom_product["pockets_same"].checked = false;
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
		setPocketsToInterior();
	} else {
		if (document.getElementById("custom_product_category").value == "ID Wallet") {
			document.getElementById("pocket_materials").className = "required_field";
		}
		else {
			document.getElementById("pockets_same").className = "required_field";
			document.getElementById("pocket_materials").className = "required_field";
		}
	}
}

function checkAllPockets() {

	var allPockets = ["pocket_r1", "pocket_r2", "pocket_l1", "pocket_l2"];

	if (!document.forms.custom_product["pockets_same"].checked) {
		document.getElementById("separate_pockets").className = "hidden_field";
		for (var i = 0; i < allPockets.length; i++) {
			document.getElementById(allPockets[i]).className = "hidden_field";
		}
		setPocketsToPocketMaterials();

	} else {
		document.getElementById("separate_pockets").className = "required_section";
		document.getElementById("pocket_materials").className = "hidden_field";
		
		for (var i = 0; i < allPockets.length; i++) {
			document.getElementById(allPockets[i]).className = "required_field";
		};
	}
}

function checkPockets() {

	if(document.forms.custom_product["pockets"].value == "6") {
		document.getElementById("pocket_l3").className = "required_field";
		document.getElementById("pocket_r3").className = "required_field";
		document.getElementById("pocket_l3_image").style = "display: block;";
		document.getElementById("pocket_r3_image").style = "display: block;";
	}else {
		document.getElementById("pocket_l3").className = "hidden_field";
		document.getElementById("pocket_r3").className = "hidden_field";
		document.getElementById("pocket_l3_image").style = "display: none;";
		document.getElementById("pocket_r3_image").style = "display: none;";
	}
}

function buildOptions(reqs) { 

	var productOptions = document.getElementById("custom_product_options");
	productOptions.value = "";
	for (var i = 0; i < reqs.length; i++) {
		if (String(reqs[i]) == "pockets_interior" || String(reqs[i]) == "pockets_same"){
			document.forms.custom_product[reqs[i]].checked == true ? productOptions.value = String(productOptions.value + String(reqs[i]) + ": true; ") : productOptions.value = String(productOptions.value + String(reqs[i]) + ": false; ");
		}else {
			productOptions.value = String(productOptions.value + String(reqs[i]) + ": " + document.forms.custom_product[reqs[i]].value + "; ");
		}
	}
}

function upCharge(){

	var re1 = /Cordovan/;
	var re2 = /Shark/;
	var charge = 0;
	re1.test(document.forms.custom_product["exterior_materials"].value) ? charge = 100 : charge;
	re2.test(document.forms.custom_product["exterior_materials"].value) ? charge = 50 : charge;
	return charge;

}

function setPrice() {

	var productPrice = document.getElementById("custom_product_price");
	switch(document.getElementById("custom_product_category").value){
		case "Billfold":
			productPrice.value = 200;
			document.forms.custom_product["pockets"].value == "6" ? productPrice.value = Number(productPrice.value) + 30 : productPrice.value;
			document.forms.custom_product["currency"].value != "US Dollars" ? productPrice.value = Number(productPrice.value) + 20 : productPrice.value;
			!document.forms.custom_product["pockets_interior"].checked ? productPrice.value = Number(	productPrice.value) + 20 : productPrice.value;
			productPrice.value = Number(productPrice.value) + upCharge();
			break;
		case "Card Wallet":
			productPrice.value = 150;
			!document.forms.custom_product["pockets_interior"].checked ? productPrice.value = Number(productPrice.value) + 20 : productPrice.value;
			productPrice.value = Number(productPrice.value) + upCharge();
			break;
		case "ID Wallet":
			productPrice.value = 80;
			!document.forms.custom_product["pockets_interior"].checked ? productPrice.value = Number(	productPrice.value) + 15 : productPrice.value;
			productPrice.value = Number(productPrice.value) + upCharge();
			break;
		case "Notebook":
			productPrice.value = 120;
			productPrice.value = Number(productPrice.value) + upCharge() * 1.5;
			break;
	}

	document.getElementById("product_price").innerHTML = "$" + String(productPrice.value);
}


function showOption(el) {

	$("span").each(function(){
		innerHTML = String(el.value);
	});

}

function setLabels() {
	$("span").each(function(){
		if (this.id != "currency_notice") {
			this.innerHTML = String(document.forms.custom_product[this.parentNode.id].value);
		}
	});
}

function markSwatches(){

	$('.required_field').each(function(){

		$( this ).children( 'label' ).removeClass("selected");

		var forText = (this.id + "_" + document.forms.custom_product[this.id].value.replace(/ /g,"_"));

		$('label[for="'+forText+'"]').addClass( "selected" ); 

	})
}

function setImgURL(){

	var canvas = document.getElementById("product_view");
	var imgurl = document.getElementById("custom_product_imgurl");
	imgurl.value = canvas.toDataURL();
}

function validateForm(){

	var reqs = new Array();
	if(window.location.href.includes("edit")){
		$(".edit_custom_product .required_field").each(function() {
			reqs.push(this.id)
		});
	}else{	
		$("#new_custom_product .required_field").each(function() {
			reqs.push(this.id)
		});
	}

	setPrice();
	buildOptions(reqs);
	drawCanvas(document.getElementById("custom_product_category").value);
	setImgURL();

}

function maintenance() {

	// Check Same As Interior Status
	sameAsInterior();

	// Check All Pockets Same Status
	checkAllPockets();

	// Check How Many Pockets
	checkPockets();

	// Set Price
	setPrice();

	// Set Labels
	setLabels();

	// Mark Selected Swatches
	markSwatches();

	// Build Product Image
	buildImage(document.getElementById("custom_product_category").value);
}


// Initial Form Building Functions

function buildForm() {

	switch (document.getElementById("custom_product_category").value) {
		case "Billfold":
			var requiredSections = ["exterior_options", "interior_options", "pocket_options", "misc"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "interior_materials", "lining", "pockets", "pocket_shape", "pockets_interior", "currency"];
			var hiddenFields = ["pockets_same", "pocket_materials", "separate_pockets", "notebook_style"];
			break;
		case "Card Wallet":
			var requiredSections = ["exterior_options", "interior_options", "pocket_options"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "interior_materials", "lining", "pocket_shape", "pockets_interior"];
			var hiddenFields = ["pockets", "pockets_same", "pocket_materials", "separate_pockets", "misc",  "currency", "notebook_style"];
			break;
		case "ID Wallet":
			var requiredSections = ["exterior_options", "interior_options", "pocket_options"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "lining", "pocket_shape", "pockets_interior"];
			var hiddenFields = ["interior_materials", "pockets", "pockets_same", "pocket_materials", "separate_pockets", "misc",  "currency", "notebook_style"];
			break;
		case "Notebook":
			var requiredSections = ["exterior_options", "interior_options", "misc"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "interior_materials", "lining", "notebook_style"];
			var hiddenFields = ["pocket_options", "pockets", "pocket_shape", "pockets_interior", "pockets_same", "pocket_materials", "separate_pockets", "currency"];
			break;
		}

	for (var i = 0; i < requiredSections.length; i++) {
  	document.getElementById(requiredSections[i]).className = "required_section";
	}

	for (var i = 0; i < requiredFields.length; i++) {
  	document.getElementById(requiredFields[i]).className = "required_field";
	}

	for (var i = 0; i < hiddenFields.length; i++) {
  	document.getElementById(hiddenFields[i]).className = "hidden_field";
	}
}

function setDefaultValues() {

	if(window.location.href.includes("edit")){
		var options = document.getElementById("options_array").value;
		var options_array = [];
		options = options.split("; ")
		for (var i = 0; i < options.length; i++) {
			options_array.push(options[i].split(": "))
		}
		for (var i = 0; i < options_array.length; i++) {
			if (options_array[i][0] == "pockets_interior" || options_array[i][0] == "pockets_same"){
				options_array[i][1] == "true" ? document.forms.custom_product[options_array[i][0]].checked = true : document.forms.custom_product[options_array[i][0]].checked = false;
			}else{
				document.forms.custom_product[options_array[i][0]].value = options_array[i][1];
			}
		}

	}else {
		switch (document.getElementById("custom_product_category").value) {
			case "Billfold":
				document.forms.custom_product.exterior_materials.value = "Black Chromexcel Horsehide";
				document.forms.custom_product.corners.value = "rounded";
				document.forms.custom_product.stitching.value = "White Linen";
				document.forms.custom_product.edges.value = "Ebony";
				document.forms.custom_product.interior_materials.value = "Black Chromexcel";
				document.forms.custom_product["pockets_interior"].checked = true;
				document.forms.custom_product.lining.value = "Black Chromexcel";
				document.forms.custom_product["pockets_same"].checked = false;
				document.forms.custom_product.pockets.value = "6";
				document.forms.custom_product.pocket_shape.value = "straight";
				var allPockets = ["pocket_r1", "pocket_r2", "pocket_l1", "pocket_l2", "pocket_l3", "pocket_r3", "pocket_materials"];
				for (var i = 0; i < allPockets.length; i++) {

					document.forms.custom_product[allPockets[i]].value = "Black Chromexcel";
				}

				break;
			case "Card Wallet":
				document.forms.custom_product.exterior_materials.value = "Black Chromexcel";
				document.forms.custom_product.corners.value = "rounded";
				document.forms.custom_product.stitching.value = "Black Linen";
				document.forms.custom_product.edges.value = "Ebony";
				document.forms.custom_product.interior_materials.value = "Black Chromexcel";
				document.forms.custom_product["pockets_interior"].checked = true;
				document.forms.custom_product.lining.value = "Black Chromexcel";
				document.forms.custom_product["pockets_same"].checked = false;
				document.forms.custom_product.pockets.value = "6";
				document.forms.custom_product.pocket_shape.value = "straight";
				var allPockets = ["pocket_r1", "pocket_r2", "pocket_l1", "pocket_l2", "pocket_l3", "pocket_r3", "pocket_materials"];
				for (var i = 0; i < allPockets.length; i++) {

					document.forms.custom_product[allPockets[i]].value = "Black Chromexcel";
				}
				break;
			case "ID Wallet":
				document.forms.custom_product.exterior_materials.value = "Black Chromexcel";
				document.forms.custom_product["pockets_interior"].checked = true;
				document.forms.custom_product.corners.value = "rounded";
				document.forms.custom_product.stitching.value = "Black Linen";
				document.forms.custom_product.edges.value = "Ebony";
				document.forms.custom_product.lining.value = "Black Chromexcel";
				document.forms.custom_product.pocket_shape.value = "notched";
				document.forms.custom_product.pocket_materials.value = "Black Chromexcel";
				break;
			case "Notebook":
				document.forms.custom_product.exterior_materials.value = "Black Chromexcel";
				document.forms.custom_product.corners.value = "rounded";
				document.forms.custom_product.stitching.value = "Black Linen";
				document.forms.custom_product.edges.value = "Ebony";
				document.forms.custom_product.interior_materials.value = "Black Chromexcel";
				document.forms.custom_product.lining.value = "Black Chromexcel";
				document.forms.custom_product.notebook_style.value = "ruled";
				break;
		}
	}
}

// Image Building Functions

function categoryRequirements(category){

	var reqs;

	switch (category){
		case "Billfold":
		reqs  =	[	[	["lining", "corners"],
							["interior_materials"],
							["lining", "corners"], 
							["pocket_r3"], 
							["pocket_r2"], 
							["pocket_r1", "corners"], 
							["exterior_materials", "corners"], 
							["edges", "corners"], 
							["stitching", "corners"] 
						],
						[ ["lining", "corners"],
							["interior_materials"],
							["pocket_l3", "pocket_shape"],
							["pocket_r3", "pocket_shape"],
							["pocket_l2", "pocket_shape"],
							["pocket_r2", "pocket_shape"],
							["pocket_l1", "corners", "pocket_shape"],
							["pocket_r1", "corners", "pocket_shape"],  
							["stitching", "corners", "pockets"] 
						]
					];
		break;
	}
	return reqs;
}

function buildPath(element, modifiers){

	modifiers = modifiers || [];
  var urlString = "";
  urlString = "/assets/custom_products/" + document.forms.custom_product["custom_product_category"].value + "/" + String(document.forms.custom_product.view.value) + "/" + element + "/"

  for (var i = 0; i < modifiers.length; i++) {         
    urlString = urlString + document.forms.custom_product[modifiers[i]].value + "/";
  }

  urlString = (urlString + document.forms.custom_product[element].value + ".png").toLowerCase().replace(/ /g,"_");
  console.log(urlString);
  return urlString;
}

function setImage(src, element) {

	var img = document.getElementById(String(element + "_image"));
	img.src = src;
	return img
}


function buildImage(category){

	var viewValue;
	var images = [];
	var elements = [];
	document.forms.custom_product.view.value == "exterior" ? viewValue = 0 : viewValue = 1;

	switch (category){
		case "Billfold":
			$.each(categoryRequirements(category)[viewValue], function(index,value){
				if((value[0] == "pocket_l3" || value[0] == "pocket_r3") && document.forms.custom_product["pockets"].value != "6"){
					return true; 
				}else{
					var element = value[0];
					value.shift();    
	     		setImage(buildPath(element, value), element);
	      }
	    });
	  break;
	}
}

function resetImage(){
	$(".product_image").each(function(){
		$(this).attr("src", "");
	});
}


function drawCanvas(category){

	var canvas = document.getElementById("product_view");
	var context = canvas.getContext("2d");
	if(document.getElementById("view_interior").checked){
		document.getElementById("view_exterior").checked = "checked"
		resetImage();
		buildImage(document.getElementById("custom_product_category").value);
	};
	var imageArray = categoryRequirements(category)[0]; //change to [0] on deployment
  	switch (category){
		case "Billfold":
			$.each(imageArray, function(index,value){
				if((value[0] == "pocket_l3" || value[0] == "pocket_r3") && document.forms.custom_product["pockets"].value != "6"){
					return true; 
				}else{
					var element = value[0];
					value.shift();    		
			  	context.drawImage(document.getElementById(String(element + "_image")),0,0);
	      }
	    });
	  break;
	}
}


// Kick Things Off
$(document).ready(function(){

	// Hide JS Notice
	document.getElementById("js_notice").className = "hidden_field";

	// Show Page Content
	document.getElementById("custom_product_content").style.display = "block";
	
	// Hide Inputs
	$("input[type=radio]").addClass("radio_swatch");
	$("#corners,#pockets,#pocket_shape,#notebook_style,#view_choice").children("input[type=radio]").removeClass("radio_swatch");

		buildForm();
		setDefaultValues();
		maintenance();

	// Watch Input	
	document.forms.custom_product.onchange = function() {
		maintenance();
	}

	// Watch View Choice
 	$("input[type=radio][name='view']").on("change", function(){
 		resetImage();	
	});

	// Currency Notice
	document.forms.custom_product["currency"].onchange = function() {
		document.forms.custom_product["currency"].value != "US Dollars" ? document.getElementById("currency_notice").style.display = "block" : document.getElementById("currency_notice").style.display = "none";
	}

	// Swatch Hover
	$('[class^=label_swatch]').on("mouseenter", function(){
		var span = this.parentNode.getElementsByTagName("span")[0];
		span.innerHTML = String($(this).attr("alt"));
	});
	$('[class^=label_swatch]').on("mouseleave", setLabels);

	// Radio Hover
	$("input[type=radio]:not(#view_choice input)").on("mouseenter", function(){
		var span = this.parentNode.getElementsByTagName("span")[0];
		span.innerHTML = String(this.value);
	});
	$("input[type=radio]:not(#view_choice input)").on("mouseleave", setLabels);

	// Watch Submit
	document.forms.custom_product.commit.onclick = function() {
		return validateForm();
		//return false;
	};

	// Stay Out of My Code!
	// $(document).bind("contextmenu",function(e) {
 // 		e.preventDefault();
	// });

	// $(document).keydown(function(e){
 //    if(e.which === 123){
 //       return false;
 //    }
	// });
});