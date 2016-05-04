var category, price, pockets, pocketShape, corners, exterior, interior, lining, stitching, edges, notebookStyle, sameAsInt, allPockets, submit, billfoldReqs, cardWalletReqs, idWalletReqs, notebookReqs, canvas;

function declareVariables() {

	//Form Elements

	category = document.getElementById("custom_product_category");
	price = document.getElementById("custom_product_price");
	pockets = document.forms.custom_product.pockets; 
	pocketShape = document.forms.custom_product.pocket_shape;
	corners = document.forms.custom_product.corners;
	exterior = document.forms.custom_product.exterior;
	interior = document.forms.custom_product.interior;
	lining = document.forms.custom_product.lining;
	stitching = document.forms.custom_product.stitching;
	edges = document.forms.custom_product.edges;
	notebookStyle = document.forms.custom_product.notebook_style;
	sameAsInt = document.forms.custom_product.same_as_interior;
	allPockets = document.forms.custom_product.pockets_all_same;
	submit = document.forms.custom_product.commit;

	//Style Requirements

	billfoldReqs = [["pockets", pockets], ["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	cardWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	idWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	notebookReqs = [["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges], ["notebook_style", notebookStyle]];	

	//Image Elements

	canvas = document.getElementById("custom_canvas");

}

function removeHighlight() {
	if (this.value != "" && this.parentNode.className == "error_highlight") {

		$(this.parentNode).removeClass("error_highlight");

	}
}

function checkAllPockets() {

	if (allPockets.checked) {

		document.getElementById("separate_pockets").style.display = "none";

	} else {

		document.getElementById("separate_pockets").style.display = "block";

	}
}

function validateForm() {

	var reqs;
  var missingReqs = new Array();

	switch (category.value) {

		case "Billfold":
			reqs = billfoldReqs;
			break;
		case "Card Wallet":
			reqs = cardWalletReqs;
			break;
		case "ID Wallet":
			reqs = idWalletReqs;
			break;
		case "Notebook":
			reqs = notebookReqs;
			break;
	}

  for (var i = 0; i < reqs.length; i++) {

    if(reqs[i][1].value == "") {
        
      missingReqs.push(reqs[i][1]);
      document.getElementById(reqs[i][0]).className = "error_highlight";

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

		document.getElementById("custom_options").style.display = "none";

	} else if(category.value == "Billfold"){

		document.getElementById("custom_options").style.display = "block";
		document.getElementById("pockets").style.display = "block";
		document.getElementById("pocket_shape").style.display = "block";
		document.getElementById("interior").style.display = "block";
		document.getElementById("currency").style.display = "block";
		document.getElementById("notebook_style").style.display = "none";
		document.getElementById("separate_pockets").style.display = "none";

	} else if(category.value == "Card Wallet"){

		document.getElementById("custom_options").style.display = "block";
		document.getElementById("pockets").style.display = "none";
		document.getElementById("pocket_shape").style.display = "block";
		document.getElementById("interior").style.display = "block";
		document.getElementById("misc").style.display = "none";
		document.getElementById("separate_pockets").style.display = "none";

	} else if(category.value == "ID Wallet"){

		document.getElementById("custom_options").style.display = "block";
		document.getElementById("pockets").style.display = "none";
		document.getElementById("pocket_shape").style.display = "block";
		document.getElementById("interior").style.display = "none";
		document.getElementById("misc").style.display = "none";
		document.getElementById("separate_pockets").style.display = "none";

	}	else if(category.value == "Notebook"){

		document.getElementById("custom_options").style.display = "block";
		document.getElementById("pockets").style.display = "none";
		document.getElementById("pocket_shape").style.display = "none";
		document.getElementById("interior").style.display = "block";
		document.getElementById("misc").style.display = "block";
		document.getElementById("notebook_style").style.display = "block";
		document.getElementById("pocket_options").style.display = "none";
		document.getElementById("currency").style.display = "none";

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

$(document).ready(function(){

	// Hide Full Form
	document.getElementById("custom_options").style.display = "none";
	
	// Capture Form Elements
	declareVariables();

	// Watch Category
	category.onchange = function() {
		
		var style = category.value;
		document.getElementById("new_custom_product").reset();
		$("div").removeClass("error_highlight");
		category.value = style;
		buildForm();
		setDefaultValues();
	
	};

	// Watch Input	
	$("input").on("change", removeHighlight);
	$("input").on("change", buildImage);

	//Watch Pockets all same
	allPockets.onchange = function() {

		checkAllPockets();

	};


	// Watch Submit
	submit.onclick = function() {

		return validateForm();

	};

});