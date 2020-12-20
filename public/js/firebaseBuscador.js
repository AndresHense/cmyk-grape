	
	
	  museumListRef = database.ref("museum");
	  
	  
	  function changeCards(){
	  	isChanged=true;
	  	limpiaCards(museumListRef);
	  	
	  	museumListRef.on("value", function (snapshot) {
	  	snapshot.forEach(function (childSnapshot) {
	  		var data = childSnapshot.val();
	  		
	
	  		var caracteristicaAbreviada= data.descripcion.substr(0,65);
	  		var tituloAbreviado = data.name.substr(0,31);
	  		var estadoDelMuseo = estadoMuseoActual(data);
	  		
	  		
	  		
	  		let datoSearcho= document.getElementById("buscador").value;
	  		
			let regexSearcho= RegExp(datoSearcho,"i");
			console.log(datoSearcho);
	  		console.log(regexSearcho.test(data.name));
			
	  		if(regexSearcho.test(data.name)){
	  			let museoExtras={
	  				_tituloAbreviado: tituloAbreviado,
	  				_caracteristicaAbreviada: caracteristicaAbreviada,
	  				_estadoDelMuseo: estadoDelMuseo,
	  			}
				creaCard(data,museoExtras,'elem');
	  		}
	  	 });
	  })
	  	
	  }
	  
	  
	let serach = document.getElementById("buscador");//lo escribi mal a proposito

	// Execute a function when the user releases a key on the keyboard
	serach.addEventListener("keyup", function(event) {
  	// Number 13 is the "Enter" key on the keyboard
  	if (event.keyCode === 13) {
    	// Cancel the default action, if needed
    	//event.preventDefault();
    	// Trigger the button element with a click
    	document.getElementById("button-addon2").click();
 	}
	});
