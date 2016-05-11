function removeHighlight() {

	if (this.value != "" && this.parentNode.className == "error_highlight") {
		$(this.parentNode).removeClass("error_highlight");
		$(this.parentNode).addClass("required_field");
	}
}

function sameAsInterior() {

	if (document.forms.custom_product["pockets_interior"].checked) {
		document.getElementById("pockets_same").className = "hidden_field";
		document.forms.custom_product["pockets_same"].checked = "checked";
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
	} else {
		document.getElementById("pockets_same").className = "required_field";
		document.getElementById("pocket_materials").className = "required_field";
	}
}

function toggleError(divId) {

	document.getElementById(divId).className == "error_highlight" ? document.getElementById(divId).className = "error_highlight" : document.getElementById(divId).className = "required_field";

}

function checkAllPockets() {

	if (document.forms.custom_product["pockets_same"].checked) {
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("pocket_r1").className = "hidden_field";
		document.getElementById("pocket_r2").className = "hidden_field";
		document.getElementById("pocket_l1").className = "hidden_field";
		document.getElementById("pocket_l2").className = "hidden_field";
	} else {
		document.getElementById("separate_pockets").className = "required_section";
		document.getElementById("pocket_materials").className = "hidden_field";
		toggleError("pocket_r1");
		toggleError("pocket_r2");
		toggleError("pocket_l1");
		toggleError("pocket_l2");
	}
}

function checkPockets() {

	if(document.forms.custom_product["pockets"].value == "6" && !document.forms.custom_product["pockets_same"].checked) {
		toggleError("pocket_lb");
		toggleError("pocket_rb");
	}else {
		document.getElementById("pocket_lb").className = "hidden_field";
		document.getElementById("pocket_rb").className = "hidden_field";
	}
}

function buildOptions(reqs) { 

	var productOptions = document.getElementById("custom_product_options");
	for (var i = 0; i < reqs.length; i++) {
		productOptions.value = String(productOptions.value + String(reqs[i]) + ": " + document.forms.custom_product[reqs[i]].value + "; "); 
	}
}

function setName() {

	var productName = document.getElementById("custom_product_name");
	productName.value = "Custom " + document.getElementById("custom_product_category").value;

}

function setPrice() {

	var productPrice = document.getElementById("custom_product_price");
	switch(document.getElementById("custom_product_category").value){
		case "Billfold":
			productPrice.value = 200;
			document.forms.custom_product["pockets"].value == "6" ? productPrice.value = Number(productPrice.value) + 50 : productPrice.value;
			document.forms.custom_product["currency"].value != "US Dollars" ? productPrice.value = Number(	productPrice.value) + 20 : productPrice.value;
			!document.forms.custom_product["pockets_interior"].checked ? productPrice.value = Number(	productPrice.value) + 20 : productPrice.value;

			break;
		case "Card Wallet":
			productPrice.value = 150;
			break;
		case "ID Wallet":
			productPrice.value = 80;
			break;
		case "Notebook":
			productPrice.value = 120;
			break;
	}


	document.getElementById("product_price").innerHTML = "$" + String(productPrice.value);

}

function validateForm() {

	var reqs = new Array();
	$("#new_custom_product .required_field, .error_highlight").each(function() {
		reqs.push(this.id)
	});

  var missingReqs = new Array();

  for (var i = 0; i < reqs.length; i++) {
    if(document.forms.custom_product[reqs[i]].value == "" && document.forms.custom_product[reqs[i]].type != "checkbox") {
      missingReqs.push(reqs[i]);
      document.getElementById(reqs[i]).className = "error_highlight";
    }
  }
    
  if(missingReqs.length != 0) {
    return false;  
  } else {
  	setPrice();
  	setName();
  	buildOptions(reqs);
  }
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

	// Build Product Image
	buildImage();
}

// Initial Form Building Functions

