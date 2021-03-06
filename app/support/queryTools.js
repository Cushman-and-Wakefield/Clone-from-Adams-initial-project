 /* Copyright 2017 Esri

   Licensed under the Apache License, Version 2.0 (the "License");

   you may not use this file except in compliance with the License.

   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software

   distributed under the License is distributed on an "AS IS" BASIS,

   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

   See the License for the specific language governing permissions and

   limitations under the License.
   ​
   */

define([
    "esri/core/declare",
    "esri/tasks/support/Query"

], function (
    declare,
    Query

) {
        return {

            distinctValues: function (layer, fieldname, OIDname, callback) {

                var query = layer.createQuery();

                var values = [];
                
                query.returnGeometry = false;
                query.returnDistinctValues = true;
                query.outFields = [fieldname];

                layer.load().then(function () {

                    return layer.queryFeatures(query);

                }).then(function (results) {

                    var selection = results.features;

                    for (var i = 0; i < selection.length; i++) {
                        values.push(selection[i].attributes[fieldname]);
                    }

                    values.sort(function (a, b) { return a - b; });

                    for (var j = 0; j < values.length; j++) {
                        if (values[j] === null || values[j] === undefined) {
                            values.splice(j, 1);
                        }
                    }

                    callback(values);

                }.bind(this)).otherwise(function (err) {
                    console.error(err);
                });


            },
         
            distinctValues_ten: function (layer, fieldname, OIDname, callback) {

                var query = layer.createQuery();

                var values_ten = [];
                
                query.returnGeometry = false;
                query.returnDistinctValues = true;
                query.outFields = [fieldname];

                layer.load().then(function () {

                    return layer.queryFeatures(query);

                }).then(function (results) {

                    var selection = results.features;

                    for (var i = 0; i < selection.length; i++) {
                        values_ten.push(selection[i].attributes[fieldname]);
                    }

                    values_ten.sort(function (a, b) { return a - b; });

                    for (var j = 0; j < values_ten.length; j++) {
                        if (values_ten[j] === null || values_ten[j] === undefined) {
                            values_ten.splice(j, 1);
                        }
                    }

                    callback(values_ten);

                }.bind(this)).otherwise(function (err) {
                    console.error(err);
                });


            },
         
            distinctValues_exp: function (layer, fieldname, OIDname, callback) {
             
                var query = layer.createQuery();

                var values_exp = [];
                
                query.returnGeometry = false;
                query.returnDistinctValues = true;
                query.outFields = [fieldname];

                layer.load().then(function () {

                    return layer.queryFeatures(query);

                }).then(function (results) {
                    
                    var selection = results.features;

                    for (var i = 0; i < selection.length; i++) {
                        values_exp.push(selection[i].attributes[fieldname]);
                    }
                     
                    function onlyUnique(value, index, self) {
                         return self.indexOf(value) === index;
                    }
                    values_exp = values_exp.filter(function(value, index, arr){ 
                       return value != null;
                    });
                    values_exp = values_exp.toString();
                    values_exp = values_exp.filter(onlyUnique);

                    values_exp.sort(function (a, b) { return a - b; });

                    for (var j = 0; j < values_exp.length; j++) {
                        if (values_exp[j] === null || values_exp[j] === undefined) {
                            values_exp.splice(j, 1);
                        }
                    }

                    callback(values_exp);

                }.bind(this)).otherwise(function (err) {
                    console.error(err);
                });


            },

            pagedQuery: function (layer, query, currentOffset, currentResult, index, callback) {

                query.start = currentOffset;
                query.num = 8000;

                layer.queryFeatures(query).then(function (result) {

                    var selection = result.features;

                    for (var i = 0; i < selection.length; i++) {
                        currentResult.push(selection[i]);
                    }

                    if (result.exceededTransferLimit) {

                        currentOffset += 8000;

                        this.pagedQuery(layer, query, currentOffset, currentResult, index, callback);
                    }
                    else {
                        callback(currentResult, index);
                    }
                }.bind(this)).otherwise(function(e){
                    console.error(e);
                });
            }
        };
    });
