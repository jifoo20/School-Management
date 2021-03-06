﻿/* This is a regular JS file nothings*/

function loginMe(request, response) {
	var
    sessionRef 		= currentSession(),
    directoryROLES 	= __myNameSpace.DirectoryROLES;
	
    switch (true) {
        case  sessionRef.belongsTo(directoryROLES.LOGGEDIN):
			response.headers.Location = "/index/";
            break
            
        default:
            response.headers.Location = "/login/";
            break
    }

    return;
}

function exportCal(request, response) {
	var
	res,
	utils,
	sessionRef,
	directoryROLES;
    
    directoryROLES	= __myNameSpace.DirectoryROLES;
    sessionRef		= currentSession();
    utils			= require('utils');

    if(utils.isBrowser(request.headers['USER-AGENT'])){
    	if(!sessionRef.belongsTo(directoryROLES.LOGGEDIN)){
    		response.headers.Location = "/logmein";
    		return;
    	}
    }
    else{
    	if(request.user == "" && request.password == ""){
    		response.statusCode = 401;
	        response.headers.WWW_AUTHENTICATE = 'Basic realm="wakanda"';
	        return;
    	}
    }
    
    response.contentType 	= "text/calendar";
    
    return utils.getCalendar();
}

function index(request , response){
	response.headers['LOCATION'] = '/index/'
}