function buildForm() {

	switch (document.getElementById("custom_product_category").value) {
		case "":
			document.getElementById("custom_options").className = "hidden_field";
			return;
			break;
		case "Billfold":
			var requiredSections = ["custom_options", "exterior_options", "interior_options", "pocket_options", "misc"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "interior_materials", "lining", "pockets", "pocket_shape", "pockets_interior", "currency"];
			var hiddenFields = ["pockets_same", "pocket_materials", "separate_pockets", "notebook_style"];
			break;
		case "Card Wallet":
			var requiredSections = ["custom_options", "exterior_options", "interior_options", "pocket_options"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "interior_materials", "lining", "pocket_shape", "pockets_interior"];
			var hiddenFields = ["pockets", "pockets_same", "pocket_materials", "separate_pockets", "misc",  "currency", "notebook_style"];
			break;
		case "ID Wallet":
			var requiredSections = ["custom_options", "exterior_options", "interior_options", "pocket_options"];
			var requiredFields = ["exterior_materials", "corners", "stitching", "edges", "lining", "pocket_shape"];
			var hiddenFields = ["interior_materials", "pockets", "pockets_interior", "pockets_same", "pocket_materials", "separate_pockets", "misc",  "currency", "notebook_style"];
			break;
		case "Notebook":
			var requiredSections = ["custom_options", "exterior_options", "interior_options", "misc"];
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

	switch (document.getElementById("custom_product_category").value) {
		case "Billfold":
			document.forms.custom_product.corners.value = "rounded";
			document.forms.custom_product.pockets.value = "4";
			document.forms.custom_product.pocket_shape.value = "straight";
			break;
		case "Card Wallet":
			document.forms.custom_product.corners.value = "rounded";
			document.forms.custom_product.pockets.value = "6";
			document.forms.custom_product.pocket_shape.value = "straight";
			break;
		case "ID Wallet":
			document.forms.custom_product.corners.value = "rounded";
			document.forms.custom_product.pocket_shape.value = "notched";
			break;
		case "Notebook":
			document.forms.custom_product.corners.value = "rounded";
			document.forms.custom_product.notebook_style.value = "ruled";
			break;
	}

	$('#exterior_options .required_field').each(function() {
		if (document.forms.custom_product[this.id].value != "") {
			console.log(this.id);
		}
	});
}

// Image Building Functions

function createImage(src) {

	var img = document.createElement('img');
	img.src = src;
	img.width = "500";
	img.height = "500";
	return img;

}

function createPath(element) {

	var source = "/assets/custom_products/" + String(document.forms.custom_product.view.value) + "/" + String(document.getElementById("custom_product_category").value).toLowerCase() + "/"; 
	if (element == "corners") {

		source += (String(document.forms.custom_product.corners.value) + ".png");

	} else {

		source += (String(document.forms.custom_product.corners.value) + "/" + String(element) + "/" + String(document.forms.custom_product[element].value) + ".png");
	}
	return source;
}

function processId(element) {
 var id = String(element) + "_view";
 if (document.getElementById(id) != null) {
 	document.getElementById(id).remove();
 }
 return id
}


function layerImage(element) {
	var path = createPath(element);
	var img = createImage(path);
	img.id = processId(element);
	document.getElementById("product_view").appendChild(img);
}


function buildImage() {

	if(document.forms.custom_product.view.value == "exterior") { 
		$('#exterior_options .required_field').each(function() {
			if (document.forms.custom_product[this.id].value != "") {
				layerImage(this.id);
			}
		});
	} else {
		$('#interior_options .required_field').each(function() {
			if (document.forms.custom_product[this.id].value != "") {
				layerImage(this.id);
			}
		});
	}
}

// Kick Things Off

$(document).ready(function(){

	// Hide Full Form
	document.getElementById("custom_options").className = "hidden_field";
	
	// Watch Category
	document.getElementById("custom_product_category").onchange = function() {
		
		// Reset Form
		var style = document.getElementById("custom_product_category").value;
		document.forms.new_custom_product.reset();
		document.getElementById("custom_product_category").value = style;
		$("div").removeClass("error_highlight");
		buildForm();
		setDefaultValues();
		maintenance();
	};

	// Watch Input	
	document.forms.custom_product.onchange = function () {

		maintenance();

	}
	//$("input").on("change", maintenance);
	$("input").on("change", removeHighlight);

	// Watch Submit
	document.forms.custom_product.commit.onclick = function() {
		return validateForm();
	};
});