// Encapsulate array of fields

function getFields() 

{
	var fields = [

	{
		'field':'First Name:',
		'name':'fname',
		'type':'text',
		'required':true,
		'placeholder':''

	},

	{
		'field':'Last Name:',
		'name':'lname',
		'type':'text',
		'required':true,
		'placeholder':"Enter your surname..."
	},

	{
		'field':'Title:',
		'name':'title',
		'options':['Mr.','Ms', 'Mrs.','Miss.','Master'],
		'required':true,
		'placeholder':''
	},

	{
		'field':'Health Authority Number:',
		'name':'number',
		'type':'number',
		'required':true,
		'placeholder':'Enter your ZHA number...'
	},

	{
		'field':'Email:',
		'name':'email',
		'type':'email',
		'required':true,
		'placeholder':''
	},

	{
		'field':'Telephone Number:',
		'name':'phone',
		'type':'text',
		'required':false,
		'placeholder':''
	}

	];

	return fields;
}

function setId()
{
	var id = "zhaform";
	return id;
}


// Create Form

function createForm() 

{
	var formID = setId();
	var formName = formID;
	var fields = getFields();
	//Create form container, append to document body
	
	var formContainer = document.createElement('div');
	formContainer.setAttribute('id','formcontainer')
	document.body.appendChild(formContainer);

	//create form and set attributes

	var form = document.createElement('form');
	form.setAttribute('name',formName);
	form.setAttribute('id',formID);
	formContainer.appendChild(form);

	// Create fieldset to contain required fields

	var fieldset = document.createElement('fieldset');
	form.appendChild(fieldset);

	//Access arrays to set field names and attributes

	for (var i in fields)
	{

		var field = document.createElement('div'); // Create a field container and set class
		field.setAttribute('class','field');
		fieldset.appendChild(field);

		var label = document.createElement('label'); // Create label and set 'for' attribute
		label.setAttribute('for', fields[i].name);
		field.appendChild(label);

		var text = document.createTextNode(fields[i].field); // Access array for title
		label.appendChild(text);
		

		if (fields[i].field =='title') // If the field is for 'Title', create a select with options
		{

			var select = document.createElement('select');
			select.setAttribute('required','required');
			field.appendChild(select);
			var options = fields[i].options;

			for (var j in options) 
			{
				var option = document.createElement('option');
				var optionText = document.createTextNode(options[j]);
				option.appendChild(optionText);
				select.appendChild(option);					
			}
		}			
		else // If the field is anything other than 'Title' create an input element
		{
			var input = document.createElement('input');
			input.setAttribute('id', fields[i].name);
			input.setAttribute('name',fields[i].name);
			input.setAttribute('type', fields[i].type);
			if (fields[i].required == true) 
			{
				input.setAttribute('required', 'required');
			}
			input.setAttribute('placeholder', fields[i].placeholder)
			field.appendChild(input);
		};
		
		var alertMsg = document.createElement('div');
		alertMsg.setAttribute('class','alert');
		alertMsg.setAttribute('id', fields[i].name + 'alert');
		field.appendChild(alertMsg);
	};

	// Create submit button

	var submitBtn = document.createElement('input');
	submitBtn.setAttribute('type','submit');
	submitBtn.setAttribute('value','Submit');
	submitBtn.setAttribute('name','submit');
	submitBtn.setAttribute('id','submit');
	form.appendChild(submitBtn);
	
	                 
}

function addInfoIcon()
{

	// Create tool-tip question mark icon

	var qmark = document.createElement('div')
	qmark.setAttribute('id','qmark')
	

	// Insert icon before zha number label

	var zhaFields = document.getElementsByClassName('field')
	
	zhaFields[3].insertBefore(qmark, zhaFields[3].childNodes[0]) //insertBefore(tooltip, zhaField.childNodes[0]);

}

// Create tooltip

function createTooltip()
{
	
	var tooltip = document.createElement('div')
	tooltip.setAttribute('id', 'tooltip')
	tooltip.classList.add('hide')
	var qmark = document.getElementById('qmark')
	var field = document.getElementsByClassName('field')[3]
	field.insertBefore(tooltip, qmark)

	
	
}

// Display tool tip

function displayToolTip() 

{
	var tooltip = document.getElementById('tooltip');
	var qmark = document.getElementById('qmark');

	qmark.onmouseover = function() {

		tooltip.style.opacity = "1"
		// tooltip.classList.remove('hide');
	}
	
	qmark.onmouseout = function() {

		tooltip.style.opacity = "0"
		// tooltip.classList.add('hide')
	}
}



// Check for empty field

function checkInputNotEmpty()
{
	var inputs = document.getElementsByTagName('input')
	var alerts = document.getElementsByClassName('alert')
	var allowSubmit = false
	
	for(var i = 0; i < inputs.length - 1; i++)
	{
		var thisInput = inputs[i]
		var alert = alerts[i]

		thisInput.onblur = function()
		{

			if(this.value == "" && this.required == true) 
			{
				console.log(this.id, this.required)
				this.nextSibling.innerHTML ='Required'
				allowSubmit=false
			}
			else 
			{

				this.nextSibling.innerHTML=''
				allowSubmit = true
			}
		}
	}

	
	return allowSubmit		
}







function init() 

{
	
	createForm()
	addInfoIcon()
	createTooltip()
	displayToolTip()
	checkInputNotEmpty()
	
	

}

window.onload=init;