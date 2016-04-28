$(document).ready(function(){

	document.getElementById("custom_options").style.display = "none";
	document.getElementById("lining").style.display = "none";

	
	// Capture Form Elements
	declareGlobalVariables();

	// Build Form
	buildForm();

});

function declareGlobalVariables() {

	category = document.getElementById("custom_product_category");
	price = document.getElementById("custom_product_price");
	pockets = document.forms.custom_product.pockets; 
	pocketShape = document.forms.custom_product.pocket_shape;
	corners = document.forms.custom_product.corners;
	lined = document.forms.custom_product.lined;
	exterior = document.forms.custom_product.exterior;
	interior = document.forms.custom_product.interior;
	lining = document.forms.custom_product.lining;
	stitching = document.forms.custom_product.stitching;
	edges = document.forms.custom_product.edges;
	notebookStyle = document.forms.custom_product.notebook_style;

}

function buildForm() {
	
	category.onchange = function() {
		if(category.value == ""){

			document.getElementById("custom_options").style.display = "none";

		} else if(category.value == "Billfold"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "block";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			category.value = "Billfold";

		} else if(category.value == "Card Wallet"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			category.value = "Card Wallet";

		} else if(category.value == "ID Wallet"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "none";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			category.value = "ID Wallet";


		}	else if(category.value == "Notebook"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "none";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "block";
			document.getElementById("new_custom_product").reset();
			category.value = "Notebook";

		}
	}

	lined.onchange = function() {

		if(lined.checked){

			document.getElementById("lining").style.display = "block";

		} else {

			document.getElementById("lining").style.display = "none";

		}
	}

}