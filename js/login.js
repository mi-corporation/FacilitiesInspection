// 
// login.js
// A set of functions for logging into the app and handling authentication
//
// Author: David Nakamura
// Date: 10/20/2014
// 

$$('.login-screen input[name="customer"] ').val(customer);

// Handle Login
$$('#trySignIn').on('click', function () {
    customer = $$('.login-screen input[name="customer"] ').val();
    username = $$('.login-screen input[name="username"] ').val();
    password = $$('.login-screen input[name="password"] ').val();

    $$('#trySignIn i').addClass('ion-loading-a');
    $$('#trySignIn i').removeClass('ion-log-in');

    myApp.setServerSettings();
    
    if (!hasNetwork()) {
        if (myApp.verifyPassword(customer, username, password)) {
            myApp.getFacilitiesDatabase(username,
                function (db) {
                }
            );
            authToken = myApp.getAuthToken(customer, username);
            myApp.signInSucceeded();
        }
        else {
            myApp.signInFailed();
        }
        return;
    }
    
    myApp.authenticateUser(
        function () {
            // Success
            // Determine if the user is a memmber of the Approver's group...
            myApp.isUserInGroup(customer, username, APPROVERS_GROUP_NAME,
                function (isMember) {
                    userIsApprover = isMember;
                },
                function (msg) {
                }
            );
            myApp.setPassword(customer, username, password);
            myApp.signInSucceeded();
        },
        function () {
            // Fail
            if (myApp.verifyPassword(customer, username, password)) {
                authToken = myApp.getAuthToken(customer, username);
                myApp.signInSucceeded();
                myApp.getFacilitiesDatabase(username,
                    function (db) {
                    }
                );
            }
            else {
                myApp.signInFailed();
            }
        }
    );
});

myApp.authenticateUser = function (success, fail) {

    // 1st - Get key pair
    MiCo.MiApp.MiJS.Services.Auth.getKeyPair(customer, username, NETSETTINGS,
        function (key) {
            // 2nd - encrypt password with key
            var requestedTokenExp = new Date(new Date().getTime() + 5 * MiCo.MiApp.MiJS.Tools.Security.defaultTokenExpirationDuration());
            var requestedTokenReq = MiCo.MiApp.MiJS.Tools.Security.defaultTokenRequests();
            var encryptedPassword = MiCo.MiApp.MiJS.Tools.Security.encryptRSA(password, key.HexM(), key.HexE());

            // 3rd - request an auth Token
            MiCo.MiApp.MiJS.Services.Auth.getAuthToken(customer, username, encryptedPassword, requestedTokenExp, requestedTokenReq, NETSETTINGS,
                function (token) {
                    authToken = token;
                    myApp.saveAuthToken(customer, username, authToken);

                    if (success) {
                        success();
                    }

                }, function (serverResponse) {
                    // Fail - getAuthToken

                    if (fail) {
                        fail();
                    }
                }
            );
        },
        function (serverResponse) {
            if (fail) {
                fail();
            }
        }
    );

}

myApp.signInSucceeded = function () {
    $$('#trySignIn i').removeClass('ion-loading-a');
    $$('#trySignIn i').addClass('ion-log-in');
    $$('.login-screen input[name="password"] ').val('');

    mainView.goBack();
    mainView.goBack();
    mainView.goBack();
    mainView.goBack();
    mainView.goBack();
    mainView.goBack();

    myApp.closeModal();

    myApp.saveServerSettings();

    myApp.getFacilitiesDatabase(username,
        function (db) {
            drDb = db;
        }
    );
}

myApp.signInFailed = function () {
    $$('#trySignIn i').removeClass('ion-loading-a');
    $$('#trySignIn i').addClass('ion-log-in');
    $$('.login-screen input[name="password"] ').val('');
    $('#signInPassword').addClass('invalid');
    setTimeout(function () {
        $('#signInPassword').removeClass('invalid');
    }, 1000);
}

myApp.setPassword = function (customer, username, password) {
    // This method of password 'masking' is for demonstration purposes only.
    // A higher grade, secure method of password encryption / hashing should be used for production environments.
    localStorage.setItem(customer + "-" + username, btoa(password));
}

myApp.verifyPassword = function (customer, username, password) {
    var pwd = atob(localStorage.getItem(customer + "-" + username));

    if (pwd === password) {
        return true;
    }
    else {
        return false;
    }
}

