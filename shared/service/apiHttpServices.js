/*jslint node: true */
'use strict';


function apiHttpServices($http, $httpParamSerializerJQLike) {
    var url = '';
    return {

        set: function(apiRescources) {
            url = '';
            url = 'http://ingraph.me:5959/API/Account/' + apiRescources ;
            console.log(url);
        },


        // store resource
        store: function(postData) {
            console.log(postData);
            return $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike(postData)
            });
        },

        // get one resource
        show: function() {
            return $http.get(url);
        },

        // update one rwsource
        update: function(postData) {
            console.log(postData);
            return $http({
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike(postData)
            });
        },

        // destroy resource
        destroy: function(postData) {
            console.log(postData);
            return $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike(postData)
            });
        }
    };

}

module.exports = ['$http', '$httpParamSerializerJQLike', apiHttpServices];
