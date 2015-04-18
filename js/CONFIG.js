// CONFIG.js
//      Provides configuration settings for the Facilities Inspection app
//
// Author: David Nakamura
// Date: 10/24/2014
// 

// MEA Mi-JS
var HOSTNAME = '192.168.168.21';
var PORT = 80;
var URLPREFIX = 'MFS';
var SSL = false;
var NETSETTINGS = new MiCo.MiApp.MiJS.NetworkSettings(HOSTNAME, PORT, URLPREFIX, SSL);

var customer = "mms";
var username;
var password;
var authToken;

var APPROVERS_GROUP_NAME = "Approvers";
var userIsApprover = false;

// These are used for configuring the MEA Server with AppData. Once configured, may be removed.
var adminUsername = "administrator";
var adminPassword = "welcome";
var adminAuthToken;

var APP_ID = "Facility Inspection";
var APP_BASE64 = "UEsDBBQAAAAIANKFcEUeJM1XwgAAAGYBAAATAAAAYXBwSW5mb1xhcHBJbmZvLnhtbHWQzWrDMBCE 74G8g16gdnIXhuBiyMGhkJD7Rpk2ovpZVkqgb19bRqQtFJ008412VtrbHXO3XimlmcwnfWCI4il3 22aj299SoYh5f+0GMtbZ/KX2ITFMtjHodrEqdSCPf7liVvLtfnE23SDdaF/6KByFZlK94gEX2SNk dQL5En3SNX+GpAmfK09nW6iqFSYgHyEPSO8opWlKH5txXryp/X7W+0OXF6yJIal2uSSejNvRCPAU Be8QBIPrYB0WWbfL934DUEsDBBQAAAAIANKFcEXCcaueEAEAAGsBAAAaAAAAYXBwSW5mb1xidWls ZFxtYW5pZmVzdC54bWxVkM1ugkAAhO9N+g7eG7u7SGk1lMSi2yogbAUjvS2wILrLEuRPn76t4eJp Jpk5zHy6yOdl6dAiT9m5Nh4fRiM9zTm7uT9fUMEMWparIpVg0OdecB3ckqF1PlC0zbOC1k3FjI19 AQu2IqQ7CCWLPPpm+zGL5oHWTqplcrUkmG9fXO9koX2Y88D9tPvY/DGFB72ANdtmrex7/3sTHnMs z2myk0tadRjzj9ZUuIsr0vpOZ0lNOizFzjVj06xDX70quFbaWgbqI3gVNmkLYmGJqxDFPtdidX1R I8WNTjKCzYJMzSAk7zq43z4cSmjNdpTn/5oYCkTqGKEx0nwFzVRtNnl9gnAGoQ7uizd8YOCng3u2 v1BLAQIUABQAAAAIANKFcEUeJM1XwgAAAGYBAAATAAAAAAAAAAAAAAAAAAAAAABhcHBJbmZvXGFw cEluZm8ueG1sUEsBAhQAFAAAAAgA0oVwRcJxq54QAQAAawEAABoAAAAAAAAAAAAAAAAA8wAAAGFw cEluZm9cYnVpbGRcbWFuaWZlc3QueG1sUEsFBgAAAAACAAIAiQAAADsCAAAAAA==";

// MEA Data Replication
var MEAData;
document.addEventListener("deviceready",
    function () {
        MEAData = cordova.require("com.MiCo.MiApp.DataReplication.Plugin.MEADataPlugin");
    },
    false
);

var syncMessage = document.getElementById("syncMessage");
var DR_RESOURCENAME = "facility";
var DR_URLPREFIX = "DRS"
var DR_RESOURCEURL = buildDataReplicationURL();

var config = {
    name: "FacilityInspection",
    url: DR_RESOURCEURL,
    poll: 1,
    type: 0,
    authType: 100,
    auth: 100,
    authUser: "DRSReader1",
    authPass: "pass",
    baseUrl: "http://192.168.168.21/DRS"
};
var sqlQuery = "select name from facility";
var drAgent;
var drCache;
var drDb;
var drResult;
var drTotalFacilities = 0;

// MEA CONFIGURATION
var MEA_CONFIG;                // Set this to an object {}, if configuration objects are needed.

if (typeof MEA_CONFIG !== 'undefined') {

    MEA_CONFIG.authAdmin = function (success, fail) {
        // 1st - Get key pair
        MiCo.MiApp.MiJS.Services.Auth.getKeyPair(customer, adminUsername, NETSETTINGS,
            function (key) {
                // 2nd - encrypt password with key
                var requestedTokenExp = new Date(new Date().getTime() + MiCo.MiApp.MiJS.Tools.Security.defaultTokenExpirationDuration());
                var requestedTokenReq = MiCo.MiApp.MiJS.Tools.Security.defaultTokenRequests();
                var encryptedPassword = MiCo.MiApp.MiJS.Tools.Security.encryptRSA(password, key.HexM(), key.HexE());

                // 3rd - request an auth Token
                MiCo.MiApp.MiJS.Services.Auth.getAuthToken(customer, adminUsername, encryptedPassword, requestedTokenExp, requestedTokenReq, NETSETTINGS,
                    function (token) {
                        adminAuthToken = token;

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

    MEA_CONFIG.createApp = function (success, fail) {
        var foundApp = false;

        MiCo.MiApp.MiJS.Services.Sync.getApps(customer, adminAuthToken, adminUsername, false, NETSETTINGS,
            function (apps) {
                // Success
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].appId() == APP_ID) {
                        foundApp = true;
                        break;
                    }
                }
            },
            function (serverResponse) {
                if (fail) {
                    fail();
                }
            }
        );

        if (!foundApp) {
            // Upload the app...
            MiCo.MiApp.MiJS.Services.Sync.uploadAppViaString(customer, adminAuthToken, APP_BASE64, true, NETSETTINGS,
                function (appUploaded) {
                    if (success) {
                        success("App uploaded successfully. Assign App to correct group...");
                    }
                },
                function (serverResponse) {
                    if (fail) {
                        fail();
                    }
                }
            );

        }
        else {
            if (success) {
                success("App already exists.");
            }
        }
    }

    MEA_CONFIG.authAdmin(
        function () {
            MEA_CONFIG.createApp(
                function (msg) {
                    myApp.alert("App creation successful! " + msg);
                },
                function () {
                    myApp.alert("App creation failed!");
                }
            );
        },
        function () {
            myApp.alert("Admin authentication failed!");
        }
    );
}

function buildDataReplicationURL() {
    var url = "";

    if (SSL) {
        if (PORT == 443) {
            url = "https://" + HOSTNAME + "/";
        }
        else {
            url = "https://" + HOSTNAME + ":" + PORT + "/";
        }
    }
    else {
        if (PORT == 80) {
            url = "http://" + HOSTNAME + "/";
        }
        else {
            url = "http://" + HOSTNAME + ":" + PORT + "/";
        }
    }
    url += DR_URLPREFIX + "/" + customer + "/" + DR_RESOURCENAME;

    return url;
}


// Returns whether or not to Data Replication - use an embedded Facilities JSON database.
function useDataReplication() {
    // return !((window.navigator.userAgent.indexOf("iPad") > -1) || (window.navigator.userAgent.indexOf("iPhone") > -1));
    return true;    // Fixed data replication for iOS 11/27/2014
}