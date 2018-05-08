function checkValidInput()

{
	
	var id = getID();
	var defaultLast=getDefaultLast();
	var defaultNumb=getDefaultNumb();

	var zhaNumb = document.getElementById('number');
	var numberalert = document.getElementById('numberalert');

	var fname=document.getElementById('fname');
	var fnamealert=document.getElementById('fnamealert');

	var lname=document.getElementById('lname');
	var lnamealert=document.getElementById('lnamealert');

	var email=document.getElementById('email');
	var emailalert=document.getElementById('emailalert');

	var nameRegExp = /^[a-zA-Z-]{2}/;
	var numbRegExp = /^zha[0-9]{6}/;
	var emailRegExp = /^([a-zA-Z0-9-%_.}{+-£!*)(])+@([a-zA-Z0-9-%_])+[.a-zA-Z]*/;

	var allowSubmit=true;

	var msgRequired = 'This is a required field';
	var msgInvalid = 'This must be a valid input';
	var msgInvalidEmail = 'This must be a valid email address';
	var msgInvalidZHA = 'This must be a valid ZHA number';

	// Reset alert messages to blank 

	for (var i = 0; i < id.length; i++) {
		document.getElementById(id[i]+'alert').innerHTML="";
	};

	//Test first name

	if(fname.value=="") 
	{
		fnamealert.innerHTML=msgRequired;
		allowSubmit=false;
	}
	else if(!nameRegExp.test(fname.value)) 
	{
		fnamealert.innerHTML=msgInvalid;
		allowSubmit=false;
	};

	// Test last Name

	if((lname.value=="") || (lname.value===defaultLast))
	{
		lnamealert.innerHTML=msgRequired;
		allowSubmit=false;
	}
	else if(!nameRegExp.test(lname.value)) 
	{
		lnamealert.innerHTML=msgInvalid;
		allowSubmit=false;
	};

	// Test ZHA number

	if ((zhaNumb.value==defaultNumb) || (zhaNumb.value===""))

	{
		numberalert.innerHTML= msgRequired;
		allowSubmit=false;
	}
	else if (!numbRegExp.test(zhaNumb.value)) 
	{
		numberalert.innerHTML= msgInvalidZHA;
		allowSubmit=false;
	};

	// Test Email

	if (email.value==="")

	{
		emailalert.innerHTML= msgRequired;
		allowSubmit=false;
	}
	else if (!emailRegExp.test(email.value)) 
	{
		emailalert.innerHTML= msgInvalidEmail;
		allowSubmit=false;
	};

	/*if ((fname.value!="") && (!nameRegExp.test(fname.value)))

	{
		fnamealert.innerHTML='Invalid input';
		allowSubmit=false;
	};
	if ((!nameRegExp.test(lname.value)) && (lname.value!==defaultLast))

	{
		lnamealert.innerHTML='Invalid input';
		allowSubmit=false;
	};
	if ((!numbRegExp.test(zhaNumb.value)) && (zhaNumb.value!==defaultNumb))

	{
		numberalert.innerHTML='Invalid input';
		allowSubmit=false;
	};*/
	return allowSubmit;

};

function checkForm() 

{
	var submitBtn = document.getElementById('submit');
	submitBtn.onclick=function(e)

	{
		//checkInput();
		if(!checkValidInput())
		{
			e.preventdefault()
		};
	}
	
}