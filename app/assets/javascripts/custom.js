var category, price, pockets, pocketShape, corners, exterior, interior, lining, stitching, edges, notebookStyle, sameAsInt, submit, canvas;

function declareVariables() {

	//Form Elements

	category = document.getElementById("custom_product_category");
	price = document.getElementById("custom_product_price");
	pockets = document.forms.custom_product.pockets; 
	pocketShape = document.forms.custom_product.pocket_shape;
	corners = document.forms.custom_product.corners;
	exterior = document.forms.custom_product.exterior_materials;
	interior = document.forms.custom_product.interior_materials;
	lining = document.forms.custom_product.lining;
	stitching = document.forms.custom_product.stitching;
	edges = document.forms.custom_product.edges;
	notebookStyle = document.forms.custom_product.notebook_style;
	//sameAsInt = document.forms.custom_product.same_as_interior;
	submit = document.forms.custom_product.commit;

	//Image Elements

	canvas = document.getElementById("custom_canvas");

}

function buildRequirements() {

	var billfoldReqs = [["pockets", pockets], ["pocket_shape", pocketShape], ["corners", corners], ["exterior_materials", exterior], ["interior_materials", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	var cardWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior_materials", exterior], ["interior_materials", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	var idWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior_materials", exterior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	var notebookReqs = [["corners", corners], ["exterior_materials", exterior], ["interior_materials", interior], ["lining", lining], ["stitching", stitching], ["edges", edges], ["notebook_style", notebookStyle]];	

}

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

	if(document.forms.custom_product["pockets"].value == "6") {

		toggleError("pocket_lb");
		toggleError("pocket_rb");

	}else {

		document.getElementById("pocket_lb").className = "hidden_field";
		document.getElementById("pocket_rb").className = "hidden_field";

	}
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

  	buildOptions(reqs);
  	setName();
  	setPrice();

  }
}

function buildOptions(reqs) { 

	var productOptions = document.getElementById("custom_product_options");

	for (var i = 0; i < reqs.length; i++) {

		productOptions.value = String(productOptions.value + reqs[i][0] + ": " + reqs[i][1].value+ "; "); 
	}
}

function setName() {

	var productName = document.getElementById("custom_product_name");
	productName.value = "Custom " + String(category.value);

}

function setPrice() {

	var productPrice = document.getElementById("custom_product_price");
	productPrice.value = 500;

}

