﻿/**Name : TeacherDescription : is a person who is assigned by the school director to each class of students to follow the students closely. He/She has the responsibility of recording attendance of students and submitting.*/(function(){	var	__Teacher 		= model.Teacher 			= {},	__events 		= __Teacher.events			= new __myNameSpace.Model.User.Events()	__entityMethods	= __Teacher.entityMethods 	= {},	ROLES			= __myNameSpace.ROLES,	directoryROLES	= __myNameSpace.DirectoryROLES;		__entityMethods.isBusy = function(timeTable){		return ds.Utils.isBusy({			timeTable	: timeTable,			timeTables	: this.timeTables		});	}	__entityMethods.getCourses = function(){		var		ROLES			= __myNameSpace.ROLES,		sessionRef		= currentSession(),		promoteToken 	= sessionRef.promoteWith(ROLES.ADMINISTRATOR),		theResult		= ds.Course.createEntityCollection(),		_timeTables		= ds.TimeTable.query('teacher.ID = :1' , this.ID);				_timeTables.forEach(function(tt){			if(theResult.find('ID=:1',tt.ID) == null){				theResult.add(tt.course);			}		});				sessionRef.unPromote(promoteToken);				return theResult;	}		__events.onRestrictingQuery = function(){		var		sessionRef		= currentSession(),		curUser			= sessionRef.user,		sStorage		= sessionStorage;				// @TO MODIFY: parents and students can access just to teachers that teaches they childen/teach them		if(sessionRef.belongsTo(directoryROLES.RECORDOFFICER)){			return this.query('role = :1' , ROLES.TEACHER);		}				if(sessionRef.belongsTo(directoryROLES.TEACHER)){			return this.query('ID = :1' , sStorage.ID);		}				if(sessionRef.belongsTo(directoryROLES.STUDENT)){			var user = ds.Student(sStorage.ID);			if(user && user.studyGroup){				return user.studyGroup.timeTables.teacher;			}		}		else if(sessionRef.belongsTo(directoryROLES.PARENT)){			var			res 	= this.createEntityCollection(),			user 	= ds.Parent(sStorage.ID);						if(user){				user.children.forEach(function(entity){					res.or(entity.teachers);				});			}						return res;		}				return this.createEntityCollection();	}})();