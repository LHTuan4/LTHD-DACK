appServices.factory('authService', [
    function () {

        var serviceObj = {
            isAuthenticated: function() {
                return localStorage.getItem("token");
            },
            loginLocal: function (email, password, callback) {

                var promise = new Promise((fulfill, reject) => {
                    $.ajax({
                        url: '/api/auth/local',
                        method: 'GET',
                        data: { email: email, password: password },
                        success: fulfill,
                        error: reject
                    });
                });

                promise
                    .then((result) => {
                        localStorage.setItem("token", result.token);
                        callback(null, result)
                    })
                    .catch((xhr, textStatus, errorThrown) => callback(xhr.responseJSON));
            },
            loginFacebook: function(code, callback) {

                 var promise = new Promise((fulfill, reject) => {
                    $.ajax({
                        url: '/api/auth/facebook/callback',
                        method: 'GET',
                        data: { code: code },
                        success: fulfill,
                        error: reject
                    });
                });

                promise
                    .then((result) => {
                        localStorage.setItem("token", result.token);
                        callback(null, result)
                    })
                    .catch((xhr, textStatus, errorThrown) => callback(xhr.responseJSON));

            },
            logout: function(done) {
                localStorage.removeItem("token");
                done();
            },
            getAccount: function(done) {

                var token = this.isAuthenticated();
                if (!token) return done('unauthenticated');

                var promise = new Promise((fulfill, reject) => {
                    $.ajax({
                        url: '/api/auth/self',
                        method: 'GET',
                        headers: { access_token: token },
                        success: fulfill,
                        error: reject
                    });
                });

                promise
                    .then((result) => done(null, result))
                    .catch((xhr, textStatus, errorThrown) => done(xhr.responseJSON));
            },
            register: function(name, email, password, done) {
                var promise = new Promise((fulfill, reject) => {
                    $.ajax({
                        url: 'api/auth/register',
                        method: 'POST',
                        data: {
                            name: name,
                            email: email,
                            password: password
                        },
                        success: fulfill,
                        error: reject
                    });
            });

            promise
                .then((response) => done(null, response))
                .catch((xhr, textStatus, errorThrown) => done(xhr.responseJSON));
            }
        };

        return serviceObj;
    }
]);