function buildForm() {

	if(category.value == ""){

		document.getElementById("custom_options").className = "hidden_field";

	} else if(category.value == "Billfold"){

		// Show Fields 
		document.getElementById("custom_options").className = "required_section";
		document.getElementById("exterior_options").className = "required_section";
		document.getElementById("exterior_materials").className = "required_field";
		document.getElementById("corners").className = "required_field";
		document.getElementById("stitching").className = "required_field";
		document.getElementById("edges").className = "required_field";
		document.getElementById("interior_options").className = "required_section";
		document.getElementById("interior_materials").className = "required_field";
		document.getElementById("lining").className = "required_field";
		document.getElementById("pocket_options").className = "required_section";
		document.getElementById("pockets").className = "required_field";
		document.getElementById("pocket_shape").className = "required_field";
		document.getElementById("pockets_interior").className = "required_field";
		document.getElementById("misc").className = "required_section";
		document.getElementById("currency").className = "required_field";
		
		// Hide Fields 
		document.getElementById("notebook_style").className = "hidden_field";
		document.getElementById("pockets_same").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
		document.getElementById("separate_pockets").className = "hidden_field";

	} else if(category.value == "Card Wallet"){

		// Show Fields 
		document.getElementById("custom_options").className = "required_section";
		document.getElementById("exterior_options").className = "required_section";
		document.getElementById("exterior_materials").className = "required_field";
		document.getElementById("corners").className = "required_field";
		document.getElementById("stitching").className = "required_field";
		document.getElementById("edges").className = "required_field";
		document.getElementById("interior_options").className = "required_section";
		document.getElementById("interior_materials").className = "required_field";
		document.getElementById("lining").className = "required_field";
		document.getElementById("pocket_options").className = "required_section";
		document.getElementById("pocket_shape").className = "required_field";
		document.getElementById("pockets_interior").className = "required_field";
		
		// Hide Fields 
		document.getElementById("pockets").className = "hidden_field";
		document.getElementById("pockets_same").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("misc").className = "hidden_field";
		document.getElementById("currency").className = "hidden_field";
		document.getElementById("notebook_style").className = "hidden_field";

	} else if(category.value == "ID Wallet"){

		// Show Fields 
		document.getElementById("custom_options").className = "required_section";
		document.getElementById("exterior_options").className = "required_section";
		document.getElementById("exterior_materials").className = "required_field";
		document.getElementById("corners").className = "required_field";
		document.getElementById("stitching").className = "required_field";
		document.getElementById("edges").className = "required_field";
		document.getElementById("interior_options").className = "required_section";
		document.getElementById("lining").className = "required_field";
		document.getElementById("pocket_options").className = "required_section";
		document.getElementById("pocket_shape").className = "required_field";
		
		// Hide Fields 
		document.getElementById("interior_materials").className = "hidden_field";
		document.getElementById("pockets").className = "hidden_field";
		document.getElementById("pockets_interior").className = "hidden_field";
		document.getElementById("pockets_same").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("misc").className = "hidden_field";
		document.getElementById("currency").className = "hidden_field";
		document.getElementById("notebook_style").className = "hidden_field";

	}	else if(category.value == "Notebook"){

		// Show Fields 
		document.getElementById("custom_options").className = "required_section";
		document.getElementById("exterior_options").className = "required_section";
		document.getElementById("exterior_materials").className = "required_field";
		document.getElementById("corners").className = "required_field";
		document.getElementById("stitching").className = "required_field";
		document.getElementById("edges").className = "required_field";
		document.getElementById("interior_options").className = "required_section";
		document.getElementById("interior_materials").className = "required_field";
		document.getElementById("lining").className = "required_field";
		document.getElementById("misc").className = "required_section";
		document.getElementById("notebook_style").className = "required_field";
		
		// Hide Fields 
		document.getElementById("pocket_options").className = "hidden_field";
		document.getElementById("pocket_shape").className = "hidden_field";
		document.getElementById("pockets").className = "hidden_field";
		document.getElementById("pockets_interior").className = "hidden_field";
		document.getElementById("pockets_same").className = "hidden_field";
		document.getElementById("pocket_materials").className = "hidden_field";
		document.getElementById("separate_pockets").className = "hidden_field";
		document.getElementById("currency").className = "hidden_field";

	}
}

function setDefaultValues() {

	switch (category.value) {

		case "Billfold":
			corners.value = "rounded";
			pockets.value = "4";
			pocketShape.value = "straight";
			break;
		case "Card Wallet":
			corners.value = "rounded";
			pockets.value = "6";
			pocketShape.value = "straight";
			break;
		case "ID Wallet":
			corners.value = "rounded";
			pocketShape.value = "notched";
			break;
		case "Notebook":
			corners.value = "rounded";
			notebookStyle.value = "ruled";
			break;
	}
}

function buildImage() {

	$('#new_custom_product input[type="radio"]:checked').each(function(k,v) {

			console.log(k + ": " + v.value)
	});
}


function maintenance() {

	// Check Same As Interior Status
	sameAsInterior();

	// Check All Pockets Same Status
	checkAllPockets();

	// Check How Many Pockets
	checkPockets();

	// Build Product Image
	buildImage;

}

$(document).ready(function(){

	// Hide Full Form
	document.getElementById("custom_options").className = "hidden_field";
	
	// Capture Form Elements
	declareVariables();

	// Watch Category
	category.onchange = function() {
		
		// Reset Form
		var style = category.value;
		document.forms.new_custom_product.reset();
		category.value = style;
		$("div").removeClass("error_highlight");
		buildForm();
		setDefaultValues();
	
	};

	// Watch Input	
	$("input").on("change", maintenance);
	$("input").on("change", removeHighlight);

	// Watch Submit
	submit.onclick = function() {

		return validateForm();

	};
});