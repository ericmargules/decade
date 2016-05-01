var category, price, pockets, pocketShape, corners, exterior, interior, lining, stitching, edges, notebookStyle, submit, billfoldReqs, cardWalletReqs, idWalletReqs, notebookReqs, inputs;

function removeHighlight(){
	if (this.value != "" && this.parentNode.className == "error_highlight") {

		$(this.parentNode).removeClass("error_highlight");

	}
}

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
	submit = document.forms.custom_product.commit;
	inputs = [price, pockets, pocketShape, corners, exterior, interior, lining, stitching, edges, notebookStyle, submit, billfoldReqs, cardWalletReqs, idWalletReqs, notebookReqs];

	//Style Requirements

	billfoldReqs = [["pockets", pockets], ["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	cardWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	idWalletReqs = [["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	notebookReqs = [["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges], ["notebook_style", notebookStyle]];	

}

function validateForm(reqs) {

  var missingReqs = new Array();
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

  }
}

function buildOptions(reqs) { 

	var productOptions = document.getElementById("custom_product_options");

	for (var i = 0; i < reqs.length; i++) {

		productOptions.value = String(productOptions.value + reqs[i][0] + ": " + reqs[i][1].value+ "; "); 
	}
}

function buildForm() {
	
	category.onchange = function() {

		if(category.value == ""){

			document.getElementById("custom_options").style.display = "none";
			$("div").removeClass("error_highlight");

		} else if(category.value == "Billfold"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "block";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			$("div").removeClass("error_highlight");
			category.value = "Billfold";

		} else if(category.value == "Card Wallet"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			$("div").removeClass("error_highlight");
			category.value = "Card Wallet";

		} else if(category.value == "ID Wallet"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "block";
			document.getElementById("interior").style.display = "none";
			document.getElementById("misc").style.display = "none";
			document.getElementById("new_custom_product").reset();
			$("div").removeClass("error_highlight");
			category.value = "ID Wallet";


		}	else if(category.value == "Notebook"){

			document.getElementById("custom_options").style.display = "block";
			document.getElementById("pockets").style.display = "none";
			document.getElementById("pocket_shape").style.display = "none";
			document.getElementById("interior").style.display = "block";
			document.getElementById("misc").style.display = "block";
			document.getElementById("new_custom_product").reset();
			$("div").removeClass("error_highlight");
			category.value = "Notebook";

		}
	};

	submit.onclick = function() {

    if(category.value == "Billfold"){

      if(validateForm(billfoldReqs) == false) {
 
        return false;
 
      }
  
    } else if(category.value == "Card Wallet"){

      if(validateForm(cardWalletReqs) == false) {

        return false;
      
      }

    } else if(category.value == "ID Wallet"){

      if(validateForm(idWalletReqs) == false) {

        return false;
      
      }
    
    } else if(category.value == "Notebook"){

      if(validateForm(notebookReqs) == false) {

        return false;
    
      }
    }
	};
}

$(document).ready(function(){

	document.getElementById("custom_options").style.display = "none";
	
	// Capture Form Elements
	declareVariables();

	// Build Form
	buildForm();

	// Add Event Listeners	
	$("input").on("change", removeHighlight);

});