myApp.saveAuthToken = function (customer, username, authToken) {
    localStorage.setItem(customer + "-" + username + "-authToken", btoa(JSON.stringify(authToken)));
}

myApp.getAuthToken = function (customer, username) {
    var jsonToken = JSON.parse(atob(localStorage.getItem(customer + "-" + username + "-authToken")));
    var newAuthToken = new MiCo.MiApp.MiJS.Token(jsonToken._tokenValue, new Date(jsonToken._tokenExpiration), parseInt(jsonToken._allowedTokenRequests));
    return newAuthToken;
}

// Queries the Server to determine a user's membership in a group.
// Use the 'success' callback with boolean which indicates member or not member.
// Function returns false if there is not network; otherwise true if a network is detected.
myApp.isUserInGroup = function (customer, username, groupname, success, fail) {
    
    if (!hasNetwork()) {
        return false;
    }

    // getGroupsForUser... 
    MiCo.MiApp.MiJS.Services.Auth.getGroupsForUser(customer, authToken, username, NETSETTINGS,
        function (groups) {
            var isMember = false;
            for (i = 0; i < groups.length; i++) {
                if (groups[i] == groupname) {
                    isMember = true;
                    break;
                }
            }

            if (success) {
                success(isMember);
            }

        }, function (serverResponse) {
            // Fail

            if (fail) {
                fail();
            }
        }
    );

    return true;
}

$$('#btnServerSettings').on('click', function () {
    if ($$('#serverSettings').css('display') == 'none') {
        $$('#serverSettings').show();
    }
    else {
        $$('#serverSettings').hide();
    }
});

$$('.login-screen').on('closed', function (e) {
    mainView.goBack();
    setTimeout(function () {
        mainView.goBack();
        setTimeout(function () {
            mainView.goBack();
        }, 10)
    }, 10)
});

myApp.setServerSettings = function () {
    HOSTNAME = $$('.login-screen input[name="serverHostname"] ').val();
    PORT = parseInt($$('.login-screen input[name="serverPort"] ').val());
    URLPREFIX = $$('.login-screen input[name="serverUrlPrefix"] ').val();
    SSL = (typeof $('.login-screen input:checkbox[name=serverUrlPrefix]:checked').val() !== 'undefined');
    
    NETSETTINGS = new MiCo.MiApp.MiJS.NetworkSettings(HOSTNAME, PORT, URLPREFIX, SSL);

    DR_RESOURCENAME = $$('.login-screen input[name="drResourceName"] ').val();
    DR_URLPREFIX = $$('.login-screen input[name="drURLPrefix"] ').val();

    DR_RESOURCEURL = buildDataReplicationURL();

}

myApp.displayServerSettings = function () {
    $$('.login-screen input[name="serverHostname"] ').val(HOSTNAME);
    $$('.login-screen input[name="serverPort"] ').val(PORT);
    $$('.login-screen input[name="serverUrlPrefix"] ').val(URLPREFIX);
    // SSL = (typeof $('.login-screen input:checkbox[name=serverUrlPrefix]:checked').val() !== 'undefined');

    $$('.login-screen input[name="drResourceName"] ').val(DR_RESOURCENAME);
    $$('.login-screen input[name="drURLPrefix"] ').val(DR_URLPREFIX);

    $$('.login-screen input[name="customer"]').val(customer);
}

myApp.saveServerSettings = function () {
    localStorage.setItem('HOSTNAME', HOSTNAME);
    localStorage.setItem('PORT', PORT);
    localStorage.setItem('URLPREFIX', URLPREFIX);
    localStorage.setItem('SSL', SSL);
    localStorage.setItem('DR_RESOURCENAME', DR_RESOURCENAME);
    localStorage.setItem('DR_URLPREFIX', DR_URLPREFIX);
    localStorage.setItem('CUSTOMERNAME', customer);
}

myApp.getServerSettings = function () {
    HOSTNAME = localStorage.getItem('HOSTNAME');
    PORT = localStorage.getItem('PORT');
    URLPREFIX = localStorage.getItem('URLPREFIX');
    SSL = localStorage.getItem('SSL');
    DR_RESOURCENAME = localStorage.getItem('DR_RESOURCENAME');
    DR_URLPREFIX = localStorage.getItem('DR_URLPREFIX');
    customer = localStorage.getItem('CUSTOMERNAME');
}

if (localStorage.getItem('HOSTNAME') !== null) {
    myApp.getServerSettings();
}

myApp.displayServerSettings();