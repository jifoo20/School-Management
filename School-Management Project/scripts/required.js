﻿/**

* @author admin nothings

*/
var __myNameSpace 	= __myNameSpace || {};

(function(){
	var
	baseFolder		= 'scripts/',
	extension		= '.js',
	filesToInclude	= ['utils' , 'errors'];
	
	for(var i = 0 , file ; file = filesToInclude[i] ; i++){
		include(baseFolder + file + extension);
	}
})();
