var category, price, pockets, pocketShape, corners, exterior, interior, lining, stitching, edges, notebookStyle, submit, billfoldReqs, cardWalletReqs, idWalletReqs, notebookReqs;

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

	//Style Requirements

	billfoldReqs = [["pockets", pockets], ["pocket_shape", pocketShape], ["corners", corners], ["exterior", exterior], ["interior", interior], ["lining", lining], ["stitching", stitching], ["edges", edges]];
	cardWalletReqs = ["pocket_shape", "corners", "exterior", "interior", "lining", "stitching", "edges"];
	idWalletReqs = ["pocket_shape", "corners", "exterior", "lining", "stitching", "edges"];
	notebookReqs = ["corners", "exterior", "interior", "lining", "stitching", "edges", "notebook_style"];	

}

function validateForm(reqs) {

  var missingReqs = new Array();
  for (var i = 0; i < reqs.length; i++) {

    if(reqs[i][1].value == "") {
        
      missingReqs.push(reqs[i][1])
      document.getElementById(reqs[i][0]).className = "error_highlight";

    }
  }
    
  if(missingReqs.length != 0) {
  
    return false;
  
  }
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

	submit.onclick = function() {


		alert("you clicked submit");
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
	}
}

$(document).ready(function(){

	document.getElementById("custom_options").style.display = "none";
	
	// Capture Form Elements
	declareVariables();

	// Build Form
	buildForm();

});