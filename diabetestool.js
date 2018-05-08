//Encapsulate form information within functions:

//Function: Return array of question headings for assessment tool:

function getHeadings()

{
 	
 	headings= [ 'How old are you?',			
				'What is your BMI?',
				'Does anybody in your<br>family have diabetes?',
				'How would you <br>describe your diet?'
				];
		return headings;
}

//Return an array of arrays containing radio button answers:

function getAnswers() 

{
	var ans = [
				['1-25','26-40','41-60','60+'],
				['0-25','26-30','31-35','35+'],
				['No','Grandparent','Sibling','Parent'],
				['Low Sugar','Normal Sugar', 'Quite High', 'High Sugar']
			  ];

	return ans;
}

//Return an array of 'Name' values for input elements:

function getInputNames () 

{

 var names=['age','BMI','genes','diet'];
 return names;

}

//Return an array of arrays for the values of each answer:

function getValues() 

{
	var values=[

				[0,5,8,10],
				[0,0,9,10],
				[0,7,15,15],
				[0,0,7,10]

				];

	return values;

}


////////////////////// Create Assessment Tool: //////////////////////////////////////////

function createTool() 

{
	
	// Create tool container

	var tool = document.createElement('div')
	tool.setAttribute('id', 'toolcontainer')
	document.body.appendChild(tool);

	// Create calculation tool div

	var calcTool = document.createElement('div');
	calcTool.setAttribute('id', 'calcTool');
	tool.appendChild(calcTool);

	//Create table element and append to body
	
	var table = document.createElement('table');
	calcTool.appendChild(table); 
	
	//Create a table row for each heading/question																							on:
	
	var headings=getHeadings();
	for (var i = 0; i < headings.length; i++) 

	{   
		
		var row = document.createElement('tr'); 
		table.appendChild(row); 
		
		// Create table header for each row 
		// and assign text value from headings array:
		
	    var tableHeader = document.createElement('th'); 
	    tableHeader.innerHTML = headings[i]; 			
		row.insertBefore(tableHeader, row.firstChild);

		// Create radio type input fields for each answer:

		var ansArray = getAnswers();
		var thisAns=ansArray[i];

		for (var x = 0; x < thisAns.length; x++) 

		{		
			// Create elements:
			
			var tableData = document.createElement('td');
			
			var input = document.createElement('input'); 
			
			// Set attributes (type,name,id,value) of elements:
			
			input.setAttribute('type','radio');	
			
			names=getInputNames();			
			input.setAttribute('name', names[i]);	
			input.setAttribute('class', names[i]);
			input.setAttribute('id', thisAns[x]); //Set 'id' to correspond to the answer//////////
			
			var values=getValues();
			var thisVal=values[i];
			input.setAttribute('value', thisVal[x]);
			
			var text = document.createTextNode(thisAns[x]);//Create answer node
			row.appendChild(tableData);
			tableData.appendChild(text);
			tableData.appendChild(input);
			
			
			
		};

		// Set the lowest answer of each question to checked

		var tableRows = document.getElementsByTagName('tr');
		for(var y = 0; y < tableRows.length; y++){
		    tableRows[y].childNodes[1].childNodes[1].setAttribute('checked','checked');
		};
	};

	// Create button

	var btn = document.createElement('button');
	btn.setAttribute('id','btn');
	btn.innerHTML='Calculate';
	table.appendChild(btn);


	// Create result div


	var result = document.createElement('div');
	result.setAttribute('id','toolresult');
	tool.appendChild(result);

	bindings();

};

	// Calculate the sum of the input values to get the score

function getScore () 

{

	var score = 0;
	var input = document.getElementsByTagName('input');
	
	for (var i = 0; i < input.length; i++) {

		if(input[i].checked) {

			var value = parseInt(input[i].value);
			var score = score + value;
		}
				
	}

	return score;
};

	// Get name of all checked inputs that have a value of of >=10

function getHighRisks() 

{

	var inputs = document.getElementsByTagName('input');

	highRisks = []; // Declare an array to store the relevant inputs

	for (var i = 0; i < inputs.length; i++) {

	 	if(inputs[i].checked) {

	 		if (parseInt(inputs[i].value) >= 10) {

	 			highRisks.push(inputs[i].className);
	 		};
	 	};
	 }; 
	 
	 return highRisks;
}



	// Access getScore and getHighRisks to get appropriate message	

function getMessage() 

{
	//var link = document.createElement('a').text("http://www.zha.org.zd");
	//link.setAttribute('href','#')

	
	var message = "";
	var score = getScore();
	var highestRisks = getHighRisks();

	if (score > 25 && highestRisks.length > 2) {

		message = message + "Your results show that you currently have a HIGH risk of developing diabetes.\n  Your main risk factors are your " + highestRisks[0] + " , your " + highestRisks[1] + " and your " + highestRisks[2] + ".\nWe advise that you contact the Health Authority to discuss your risk factors as soon as you can. \n Please fill in our contact form and a member of the Health Authority Diabetes Team will be in contact with you.";
		
	}
	else if (score>25 && highestRisks.length > 1) {

		message = message + "Your results show that you currently have a HIGH risk of developing diabetes.\n  Your main risk factors are your " + highestRisks[0] + " and your " + highestRisks[1] + ".\nWe advise that you contact the Health Authority to discuss your risk factors as soon as you can. \n Please fill in our contact form and a member of the Health Authority Diabetes Team will be in contact with you.";
		
	}
	else if (score > 25) {

		message = message + "Your results show that you currently have a HIGH risk of developing diabetes.\n  Your main risk factor is your " + highestRisks[0] + ".\nWe advise that you contact the Health Authority to discuss your risk factors as soon as you can. \n Please fill in our contact form and a member of the Health Authority Diabetes Team will be in contact with you.";
	}
	else if (score>16) {

		message = message + "Your results show that you currently have \n a medium risk of developing diabetes. \n For more information on your risk factors, and what to do about them, \n please visit our diabetes advice website at " + document.createElement('a') + ".";
	}
	else {

		message = message + "Your results show that you currently have a low risk of developing diabetes. \n However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";
	};

	return message;
};


	// Display Message by setting the approptiate message and changing div's visibilty in css

function displayResult() 

{
	// Reset the innerHTML so the tool can be reused without unwanted repetition of results
	document.getElementById('toolresult').innerHTML="";

	var message = document.createTextNode(getMessage()); 
	var div = document.getElementById('toolresult');
	div.appendChild(message);
	div.style.display='block';
	

}
	
 // Bind the function to display the results to the onclick event

function bindings() 

{

	var btn = document.getElementById('btn');
	btn.onclick = displayResult;

}

window.onload=createTool;