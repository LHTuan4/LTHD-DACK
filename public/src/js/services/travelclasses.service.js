appServices.factory('travelClassesService', ['authService',
	function(authService) {

		var query = {};
		var travelClasses = null;

		//--------------------------------------------------------------------
		var getTravelClassesQuery = function() {

			var query = {};

			return query;
		};

		var travelClassesPromiseParams = function(fullfill, reject) {	
			var token = localStorage.getItem("token");
			if (!token) return callback('Unauthencation');
			$.ajax({
				url: '/api/travelclasses',
				headers: { access_token: token },
				method: 'GET',
				data: getTravelClassesQuery(),
				success: fullfill,
				error: reject
			});
		};

		var travelClassesPromise = null;

		//--------------------------------------------------------------------	
		var service = {

			getQuery: function() { return query; },
			setQuery: function(q) {

				travelClasses = travelClassesPromise = null;
			},

			getTravelClassesPromise: function() {

				if (!travelClassesPromise || !travelClasses) {

					travelClassesPromise = new Promise(travelClassesPromiseParams);

					travelClassesPromise
						.then((response) => travelClasses = response.result)
						.catch((xhr, textStatus, errorThrown) => travelClasses = null);
				}

				return travelClassesPromise; 
			},

			getTravelClasses: function(callback) {

				if (travelClasses) return callback(null, travelClasses);

				this.getTravelClassesPromise()
					.then((response) => callback(null, response.result))
					.catch((xhr, textStatus, errorThrown) => callback(xhr.responseJSON));
			}
		};

		return service;
	}
]);