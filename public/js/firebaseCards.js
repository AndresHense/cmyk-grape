function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	 results = regex.exec(location.search);
	 return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//BUSQUEDA DESDE EL INDEX CUANDO ES REDIRECCIONADO
function changeCards(stringMuseo){
	 isChanged=true;
	 limpiaCards(museumListRef);
	 
	 museumListRef.on("value", function (snapshot) {
	 snapshot.forEach(function (childSnapshot) {
		 var data = childSnapshot.val();
		 

		 var caracteristicaAbreviada= data.descripcion.substr(0,65);
		 var tituloAbreviado = data.name.substr(0,31);
		 var estadoDelMuseo = estadoMuseoActual(data);
		 
		 
		 
		 let datoSearcho= stringMuseo;
		 
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
	 
	 
	  // Your web app's Firebase configuration
	  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
	  var firebaseConfig = {
	    apiKey: "AIzaSyD4If_C8_PNqPQqZhK03LELgLHTwz4V9lI",
	    authDomain: "frontendcafermuseum.firebaseapp.com",
	    databaseURL: "https://frontendcafermuseum.firebaseio.com",
	    projectId: "frontendcafermuseum",
	    storageBucket: "frontendcafermuseum.appspot.com",
	    messagingSenderId: "743873845303",
	    appId: "1:743873845303:web:c81963edce2b4a5747c7b2",
	    measurementId: "G-44EZY21CCN"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	  var database = firebase.database();

	  museumListRef = database.ref("museum");

	  let element = document.getElementById('elem');
	  let isChanged=false;
	  
	  if(getParameterByName("search")==""){ 	  
	  if(!isChanged){
	  museumListRef.on("value", function (snapshot) {
	  	snapshot.forEach(function (childSnapshot) {
	  		var data = childSnapshot.val();
	  		//element.innerHTML = element.innerHTML+`<div>${data.name}</div>`;
	  		var caracteristicaAbreviada= data.descripcion.substr(0,65);
	  		var tituloAbreviado = data.name.substr(0,31);
	  		var estadoDelMuseo = estadoMuseoActual(data);
	  		
	  		
	  		let museoExtras={
	  			_tituloAbreviado: tituloAbreviado,
	  			_caracteristicaAbreviada: caracteristicaAbreviada,
	  			_estadoDelMuseo: estadoDelMuseo,
	  		}

			creaCard(data,museoExtras,'elem');

	  	 });
	  })
	  }
	}else{
		changeCards(getParameterByName("search"));
	} 	  
	  firebase.analytics();
	  
