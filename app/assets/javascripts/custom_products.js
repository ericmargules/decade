window.onload(){
	
	// Capture Form Elements
	declareGlobalVariables();

	// Build Form
	buildForm();

}

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