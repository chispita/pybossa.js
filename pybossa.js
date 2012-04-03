// pybossa.js library
// Copyright (C) 2012 Daniel Lombraña González
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


(function( pybossa, $, undefined ) {

 // Private methods 
 function getApp(appname){
    return $.ajax({
        url: '/api/app',
        datatype:'json'
        })
        .pipe( function( data ) {
            $.each(data, function(){
                if (this.short_name == appname) {
                    tmp = this;
                    return false;
                }
            });
            return tmp;
            } );
 }

 function getTaskRun( app ) {
     return $.ajax({
            url: '/api/app/' + app.id + '/newtask',
            datatype: 'json'
             })
            .pipe( function( data ) {
                    taskrun = { question: app.description, task: data};
                    return taskrun;
             });
 }

 function getTask( taskid, answer ) {
     return $.ajax({
            url: '/api/task/' + taskid,
            datatype: 'json'
             })
            .pipe( function( data ) {
                    tmp = data;
                    tmp.answer = answer;
                    return tmp;
             });
 }

 function createTaskRun( data ) {
     taskrun = {};
     taskrun = {
        'app_id': data.app_id,
        'task_id': data.id,
        'info': data.answer
        };

     taskrun = JSON.stringify(taskrun);

     return $.ajax({
            type: 'POST',
            url: '/api/taskrun',
            dataType: 'json',
            contentType: 'application/json',
            data: taskrun
             })
            .pipe( function( data ) {
                    return data;
             });
 }

 // Public methods
 pybossa.newTask = function ( appname ) {
     return getApp(appname).pipe(getTaskRun);
 }

 pybossa.saveTask = function ( taskid, answer ) {
     return getTask( taskid, answer ).pipe(createTaskRun);
 }

} ( window.pybossa = window.pybossa || {}, jQuery ));