﻿/**Name : ParentDescription : is a person who is registered as parent of the student and responsible to follow the student in close contact with the school. He/She can view the status of the student such as attendance and result/performance of the student online.*/(function(){	var	__Parent 		= model.Parent 			= {},	__events 		= __Parent.events 			= new __myNameSpace.Model.User.Events(),	__entityMethods	= __Parent.entityMethods 	= {},	ROLES			= __myNameSpace.ROLES,	directoryROLES	= __myNameSpace.DirectoryROLES;	__entityMethods.getCourses = function(){		var		ROLES			= __myNameSpace.ROLES,		sessionRef		= currentSession(),		theResult		= ds.Course.createEntityCollection();				this.children.forEach(function(child){			child.courses && child.courses.forEach(function(course){				theResult.add(course);			});		});				return theResult;	}	__entityMethods.getTimeTables = function(){		var		ROLES			= __myNameSpace.ROLES,		sessionRef		= currentSession(),		theResult		= ds.TimeTable.createEntityCollection();				this.studyGroups.forEach(function(sg){			sg.timeTables.forEach(function(tt){				theResult.add(tt);			});		});				return theResult;	}		__events.onRestrictingQuery = function(){		var		sessionRef		= currentSession(),		curUser			= sessionRef.user,		sStorage		= sessionStorage,		theResult		= this.createEntityCollection();				if(sessionRef.belongsTo(directoryROLES.TEACHER)){			return this.query('role = :1' , ROLES.PARENT);		}				if(sessionRef.belongsTo(directoryROLES.PARENT)){			return this.query('ID = :1' , sStorage.ID);		}				if(sessionRef.belongsTo(directoryROLES.STUDENT)){			var			theStudent 		= ds.Student.first();						theResult.add(theStudent.parent);						return theResult;		}				return theResult;	}})();