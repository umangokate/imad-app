var counter = document.getElementById('counter');
var cnt = document.getElementById('value');

counter.onclick = function()
{
	var request = new XMLHttpRequest();
	var queryUrl = "http://localhost:8080/counter";

	request.open('GET',queryUrl,true);
	request.onreadystatechange = function()
	{
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				var c = request.responseText;
				cnt.innerHTML = c.toString();

			}
		}
	};

	request.send();
};





var submit = document.getElementById('request');



submit.onclick = function()
{

	var request = new XMLHttpRequest();
	
	
	
	request.onreadystatechange = function()
	{
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.readyState===200)
			{
				var names = request.responseText;
				names = JSON.parse(names);
				var list = ' ';
				for (var i = 0; i < names.length; i++) 
				{
					list += '<li>'+names[i]+'</li>';
				}
				var  ul = document.getElementById('namelist');
				ul.innerHTML = list;
				
			}


		}


	};
	var input = document.getElementById('field').value;
	request.open('GET',"http://localhost:8080/submit-name?name="+input,true);
	request.send();
};











