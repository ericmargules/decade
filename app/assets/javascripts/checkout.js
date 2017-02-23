function toggleError(object, message=""){
    var span = object.parentNode.getElementsByTagName("span")[0];
    span.innerHTML = String(message);
}

function validate(object){
    if (object.value == ""){ 
        toggleError(object, "This field is required");
        return false;
    }else { 
        toggleError(object);
    }
}

function validateEmail() {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailRegex.test($("#required_email")[0].value) ?  toggleError($("#required_email")[0]) : toggleError($("#required_email")[0], "Please enter a valid email");
    return emailRegex.test($("#required_email")[0].value);
}

function checkAddress(){
    var goAhead = true;
    $(".required_address").each(function(){
        if(validate( this ) == false){ 
            goAhead =  false;
        }
    });
    return goAhead;
}

function setParams(){
    var params = ""
    $(".required_address").each(function(){
        params += String( this.id ) + ": " + String(this.value) + ";";
        if (String( this.id ) == "address_1"){
            params += "address_2: " + String($("#address_2")[0].value) + ";";
        }
    });
    params += String($("#required_email")[0].id) + ": " + String($("#required_email")[0].value) + ";";
    $("#params")[0].value = params;
}

$(document).ready(function(){
    $("#submit").on("click", function(){
        var goAhead = true
        if( checkAddress() == false) {
            goAhead = false;
        }
        if (validateEmail() == false ){
            goAhead = false;
        }
        if (goAhead == false){

            return false;
        } 
        setParams();
    });
    
    $(".required_address").on("focusout", function(){

        if(this.parentNode.getElementsByTagName("span")[0].innerHTML != ""){
            validate(this);
        };

    });

    $("#required_email").on("focusout", function(){

        if(this.parentNode.getElementsByTagName("span")[0].innerHTML != ""){
            validateEmail();
        };
    
    });

});