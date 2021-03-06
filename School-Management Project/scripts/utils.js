﻿/**

* @author admin nothings

*/

__myNameSpace.ROLES = {
    ADMINISTRATOR		: 'ADMINISTRATOR',
    TEACHER				: 'TEACHER',
    STUDENT				: 'STUDENT',
    PARENT 				: 'PARENT',
    RECORDOFFICER		: 'RECORDOFFICER',
    SUPERADMINISTRATOR	: 'SUPERADMINISTRATOR'
}

__myNameSpace.DirectoryROLES = {
    ADMINISTRATOR		: 'administrator',
    TEACHER				: 'teacher',
    STUDENT				: 'student',
    PARENT 				: 'parent',
    RECORDOFFICER		: 'recordOfficer',
    SUPERADMINISTRATOR	: 'superAdministrator',
    LOGGEDIN			: 'loggedIn'
}

__myNameSpace.Calendar = {
    VERSION					: '2.0',
    PRODID					: 'Wakanda 3 Studio build 3.121094',
    'X-WR-CALNAME'			: 'Student Management WAKANDA',
    'X-APPLE-CALENDAR-COLOR': '#B027AE',
    meta		: {
        TimeTableDC	: 'ds.TimeTable',
        EVENT		: {
            meta		: {
                jocker		: '@entity',
                alarm		: {
                    meta		: {
                        display	: function(entity){
                            return entity.beginDate.getHours() >= 8 && entity.endDate.getHours() <= 17;
                        }
                    },
                    TRIGGER		: '-PT1M',
                    ACTION		: 'AUDIO',
                    REPEAT		: 4,
                    DURATION	: 'PT1M'
                },
                display		: function(entity){
                    return entity.beginDate.getHours() >= 5 && entity.endDate.getHours() <= 19;
                }
            },
            UID				: '@entity.ID',
            DTSTART			: '@entity.beginDate',
            DTEND			: '@entity.endDate',
            SUMMARY			: '@entity.course.name',
            LOCATION		: '@entity.classroom.name',
            DESCRIPTION		: '"Course : " + @entity.course.name + "\\\\nClassroom : " + @entity.classroom.name + "\\\\nTeacher : " + @entity.teacher.fullname',
            'URL;VALUE=URI'	: 'http://www.wakanda.org'
        }
    }
}

__myNameSpace.School = {
    TIME_TABLE : {
        VACANCY_TYPES : {
            ONCE	: {
                title 	: 'No Repeat',
                value	: 0
            },
            WEEKLY : {
                title 	: 'Repeat Weekly',
                value	: 1
            },
            MONTHLY : {
                title 	: 'Repeat Monthly',
                value	: 2
            },
            ANNUAL : {
                title 	: 'Annual vacation',
                value	: 3
            }
        }
    },
    USERS	: {
    	defaultImg	: 'assets/avatar.png'
    },
    LOGO 				: 'assets/Product-Photos/Logos/logo.png',
    NAME				: 'John F. Kennedy High School',
    LOCATION			: '3030 Villeray St. East\nMontreal Qc. H2A 1E7',
    DEFAULT_MAINT_COST	: 1.25,
    FREE_DAYS			: ['sat' , 'sun'],
    START				: '7:00 AM',
    END 				: '7:00 PM'
}

__myNameSpace.LOG = {
    ENABLE		: true,
    NEWLINE		: '\n',
    TABCHAR		: '\t',
    DC_CONFIG	: {
        // operation contains the basic operations applied to an entity : save, remove, read
        'Default' : function(entity , operation){
            var result = '';
			
            switch(operation){
                case 'save'	:
                    if(entity.isNew()){
                        result +=  'Create new "' + entity.getDataClass().getName() + '" : ' + this.TABCHAR + (entity.login ? entity.login : '') + '[__KEY = ' + entity.getKey() + ']';
                    }
                    else{
                        var
                        changedAttribs 	= ds.Attribute.createEntityCollection(),
                        attrNames		= entity.getModifiedAttributes();
						
                        for(var _i = 0 , attr ; attr = attrNames[_i] ; _i++){
                            var
                            dcName		= entity.getDataClass().getName(),
                            value		= ds[dcName][attr].kind == 'storage' ? entity[attr] : null,
                            attrEntity 	= null;
							
                            if(ds[dcName][attr].kind == 'relatedEntity'){
                                if(entity[attr]){
                                    value = entity[attr].getKey();
                                }
                                else{
                                    value = null;
                                }
                            }
							
                            attrEntity 	= new ds.Attribute({
                                attrName: attr,
                                dcName	: dcName,
                                value	: value
                            });
							
                            attrEntity.save();
							
                            changedAttribs.add(attrEntity);
                        }
						
                        result 	= {
                            operation: result + 'Update "' + entity.getDataClass().getName() + '" : ' + this.TABCHAR + (entity.login ? entity.login : '') + '[__KEY = ' + entity.getKey() + ']',
                            changedAttributes : changedAttribs
                        };
                    }
                    break;
                case 'remove'	:
                    result +=  'Remove "' + entity.getDataClass().getName() + '" : ' + this.TABCHAR + (entity.login ? entity.login : '') + '[__KEY = ' + entity.getKey() + ']';
                    break;
                case 'read'		:
                    result +=  'Read "' + entity.getDataClass().getName() + '" : ' + this.TABCHAR + (entity.login ? entity.login : '') + '[__KEY = ' + entity.getKey() + ']';
                    break;		
            }
			
            return result;
        }
    },
    getOperation: function(entity , operation){
        var dcName = entity.getDataClass().getName();
		
        if(this.DC_CONFIG[dcName]){
            return this.DC_CONFIG[dcName].call(entity , operation);
        }
		
        return this.DC_CONFIG['Default'].call(this , entity , operation);
    }
}
