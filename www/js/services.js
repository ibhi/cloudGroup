angular.module('starter.services',[])

.service('clientService',function(){
	var _client;

	return{
		getClient: function(){
			return _client;
		},
		setClient: function(client){
			_client = client;
		}
	};
})

.service('clientSrvc', function($q){
	

	var client = new Dropbox.Client({ key: "a1gx7n1kgmfnoue" });

    client.authDriver(new Dropbox.AuthDriver.Cordova());

    var authenticate = function(){
    	var q = $q.defer();
		client.authenticate(function(error, client) {
	      if (error) {
	        q.reject(error);
	      }
	      if(client.isAuthenticated()){
	       	q.resolve(client);        
	      }
	      else{

	       	q.resolve(client);        
	      }

	    });

	    return q.promise;
    };
    
    var getAccountInfo = function(){
    	var q = $q.defer();
    	client.getAccountInfo(function(error, accountInfo) {
	        if (error) {
	            q.reject(error);
	        }
			q.resolve(accountInfo);	        
	    });
	    return q.promise;
	};

	var readdir = function(path, options){
		var q= $q.defer();
		client.readdir(path, options, function(error, entries, stat, entries_stat){
			if(error){
				q.reject(error);
			}
			q.resolve([entries, stat, entries_stat]);
		})
		return q.promise;
	}

    return {
    	authenticate: authenticate,
    	getAccountInfo: getAccountInfo,
    	readdir: readdir
    };
})