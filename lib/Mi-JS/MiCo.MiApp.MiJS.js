// The MiCo.MiApp.MiJS.App object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.App class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var App = (function () {
                /**
                * Creates an instance of an App
                * @constructs MiCo.MiApp.MiJS.App
                * @memberof MiCo.MiApp.MiJS
                * @param {string} appId The id of the App
                * @param {string} appName The name of the App
                * @param {string} appPublisher The publisher of the App
                * @param {string} appVersion The version of the App
                */
                function App(appId, appName, appPublisher, appVersion) {
                    /** @private */ this.manifest = [];
                    /** @private */ this._appId = appId;
                    /** @private */ this._appName = appName;
                    /** @private */ this._appVersion = appVersion;
                }
                /**
                * Gets or sets the id of the App
                *
                * @memberof MiCo.MiApp.MiJS.App
                * @param {string} value The id of the App to set. Set to undefined to retrieve the id.
                * @return {string} The id of the App
                */
                App.prototype.appId = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appId;
                    } else {
                        if (typeof value !== 'string') {
                            this._appId = '';
                        } else {
                            this._appId = value;
                        }
                    }
                };

                /**
                * Gets or sets the name of the App
                *
                * @memberof MiCo.MiApp.MiJS.App
                * @param {string} value The name of the App to set. Set to undefined to retrieve the name.
                * @return {string} The name of the App
                */
                App.prototype.appName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appName;
                    } else {
                        if (typeof value !== 'string') {
                            this._appName = '';
                        } else {
                            this._appName = value;
                        }
                    }
                };

                /**
                * Gets or sets the publisher of the App
                *
                * @memberof MiCo.MiApp.MiJS.App
                * @param {string} value The publisher of the App to set. Set to undefined to retrieve the publisher.
                * @return {string} The publisher of the App
                */
                App.prototype.appPublisher = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appPublisher;
                    } else {
                        if (typeof value !== 'string') {
                            this._appPublisher = '';
                        } else {
                            this._appPublisher = value;
                        }
                    }
                };

                /**
                * Gets or sets the version of the App
                *
                * @memberof MiCo.MiApp.MiJS.App
                * @param {string} value The version of the App to set. Set to undefined to retrieve the version.
                * @return {string} The version of the App
                */
                App.prototype.appVersion = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appVersion;
                    } else {
                        if (typeof value !== 'string') {
                            this._appVersion = '';
                        } else {
                            this._appVersion = value;
                        }
                    }
                };
                return App;
            })();
            MiJS.App = App;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Services.App object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Services.App class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.App */
                (function (App) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback contactServerFromAppSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.App
                    * @param {MiCo.MiApp.MiJS.ServerResponse} serverResponse A ServerResponse object sent from the serverContacted handler on the Server
                    */
                    /**
                    * For an app, uses the contactServer API for contacting the server which handles and returns a response
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.App
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The app id of the App
                    * @param {string} appVersion The version of the App
                    * @param {Array<string>} serverCommands A collection of commands to send to the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.App.contactServerFromAppSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function contactServerFromApp(customerName, token, appId, appVersion, serverCommands, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AppServices.asmx/ContactServerFromApp');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"appId":"' + MiCo.MiApp.MiJS.formatData(appId) + '"';
                        data += ',"appVersion":"' + MiCo.MiApp.MiJS.formatData(appVersion) + '"';

                        data += ',"serverCommands":[';
                        for (var i = 0; i < serverCommands.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(serverCommands[i]) + '"';
                            if (i !== serverCommands.length - 1) {
                                data += ',';
                            }
                        }
                        data += ']';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    callbackSuccess(svrResponse);
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    App.contactServerFromApp = contactServerFromApp;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback contactServerFromFormSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.App
                    * @param {MiCo.MiApp.MiJS.ServerResponse} serverResponse A ServerResponse object sent from the serverContacted handler on the Server
                    */
                    /**
                    * For a form, uses the contactServer API for contacting the server which handles and returns a response
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.App
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} sessionId The id of the Session
                    * @param {string} formId The form id
                    * @param {string} jsonData If the session should be populated from JSON, this parameter must be set to the JSON representation of the session. If this is not required, this parameter should be passed as an empty string.
                    * @param {string} serverCommand The command sent to the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.App.contactServerFromFormSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function contactServerFromForm(customerName, token, sessionId, formId, jsonData, serverCommand, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AppServices.asmx/ContactServerFromForm');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"sessionId":' + sessionId + '';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"jsonData":"' + MiCo.MiApp.MiJS.formatData(jsonData) + '"';
                        data += ',"serverCommand":"' + MiCo.MiApp.MiJS.formatData(serverCommand) + '"';

                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    callbackSuccess(svrResponse);
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    App.contactServerFromForm = contactServerFromForm;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback createAuditEntrySuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.App
                    * @param {bool} entryAdded An indication of whether the audit entry was successfully uploaded to the Server
                    */
                    /**
                    * Creates a new audit history entry for an App
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.App
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The id of the App
                    * @param {string} auditEvent The audit event (The broad category of the audit entry)
                    * @param {number} significance The significance of the audit entry (100 is normal)
                    * @param {string} auditDetails Details about the specifics of the audit entry
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.App.createAuditEntrySuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function createAuditEntry(customerName, token, appId, auditEvent, significance, auditDetails, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AppServices.asmx/CreateAuditEntry');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"appId":' + MiCo.MiApp.MiJS.formatData(appId) + '';
                        data += ',"auditEvent":"' + MiCo.MiApp.MiJS.formatData(auditEvent) + '"';
                        data += ',"significance":' + significance + '';
                        data += ',"auditDetails":"' + MiCo.MiApp.MiJS.formatData(auditDetails) + '"';

                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    callbackSuccess(svrResponse.BoolData);
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    App.createAuditEntry = createAuditEntry;
                })(Services.App || (Services.App = {}));
                var App = Services.App;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Tools.Security object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Tools.Security class for the Mi-JS API

var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @namespace MiCo.MiApp.MiJS.Tools */
            (function (Tools) {
                /** @namespace MiCo.MiApp.MiJS.Tools.Security */
                (function (Security) {
                    /**
                    * Retrieves the default Token expiration duration (hours)
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Tools.Security
                    * @return {number} The default Token expiration duration (hours)
                    */
                    function defaultTokenExpirationDuration() {
                        return 60 * 60 * 1000;
                    }
                    Security.defaultTokenExpirationDuration = defaultTokenExpirationDuration;

                    /**
                    * Retrieves the default Token requests amount
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Tools.Security
                    * @return {number} The default Token request amount
                    */
                    function defaultTokenRequests() {
                        return 100;
                    }
                    Security.defaultTokenRequests = defaultTokenRequests;

                    /**
                    * Encrypts plain text using an AES key
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Tools.Security
                    * @param {string} plainText The plain text to encrypt
                    * @param {string} key The AES string
                    * @return {any} The encrypted result
                    */
                    function encryptAES(plainText, key) {
                        if (typeof plainText !== 'string') {
                            throw 'plainText must be a string';
                            return;
                        }
                        if (typeof key !== 'string') {
                            throw 'key must be a string';
                            return;
                        }

                        //if (typeof salt !== 'string') {
                        //    throw 'salt must be a string';
                        //    return;
                        //}
                        //if (typeof iv !== 'string') {
                        //    throw 'iv must be a string';
                        //    return;
                        //}
                        var aes_salt = '7a25f9132ec6a8b347781157e2629b094f0e3dd48c4d786115';
                        var encrypted;

                        encrypted = CryptoJS.AES.encrypt(plainText + aes_salt, key, { format: JsonFormatter });

                        return encrypted;
                    }
                    Security.encryptAES = encryptAES;

                    /**
                    * Decrypts an encrypted object using an AES key
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Tools.Security
                    * @param {any} encrypted The encrypted object
                    * @param {string} key The AES string
                    * @return {string} The decrypted result
                    */
                    function decryptAES(encrypted, key) {
                        if (typeof encrypted !== 'object') {
                            throw 'encrypted must be an object';
                            return;
                        }
                        if (typeof key !== 'string') {
                            throw 'key must be a string';
                            return;
                        }

                        //if (typeof salt !== 'string') {
                        //    throw 'salt must be a string';
                        //    return;
                        //}
                        //if (typeof iv !== 'string') {
                        //    throw 'iv must be a string';
                        //    return;
                        //}
                        var aes_salt = '7a25f9132ec6a8b347781157e2629b094f0e3dd48c4d786115';
                        var decryptedData;

                        decryptedData = CryptoJS.AES.decrypt(encrypted, key, { format: JsonFormatter });

                        var saltyText = decryptedData.toString(CryptoJS.enc.Utf8);
                        return saltyText.substr(0, saltyText.length - aes_salt.length);
                    }
                    Security.decryptAES = decryptAES;

                    /**
                    * Encrypts plain text using RSA public key
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Tools.Security
                    * @param {string} plainText The plain text to encrypt
                    * @param {string} mHex The Modulus in hex format
                    * @param {string} eHex The Exponent in hex format
                    * @return {string} The encrypted result
                    */
                    function encryptRSA(plainText, mHex, eHex) {
                        if (typeof plainText !== 'string') {
                            throw 'plainText must be a string';
                            return;
                        }
                        if (typeof mHex !== 'string') {
                            throw 'mHex must be a string';
                            return;
                        }
                        if (typeof eHex !== 'string') {
                            throw 'eHex must be a string';
                            return;
                        }

                        var key;
                        var cryptHexString;

                        setMaxDigits(131); // For some reason, 128 here didn't work.

                        key = new RSAKeyPair(eHex, "", mHex);
                        cryptHexString = encryptedString(key, plainText);

                        return cryptHexString;
                    }
                    Security.encryptRSA = encryptRSA;
                })(Tools.Security || (Tools.Security = {}));
                var Security = Tools.Security;
            })(MiJS.Tools || (MiJS.Tools = {}));
            var Tools = MiJS.Tools;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.NetworkSettings object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.NetworkSettings class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var NetworkSettings = (function () {
                /**
                * Creates an instance of NetworkSettings
                * @constructs MiCo.MiApp.MiJS.NetworkSettings
                * @memberof MiCo.MiApp.MiJS
                * @param {string} hostname The hostname
                * @param {number} port The port
                * @param {string} urlPrefix The URL Prefix
                * @param {boolean} ssl An indication of whether to use a secure connection (SSL)
                */
                function NetworkSettings(hostname, port, urlPrefix, ssl) {
                    /** @private */ this._port = 80;
                    /** @private */ this._urlPrefix = "MFS";
                    /** @private */ this._ssl = false;
                    if (typeof hostname !== 'string') {
                        throw 'hostname must be a string';
                    }
                    if ((typeof port !== 'number') && (typeof port !== 'undefined')) {
                        throw 'port must be a number';
                    }
                    if ((typeof urlPrefix !== 'string') && (typeof port !== 'undefined')) {
                        throw 'urlPrefix must be a string';
                    }
                    if ((typeof ssl !== 'boolean') && (typeof port !== 'undefined')) {
                        throw 'ssl must be a boolean';
                    }

                    /** @private */ this._hostname = hostname;
                    if (typeof port !== 'undefined') {
                        /** @private */ this._port = port;
                    }
                    if (typeof urlPrefix !== 'undefined') {
                        /** @private */ this._urlPrefix = urlPrefix;
                    }
                    if (typeof ssl !== 'undefined') {
                        /** @private */ this._ssl = ssl;
                    }
                }
                /**
                * Gets or sets the hostname of the NetworkSettings
                *
                * @memberof MiCo.MiApp.MiJS.NetworkSettings
                * @param {string} value The hostname of the NetworkSettings to set. Set to undefined to retrieve the value.
                * @return {string} The hostname of the NetworkSettings
                */
                NetworkSettings.prototype.hostname = function (value) {
                    if (typeof value == 'undefined') {
                        return this._hostname;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'hostname must be a string';
                            return;
                        } else {
                            this._hostname = value;
                        }
                    }
                };

                /**
                * Gets or sets the port of the NetworkSettings
                *
                * @memberof MiCo.MiApp.MiJS.NetworkSettings
                * @param {number} value The port of the NetworkSettings to set. Set to undefined to retrieve the value.
                * @return {number} The port of the NetworkSettings
                */
                NetworkSettings.prototype.port = function (value) {
                    if (typeof value == 'undefined') {
                        return this._port;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'port must be a number';
                            return;
                        } else {
                            this._port = value;
                        }
                    }
                };

                /**
                * Gets or sets the URL Prefix of the NetworkSettings
                *
                * @memberof MiCo.MiApp.MiJS.NetworkSettings
                * @param {string} value The URL Prefix of the NetworkSettings to set. Set to undefined to retrieve the value.
                * @return {string} The URL Prefix of the NetworkSettings
                */
                NetworkSettings.prototype.urlPrefix = function (value) {
                    if (typeof value == 'undefined') {
                        return this._urlPrefix;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'urlPrefix must be a string';
                            return;
                        } else {
                            this._urlPrefix = value;
                        }
                    }
                };

                /**
                * Gets or sets the SSL setting of the NetworkSettings
                *
                * @memberof MiCo.MiApp.MiJS.NetworkSettings
                * @param {boolean} value The SSL setting of the NetworkSettings to set. Set to undefined to retrieve the value.
                * @return {boolean} The SSL setting of the NetworkSettings
                */
                NetworkSettings.prototype.ssl = function (value) {
                    if (typeof value == 'undefined') {
                        return this._ssl;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'ssl must be a boolean';
                            return;
                        } else {
                            this._ssl = value;
                        }
                    }
                };

                /**
                * Constructs a URL based on settings in the NetworkSettings
                * @function
                * @memberof MiCo.MiApp.MiJS.NetworkSettings
                * @param {string} service The name of the service to use on the Server
                * @return {string} url The constructed url
                */
                NetworkSettings.prototype.constructUrl = function (service) {
                    var url;

                    // Construct the url
                    if (this._ssl) {
                        url = 'https://';
                    } else {
                        url = 'http://';
                    }
                    url += this._hostname;
                    if (this._port != 80) {
                        url += ':' + this._port.toString();
                    }
                    if (this._urlPrefix.length > 0) {
                        url += '/' + this._urlPrefix;
                    }
                    url += '/' + service;

                    return url;
                };
                return NetworkSettings;
            })();
            MiJS.NetworkSettings = NetworkSettings;

            /**
            * Formats strings data for communication with the Server
            * @function
            * @memberof MiCo.MiApp.MiJS
            * @param {string} data The string data to send to the Server
            * @return {string} formattedData The formatted string data
            */
            function formatData(data) {
                return data.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
            }
            MiJS.formatData = formatData;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Services.Auth object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Services.Auth class for the Mi-JS API
/** @namespace MiCo */
var MiCo;
(function (MiCo) {
    /** @namespace MiCo.MiApp */
    (function (MiApp) {
        /** @namespace MiCo.MiApp.MiJS */
        (function (MiJS) {
            /** @namespace MiCo.MiApp.MiJS.Services */
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.Auth */
                (function (Auth) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback authenticateUserSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.User} user A user object containing information about the user
                    * @param {MiCo.MiApp.MiJS.Token} token The token object returned from the Server
                    */
                    /**
                    * Authenticates a user by obtaining a public key and then token
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {string} username The username of the user requesting authentication
                    * @param {string} password The password of the user requesting authentication
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used when communicating with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.authenticateUserSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    * @param {Date} requestedTokenExpiration The expiration date for the requested token
                    * @param {number} requestedTokenRequests The number of requests for the requested token
                    */
                    function authenticateUser(customerName, username, password, networkSettings, callbackSuccess, callbackError, requestedTokenExpiration, requestedTokenRequests) {
                        // 1st - retrieve an RSA key
                        getKeyPair(customerName, username, networkSettings, function (key) {
                            // 2nd - encrypt password with key
                            var encryptedPassword = MiCo.MiApp.MiJS.Tools.Security.encryptRSA(password, key.HexM(), key.HexE());

                            var requestedTokenExp;
                            var requestedTokenReq;
                            if (typeof requestedTokenExpiration == 'undefined') {
                                requestedTokenExp = new Date(new Date().getTime() + MiCo.MiApp.MiJS.Tools.Security.defaultTokenExpirationDuration());
                            } else {
                                requestedTokenExp = requestedTokenExpiration;
                            }

                            if (typeof requestedTokenRequests == 'undefined') {
                                requestedTokenReq = MiCo.MiApp.MiJS.Tools.Security.defaultTokenRequests();
                            } else {
                                requestedTokenReq = requestedTokenRequests;
                            }

                            // 3rd - request an auth Token
                            getAuthToken(customerName, username, encryptedPassword, requestedTokenExp, requestedTokenReq, networkSettings, function (token) {
                                // 4th - request user info
                                getUserInformation(customerName, token, username, networkSettings, function (user) {
                                    // Success
                                    if (typeof callbackSuccess !== 'undefined') {
                                        callbackSuccess(user, token);
                                    }
                                }, function (serverResponse) {
                                    // Fail
                                    if (typeof callbackError !== 'undefined') {
                                        callbackError(serverResponse);
                                    }
                                });
                            }, function (serverResponse) {
                                // Fail - getAuthToken
                                if (typeof callbackError !== 'undefined') {
                                    callbackError(serverResponse);
                                }
                            });
                        }, function (serverResponse) {
                            // Fail - getKeyPair
                            if (typeof callbackError !== 'undefined') {
                                callbackError(serverResponse);
                            }
                        });
                    }
                    Auth.authenticateUser = authenticateUser;

                    /**
                    * This callback is displayed as part of the Requester class error.
                    * @callback errorCallback
                    * @memberof MiCo.MiApp.MiJS.Services
                    * @param {MiCo.MiApp.MiJS.ServerResponse} serverResponse The ServerResponse object containing information regarding a request that resulted in an error
                    * @seee MiCo.MiApp.MiJS.ServerResponse
                    */
                    /**
                    * This callback is executed upon a successful response and result from the Server
                    * @callback getKeyPairSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.Key} key The public key obtained from the Server
                    */
                    /**
                    * Gets a public key from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getKeyPairSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getKeyPair(customerName, userName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetKeyPair');

                        // Construct the data
                        var data = "{'customerName':'" + MiCo.MiApp.MiJS.formatData(customerName) + "','userName':'" + MiCo.MiApp.MiJS.formatData(userName) + "'}";

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    // Create and return an (auth) Token
                                    var key = new MiCo.MiApp.MiJS.Key(svrResponse.Key.HexE, svrResponse.Key.HexM, svrResponse.Key.XML);

                                    callbackSuccess(key);
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail - GetKeyPair
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getKeyPair = getKeyPair;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAuthTokenSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.Token} token The token object returned from the Server
                    */
                    /**
                    * Gets an authentication token from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {string} userName The username of the user making the token request
                    * @param {string} encryptedPassword The encrypted password for the user making the token request
                    * @param {Date} requestedTokenExpiration The expiration date for the requested token
                    * @param {number} requestedTokenRequests The number of requests for the requested token
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getAuthTokenSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAuthToken(customerName, userName, encryptedPassword, requestedTokenExpiration, requestedTokenRequests, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetAuthToken');

                        // Construct the data
                        var data = "{'customerName':'" + MiCo.MiApp.MiJS.formatData(customerName);
                        data += "','userName':'" + MiCo.MiApp.MiJS.formatData(userName);
                        data += "','encryptedPassword':'" + MiCo.MiApp.MiJS.formatData(encryptedPassword);
                        data += "','requestedTokenExpiration':'" + requestedTokenExpiration.toUTCString();
                        data += "','requestedTokenRequests':'" + requestedTokenRequests;
                        data += "'}";

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success - GetAuthToken
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    // Create and return an (auth) Token
                                    var authToken = new MiCo.MiApp.MiJS.Token(svrResponse.Token.TokenValue, new Date(Date.parse(svrResponse.Token.TokenExpiration)), svrResponse.Token.AllowedTokenRequests);
                                    callbackSuccess(authToken);
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail - GetAuthToken
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getAuthToken = getAuthToken;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getUserInformationSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.User} user The user object returned from the Server
                    */
                    /**
                    * Gets information for a user from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getUserInformationSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getUserInformation(customerName, token, userName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetUserInformation');

                        // Construct the data
                        var data = "{'customerName':'" + MiCo.MiApp.MiJS.formatData(customerName);
                        data += "','userName':'" + MiCo.MiApp.MiJS.formatData(userName);
                        data += "','token':'" + token.tokenValue();
                        data += "'}";

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success - GetAuthToken
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    // Create and return the user
                                    if (typeof svrResponse.ServerCredentials !== 'undefined') {
                                        var user = new MiCo.MiApp.MiJS.User(1, svrResponse.ServerCredentials.UserName, svrResponse.ServerCredentials.FirstName, svrResponse.ServerCredentials.MiddleName, svrResponse.ServerCredentials.LastName);
                                        if (typeof svrResponse.ServerCredentials.Email !== 'undefined') {
                                            if (svrResponse.ServerCredentials.Email !== null) {
                                                user.email(svrResponse.ServerCredentials.Email);
                                            }
                                        }
                                        callbackSuccess(user);
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail - GetAuthToken
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getUserInformation = getUserInformation;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getServerConnectionSpeedSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} outData Text response from the Server representing the same number of characters as the request; with a maximum of .
                    */
                    /**
                    * Gets connection speed information while connecting with the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} inData Content to send to the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getServerConnectionSpeedSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getServerConnectionSpeed(customerName, token, inData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetServerConnectionSpeed');

                        // Construct the data
                        var data = "{'customerName':'" + MiCo.MiApp.MiJS.formatData(customerName);
                        data += "','token':'" + token.tokenValue();
                        data += "','inData':'" + MiCo.MiApp.MiJS.formatData(inData);
                        data += "'}";

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success - GetServerConnectionSpeed
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        callbackSuccess(svrResponse.StringData);
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail - GetServerConnectionSpeed
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getServerConnectionSpeed = getServerConnectionSpeed;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getServerInformationSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.ServerInformation} serverInformation A ServerInformation object from the Server
                    */
                    /**
                    * Gets server information from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getServerInformationSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getServerInformation(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetServerInformation');

                        // Construct the data
                        var data = "{'customerName':'" + MiCo.MiApp.MiJS.formatData(customerName);
                        data += "','token':'" + token.tokenValue();
                        data += "'}";

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success - getServerInformation
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.ServerInformation !== 'undefined') {
                                        var serverInformation = new MiCo.MiApp.MiJS.ServerInformation(svrResponse.ServerInformation.Version);
                                        callbackSuccess(serverInformation);
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail - getServerInformation
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getServerInformation = getServerInformation;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addUserSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} userAdded A boolean indicating whether the user was successfully added
                    */
                    /**
                    * Adds a user to a Customer on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} newUserName The username for the new user
                    * @param {string} newUserPassword The plaintext password for the new user
                    * @param {string} newUserFirstName The first name for the new user
                    * @param {string} newUserMiddleName The middle name for the new user
                    * @param {string} newUserLastName The last name for the new user
                    * @param {MiCo.MiApp.MiJS.demographicField[]} demographicFields The demographic fields for the new user
                    * @param {string[]} groups The group memberships for the new user
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.addUserSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addUser(customerName, token, newUserName, newUserPassword, newUserFirstName, newUserMiddleName, newUserLastName, newUserDemographics, newUserGroups, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/AddUser');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","newUserName":"' + MiCo.MiApp.MiJS.formatData(newUserName);
                        data += '","newUserPassword":"' + MiCo.MiApp.MiJS.formatData(newUserPassword);
                        data += '","newUserFirstName":"' + MiCo.MiApp.MiJS.formatData(newUserFirstName);
                        data += '","newUserMiddleName":"' + MiCo.MiApp.MiJS.formatData(newUserMiddleName);
                        data += '","newUserLastName":"' + MiCo.MiApp.MiJS.formatData(newUserLastName);
                        data += '","newUserDemographics":[';
                        for (var i = 0; i < newUserDemographics.length; i++) {
                            data += '{"Name":"' + MiCo.MiApp.MiJS.formatData(newUserDemographics[i].name());
                            data += '","Description":"' + MiCo.MiApp.MiJS.formatData(newUserDemographics[i].description());
                            data += '","Required":' + MiCo.MiApp.MiJS.formatData(newUserDemographics[i].required().toString());
                            data += ',"Value":"' + MiCo.MiApp.MiJS.formatData(newUserDemographics[i].value()) + '"}';
                            if (i !== newUserDemographics.length - 1) {
                                data += ',';
                            }
                        }
                        data += '],"newUserGroups":[';
                        for (var i = 0; i < newUserGroups.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(newUserGroups[i]) + '"';
                            if (i !== newUserGroups.length - 1) {
                                data += ',';
                            }
                        }

                        data += ']}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);
                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        var added = svrResponse.BoolData;

                                        if (added) {
                                            callbackSuccess(added);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Fail
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.addUser = addUser;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAllowPasswordChangeSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} changeAllowed A boolean indicating whether the user is allowed change their password
                    */
                    /**
                    * Gets whether a user is allowed to change their password
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getAllowPasswordChangeSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAllowPasswordChange(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetAllowPasswordChange');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getAllowPasswordChange = getAllowPasswordChange;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getUserDemographicFieldsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {MiCo.MiApp.MiJS.demographicField[]} userDemographics An array of user demographicFields for the user
                    * @see MiCo.MiApp.MiJS.demographicField
                    */
                    /**
                    * Gets a user's demographic fields from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getUserDemographicFieldsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getUserDemographicFields(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetUserDemographicFields');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Demographics !== 'undefined') {
                                        if (svrResponse.Demographics !== null) {
                                            var userDemographics = [];
                                            for (var i = 0; i < svrResponse.Demographics.length; i++) {
                                                var userDemographic = new MiCo.MiApp.MiJS.DemographicField(svrResponse.Demographics[i].Name, svrResponse.Demographics[i].Description, svrResponse.Demographics[i].Required, svrResponse.Demographics[i].Value);
                                                userDemographics.push(userDemographic);
                                            }
                                            callbackSuccess(userDemographics);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getUserDemographicFields = getUserDemographicFields;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setPasswordSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} passwordSet A boolean indicated whether the user's password was successfully set
                    */
                    /**
                    * Sets a user's password
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} userName The username for the existing user
                    * @param {string} newPassword The new plaintext password for the user
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setPasswordSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setPassword(customerName, token, userName, newPassword, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetPassword');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","newPassword":"' + MiCo.MiApp.MiJS.formatData(newPassword);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setPassword = setPassword;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setPasswordRequirementsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} requirementsSet A boolean indicated whether the user's password requirements were successfully set
                    */
                    /**
                    * Sets password requirements for a user on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} userName The username for the existing user
                    * @param {boolean} mustChangePassword Indicates whether the user must change their password
                    * @param {number} previousPasswordMatches The number of previous passwords for the user with which if a match occurs, a new password change request is rejected
                    * @param {boolean} passwordExpirationRequired Whether or not a password may expire
                    * @param {Date} passwordExpirationDate The date when the user's password will expire
                    * @param {number} maxLoginFailures The maximum number of login failures allowed before a user's account is locked
                    * @param {number} hoursToLock The number of hours to lock a user's account before it is unlocked
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setPasswordRequirementsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setPasswordRequirements(customerName, token, userName, mustChangePassword, previousPasswordMatches, passwordExpirationRequired, passwordExpirationDate, maxLoginFailures, hoursToLock, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetPasswordRequirements');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","mustChangePassword":' + mustChangePassword.toString();
                        data += ',"previousPasswordMatches":' + previousPasswordMatches;
                        data += ',"passwordExpirationRequired":' + passwordExpirationRequired.toString();
                        data += ',"passwordExpirationDate":"' + passwordExpirationDate.toUTCString();
                        data += '","maxLoginFailures":' + maxLoginFailures;
                        data += ',"hoursToLock":' + hoursToLock;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setPasswordRequirements = setPasswordRequirements;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setUserActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} statusSet A boolean indicated whether the user's active status was successfully set
                    */
                    /**
                    * Sets a user's active status on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} userName The username for the existing user
                    * @param {boolean} isActive Indicates whether or not the user is active
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setUserActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setUserActiveStatus(customerName, token, userName, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetUserActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setUserActiveStatus = setUserActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setUserDemographicsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} demographicsSet A boolean indicated whether the user's demographics were successfully set
                    */
                    /**
                    * Sets a user's demographics information on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {Array<MiCo.MiApp.MiJS.demographicField>} userDemographics An array of the user's demographic information
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setUserDemographicsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setUserDemographics(customerName, token, userName, userDemographics, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetUserDemographics');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","userDemographics":[';

                        for (var i = 0; i < userDemographics.length; i++) {
                            data += '{"Name":"' + MiCo.MiApp.MiJS.formatData(userDemographics[i].name());
                            data += '","Description":"' + MiCo.MiApp.MiJS.formatData(userDemographics[i].description());
                            data += '","Required":' + userDemographics[i].required().toString();
                            data += ',"Value":"' + MiCo.MiApp.MiJS.formatData(userDemographics[i].value()) + '"}';
                            if (i !== userDemographics.length - 1) {
                                data += ',';
                            }
                        }

                        data += ']}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setUserDemographics = setUserDemographics;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setUserLockStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} statusSet A boolean indicating whether the user's lock status was successfully set
                    */
                    /**
                    * Sets a user's lock status on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {boolean} isLocked An indication of whether to lock or unlock a user's account on the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setUserLockStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setUserLockStatus(customerName, token, userName, isLocked, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetUserLockStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","isLocked":' + isLocked.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setUserLockStatus = setUserLockStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setUsernameSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} usernameSet A boolean indicating whether the user's username was successfully set
                    */
                    /**
                    * Sets a user's username on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} username The user's current username
                    * @param {string} newUserName The user's new username
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setUsernameSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setUsername(customerName, token, userName, newUserName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetUsername');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","newUserName":"' + MiCo.MiApp.MiJS.formatData(newUserName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setUsername = setUsername;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAllGroupsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<MiCo.MiApp.MiJS.Group>} groups An array of Groups from the Server
                    */
                    /**
                    * Gets a collection of all groups on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getAllGroupsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAllGroups(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetAllGroups');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Groups !== 'undefined') {
                                        if (svrResponse.Groups !== null) {
                                            var groups = [];
                                            for (var i = 0; i < svrResponse.Groups.length; i++) {
                                                var newGroup = new MiCo.MiApp.MiJS.Group(svrResponse.Groups[i].Name, svrResponse.Groups[i].Active);

                                                groups.push(newGroup);
                                            }

                                            callbackSuccess(groups);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getAllGroups = getAllGroups;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupsForUserSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<MiCo.MiApp.MiJS.Group>} groups An array of Groups from the Server
                    */
                    /**
                    * Gets a collection of groups for a user on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request
                    * @param {string} userName The username of the user for whom to request group membership
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupsForUserSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupsForUser(customerName, token, userName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupsForUser');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var groups = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                groups.push(svrResponse.StringDataArray[i]);
                                            }

                                            callbackSuccess(groups);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupsForUser = getGroupsForUser;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} groupAdded An indication of whether the Group was added on the Server
                    */
                    /**
                    * Adds a new group to the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {Array<MiCo.MiApp.MiJS.demographicField>} groupDemographics The array of demographicFields for the Group
                    * @param {Array<string>} privilegeList The array of privileges for the Group
                    * @param {Array<string>} userList The array of users who will be members of the Group
                    * @param {Array<string>} templateList The array of form templates for the Group
                    * @param {Array<string>} appList The array of apps (appId) for the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.addGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addGroup(customerName, token, groupName, groupDemographics, privilegeList, userList, templateList, appList, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/AddGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '","groupDemographics":[';
                        for (var i = 0; i < groupDemographics.length; i++) {
                            data += '{"Name":"' + MiCo.MiApp.MiJS.formatData(groupDemographics[i].name());
                            data += '","Description":"' + MiCo.MiApp.MiJS.formatData(groupDemographics[i].description());
                            data += '","Required":' + groupDemographics[i].required().toString();
                            data += ',"Value":"' + MiCo.MiApp.MiJS.formatData(groupDemographics[i].value()) + '"}';
                            if (i !== groupDemographics.length - 1) {
                                data += ',';
                            }
                        }

                        data += '],"privilegeList":[';
                        for (var i = 0; i < privilegeList.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(privilegeList[i]) + '"';
                            if (i !== privilegeList.length - 1) {
                                data += ',';
                            }
                        }

                        data += '],"userList":[';
                        for (var i = 0; i < userList.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(userList[i]) + '"';
                            if (i !== userList.length - 1) {
                                data += ',';
                            }
                        }

                        data += '],"templateList":[';
                        for (var i = 0; i < templateList.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(templateList[i]) + '"';
                            if (i !== templateList.length - 1) {
                                data += ',';
                            }
                        }

                        data += '],"appList":[';
                        for (var i = 0; i < appList.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(appList[i]) + '"';
                            if (i !== appList.length - 1) {
                                data += ',';
                            }
                        }

                        data += ']}';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.addGroup = addGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} active An indication of the Group's active status on the Server
                    */
                    /**
                    * Gets a group's active status from the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupActiveStatus(customerName, token, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupActiveStatus = getGroupActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setGroupActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} statusSet An indication of whether the Group's active status was set successfully on the Server
                    */
                    /**
                    * Sets a group's active status on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {boolean} isActive The group's active status to set
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setGroupActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setGroupActiveStatus(customerName, token, groupName, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetGroupActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '","isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setGroupActiveStatus = setGroupActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setGroupNameSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} nameSet An indication of whether the Group's name was set successfully on the Server
                    */
                    /**
                    * Sets a group's name on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {string} newGroupName The group's new name to set
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setGroupNameSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setGroupName(customerName, token, groupName, newGroupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetGroupName');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '","newGroupName":"' + MiCo.MiApp.MiJS.formatData(newGroupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setGroupName = setGroupName;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getUsersInGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} users An array of usernames for users who are members of the group on the Server
                    */
                    /**
                    * Gets an array of users who are members of a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getUsersInGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getUsersInGroup(customerName, token, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetUsersInGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var users = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                users.push(svrResponse.StringDataArray[i]);
                                            }
                                            callbackSuccess(users);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getUsersInGroup = getUsersInGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getPrivilegesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} privileges An array of privilege names for group members on the Server
                    */
                    /**
                    * Gets an array of all possible privileges for group members on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getPrivilegesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getPrivileges(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetPrivileges');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var privileges = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                privileges.push(svrResponse.StringDataArray[i]);
                                            }
                                            callbackSuccess(privileges);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getPrivileges = getPrivileges;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupPrivilegesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} privileges An array of privilege names for the indicated group on the Server
                    */
                    /**
                    * Gets an array of privileges for a single group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupPrivilegesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupPrivileges(customerName, token, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupPrivileges');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var privileges = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                privileges.push(svrResponse.StringDataArray[i]);
                                            }
                                            callbackSuccess(privileges);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupPrivileges = getGroupPrivileges;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setGroupPrivilegesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} privilegesSet An indication of whether privileges were set for a Group on the Server
                    */
                    /**
                    * Sets an array of privileges for a single group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {Array<string>} groupPrivileges The array of privilege names to set for the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.setGroupPrivilegesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setGroupPrivileges(customerName, token, groupName, groupPrivileges, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/SetGroupPrivileges');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '","groupPrivileges":[';
                        for (var i = 0; i < groupPrivileges.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(groupPrivileges[i]) + '"';
                            if (i !== groupPrivileges.length - 1) {
                                data += ',';
                            }
                        }
                        data += ']}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.setGroupPrivileges = setGroupPrivileges;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupAppsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} apps An array of Apps (appId) for a Group on the Server
                    */
                    /**
                    * Gets an array of Apps for a single group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {boolean} includeInactive An indication of whether to include inactive Apps in the response
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupAppsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupApps(customerName, token, groupName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupApps');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"groupName":"' + MiCo.MiApp.MiJS.formatData(groupName) + '"';
                        data += ',"includeInactive":' + includeInactive.toString();
                        data += '}';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var apps = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                apps.push(svrResponse.StringDataArray[i]);
                                            }
                                            callbackSuccess(apps);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupApps = getGroupApps;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupFormTemplatesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} apps An array of Form Templates (formId) for a Group on the Server
                    */
                    /**
                    * Gets an array of Form Templates for a single group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} groupName The name of the Group
                    * @param {boolean} includeInactive An indication of whether to include inactive Form Templates in the response
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupFormTemplatesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupFormTemplates(customerName, token, groupName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupFormTemplates');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"groupName":"' + MiCo.MiApp.MiJS.formatData(groupName) + '"';
                        data += ',"includeInactive":' + includeInactive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var forms = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                forms.push(svrResponse.StringDataArray[i]);
                                            }
                                            callbackSuccess(forms);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupFormTemplates = getGroupFormTemplates;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addUserToGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} userAdded An indication of whether a user was successfully added to a Group on the Server
                    */
                    /**
                    * Adds a user to a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} userName The name of the User
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.addUserToGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addUserToGroup(customerName, token, userName, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/AddUserToGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.addUserToGroup = addUserToGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeUserFromGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} userRemoved An indication of whether a user was successfully removed from a Group on the Server
                    */
                    /**
                    * Removes a user from a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} userName The name of the User
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.removeUserFromGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeUserFromGroup(customerName, token, userName, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/RemoveUserFromGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","userName":"' + MiCo.MiApp.MiJS.formatData(userName);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.removeUserFromGroup = removeUserFromGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addAppToGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} appAdded An indication of whether an App was successfully added to a Group on the Server
                    */
                    /**
                    * Adds an App to a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} appId The appId of the App
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.addAppToGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addAppToGroup(customerName, token, appId, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/AddAppToGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","appId":"' + MiCo.MiApp.MiJS.formatData(appId);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.addAppToGroup = addAppToGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeAppFromGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} appRemoved An indication of whether an App was successfully removed from a Group on the Server
                    */
                    /**
                    * Removes an App from a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} appId The appId of the App
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.removeAppFromGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeAppFromGroup(customerName, token, appId, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/RemoveAppFromGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","appId":"' + MiCo.MiApp.MiJS.formatData(appId);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.removeAppFromGroup = removeAppFromGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addFormTemplateToGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} formAdded An indication of whether a Form Template was successfully added to a Group on the Server
                    */
                    /**
                    * Adds a Form Template to a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} formId The formId of the Form Template
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.addFormTemplateToGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addFormTemplateToGroup(customerName, token, formId, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/AddFormTemplateToGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","formId":"' + MiCo.MiApp.MiJS.formatData(formId);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.addFormTemplateToGroup = addFormTemplateToGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeFormTemplateFromGroupSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {boolean} formRemoved An indication of whether a Form Template was successfully removed from a Group on the Server
                    */
                    /**
                    * Removes a Form Template from a group on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {string} formId The formId of the Form Template
                    * @param {string} groupName The name of the Group
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.removeFormTemplateFromGroupSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeFormTemplateFromGroup(customerName, token, formId, groupName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/RemoveFormTemplateFromGroup');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '","formId":"' + MiCo.MiApp.MiJS.formatData(formId);
                        data += '","groupName":"' + MiCo.MiApp.MiJS.formatData(groupName);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.removeFormTemplateFromGroup = removeFormTemplateFromGroup;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGroupDemographicFieldsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Auth
                    * @param {Array<string>} demographics An array of demographic fields available for Groups on the Server
                    */
                    /**
                    * Gets an array of demographic fields available for all Groups on the Server
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Auth
                    * @param {string} customerName The name of the customer
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use for this request; user must be an administrator
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to be used for communication with the Server
                    * @param {MiCo.MiApp.MiJS.Services.Auth.getGroupDemographicFieldsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGroupDemographicFields(customerName, token, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/AuthServices.asmx/GetGroupDemographicFields');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue());
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Demographics !== 'undefined') {
                                        if (svrResponse.Demographics !== null) {
                                            var demographics = [];
                                            for (var i = 0; i < svrResponse.Demographics.length; i++) {
                                                demographics.push(svrResponse.Demographics[i]);
                                            }

                                            callbackSuccess(demographics);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Auth.getGroupDemographicFields = getGroupDemographicFields;
                })(Services.Auth || (Services.Auth = {}));
                var Auth = Services.Auth;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// 07/14/2014   David Nakamura      Reference declarations      Work Item to finish Mi-JS   Removed unneeded reference declarations
// The MiCo.MiApp.MiJS.ServerResponse object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.ServerResponse class for the Mi-JS API
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            var SERVER_ERROR_TYPE = 'ServerError';
            var AUTHENTICATION_ERROR_TYPE = 'AuthenticationError';
            var EXPECTED_ERROR_TYPE = 'ExpectedError';
            var INTERNAL_ERROR_TYPE = 'InternalError';
            var NETWORK_ERROR_TYPE = 'NetworkError';

            /**
            * @class */
            var ServerResponse = (function () {
                /**
                * @constructs MiCo.MiApp.MiJS.ServerResponse
                * @memberof MiCo.MiApp.MiJS
                */
                function ServerResponse() {
                    /** @private */ this._success = false;
                }
                /**
                * Gets or sets the success property.
                *
                * @memberof MiCo.MiApp.MiJS.ServerResponse
                * @param {boolean} Sets success true if true, or false if false.
                * @return {boolean} success status of the server response
                */
                ServerResponse.prototype.success = function (value) {
                    if (typeof value == 'undefined') {
                        return this._success;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'success must be a boolean';
                            return;
                        } else {
                            this._success = value;
                        }
                    }
                };

                /**
                * Gets or sets the ServerError object property of the server response.
                *
                * @memberof MiCo.MiApp.MiJS.ServerResponse
                * @param {any} Sets the ServerError object of the server response.
                * @return {any} ServerError object of the server response
                * @see MiCo.MiApp.MiJS.ServerError
                */
                ServerResponse.prototype.serverError = function (value) {
                    if (typeof value == 'undefined') {
                        return this._serverError;
                    } else {
                        if (typeof value !== 'object') {
                            throw 'serverError must be an object';
                            return;
                        } else {
                            this._serverError = value;
                        }
                    }
                };

                /**
                * Gets or sets the token object property.
                *
                * @memberof MiCo.MiApp.MiJS.ServerResponse
                * @param {any} Sets token object of the server response.
                * @return {any} token object of the server response
                * @see MiCo.MiApp.MiJS.Token
                */
                ServerResponse.prototype.token = function (value) {
                    if (typeof value == 'undefined') {
                        return this._token;
                    } else {
                        if (typeof value !== 'object') {
                            throw 'token must be an object';
                            return;
                        } else {
                            this._token = value;
                        }
                    }
                };

                /**
                * Gets or sets the key object property.
                *
                * @memberof MiCo.MiApp.MiJS.ServerResponse
                * @param {any} Sets key object of the server response.
                * @return {any} key object of the server response
                */
                ServerResponse.prototype.key = function (value) {
                    if (typeof value == 'undefined') {
                        return this._key;
                    } else {
                        if (typeof value !== 'object') {
                            throw 'key must be an object';
                            return;
                        } else {
                            this._key = value;
                        }
                    }
                };

                /**
                * Gets a short description of a server response error
                *
                * @memberof MiCo.MiApp.MiJS.ServerResponse
                */
                ServerResponse.prototype.getString = function () {
                    var strError = '';

                    if (typeof this._serverError !== 'undefined') {
                        strError += this._serverError.type();

                        if (this._serverError.type() === AUTHENTICATION_ERROR_TYPE) {
                            if (this._serverError.customerNotFound()) {
                                strError += ': CustomerNotFound';
                            }
                            if (this._serverError.usernamePasswordFailure()) {
                                strError += ': UsernamePasswordFailure';
                            }
                            if (this._serverError.accountInactive()) {
                                strError += ': AccountInactive';
                            }
                            if (this._serverError.accountLocked()) {
                                strError += ': AccountLocked';
                            }
                            if (this._serverError.passwordChangeRequired()) {
                                strError += ': PasswordChangeRequired';
                            }
                            if (this._serverError.passwordExpired()) {
                                strError += ': PasswordExpired';
                            }
                            if (this._serverError.notAdmin()) {
                                strError += ': NotAdmin';
                            }
                            if (this._serverError.notAuthorized()) {
                                strError += ': NotAuthorized';
                            }
                        } else if (this._serverError.type() === EXPECTED_ERROR_TYPE) {
                            strError += ': ' + this._serverError.details();
                        } else {
                            if (typeof this._serverError.serverException() !== 'undefined') {
                                if (typeof this._serverError.serverException().innerException() !== 'undefined') {
                                    strError += ', InnerException: ' + this._serverError.serverException().innerException();
                                }
                                if (typeof this._serverError.serverException().helpLink() !== 'undefined') {
                                    strError += ', HelpLink: ' + this._serverError.serverException().helpLink();
                                }
                                if (typeof this._serverError.serverException().source() !== 'undefined') {
                                    strError += ', Source: ' + this._serverError.serverException().source();
                                }
                                if (typeof this._serverError.serverException().stackTrace() !== 'undefined') {
                                    strError += ', StackTrace: ' + this._serverError.serverException().stackTrace();
                                }
                                if (typeof this._serverError.serverException().message() !== 'undefined') {
                                    strError += ', message: ' + this._serverError.serverException().message();
                                }
                            }
                        }
                    }

                    return strError;
                };
                return ServerResponse;
            })();
            MiJS.ServerResponse = ServerResponse;

            /** @class */
            var ServerError = (function () {
                /**
                * @constructs MiCo.MiApp.MiJS.ServerError
                * @memberof MiCo.MiApp.MiJS
                * @param {string} type The server error type
                */
                function ServerError(type) {
                    // TODO: add filters
                    this._type = type;
                }
                /**
                *  Gets or sets a server exception object of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the server exception object of the server error
                * @return {any} the server exception object of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerError.prototype.serverException = function (value) {
                    if (typeof value == 'undefined') {
                        return this._serverException;
                    } else {
                        if (typeof value !== 'object') {
                            throw 'serverException must be an object';
                            return;
                        } else {
                            this._serverException = value;
                        }
                    }
                };

                /**
                *  Gets or sets the type of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the type of the server error
                * @return {any} the type of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerError.prototype.type = function (value) {
                    if (typeof value == 'undefined') {
                        return this._type;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'type must be a string';
                            return;
                        } else {
                            this._type = value;
                        }
                    }
                };
                return ServerError;
            })();
            MiJS.ServerError = ServerError;

            /**
            * @class */
            var ServerException = (function () {
                /**
                * @constructs MiCo.MiApp.MiJS.ServerException
                * @memberof MiCo.MiApp.MiJS
                * @param {any} innerException An inner exception of the server exception
                * @param {string} helpLink A help link for the server exception
                * @param {string} source A source for the server exception
                * @param {string} stackTrace A stack trace for the server exception
                * @param {string} message A message for the server exception
                */
                function ServerException(innerException, helpLink, source, stackTrace, message) {
                    // TODO filter
                    if (innerException == null) {
                        this._innerException = '';
                    } else {
                        this._innerException = innerException;
                    }
                    if (helpLink == null) {
                        this._helpLink = '';
                    } else {
                        this._helpLink = helpLink;
                    }
                    if (source == null) {
                        this._source = '';
                    } else {
                        this._source = source;
                    }
                    if (stackTrace == null) {
                        this._stackTrace = '';
                    } else {
                        this._stackTrace = stackTrace;
                    }
                    if (message == null) {
                        this._message = '';
                    } else {
                        this._message = message;
                    }
                }
                /**
                *  Gets or sets the inner exception of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the inner exception of the server error
                * @return {any} the inner exception of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerException.prototype.innerException = function (value) {
                    if (typeof value == 'undefined') {
                        return this._innerException;
                    } else {
                        if (typeof value !== 'string') {
                            this._innerException = '';
                        } else {
                            this._innerException = value;
                        }
                    }
                };

                /**
                *  Gets or sets the help link of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the helpLink of the server error
                * @return {any} the helpLink of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerException.prototype.helpLink = function (value) {
                    if (typeof value == 'undefined') {
                        return this._helpLink;
                    } else {
                        if (typeof value !== 'string') {
                            this._helpLink = '';
                        } else {
                            this._helpLink = value;
                        }
                    }
                };

                /**
                *  Gets or sets the source of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the source of the server error
                * @return {any} the source of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerException.prototype.source = function (value) {
                    if (typeof value == 'undefined') {
                        return this._source;
                    } else {
                        if (typeof value !== 'string') {
                            this._source = '';
                        } else {
                            this._source = value;
                        }
                    }
                };

                /**
                *  Gets or sets the stack trace of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the stackTrace eof the server error
                * @return {any} the stackTrace of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerException.prototype.stackTrace = function (value) {
                    if (typeof value == 'undefined') {
                        return this._stackTrace;
                    } else {
                        if (typeof value !== 'string') {
                            this._stackTrace = '';
                        } else {
                            this._stackTrace = value;
                        }
                    }
                };

                /**
                *  Gets or sets the message of the server error
                *
                * @memberof MiCo.MiApp.MiJS.ServerError
                * @param {any} sets the message of the server error
                * @return {any} the message of the server error
                * @see MiCo.MiApp.MiJS.ServerException
                */
                ServerException.prototype.message = function (value) {
                    if (typeof value == 'undefined') {
                        return this._message;
                    } else {
                        if (typeof value !== 'string') {
                            this._message = '';
                        } else {
                            this._message = value;
                        }
                    }
                };
                return ServerException;
            })();
            MiJS.ServerException = ServerException;

            /** @class */
            var AuthenticationError = (function (_super) {
                __extends(AuthenticationError, _super);
                /**
                * @constructs MiCo.MiApp.MiJS.AuthenticationError
                * @memberof MiCo.MiApp.MiJS
                * @param {string} type The type of the server error
                */
                function AuthenticationError(type) {
                    // TODO: add filters
                    _super.call(this, type);
                }
                /**
                *  Gets or sets the customer not found status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the customer not found status of the authentication error
                * @return {any} The customer not found status of the authentication error
                */
                AuthenticationError.prototype.customerNotFound = function (value) {
                    if (typeof value == 'undefined') {
                        return this._customerNotFound;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'customerNotFound must be a boolean';
                            return;
                        } else {
                            this._customerNotFound = value;
                        }
                    }
                };

                /**
                *  Gets or sets the username password failure status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the username password failure status of the authentication error
                * @return {any} The username password failture status of the authentication error
                */
                AuthenticationError.prototype.usernamePasswordFailure = function (value) {
                    if (typeof value == 'undefined') {
                        return this._usernamePasswordFailure;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'usernamePasswordFailure must be a boolean';
                            return;
                        } else {
                            this._usernamePasswordFailure = value;
                        }
                    }
                };

                /**
                *  Gets or sets the account inactive status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the account inactive status of the authentication error
                * @return {any} The account inactive status of the authentication error
                */
                AuthenticationError.prototype.accountInactive = function (value) {
                    if (typeof value == 'undefined') {
                        return this._accountInactive;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'accountInactive must be a boolean';
                            return;
                        } else {
                            this._accountInactive = value;
                        }
                    }
                };

                /**
                *  Gets or sets the account locked status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the account locked status of the authentication error
                * @return {any} The account locked status of the authentication error
                */
                AuthenticationError.prototype.accountLocked = function (value) {
                    if (typeof value == 'undefined') {
                        return this._accountLocked;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'accountLocked must be a boolean';
                            return;
                        } else {
                            this._accountLocked = value;
                        }
                    }
                };

                /**
                *  Gets or sets the password change required status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the password change required status of the authentication error
                * @return {any} The password change required status of the authentication error
                */
                AuthenticationError.prototype.passwordChangeRequired = function (value) {
                    if (typeof value == 'undefined') {
                        return this._passwordChangeRequired;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'passwordChangeRequired must be a boolean';
                            return;
                        } else {
                            this._passwordChangeRequired = value;
                        }
                    }
                };

                /**
                *  Gets or sets the password expired status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the password expired status of the authentication error
                * @return {any} The password expired status of the authentication error
                */
                AuthenticationError.prototype.passwordExpired = function (value) {
                    if (typeof value == 'undefined') {
                        return this._passwordExpired;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'passwordExpired must be a boolean';
                            return;
                        } else {
                            this._passwordExpired = value;
                        }
                    }
                };

                /**
                *  Gets or sets the not admin status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the not admin status of the authentication error
                * @return {any} The not admin status of the authentication error
                */
                AuthenticationError.prototype.notAdmin = function (value) {
                    if (typeof value == 'undefined') {
                        return this._notAdmin;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'notAdmin must be a boolean';
                            return;
                        } else {
                            this._notAdmin = value;
                        }
                    }
                };

                /**
                *  Gets or sets the not authorized status of the authentication error
                *
                * @memberof MiCo.MiApp.MiJS.AuthenticationError
                * @param {any} Sets the not authorized status of the authentication error
                * @return {any} The not authorized status of the authentication error
                */
                AuthenticationError.prototype.notAuthorized = function (value) {
                    if (typeof value == 'undefined') {
                        return this._notAuthorized;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'notAuthorized must be a boolean';
                            return;
                        } else {
                            this._notAuthorized = value;
                        }
                    }
                };
                return AuthenticationError;
            })(ServerError);
            MiJS.AuthenticationError = AuthenticationError;

            /** @class */
            var ExpectedError = (function (_super) {
                __extends(ExpectedError, _super);
                /**
                * @constructs MiCo.MiApp.MiJS.ExpectedError
                * @memberof MiCo.MiApp.MiJS
                * @param {string} type The type of the server error
                * @param {string} details The details of the expected server error
                */
                function ExpectedError(type, details) {
                    // TODO: add filters
                    _super.call(this, type);
                    if (typeof details !== 'string') {
                        throw 'details must be a string';
                        return;
                    }
                    this._details = details;
                }
                /**
                *  Gets or sets the details of the expected server error
                *
                * @memberof MiCo.MiApp.MiJS.ExpectedError
                * @param {any} Sets the details of the expected server error
                * @return {any} The details of the expected server error
                */
                ExpectedError.prototype.details = function (value) {
                    if (typeof value == 'undefined') {
                        return this._details;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'details must be a string';
                            return;
                        } else {
                            this._details = value;
                        }
                    }
                };
                return ExpectedError;
            })(ServerError);
            MiJS.ExpectedError = ExpectedError;

            /** @class */
            var NetworkError = (function (_super) {
                __extends(NetworkError, _super);
                /**
                * @constructs MiCo.MiApp.MiJS.NetworkError
                * @memberof MiCo.MiApp.MiJS
                * @param {string} type The type of the server error
                * @param {string} details The status of the network error
                */
                function NetworkError(type, status) {
                    // TODO: add filters
                    _super.call(this, type);
                    if (typeof status !== 'string') {
                        throw 'status must be a string';
                        return;
                    }
                    this._status = status;
                }
                /**
                *  Gets or sets the status of the network error
                *
                * @memberof MiCo.MiApp.MiJS.NetworkError
                * @param {any} Sets the status of the network error
                * @return {any} The status of the network error
                */
                NetworkError.prototype.status = function (value) {
                    if (typeof value == 'undefined') {
                        return this._status;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'status must be a string';
                            return;
                        } else {
                            this._status = value;
                        }
                    }
                };
                return NetworkError;
            })(ServerError);
            MiJS.NetworkError = NetworkError;

            /**
            * Builds a serverResponse object based upon a network error response after attempting to contact the Server
            * @method
            * @memberof MiCo.MiApp.MiJS
            * @param {any} jqXHR A jQuery XHR object
            * @param {string} textStatus A text string describing the status
            * @param {string} errorThrown An error thrown description of the error
            * @return {MiCo.MiApp.MiJS.ServerResponse} A serverResponse object
            */
            function handleErrorServerResponse(jqXHR, textStatus, errorThrown) {
                var serverResponse = new MiCo.MiApp.MiJS.ServerResponse();

                var msg = '';
                if (typeof textStatus !== 'undefined') {
                    if (textStatus !== null) {
                        if (textStatus.length > 0) {
                            msg += 'error: ' + textStatus;
                        }
                    }
                }
                if (typeof jqXHR !== 'undefined') {
                    if (typeof jqXHR.responseText !== 'undefined') {
                        if (jqXHR.responseText.length > 0) {
                            msg += ' responseText: ' + jqXHR.responseText;
                        }
                    }

                    if (typeof jqXHR.status !== 'undefined') {
                        if (jqXHR.status !== null) {
                            msg += ' status: ' + jqXHR.status;
                        }
                    }
                }

                var networkError = new MiCo.MiApp.MiJS.NetworkError(NETWORK_ERROR_TYPE, msg);
                serverResponse.serverError(networkError);
                serverResponse.success(false);
                return serverResponse;
            }
            MiJS.handleErrorServerResponse = handleErrorServerResponse;

            /**
            * Builds a serverResponse object based upon an error response (success = false) from the Server
            * @method
            * @memberof MiCo.MiApp.MiJS
            * @param {any} result The result object returned from a jQuery ajax request
            * @param {string} textStatus A text string describing the status
            * @param {any} XMLHttpRequest An XMLHttpRequest object returned from a jQuery ajax request
            * @return {MiCo.MiApp.MiJS.ServerResponse} A serverResponse object
            */
            function handleSuccessServerResponse(result, textStatus, XMLHttpRequest) {
                var serverResponse = new MiCo.MiApp.MiJS.ServerResponse();
                var svrResponse = JSON.parse(result.d);
                if ((typeof svrResponse.Error !== 'undefined') && (svrResponse.Error !== null)) {
                    if (typeof svrResponse.Error.__type !== 'undefined') {
                        // AuthenticationError
                        if (svrResponse.Error.__type.indexOf(AUTHENTICATION_ERROR_TYPE) > -1) {
                            var authError = new MiCo.MiApp.MiJS.AuthenticationError(AUTHENTICATION_ERROR_TYPE);

                            authError.accountInactive(svrResponse.Error.AccountInactive);
                            authError.accountLocked(svrResponse.Error.AccountLocked);
                            authError.customerNotFound(svrResponse.Error.CustomerNotFound);
                            authError.notAdmin(svrResponse.Error.NotAdmin);
                            authError.notAuthorized(svrResponse.Error.NotAuthorized);
                            authError.passwordChangeRequired(svrResponse.Error.PasswordChangeRequired);
                            authError.passwordExpired(svrResponse.Error.PasswordExpired);
                            authError.usernamePasswordFailure(svrResponse.Error.UsernamePasswordFailure);

                            serverResponse.serverError(authError);
                        }

                        // ExpectedError
                        if (svrResponse.Error.__type.indexOf(EXPECTED_ERROR_TYPE) > -1) {
                            var expectedError = new MiCo.MiApp.MiJS.ExpectedError(EXPECTED_ERROR_TYPE, svrResponse.Error.Details);
                            serverResponse.serverError(expectedError);
                        }

                        // ServerExpection
                        if (typeof svrResponse.Error.Exception !== 'undefined') {
                            if (svrResponse.Error.Exception !== null) {
                                var serverError = new MiCo.MiApp.MiJS.ServerError(SERVER_ERROR_TYPE);
                                var serverException = new MiCo.MiApp.MiJS.ServerException();

                                if (typeof svrResponse.Error.Exception.InnerException !== 'undefined') {
                                    serverException.innerException(svrResponse.Error.Exception.InnerException);
                                }
                                if (typeof svrResponse.Error.Exception.HelpLink !== 'undefined') {
                                    serverException.helpLink(svrResponse.Error.Exception.HelpLink);
                                }
                                if (typeof svrResponse.Error.Exception.Source !== 'undefined') {
                                    serverException.source(svrResponse.Error.Exception.Source);
                                }
                                if (typeof svrResponse.Error.Exception.StackTrace !== 'undefined') {
                                    serverException.stackTrace(svrResponse.Error.Exception.StackTrace);
                                }
                                if (typeof svrResponse.Error.Exception.Message !== 'undefined') {
                                    serverException.message(svrResponse.Error.Exception.Message);
                                }

                                serverResponse.serverError(serverError);
                                serverResponse.serverError().serverException(serverException);
                            }
                        }
                    }
                }

                serverResponse.success(false);
                return serverResponse;
            }
            MiJS.handleSuccessServerResponse = handleSuccessServerResponse;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Services.Sync object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Services.Sync class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.Sync */
                (function (Sync) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {Array<MiCo.MiApp.MiJS.App>} apps An array of apps from the Server
                    */
                    /**
                    * Gets apps from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} userName The username of the User with access to apps on the Server.
                    * @param {boolean} includeInactive An indication of whether to include inactive apps in the result
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getAppsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getApps(customerName, token, userName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetApps');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '"';
                        data += ',"includeInactive":' + includeInactive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Apps !== 'undefined') {
                                        if (svrResponse.Apps !== null) {
                                            var apps = [];
                                            for (var i = 0; i < svrResponse.Apps.length; i++) {
                                                var app = new MiCo.MiApp.MiJS.App(svrResponse.Apps[i].AppId, svrResponse.Apps[i].AppName, svrResponse.Apps[i].AppPublisher, svrResponse.Apps[i].AppVersion);
                                                apps.push(app);
                                            }
                                            callbackSuccess(apps);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getApps = getApps;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppFileListSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {Array<MiCo.MiApp.MiJS.AppFile>} filelist An array of appFile items from the Server
                    */
                    /**
                    * Gets an app file list from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The app id of an app on the Server.
                    * @param {string} appVersion The app version of an app on the Server.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getAppFileListSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAppFileList(customerName, token, appId, appVersion, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetAppFileList');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","appId":"' + MiCo.MiApp.MiJS.formatData(appId);
                        data += '","appVersion":"' + MiCo.MiApp.MiJS.formatData(appVersion);
                        data += '"}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.AppFiles !== 'undefined') {
                                        if (svrResponse.AppFiles !== null) {
                                            var appFiles = [];
                                            for (var i = 0; i < svrResponse.AppFiles.length; i++) {
                                                var appFile = new MiCo.MiApp.MiJS.AppFile(svrResponse.AppFiles[i].FileName, svrResponse.AppFiles[i].FileSize);
                                                appFiles.push(appFile);
                                            }
                                            callbackSuccess(appFiles);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getAppFileList = getAppFileList;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppFilesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {Array<any>} files An array of app file content from the Server
                    */
                    /**
                    * Gets app files from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The app id of an app on the Server.
                    * @param {string} appVersion The app version of an app on the Server.
                    * @param {Array<MiCo.MiApp.MiJS.AppFile>} appFiles An array of AppFiles to retrieve from the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getAppFilesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAppFiles(customerName, token, appId, appVersion, appFiles, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetAppFiles');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"appId":"' + MiCo.MiApp.MiJS.formatData(appId) + '"';
                        data += ',"appVersion":"' + MiCo.MiApp.MiJS.formatData(appVersion) + '"';

                        data += ',"appFiles":[';
                        for (var i = 0; i < appFiles.length; i++) {
                            data += '"' + MiCo.MiApp.MiJS.formatData(appFiles[i].fileName()) + '"';
                            if (i !== appFiles.length - 1) {
                                data += ',';
                            }
                        }

                        data += ']}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var files = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                var file = window.atob(svrResponse.StringDataArray[i]);
                                                files.push(file);
                                            }
                                            callbackSuccess(files);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getAppFiles = getAppFiles;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadAppViaStringSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {boolean} appUploaded An indication of whether the app was uploaded successfully to the Server
                    */
                    /**
                    * Uploads an app via string to the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appData The base64 encoded string of the app
                    * @param {boolean} requireValidation An indication of whether to validate the contents of the app
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.uploadAppViaStringSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadAppViaString(customerName, token, appData, requireValidation, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/UploadAppViaString');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","appData":"' + MiCo.MiApp.MiJS.formatData(appData);
                        data += '","requireValidation":' + requireValidation.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.uploadAppViaString = uploadAppViaString;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setAppActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {boolean} statusSet An indication of whether the active status of the app was successfully updated on the Server
                    */
                    /**
                    * Uploads the active status of an App on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The appId of the app
                    * @param {boolean} isActive An indication of whether the app should be active (true) or inactive (false)
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.setAppActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setAppActiveStatus(customerName, token, appId, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/SetAppActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName);
                        data += '","token":"' + token.tokenValue();
                        data += '","appId":"' + MiCo.MiApp.MiJS.formatData(appId);
                        data += '","isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.setAppActiveStatus = setAppActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback GetFormTemplatesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param Array<string> formIds A collection of form template formIds available to the User on the Server
                    */
                    /**
                    * Gets the list of form templates available to a user on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} userName The username of the User
                    * @param {boolean} includeInactive An indication of whether to include form templates that are inactive.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.GetFormTemplatesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplates(customerName, token, userName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplates');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '"';
                        data += ',"includeInactive":' + includeInactive + '';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            callbackSuccess(svrResponse.StringDataArray);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplates = getFormTemplates;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadFormTemplateSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {number} formRevision The new form template revision number of  on the Server
                    */
                    /**
                    * Uploads a form template to the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formData The form template contents
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.uploadFormTemplateSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadFormTemplate(customerName, token, formData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/UploadFormTemplate');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formData":"' + MiCo.MiApp.MiJS.formatData(formData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.uploadFormTemplate = uploadFormTemplate;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setFormTemplateOptionsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {boolean} optionsSet An indication that form template options were set successfully on the Server
                    */
                    /**
                    * Sets form template options on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {boolean} renderThumbnails An indication of whether to render thumbnails for session pages
                    * @param {boolean} renderAllInk An indication of whether to render all ink for sessions
                    * @param {boolean} renderCleanInk An indication of whether to render clean ink for sessions
                    * @param {boolean} renderFieldValues An indication of whether to render field values for sessions
                    * @param {number} renderDPI The render DPI amount
                    * @param {boolean} runAfterOpen An indication of whether to run the .NET AfterOpen event handler when a form is synced
                    * @param {boolean} overridePaperlikeInterface An indication of whether to only display the form in a non paper-like interface
                    * @param {boolean} allowPODInkMerging An indication of whether to allow POD ink merging
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.setFormTemplateOptionsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setFormTemplateOptions(customerName, token, formId, renderThumbnails, renderAllInk, renderCleanInk, renderFieldValues, renderDPI, runAfterOpen, overridePaperlikeInterface, allowPODInkMerging, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/SetFormTemplateOptions');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"renderThumbnails":' + renderThumbnails.toString();
                        data += ',"renderAllInk":' + renderAllInk.toString();
                        data += ',"renderCleanInk":' + renderCleanInk.toString();
                        data += ',"renderFieldValues":' + renderFieldValues.toString();
                        data += ',"renderDPI":' + renderDPI.toString();
                        data += ',"runAfterOpen":' + runAfterOpen.toString();
                        data += ',"overridePaperlikeInterface":' + overridePaperlikeInterface.toString();
                        data += ',"allowPODInkMerging":' + allowPODInkMerging.toString();

                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.setFormTemplateOptions = setFormTemplateOptions;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setFormTemplateActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {boolean} statusSet An indication that form template active status was set successfully on the Server
                    */
                    /**
                    * Sets the active status for a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {boolean} isActive An indication of whether a form template is active (true) or inactive (false)
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.setFormTemplateActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setFormTemplateActiveStatus(customerName, token, formId, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/SetFormTemplateActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.setFormTemplateActiveStatus = setFormTemplateActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getFormTemplateJSONSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} json The JSON representation of a form template on the Server
                    */
                    /**
                    * Gets the JSON representation of a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {number} revision The form revision of the form template
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getFormTemplateJSONSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplateJSON(customerName, token, formId, revision, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplateJSON');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"revision":' + revision.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            callbackSuccess(svrResponse.StringData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplateJSON = getFormTemplateJSON;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getFormTemplateJSONAndSVGSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {Array<string>} content An array of strings where the first string item is the JSON representation of the form template and subsequent strings are SVG representations of each page in order of page number
                    */
                    /**
                    * Gets the JSON representation and SVG representation for each page of a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {number} revision The form revision of the form template
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getFormTemplateJSONAndSVGSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplateJSONAndSVG(customerName, token, formId, revision, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplateJSONAndSVG');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"revision":' + revision.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            callbackSuccess(svrResponse.StringDataArray);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplateJSONAndSVG = getFormTemplateJSONAndSVG;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getFormTemplateMFTSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} mft The mft (Mi-Forms Template) file of a form template
                    */
                    /**
                    * Gets the MFT representation of a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {number} revision The form revision of the form template
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getFormTemplateMFTSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplateMFT(customerName, token, formId, revision, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplateMFT');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"revision":' + revision.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            callbackSuccess(svrResponse.StringData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplateMFT = getFormTemplateMFT;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getFormTemplatePageBackgroundSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {any} background The page background image
                    */
                    /**
                    * Gets the page background image for a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {number} revision The form revision of the form template
                    * @param {number} page The page number of the form template
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getFormTemplatePageBackgroundSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplatePageBackground(customerName, token, formId, revision, page, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplatePageBackground');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"revision":' + revision.toString();
                        data += ',"page":' + page.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            var background = window.atob(svrResponse.StringData);
                                            callbackSuccess(background);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplatePageBackground = getFormTemplatePageBackground;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getFormTemplateSVGSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} svg The page background image as SVG
                    */
                    /**
                    * Gets the page background image in SVG format for a form template on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Sync
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} formId The formID of the form template
                    * @param {number} revision The form revision of the form template
                    * @param {number} page The page number of the form template
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Sync.getFormTemplateSVGSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getFormTemplateSVG(customerName, token, formId, revision, page, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SyncServices.asmx/GetFormTemplateSVG');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"formId":"' + MiCo.MiApp.MiJS.formatData(formId) + '"';
                        data += ',"revision":' + revision.toString();
                        data += ',"page":' + page.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            callbackSuccess(svrResponse.StringData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Sync.getFormTemplateSVG = getFormTemplateSVG;
                })(Services.Sync || (Services.Sync = {}));
                var Sync = Services.Sync;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// 07/14/2014   David Nakamura      getFormTemplates()          Sprint work item - finish Mi-JS Added getFormTemplates() method.
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.Setup */
                (function (Setup) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setLocalAdminSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} localAdminSet An indication of whether the local administrator account was set
                    */
                    /**
                    * Sets the local administrator account for global administration on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} localAdminUsername The username of the local administrator
                    * @param {string} localAdminPassowrd The plaintext password of the local administrator
                    * @param {boolean} validateCredentials If true, validate the local administrator credentials before setting
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.setLocalAdminSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setLocalAdmin(userName, password, localAdminUsername, localAdminPassword, validateCredentials, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/SetLocalAdmin');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"localAdminUsername":"' + MiCo.MiApp.MiJS.formatData(localAdminUsername) + '",';
                        data += '"localAdminPassword":"' + MiCo.MiApp.MiJS.formatData(localAdminPassword) + '",';
                        data += '"validateCredentials":' + validateCredentials.toString() + '';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.setLocalAdmin = setLocalAdmin;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadLicenseSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} licenseUploaded An indication of whether the license was successfully uploaded
                    */
                    /**
                    * Sets the local administrator account for global administration on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} licenseData The contents of a license file to upload
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.uploadLicenseSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadLicense(userName, password, licenseData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/UploadLicense');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"licenseData":"' + MiCo.MiApp.MiJS.formatData(licenseData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.uploadLicense = uploadLicense;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addGlobalAdministratorSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} adminAdded An indication of whether the global administrator account was successfully added
                    */
                    /**
                    * Adds a global administrator account to the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} newUsername The username of the new global administrator user
                    * @param {string} newPassword The plaintext password of the new global administrator user
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.addGlobalAdministratorSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function addGlobalAdministrator(userName, password, newUsername, newPassword, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/AddGlobalAdministrator');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"newUsername":"' + MiCo.MiApp.MiJS.formatData(newUsername) + '",';
                        data += '"newPassword":"' + MiCo.MiApp.MiJS.formatData(newPassword) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.addGlobalAdministrator = addGlobalAdministrator;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getGlobalAdministratorsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {Array<MiCo.MiApp.MiJS.User>} administrators An array of global administrators from the Server
                    */
                    /**
                    * Gets global administrators from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.getGlobalAdministratorsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getGlobalAdministrators(userName, password, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/GetGlobalAdministrators');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Users !== 'undefined') {
                                        if (svrResponse.Users !== null) {
                                            var users = [];
                                            for (var i = 0; i < svrResponse.Users.length; i++) {
                                                var newUser = new MiCo.MiApp.MiJS.User(svrResponse.Users[i].UserType, svrResponse.Users[i].UserName, svrResponse.Users[i].FirstName, svrResponse.Users[i].MiddleName, svrResponse.Users[i].LastName);
                                                newUser.customerName(svrResponse.Users[i].CustomerName);
                                                newUser.deviceID(svrResponse.Users[i].DeviceID);
                                                users.push(newUser);
                                            }
                                            callbackSuccess(users);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.getGlobalAdministrators = getGlobalAdministrators;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setGlobalAdministratorPasswordSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} passwordSet An indication that the global administrator password was set on the Server
                    */
                    /**
                    * Sets the password for a global administrator on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} existingUsername The username of the existing global administrative user for whom a password will be changed
                    * @param {string} newPassword The new plaintext password for the existing global administrative user for whom a password will be changed
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.setGlobalAdministratorPasswordSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setGlobalAdministratorPassword(userName, password, existingUsername, newPassword, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/SetGlobalAdministratorPassword');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"existingUsername":"' + MiCo.MiApp.MiJS.formatData(existingUsername) + '",';
                        data += '"newPassword":"' + MiCo.MiApp.MiJS.formatData(newPassword) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.setGlobalAdministratorPassword = setGlobalAdministratorPassword;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setGlobalAdministratorUsernameSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} usernameSet An indication that the global administrator username was set on the Server
                    */
                    /**
                    * Sets the username for a global administrator on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} oldUsername The username of the existing global administrative user for whom a username will be changed
                    * @param {string} newUsername The new username for the existing global administrative user for whom a username will be changed
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.setGlobalAdministratorUsernameSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setGlobalAdministratorUsername(userName, password, oldUsername, newUsername, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/SetGlobalAdministratorUsername');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"oldUsername":"' + MiCo.MiApp.MiJS.formatData(oldUsername) + '",';
                        data += '"newUsername":"' + MiCo.MiApp.MiJS.formatData(newUsername) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.setGlobalAdministratorUsername = setGlobalAdministratorUsername;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeGlobalAdministratorSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} adminRemoved An indication that the global administrator was removed from the Server
                    */
                    /**
                    * Removes a global administrator from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} existingUsername The username of the existing global administrative user who will be removed
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.removeGlobalAdministratorSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeGlobalAdministrator(userName, password, existingUsername, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/RemoveGlobalAdministrator');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"existingUsername":"' + MiCo.MiApp.MiJS.formatData(existingUsername) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.removeGlobalAdministrator = removeGlobalAdministrator;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback addCustomerSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} customerAdded An indication that the customer was added to the Server
                    */
                    /**
                    * Adds a new Customer to the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} customerName The customer name for the new customer
                    * @param {string} contactName The contact name for the new customer
                    * @param {string} contactPhone The contact phone for the new customer
                    * @param {string} contactEmail The contact email for the new customer
                    * @param {string} contactDetails The contact details for the new customer
                    * @param {string} licenseLevel The license level for the new customer
                    * @param {string} dataSource The datasource for the new customer
                    * @param {string} databaseName The database name for the new customer
                    * @param {boolean} useSqlAuthentication An indication of whether the database connection should use SQL Authentication
                    * @param {string} sqlUser The SQL user name when using SQL Authentication for a database connection for the new customer
                    * @param {string} sqlPassword The plaintext password when using SQL Authentication for a database connection for the new customer
                    * @param {string} sqlAdminUser The SQL user name when using SQL Authentication to create a database for the new customer
                    * @param {string} sqlAdminPassword The plaintext password when using SQL Authentication to create a database for the new customer
                    * @param {string} additionalConnectionString An additional connection string to append when making a database connection for the new customer
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.addCustomerSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    * @see MiCo.MiApp.MiJS.LicenseLevelType
                    */
                    function addCustomer(userName, password, customerName, contactName, contactPhone, contactEmail, contactDetails, licenseLevel, dataSource, databaseName, useSqlAuthentication, sqlUser, sqlPassword, sqlAdminUser, sqlAdminPassword, additionalConnectionString, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/AddCustomer');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"contactName":"' + MiCo.MiApp.MiJS.formatData(contactName) + '",';
                        data += '"contactPhone":"' + MiCo.MiApp.MiJS.formatData(contactPhone) + '",';
                        data += '"contactEmail":"' + MiCo.MiApp.MiJS.formatData(contactEmail) + '",';
                        data += '"contactDetails":"' + MiCo.MiApp.MiJS.formatData(contactDetails) + '",';
                        data += '"licenseLevel":"' + MiCo.MiApp.MiJS.formatData(licenseLevel) + '",';
                        data += '"dataSource":"' + MiCo.MiApp.MiJS.formatData(dataSource) + '",';
                        data += '"databaseName":"' + MiCo.MiApp.MiJS.formatData(databaseName) + '",';
                        data += '"useSqlAuthentication":' + useSqlAuthentication.toString() + ',';
                        data += '"sqlUser":"' + MiCo.MiApp.MiJS.formatData(sqlUser) + '",';
                        data += '"sqlPassword":"' + MiCo.MiApp.MiJS.formatData(sqlPassword) + '",';
                        data += '"sqlAdminUser":"' + MiCo.MiApp.MiJS.formatData(sqlAdminUser) + '",';
                        data += '"sqlAdminPassword":"' + MiCo.MiApp.MiJS.formatData(sqlAdminPassword) + '",';
                        data += '"additionalConnectionString":"' + MiCo.MiApp.MiJS.formatData(additionalConnectionString) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.addCustomer = addCustomer;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setCustomerActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} statusSet An indication that the customer active status was set on the Server
                    */
                    /**
                    * Sets the active status for a customer
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} customerName The customer name for the customer
                    * @param {boolean} isActive An indication of whether the customer should be active (true) or inactive (false)
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.setCustomerActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setCustomerActiveStatus(userName, password, customerName, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/SetCustomerActiveStatus');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"isActive":' + isActive.toString() + '';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.setCustomerActiveStatus = setCustomerActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback updateCustomerSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} customerUpdated An indication that the customer was updated on the Server
                    */
                    /**
                    * Updates a Customer on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} customerName The customer name for the customer
                    * @param {string} contactName The contact name for the customer
                    * @param {string} contactPhone The contact phone for the customer
                    * @param {string} contactEmail The contact email for the customer
                    * @param {string} contactDetails The contact details for the customer
                    * @param {string} licenseLevel The license level for the customer
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.updateCustomerSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    * @see MiCo.MiApp.MiJS.LicenseLevelType
                    */
                    function updateCustomer(userName, password, customerName, contactName, contactPhone, contactEmail, contactDetails, licenseLevel, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/UpdateCustomer');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"contactName":"' + MiCo.MiApp.MiJS.formatData(contactName) + '",';
                        data += '"contactPhone":"' + MiCo.MiApp.MiJS.formatData(contactPhone) + '",';
                        data += '"contactEmail":"' + MiCo.MiApp.MiJS.formatData(contactEmail) + '",';
                        data += '"contactDetails":"' + MiCo.MiApp.MiJS.formatData(contactDetails) + '",';
                        data += '"licenseLevel":"' + MiCo.MiApp.MiJS.formatData(licenseLevel) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.updateCustomer = updateCustomer;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getCustomersSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {Array<MiCo.MiApp.MiJS.Customer>} customers An array of Customers on the Server
                    */
                    /**
                    * Gets Customers from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.getCustomersSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getCustomers(userName, password, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/GetCustomers');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Customers !== 'undefined') {
                                        if (svrResponse.Customers !== null) {
                                            var customers = [];

                                            for (var i = 0; i < svrResponse.Customers.length; i++) {
                                                var newCust = new MiCo.MiApp.MiJS.Customer(svrResponse.Customers[i].Active, svrResponse.Customers[i].ContactEmail, svrResponse.Customers[i].ContactName, svrResponse.Customers[i].ContactPhone, svrResponse.Customers[i].LicenseLevel, svrResponse.Customers[i].Name);
                                                customers.push(newCust);
                                            }
                                            callbackSuccess(customers);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.getCustomers = getCustomers;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeCustomerSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Setup
                    * @param {boolean} customerRemoved An indication of whether the customer was removed from the Server
                    */
                    /**
                    * Removes a Customer from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Setup
                    * @param {string} userName The username of the global administrative user
                    * @param {string} password The plaintext password of the global administrative user
                    * @param {string} customerName The name of the customer to remove from the Server
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Setup.removeCustomerSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeCustomer(userName, password, customerName, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/SetupServices.asmx/RemoveCustomer');

                        // Construct the data
                        var data = '{"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '",';
                        data += '"password":"' + MiCo.MiApp.MiJS.formatData(password) + '",';
                        data += '"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Setup.removeCustomer = removeCustomer;
                })(Services.Setup || (Services.Setup = {}));
                var Setup = Services.Setup;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
// The MiCo.MiApp.MiJS.Services.Data object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Services.Data class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.Data */
                (function (Data) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadMFLSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} sessionId A server session id
                    */
                    /**
                    * Uploads a Mi-Forms Launch File (MFL) to the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} mflData The contents of an MFL file to upload.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.uploadMFLSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadMFL(customerName, token, mflData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UploadMFL');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"mflData":"' + MiCo.MiApp.MiJS.formatData(mflData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.uploadMFL = uploadMFL;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadJSONSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} sessionId A server session id
                    */
                    /**
                    * Uploads a Mi-Forms Session data file (JSON) to the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} sessionData The contents of an JSON file to upload.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.uploadJSONSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadSessionJSON(customerName, token, sessionData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UploadSessionJSON');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionData":"' + MiCo.MiApp.MiJS.formatData(sessionData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.uploadSessionJSON = uploadSessionJSON;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback uploadMFSSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} sessionId A server session id
                    */
                    /**
                    * Uploads a Mi-Forms Session file (MFS) to the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} sessionData The contents of an MFS file to upload.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.uploadMFSSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function uploadSessionMFS(customerName, token, sessionData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UploadSessionMFS');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionData":"' + MiCo.MiApp.MiJS.formatData(sessionData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.uploadSessionMFS = uploadSessionMFS;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getSessionMFSSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} mfs The Mi-Forms Session file
                    */
                    /**
                    * Gets a Mi-Forms Session file (MFS) from the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The server session id of the session to retrieve.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getSessionMFSSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getSessionMFS(customerName, token, sessionId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetSessionMFS');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            callbackSuccess(svrResponse.StringData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getSessionMFS = getSessionMFS;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getSessionJSONSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} json The json file associated with a Mi-Forms Session
                    */
                    /**
                    * Gets a json file corresponding to a Mi-Forms Session on the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The server session id of the session to retrieve.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getSessionJSONSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getSessionJSON(customerName, token, sessionId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetSessionJSON');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            callbackSuccess(svrResponse.StringData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getSessionJSON = getSessionJSON;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback confirmUploadedSessionSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {boolean} confirmed An indication from the Server if the session was successfully uploaded
                    */
                    /**
                    * Sends confirmation to the Server after uploading a session
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The server session id of the session to retrieve.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.confirmUploadedSessionSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function confirmUploadedSession(customerName, token, sessionId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/ConfirmUploadedSession');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.confirmUploadedSession = confirmUploadedSession;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getSessionHistorySuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {Array<MiCo.MiApp.MiJS.HistoryEntry>} history An array of HistoryEntry items for a session on the Server
                    */
                    /**
                    * Sends confirmation to the Server after uploading a session
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The server session id of the session to retrieve.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getSessionHistorySuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getSessionHistory(customerName, token, sessionId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetSessionHistory');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.History !== 'undefined') {
                                        if (svrResponse.History !== null) {
                                            var history = [];
                                            for (var i = 0; i < svrResponse.History.length; i++) {
                                                var queue = '';

                                                if (svrResponse.History[i].Queue !== null) {
                                                    queue = svrResponse.History[i].Queue;
                                                }
                                                var newHxEntry = new MiCo.MiApp.MiJS.HistoryEntry(svrResponse.History[i].Date, svrResponse.History[i].Description, queue, svrResponse.History[i].User);
                                                history.push(newHxEntry);
                                            }
                                            callbackSuccess(history);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getSessionHistory = getSessionHistory;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getSessionThumbnailsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {Array<string>} thumbnails An array of base64 encoded images which are form page thumbnails
                    */
                    /**
                    * Sends confirmation to the Server after uploading a session
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The server session id of the session to retrieve.
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getSessionThumbnailsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getSessionThumbnails(customerName, token, sessionId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetSessionThumbnails');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var thumbnails = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                thumbnails.push(window.atob(svrResponse.StringDataArray[i]));
                                            }
                                            callbackSuccess(thumbnails);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getSessionThumbnails = getSessionThumbnails;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback updateRelatedFileForFormTemplateSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} relatedFileId The id of the related file uploaded to the Server
                    */
                    /**
                    * Updates a related file for a form template on the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} formId The form id of the form.
                    * @param {number} relatedFileName The file name of the related file
                    * @param {string} relatedFileData The base64 encoded file contents of the related file
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.updateRelatedFileForFormTemplateSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function updateRelatedFileForFormTemplate(customerName, token, formId, relatedFileId, relatedFileName, relatedFileData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UpdateRelatedFileForFormTemplate');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"formId":' + MiCo.MiApp.MiJS.formatData(formId) + ',';
                        data += '"relatedFileId":' + relatedFileId + ',';
                        data += '"relatedFileName":"' + MiCo.MiApp.MiJS.formatData(relatedFileName) + '",';
                        data += '"relatedFileData":"' + MiCo.MiApp.MiJS.formatData(relatedFileData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.updateRelatedFileForFormTemplate = updateRelatedFileForFormTemplate;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getRelatedFileSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {any} file The related file retrieved from the Server
                    */
                    /**
                    * Gets a related file from the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} relatedFileId The id of the related file
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getRelatedFileSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getRelatedFile(customerName, token, relatedFileId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/getRelatedFile');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"relatedFileId":' + relatedFileId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringData !== 'undefined') {
                                        if (svrResponse.StringData !== null) {
                                            var file = window.atob(svrResponse.StringData);
                                            callbackSuccess(file);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getRelatedFile = getRelatedFile;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeRelatedFileSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {boolean} remove An indication on whether the related file was removed from the Server
                    */
                    /**
                    * Removes a related file from the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} relatedFileId The id of the related file
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.removeRelatedFileSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeRelatedFile(customerName, token, relatedFileId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/RemoveRelatedFile');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"relatedFileId":' + relatedFileId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.removeRelatedFile = removeRelatedFile;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback updateAttachmentSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {boolean} attachmentUpdated An indication on whether the attachment file was updated successfully on the Server
                    */
                    /**
                    * Updates an attachment file for a session on the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The id of the session
                    * @param {number} attachmentId The id of the attachment
                    * @param {string} attachmentFileName The file name of the attachment
                    * @param {string} description The description of the session attachment
                    * @param {string} attachmentData The base64 encoded content of the session attachment
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.updateAttachmentSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function updateAttachment(customerName, token, sessionId, attachmentId, attachmentFileName, description, attachmentData, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UpdateAttachment');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"sessionId":' + sessionId + ',';
                        data += '"attachmentId":' + attachmentId + ',';
                        data += '"attachmentFileName":"' + MiCo.MiApp.MiJS.formatData(attachmentFileName) + '",';
                        data += '"description":"' + MiCo.MiApp.MiJS.formatData(description) + '",';
                        data += '"attachmentData":"' + MiCo.MiApp.MiJS.formatData(attachmentData) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.updateAttachment = updateAttachment;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback updateAppDataBundleSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} bundleId The id of the AppDataBundle from the Server
                    */
                    /**
                    * Adds or updates an AppDataBundle on the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} appId The id of the app
                    * @param {number} bundleId The id of the AppDataBundle
                    * @param {string} bundleName The name of the AppDataBundle
                    * @param {string} bundleDescription The description of the AppDataBundle
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.updateAppDataBundleSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function updateAppDataBundle(customerName, token, appId, bundleId, bundleName, bundleDescription, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UpdateAppDataBundle');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"appId":"' + MiCo.MiApp.MiJS.formatData(appId) + '",';
                        data += '"bundleId":' + bundleId + ',';
                        data += '"bundleName":"' + MiCo.MiApp.MiJS.formatData(bundleName) + '",';
                        data += '"bundleDescription":"' + MiCo.MiApp.MiJS.formatData(bundleDescription) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.updateAppDataBundle = updateAppDataBundle;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppDataBundleDetailsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {MiCo.MiApp.MiJS.AppDataBundle} appDataBundle An appDataBundle object from the Server
                    */
                    /**
                    * Gets AppDataBundle details from the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The id of the AppDataBundle
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getAppDataBundleDetailsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAppDataBundleDetails(customerName, token, bundleId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetAppDataBundleDetails');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"bundleId":' + bundleId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.AppDataBundle !== 'undefined') {
                                        if (svrResponse.AppDataBundle !== null) {
                                            var appDataBundle = new MiCo.MiApp.MiJS.AppDataBundle(svrResponse.AppDataBundle[0].Active, svrResponse.AppDataBundle[0].AppId, svrResponse.AppDataBundle[0].CreatedDate, svrResponse.AppDataBundle[0].CreatingUser, svrResponse.AppDataBundle[0].Description, svrResponse.AppDataBundle[0].ID, svrResponse.AppDataBundle[0].LockDate, svrResponse.AppDataBundle[0].LockUser, svrResponse.AppDataBundle[0].Name, svrResponse.AppDataBundle[0].Queue, svrResponse.AppDataBundle[0].UpdatedDate, svrResponse.AppDataBundle[0].UpdatingUser);
                                            appDataBundle.appData([]);
                                            for (var i = 0; i < svrResponse.AppDataBundle[0].AppData.length; i++) {
                                                var appData = new MiCo.MiApp.MiJS.AppData(svrResponse.AppDataBundle[0].AppData[i].CreatedDate, svrResponse.AppDataBundle[0].AppData[i].CreatingUser, svrResponse.AppDataBundle[0].AppData[i].Description, svrResponse.AppDataBundle[0].AppData[i].FileName, svrResponse.AppDataBundle[0].AppData[i].ID, svrResponse.AppDataBundle[0].AppData[i].UpdatedDate, svrResponse.AppDataBundle[0].AppData[i].UpdatingUser);
                                                appDataBundle.appData().push(appData);
                                            }
                                            callbackSuccess(appDataBundle);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getAppDataBundleDetails = getAppDataBundleDetails;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback updateAppDataSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {number} appDataId An id for the appData Item on the Server
                    */
                    /**
                    * Adds or updates an appData item on the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} appDataId The id of the appData item; 0 if new
                    * @param {number} bundleId The id of the appDataBundle for the appData item
                    * @param {string} fileName The file name of the appData item
                    * @param {string} description The description of the appData item
                    * @param {any} appDataContents The contents of the appData item
                    * @param {boolean} contentBase64Encoded An indication of whether the appDataContents have already been base64 encoded
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.updateAppDataSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function updateAppData(customerName, token, appDataId, bundleId, fileName, description, appDataContents, contentBase64Encoded, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/UpdateAppData');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"appDataId":' + appDataId + ',';
                        data += '"bundleId":' + bundleId + ',';
                        data += '"fileName":"' + MiCo.MiApp.MiJS.formatData(fileName) + '",';
                        data += '"description":"' + MiCo.MiApp.MiJS.formatData(description) + '",';
                        if (contentBase64Encoded) {
                            data += '"appDataContents":"' + MiCo.MiApp.MiJS.formatData(appDataContents) + '"';
                        } else {
                            data += '"appDataContents":"' + MiCo.MiApp.MiJS.formatData(window.btoa(appDataContents)) + '"';
                        }
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.IntegerData !== 'undefined') {
                                        if (svrResponse.IntegerData !== null) {
                                            callbackSuccess(svrResponse.IntegerData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.updateAppData = updateAppData;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppDataBundleContentSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {Array<any>} appDataContents An array of app data items from the Server
                    */
                    /**
                    * Gets AppData content from an AppDataBundle
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The id of the appDataBundle
                    * @param {Array<number>} appDataIds An array of ids for appData items to retrieve
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.getAppDataBundleContentSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAppDataBundleContent(customerName, token, bundleId, appDataIds, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/GetAppDataBundleContent');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"bundleId":' + bundleId + ',';

                        data += '"appDataIds":[';
                        for (var i = 0; i < appDataIds.length; i++) {
                            // data += '{"int":' + appDataIds[i] + '}';
                            data += '' + appDataIds[i] + '';
                            if (i !== appDataIds.length - 1) {
                                data += ',';
                            }
                        }
                        data += ']';

                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.StringDataArray !== 'undefined') {
                                        if (svrResponse.StringDataArray !== null) {
                                            var appDataContents = [];
                                            for (var i = 0; i < svrResponse.StringDataArray.length; i++) {
                                                appDataContents.push(window.atob(svrResponse.StringDataArray[i]));
                                            }
                                            callbackSuccess(appDataContents);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.getAppDataBundleContent = getAppDataBundleContent;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback removeAppDataFromBundleSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {boolean} appDataRemoved An indication of whether the app data item for an app data bundle was removed from the Server
                    */
                    /**
                    * Removes an appData item from the Server
                    *
                    * @static
                    * @memberof MiCo.MiApp.MiJS.Services.Data
                    * @param {string} customerName The Customer Name on the Server to upload to.
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The id of the appDataBundle for the appData item
                    * @param {number} appDataId The id of the appData item
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Data.removeAppDataFromBundleSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function removeAppDataFromBundle(customerName, token, bundleId, appDataId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/DataServices.asmx/RemoveAppDataFromBundle');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '",';
                        data += '"token":"' + MiCo.MiApp.MiJS.formatData(token.tokenValue()) + '",';
                        data += '"appDataId":' + appDataId + ',';
                        data += '"bundleId":' + bundleId + '';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Data.removeAppDataFromBundle = removeAppDataFromBundle;
                })(Services.Data || (Services.Data = {}));
                var Data = Services.Data;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Services.Workflow object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Services.Workflow class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            (function (Services) {
                /** @namespace MiCo.MiApp.MiJS.Services.Workflow */
                (function (Workflow) {
                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setAppDataBundleLockStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} statusSet An indication of whether the lock status of an AppDataBundle was set successfully on the Server
                    */
                    /**
                    * Set the lock status for an AppDataBundle on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The bundle id of the AppDataBundle
                    * @param {boolean} isLocked An indication of whether to lock (true) or unlock (false) an AppDataBundle
                    * @param {string} lockingUser The User to whom the AppDataBundle will be locked
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleLockStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setAppDataBundleLockStatus(customerName, token, bundleId, isLocked, lockingUser, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetAppDataBundleLockStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"bundleId":' + bundleId;
                        data += ',"isLocked":' + isLocked.toString();
                        data += ',"lockingUser":"' + MiCo.MiApp.MiJS.formatData(lockingUser) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setAppDataBundleLockStatus = setAppDataBundleLockStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setSessionLockStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} statusSet An indication of whether the lock status of a Session was set successfully on the Server
                    */
                    /**
                    * Set the lock status for a Session on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The session id of the Session
                    * @param {boolean} isLocked An indication of whether to lock (true) or unlock (false) a Session
                    * @param {string} lockingUser The User to whom the Session will be locked
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setSessionLockStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setSessionLockStatus(customerName, token, sessionId, isLocked, lockingUser, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetSessionLockStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"sessionId":' + sessionId;
                        data += ',"isLocked":' + isLocked.toString();
                        data += ',"lockingUser":"' + MiCo.MiApp.MiJS.formatData(lockingUser) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setSessionLockStatus = setSessionLockStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setAppDataBundleActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} statusSet An indication of whether the active status of an AppDataBundle was set successfully on the Server
                    */
                    /**
                    * Set the active status for an AppDataBundle on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The bundle id of the AppDataBundle
                    * @param {boolean} isActive An indication of whether an AppDataBundle is active (true) or inactive (false)
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setAppDataBundleActiveStatus(customerName, token, bundleId, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetAppDataBundleActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"bundleId":' + bundleId;
                        data += ',"isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setAppDataBundleActiveStatus = setAppDataBundleActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setAppDataBundleQueueSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} queueSet An indication of whether the Queue of an AppDataBundle was set successfully on the Server
                    */
                    /**
                    * Set the Queue for an AppDataBundle on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} bundleId The bundle id of the AppDataBundle
                    * @param {string} newQueue The name of the Queue to which an AppDataBundle will be assigned
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleQueueSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setAppDataBundleQueue(customerName, token, bundleId, newQueue, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetAppDataBundleQueue');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"bundleId":' + bundleId;
                        data += ',"newQueue":"' + MiCo.MiApp.MiJS.formatData(newQueue) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setAppDataBundleQueue = setAppDataBundleQueue;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setSessionQueueSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} queueSet An indication of whether the Queue of a Session was set successfully on the Server
                    */
                    /**
                    * Set the Queue for a Session on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {number} sessionId The bundle id of the Session
                    * @param {string} newQueue The name of the Queue to which a Session will be assigned
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setSessionQueueSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setSessionQueue(customerName, token, sessionId, newQueue, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetSessionQueue');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"sessionId":' + sessionId;
                        data += ',"newQueue":"' + MiCo.MiApp.MiJS.formatData(newQueue) + '"';
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setSessionQueue = setSessionQueue;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getAppDataBundlesSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {Array<MiCo.MiApp.MiJS.AppDataBundle>} appDataBundles An array of AppDataBundle items from the Server
                    */
                    /**
                    * Gets AppDataBundle items from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} userName The username of a User who has access to AppDataBundles
                    * @param {boolean} includeInactive An indication of whether to include inactive AppDataBundles
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.getAppDataBundlesSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getAppDataBundles(customerName, token, userName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/GetAppDataBundles');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '"';
                        data += ',"includeInactive":' + includeInactive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.AppDataBundle !== 'undefined') {
                                        if (svrResponse.AppDataBundle !== null) {
                                            var appDataBundles = [];
                                            for (var i = 0; i < svrResponse.AppDataBundle.length; i++) {
                                                var newAppDataBundle = new MiCo.MiApp.MiJS.AppDataBundle(svrResponse.AppDataBundle[i].Active, svrResponse.AppDataBundle[i].AppId, svrResponse.AppDataBundle[i].CreatedDate, svrResponse.AppDataBundle[i].CreatingUser, svrResponse.AppDataBundle[i].Description, svrResponse.AppDataBundle[i].ID, svrResponse.AppDataBundle[i].LockDate, svrResponse.AppDataBundle[i].LockUser, svrResponse.AppDataBundle[i].Name, svrResponse.AppDataBundle[i].Queue, svrResponse.AppDataBundle[i].UpdatedDate, svrResponse.AppDataBundle[i].UpdatingUser);
                                                appDataBundles.push(newAppDataBundle);
                                            }
                                            callbackSuccess(appDataBundles);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.getAppDataBundles = getAppDataBundles;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback getSessionsSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {Array<MiCo.MiApp.MiJS.Session>} sessions An array of Session items from the Server
                    */
                    /**
                    * Gets Session items from the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} userName The username of a User who has access to Sessions
                    * @param {boolean} includeInactive An indication of whether to include inactive Sessions
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.getSessionsSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function getSessions(customerName, token, userName, includeInactive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/GetSessions');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"userName":"' + MiCo.MiApp.MiJS.formatData(userName) + '"';
                        data += ',"includeInactive":' + includeInactive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.Sessions !== 'undefined') {
                                        if (svrResponse.Sessions !== null) {
                                            var sessions = [];
                                            for (var i = 0; i < svrResponse.Sessions.length; i++) {
                                                var session = new MiCo.MiApp.MiJS.Session(svrResponse.Sessions[i].Active, svrResponse.Sessions[i].Descriptor, svrResponse.Sessions[i].FormID, svrResponse.Sessions[i].FormName, svrResponse.Sessions[i].FormRevision, svrResponse.Sessions[i].LockDate, svrResponse.Sessions[i].LockUser, svrResponse.Sessions[i].Locked, svrResponse.Sessions[i].Queue, svrResponse.Sessions[i].SessionID);
                                                sessions.push(session);
                                            }
                                            callbackSuccess(sessions);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.getSessions = getSessions;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback setSessionActiveStatusSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} statusSet An indication of whether the active status of a Session was set successfully on the Server
                    */
                    /**
                    * Sets the active status of a Session on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} sessionId The id a Session
                    * @param {boolean} isActive An indication of whether a session should be active (true) or inactive (false)
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.setSessionActiveStatusSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function setSessionActiveStatus(customerName, token, sessionId, isActive, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SetSessionActiveStatus');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"sessionId":' + sessionId;
                        data += ',"isActive":' + isActive.toString();
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.setSessionActiveStatus = setSessionActiveStatus;

                    /**
                    *  This callback is executed upon a successful response and result from the Server
                    * @callback submitDataBundleForProcessingSuccessCallback
                    * @memberof MiCo.MiApp.MiJS.Services.Workflow
                    * @param {boolean} bundleSubmitted An indication of whether the bundle was successfully submitted for processing to the Server
                    */
                    /**
                    * Sets the active status of a Session on the Server
                    *
                    * @static
                    * @memberOf MiCo.MiApp.MiJS.Services.Workflow
                    * @param {string} customerName The Customer Name on the Server
                    * @param {MiCo.MiApp.MiJS.Token} token The authentication token to use.
                    * @param {string} bundleId The id a Bundle
                    * @param {MiCo.MiApp.MiJS.NetworkSettings} networkSettings The network settings to use for this request.
                    * @param {MiCo.MiApp.MiJS.Services.Workflow.submitDataBundleForProcessingSuccessCallback} successCallback The function called after a successful request
                    * @param {MiCo.MiApp.MiJS.Services.errorCallback} errorCallback The function called after a failed request
                    */
                    function submitDataBundleForProcessing(customerName, token, bundleId, networkSettings, callbackSuccess, callbackError) {
                        var url = networkSettings.constructUrl('Services/WorkflowServices.asmx/SubmitDataBundleForProcessing');

                        // Construct the data
                        var data = '{"customerName":"' + MiCo.MiApp.MiJS.formatData(customerName) + '"';
                        data += ',"token":"' + token.tokenValue() + '"';
                        data += ',"bundleId":' + bundleId;
                        data += '}';

                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result, textStatus, XMLHttpRequest) {
                                // Success
                                var svrResponse = JSON.parse(result.d);

                                if (svrResponse.Success) {
                                    if (typeof svrResponse.BoolData !== 'undefined') {
                                        if (svrResponse.BoolData !== null) {
                                            callbackSuccess(svrResponse.BoolData);
                                        } else {
                                            if (typeof callbackError !== 'undefined') {
                                                var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                                callbackError(serverResponse);
                                            }
                                        }
                                    } else {
                                        if (typeof callbackError !== 'undefined') {
                                            var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                            callbackError(serverResponse);
                                        }
                                    }
                                } else {
                                    // Server responded with Success=false
                                    if (typeof callbackError !== 'undefined') {
                                        var serverResponse = MiJS.handleSuccessServerResponse(result, textStatus, XMLHttpRequest);
                                        callbackError(serverResponse);
                                    }
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (typeof callbackError !== 'undefined') {
                                    var serverResponse = MiJS.handleErrorServerResponse(jqXHR, textStatus, errorThrown);
                                    callbackError(serverResponse);
                                }
                            }
                        });
                    }
                    Workflow.submitDataBundleForProcessing = submitDataBundleForProcessing;
                })(Services.Workflow || (Services.Workflow = {}));
                var Workflow = Services.Workflow;
            })(MiJS.Services || (MiJS.Services = {}));
            var Services = MiJS.Services;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.AppDataBundle object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.AppDataBundle class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var AppDataBundle = (function () {
                /**
                * Creates an instance of AppDataBundle
                * @constructs MiCo.MiApp.MiJS.AppDataBundle
                * @memberof MiCo.MiApp.MiJS
                * @param {boolean} active The active status of AppDataBundle
                * @param {string} appId The id of the App associated with this AppDataBundle
                * @param {string} createdDate The date when the AppDataBundle was created (ISO 8601 format)
                * @param {string} creatingUser The user who created the AppDataBundle
                * @param {string} description The description of the AppDataBundle
                * @param {number} id The id of the AppDataBundle
                * @param {string} lockDate The date when the AppDataBundle was locked (ISO 8501 format)
                * @param {string} lockUser The user who locked the AppDataBundle
                * @param {string} name The name of the AppDataBundle
                * @param {string} queue The name of the queue to which to assign the AppDataBundle
                * @param {string} updatedDate The date when the AppDataBundle was last updated (ISO 8601 format)
                * @param {string} updatingUser The user who last updated the AppDataBundle
                */
                function AppDataBundle(active, appId, createdDate, creatingUser, description, id, lockDate, lockUser, name, queue, updatedDate, updatingUser) {
                    if (typeof active !== 'boolean') {
                        throw 'active must be a boolean';
                        return;
                    }
                    if (typeof appId !== 'string') {
                        throw 'appId must be a string';
                        return;
                    }
                    if (typeof createdDate !== 'string') {
                        throw 'createdDate must be a string';
                        return;
                    }
                    if (typeof creatingUser !== 'string') {
                        throw 'creatingUser must be a string';
                        return;
                    }
                    if (typeof description !== 'string') {
                        throw 'description must be a string';
                        return;
                    }
                    if (typeof id !== 'number') {
                        throw 'id must be a number';
                        return;
                    }
                    if (typeof lockDate !== 'string') {
                        throw 'lockDate must be a string';
                        return;
                    }
                    if (typeof lockUser !== 'string') {
                        throw 'lockUser must be a string';
                        return;
                    }
                    if (typeof name !== 'string') {
                        throw 'name must be a string';
                        return;
                    }
                    if (typeof queue !== 'string') {
                        throw 'queue must be a string';
                        return;
                    }
                    if (typeof updatedDate !== 'string') {
                        throw 'updatedDate must be a string';
                        return;
                    }
                    if (typeof updatingUser !== 'string') {
                        throw 'updatingUser must be a string';
                        return;
                    }
                    /** @private */ this._active = active;
                    /** @private */ this._appId = appId;
                    /** @private */ this._createdDate = createdDate;
                    /** @private */ this._creatingUser = creatingUser;
                    /** @private */ this._description = description;
                    /** @private */ this._id = id;
                    /** @private */ this._lockDate = lockDate;
                    /** @private */ this._lockUser = lockUser;
                    /** @private */ this._name = name;
                    /** @private */ this._queue = queue;
                    /** @private */ this._updatedDate = updatedDate;
                    /** @private */ this._updatingUser = updatingUser;
                }
                /**
                * Gets or sets the active status of the AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {boolean} value The active status of the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {boolean} The active status of the AppDataBundle
                */
                AppDataBundle.prototype.active = function (value) {
                    if (typeof value == 'undefined') {
                        return this._active;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'active must be a boolean';
                            return;
                        } else {
                            this._active = value;
                        }
                    }
                };

                /**
                * Gets or sets the array of AppData in the AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {Array} value The array of AppData in the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {MiCo.MiApp.MiJS.AppData[]} The array of AppData in the AppDataBundle
                * @see MiCo.MiApp.MiJS.AppData
                */
                AppDataBundle.prototype.appData = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appData;
                    } else {
                        if (typeof value !== 'object') {
                            throw 'appData must be an object';
                            return;
                        } else {
                            this._appData = value;
                        }
                    }
                };

                /**
                * Gets or sets the id of the App for this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The active status of the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The active status of the AppDataBundle
                */
                AppDataBundle.prototype.appId = function (value) {
                    if (typeof value == 'undefined') {
                        return this._appId;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'appId must be a string';
                            return;
                        } else {
                            this._appId = value;
                        }
                    }
                };

                /**
                * Gets or sets the created date (ISO 8601 format) for this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The created date (ISO 8601 format) for the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The created date (ISO 8601 format) of the AppDataBundle
                */
                AppDataBundle.prototype.createdDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._createdDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'createdDate must be a string';
                            return;
                        } else {
                            this._createdDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the user who created this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The user who created the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The user who created the AppDataBundle
                */
                AppDataBundle.prototype.creatingUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._creatingUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'creatingUser must be a string';
                            return;
                        } else {
                            this._creatingUser = value;
                        }
                    }
                };

                /**
                * Gets or sets the description for this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The description for the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The description for the AppDataBundle
                */
                AppDataBundle.prototype.description = function (value) {
                    if (typeof value == 'undefined') {
                        return this._description;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'description must be a string';
                            return;
                        } else {
                            this._description = value;
                        }
                    }
                };

                /**
                * Gets or sets the id for this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {number} value The id for the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {number} The id for the AppDataBundle
                */
                AppDataBundle.prototype.id = function (value) {
                    if (typeof value == 'undefined') {
                        return this._id;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'id must be a number';
                            return;
                        } else {
                            this._id = value;
                        }
                    }
                };

                /**
                * Gets or sets the date when this AppDataBundle was locked (ISO 8601 format)
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The date when this AppDataBundle was locked to set (ISO 8601 format). Set to undefined to retrieve the value.
                * @return {string} The date when this AppDataBundle was locked (ISO 8601 format)
                */
                AppDataBundle.prototype.lockDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._lockDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'lockDate must be a string';
                            return;
                        } else {
                            this._lockDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the user who locked this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The user who locked the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The user who locked the AppDataBundle
                */
                AppDataBundle.prototype.lockUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._lockUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'lockUser must be a string';
                            return;
                        } else {
                            this._lockUser = value;
                        }
                    }
                };

                /**
                * Gets or sets the name for this AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The name for the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The name for the AppDataBundle
                */
                AppDataBundle.prototype.name = function (value) {
                    if (typeof value == 'undefined') {
                        return this._name;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'name must be a string';
                            return;
                        } else {
                            this._name = value;
                        }
                    }
                };

                /**
                * Gets or sets the name of the queue to which to assign the AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The name of the queue to which to assign the AppDataBundle to set. Set to undefined to retrieve the value.
                * @return {string} The name of the queue to which to the AppDataBundle is assigned
                */
                AppDataBundle.prototype.queue = function (value) {
                    if (typeof value == 'undefined') {
                        return this._queue;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'queue must be a string';
                            return;
                        } else {
                            this._queue = value;
                        }
                    }
                };

                /**
                * Gets or sets the date when this AppDataBundle was last updated (ISO 8601 format)
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The date when this AppDataBundle was last updated to set (ISO 8601 format). Set to undefined to retrieve the value.
                * @return {string} The date when this AppDataBundle was last updated (ISO 8601 format)
                */
                AppDataBundle.prototype.updatedDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._updatedDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'updatedDate must be a string';
                            return;
                        } else {
                            this._updatedDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the user who last updated the AppDataBundle
                *
                * @memberof MiCo.MiApp.MiJS.AppDataBundle
                * @param {string} value The user who last updated the AppDataBundle to set . Set to undefined to retrieve the value.
                * @return {string} The user who last updated this AppDataBundle
                */
                AppDataBundle.prototype.updatingUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._updatingUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'updatingUser must be a string';
                            return;
                        } else {
                            this._updatingUser = value;
                        }
                    }
                };
                return AppDataBundle;
            })();
            MiJS.AppDataBundle = AppDataBundle;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.AppData object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.AppData class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var AppData = (function () {
                /**
                * Creates an instance of AppData
                * @constructs MiCo.MiApp.MiJS.AppData
                * @memberof MiCo.MiApp.MiJS
                * @param {string} createdDate The date when the AppData was created (ISO 8601 format)
                * @param {string} creatingUser The user who created the AppData
                * @param {string} description The description of the AppData
                * @param {string} fileName The filename of the AppData
                * @param {number} id The id of the AppData
                * @param {string} updatedDate The date when the AppData was last updated (ISO 8601 format)
                * @param {string} updatingUser The user who last updated the AppData
                */
                function AppData(createdDate, creatingUser, description, fileName, id, updatedDate, updatingUser) {
                    if (typeof createdDate !== 'string') {
                        throw 'createdDate must be a string';
                        return;
                    }
                    if (typeof creatingUser !== 'string') {
                        throw 'creatingUser must be a string';
                        return;
                    }
                    if (typeof description !== 'string') {
                        throw 'description must be a string';
                        return;
                    }
                    if (typeof fileName !== 'string') {
                        throw 'fileName must be a string';
                        return;
                    }
                    if (typeof id !== 'number') {
                        throw 'id must be a number';
                        return;
                    }
                    if (typeof updatedDate !== 'string') {
                        throw 'updatedDate must be a string';
                        return;
                    }
                    if (typeof updatingUser !== 'string') {
                        throw 'updatingUser must be a string';
                        return;
                    }

                    /** @private */ this._createdDate = createdDate;
                    /** @private */ this._creatingUser = creatingUser;
                    /** @private */ this._description = description;
                    /** @private */ this._fileName = fileName;
                    /** @private */ this._id = id;
                    /** @private */ this._updatedDate = updatedDate;
                    /** @private */ this._updatingUser = updatingUser;
                }
                /**
                * Gets or sets the created date (ISO 8601 format) of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The created date (ISO 8601 format) of the AppData to set. Set to undefined to retrieve the created date.
                * @return {string} The created date of the AppData (ISO 8601 format)
                */
                AppData.prototype.createdDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._createdDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'createdDate must be a string';
                            return;
                        } else {
                            this._createdDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the user who created the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The user who created the AppData to set. Set to undefined to retrieve the user.
                * @return {string} The user who created the AppData
                */
                AppData.prototype.creatingUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._creatingUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'creatingUser must be a string';
                            return;
                        } else {
                            this._creatingUser = value;
                        }
                    }
                };

                /**
                * Gets or sets the description of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The description of the AppData to set. Set to undefined to retrieve the description.
                * @return {string} The description of the AppData
                */
                AppData.prototype.description = function (value) {
                    if (typeof value == 'undefined') {
                        return this._description;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'description must be a string';
                            return;
                        } else {
                            this._description = value;
                        }
                    }
                };

                /**
                * Gets or sets the filename of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The filename of the AppData to set. Set to undefined to retrieve the filename.
                * @return {string} The filename of the AppData
                */
                AppData.prototype.fileName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._fileName;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'fileName must be a string';
                            return;
                        } else {
                            this._fileName = value;
                        }
                    }
                };

                /**
                * Gets or sets the id of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {number} value The id of the AppData to set. Set to undefined to retrieve the id.
                * @return {number} The id of the AppData
                */
                AppData.prototype.id = function (value) {
                    if (typeof value == 'undefined') {
                        return this._id;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'id must be a number';
                            return;
                        } else {
                            this._id = value;
                        }
                    }
                };

                /**
                * Gets or sets the updated date (ISO 8601 format) of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The updated date (ISO 8601 format) of the AppData to set. Set to undefined to retrieve the updated date.
                * @return {string} The updated date of the AppData (ISO 8601 format)
                */
                AppData.prototype.updatedDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._updatedDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'updatedDate must be a string';
                            return;
                        } else {
                            this._updatedDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the user who last updated the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The user who last updated the AppData to set. Set to undefined to retrieve the user.
                * @return {string} The user who last updated the AppData
                */
                AppData.prototype.updatingUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._updatingUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'updatingUser must be a string';
                            return;
                        } else {
                            this._updatingUser = value;
                        }
                    }
                };

                /**
                * Gets or sets the content of the AppData
                *
                * @memberof MiCo.MiApp.MiJS.AppData
                * @param {string} value The content of the AppData to set. Set to undefined to retrieve the content.
                * @return {string} The content of the AppData
                */
                AppData.prototype.content = function (value) {
                    if (typeof value == 'undefined') {
                        return this._content;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'content must be a string';
                            return;
                        } else {
                            this._content = value;
                        }
                    }
                };
                return AppData;
            })();
            MiJS.AppData = AppData;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Session object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Session class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var Session = (function () {
                /**
                * Creates an instance of Session
                * @constructs MiCo.MiApp.MiJS.Session
                * @memberof MiCo.MiApp.MiJS
                * @param {boolean} active An indication of whether a Session is active (true) or inactive (false)
                * @param {string} descriptor The descriptor of a Session
                * @param {string} formId The formID of the Form Template for the Session
                * @param {string} formName The Name of the Form Template for the Session
                * @param {number} formRevision The Revision of the Form Template for the Session
                * @param {string} lockDate The locked date (ISO 8601 format) of the Form Template for the Session
                * @param {string} lockUser The username of the locking user of the Form Template for the Session
                * @param {boolean} locked An indication of whether the Session is locked (true) or unlocked (false)
                * @param {string} queue The name of the Queue to which the Session will be assigned
                * @param {number} sessionId The sessionId of the Session
                */
                function Session(active, descriptor, formId, formName, formRevision, lockDate, lockUser, locked, queue, sessionId) {
                    if (typeof active !== 'boolean') {
                        throw 'active must be a boolean';
                        return;
                    } else {
                        this._active = active;
                    }
                    if (typeof descriptor !== 'string') {
                        throw 'descriptor must be a string';
                        return;
                    } else {
                        this._descriptor = descriptor;
                    }
                    if (typeof formId !== 'string') {
                        throw 'formId must be a string';
                        return;
                    } else {
                        this._formId = formId;
                    }
                    if (typeof formName !== 'string') {
                        throw 'formName must be a string';
                        return;
                    } else {
                        this._formName = formName;
                    }
                    if (typeof formRevision !== 'number') {
                        throw 'formRevision must be a number';
                        return;
                    } else {
                        this._formRevision = formRevision;
                    }
                    if (typeof lockDate !== 'string') {
                        throw 'lockDate must be a string';
                        return;
                    } else {
                        this._lockDate = lockDate;
                    }
                    if (typeof lockUser !== 'string') {
                        throw 'lockUser must be a string';
                        return;
                    } else {
                        this._lockUser = lockUser;
                    }
                    if (typeof locked !== 'boolean') {
                        throw 'locked must be a boolean';
                        return;
                    } else {
                        this._locked = locked;
                    }
                    if (typeof queue !== 'string') {
                        throw 'queue must be a string';
                        return;
                    } else {
                        this._queue = queue;
                    }
                    if (typeof sessionId !== 'number') {
                        throw 'sessionId must be a number';
                        return;
                    } else {
                        this._sessionId = sessionId;
                    }
                }
                /**
                * Gets or sets the active status of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {boolean} value An indication of whether the Session should be active (true) or inactive (false). Set to undefined to retrieve the value.
                * @return {boolean} An indication of whether the Session is active (true) or inactive (false)
                */
                Session.prototype.active = function (value) {
                    if (typeof value == 'undefined') {
                        return this._active;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'active must be a boolean';
                            return;
                        } else {
                            this._active = value;
                        }
                    }
                };

                /**
                * Gets or sets the descriptor of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The descriptor of the Session. Set to undefined to retrieve the value.
                * @return {string} The descriptor of the Session
                */
                Session.prototype.descriptor = function (value) {
                    if (typeof value == 'undefined') {
                        return this._descriptor;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'descriptor must be a string';
                            return;
                        } else {
                            this._descriptor = value;
                        }
                    }
                };

                /**
                * Gets or sets the formId of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The formId of the Session. Set to undefined to retrieve the value.
                * @return {string} The formId of the Session
                */
                Session.prototype.formId = function (value) {
                    if (typeof value == 'undefined') {
                        return this._formId;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'formId must be a string';
                            return;
                        } else {
                            this._formId = value;
                        }
                    }
                };

                /**
                * Gets or sets the form name of the Form Template of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The form name of the Form Template of the Session. Set to undefined to retrieve the value.
                * @return {string} The form name of the Form Template of the Session
                */
                Session.prototype.formName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._formName;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'formName must be a string';
                            return;
                        } else {
                            this._formName = value;
                        }
                    }
                };

                /**
                * Gets or sets the form revision of the Form Template of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {number} value The form revision of the Form Template of the Session. Set to undefined to retrieve the value.
                * @return {number} The form revision of the Form Template of the Session
                */
                Session.prototype.formRevision = function (value) {
                    if (typeof value == 'undefined') {
                        return this._formRevision;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'formRevision must be a number';
                            return;
                        } else {
                            this._formRevision = value;
                        }
                    }
                };

                /**
                * Gets or sets the locked date (ISO 8601 format) of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The locked date (ISO 8601 format) of the Session. Set to undefined to retrieve the value.
                * @return {string} The locked date (ISO 8601 format) of the Session
                */
                Session.prototype.lockDate = function (value) {
                    if (typeof value == 'undefined') {
                        return this._lockDate;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'lockDate must be a string';
                            return;
                        } else {
                            this._lockDate = value;
                        }
                    }
                };

                /**
                * Gets or sets the username of the locking user of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The username of the locking user of the Session. Set to undefined to retrieve the value.
                * @return {string} The username of the locking user of the Session
                */
                Session.prototype.lockUser = function (value) {
                    if (typeof value == 'undefined') {
                        return this._lockUser;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'lockUser must be a string';
                            return;
                        } else {
                            this._lockUser = value;
                        }
                    }
                };

                /**
                * Gets or sets the locked status of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {boolean} value An indication of whether a Session should be locked (true) or unlocked (false). Set to undefined to retrieve the value.
                * @return {boolean} An indication of whether a Session is locked (true) or unlocked (false)
                */
                Session.prototype.locked = function (value) {
                    if (typeof value == 'undefined') {
                        return this._locked;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'locked must be a boolean';
                            return;
                        } else {
                            this._locked = value;
                        }
                    }
                };

                /**
                * Gets or sets the Queue of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The name of the Queue for the Session. Set to undefined to retrieve the value.
                * @return {string} The name of the Queue of the Session
                */
                Session.prototype.queue = function (value) {
                    if (typeof value == 'undefined') {
                        return this._queue;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'queue must be a string';
                            return;
                        } else {
                            this._queue = value;
                        }
                    }
                };

                /**
                * Gets or sets the session id of the Session
                *
                * @memberof MiCo.MiApp.MiJS.Session
                * @param {string} value The session id for the Session. Set to undefined to retrieve the value.
                * @return {string} The session id of the Session
                */
                Session.prototype.sessionId = function (value) {
                    if (typeof value == 'undefined') {
                        return this._sessionId;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'sessionId must be a number';
                            return;
                        } else {
                            this._sessionId = value;
                        }
                    }
                };
                return Session;
            })();
            MiJS.Session = Session;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.AppFile object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.AppFile class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var AppFile = (function () {
                /**
                * Creates an instance of AppFile
                * @constructs MiCo.MiApp.MiJS.AppFile
                * @memberof MiCo.MiApp.MiJS
                * @param {string} fileName The name of the file in the AppFile
                * @param {number} fileSize The size of the file (in bytes) in the AppFile
                */
                function AppFile(fileName, fileSize) {
                    if (typeof fileName !== 'string') {
                        throw 'fileName must be a string';
                        return;
                    }
                    if (typeof fileSize !== 'number') {
                        throw 'fileSize must be a number';
                        return;
                    }

                    /** @private */ this._fileName = fileName;
                    /** @private */ this._fileSize = fileSize;
                }
                /**
                * Gets or sets the file name of the AppFile
                *
                * @memberof MiCo.MiApp.MiJS.AppFile
                * @param {string} value The fileName of the AppFile to set. Set to undefined to retrieve the value.
                * @return {string} The fileName of the AppFile
                */
                AppFile.prototype.fileName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._fileName;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'fileName must be a string';
                            return;
                        } else {
                            this._fileName = value;
                        }
                    }
                };

                /**
                * Gets or sets the file size of the AppFile
                *
                * @memberof MiCo.MiApp.MiJS.AppFile
                * @param {number} value The fileSize of the AppFile to set. Set to undefined to retrieve the value.
                * @return {number} The fileSize of the AppFile
                */
                AppFile.prototype.fileSize = function (value) {
                    if (typeof value == 'undefined') {
                        return this._fileSize;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'fileSize must be a number';
                            return;
                        } else {
                            this._fileSize = value;
                        }
                    }
                };
                return AppFile;
            })();
            MiJS.AppFile = AppFile;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// The MiCo.MiApp.MiJS.Group object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.Group class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var Group = (function () {
                /**
                * Creates an instance of Group
                * @constructs MiCo.MiApp.MiJS.Group
                * @memberof MiCo.MiApp.MiJS
                * @param {string} name The name of the Group
                * @param {boolean} active The active status of the Group
                */
                function Group(name, active) {
                    if (typeof name !== 'string') {
                        throw 'name must be a string';
                        return;
                    }
                    if (typeof active !== 'boolean') {
                        throw 'active must be a boolean';
                        return;
                    }

                    /** @private */ this._name = name;
                    /** @private */ this._active = active;
                }
                /**
                * Gets or sets the name of the Group
                *
                * @memberof MiCo.MiApp.MiJS.Group
                * @param {string} value The name of the Group to set. Set to undefined to retrieve the value.
                * @return {string} The name of the Group
                */
                Group.prototype.name = function (value) {
                    if (typeof value == 'undefined') {
                        return this._name;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'name must be a string';
                            return;
                        } else {
                            this._name = value;
                        }
                    }
                };

                /**
                * Gets or sets the active status of the Group
                *
                * @memberof MiCo.MiApp.MiJS.Group
                * @param {boolean} value The active status of the Group to set. Set to undefined to retrieve the value.
                * @return {boolean} The active status of the Group
                */
                Group.prototype.active = function (value) {
                    if (typeof value == 'undefined') {
                        return this._active;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'active must be a boolean';
                            return;
                        } else {
                            this._active = value;
                        }
                    }
                };
                return Group;
            })();
            MiJS.Group = Group;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /**
            * @class */
            var Customer = (function () {
                /**
                * Creates an instance of Customer
                * @constructs MiCo.MiApp.MiJS.Customer
                * @memberof MiCo.MiApp.MiJS
                * @param {boolean} active The active status of Customer
                * @param {string} contactEmail The contact email for the Customer
                * @param {string} contactName The contact name for the Customer
                * @param {string} contactPhone The contact phone for the Customer
                * @param {string} licenseLevel The license level for the Customer
                * @param {string} name The name for the Customer
                */
                function Customer(active, contactEmail, contactName, contactPhone, licenseLevel, name) {
                    if (typeof active !== 'boolean') {
                        throw 'active must be a boolean';
                        return;
                    }
                    if (typeof contactEmail !== 'string') {
                        throw 'contactEmail must be a string';
                        return;
                    }
                    if (typeof contactName !== 'string') {
                        throw 'contactName must be a string';
                        return;
                    }
                    if (typeof contactPhone !== 'string') {
                        throw 'contactPhone must be a string';
                        return;
                    }
                    if (typeof licenseLevel !== 'string') {
                        throw 'licenseLevel must be a string';
                        return;
                    }
                    if (typeof name !== 'string') {
                        throw 'name must be a string';
                        return;
                    }

                    /** @private */ this._active = active;
                    /** @private */ this._contactEmail = contactEmail;
                    /** @private */ this._contactName = contactName;
                    /** @private */ this._contactPhone = contactPhone;
                    /** @private */ this._licenseLevel = licenseLevel;
                    /** @private */ this._name = name;
                }
                /**
                * Gets or sets the active status of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {boolean} value The active status of the Customer to set. Set to undefined to retrieve the value.
                * @return {boolean} The active status of the Customer
                */
                Customer.prototype.active = function (value) {
                    if (typeof value == 'undefined') {
                        return this._active;
                    } else {
                        if (typeof value !== 'boolean') {
                            throw 'active must be a boolean';
                            return;
                        } else {
                            this._active = value;
                        }
                    }
                };

                /**
                * Gets or sets the contact email of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {string} value The contact email of the Customer to set. Set to undefined to retrieve the value.
                * @return {string} The contact email of the Customer
                */
                Customer.prototype.contactEmail = function (value) {
                    if (typeof value == 'undefined') {
                        return this._contactEmail;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'contactEmail must be a string';
                            return;
                        } else {
                            this._contactEmail = value;
                        }
                    }
                };

                /**
                * Gets or sets the contact name of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {string} value The contact name of the Customer to set. Set to undefined to retrieve the value.
                * @return {string} The contact name of the Customer
                */
                Customer.prototype.contactName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._contactName;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'contactName must be a string';
                            return;
                        } else {
                            this._contactName = value;
                        }
                    }
                };

                /**
                * Gets or sets the contact phone of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {string} value The contact phone of the Customer to set. Set to undefined to retrieve the value.
                * @return {string} The contact phone of the Customer
                */
                Customer.prototype.contactPhone = function (value) {
                    if (typeof value == 'undefined') {
                        return this._contactPhone;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'contactPhone must be a string';
                            return;
                        } else {
                            this._contactPhone = value;
                        }
                    }
                };

                /**
                * Gets or sets the license level of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {string} value The license level of the Customer to set. Set to undefined to retrieve the value.
                * @return {string} The license level of the Customer
                * @see MiCo.MiApp.MiJS.LicenseLevelType
                */
                Customer.prototype.licenseLevel = function (value) {
                    if (typeof value == 'undefined') {
                        return this._licenseLevel;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'licenseLevel must be a string';
                            return;
                        } else {
                            this._licenseLevel = value;
                        }
                    }
                };

                /**
                * Gets or sets the name of the Customer
                *
                * @memberof MiCo.MiApp.MiJS.Customer
                * @param {string} value The name of the Customer to set. Set to undefined to retrieve the value.
                * @return {string} The name of the Customer
                */
                Customer.prototype.name = function (value) {
                    if (typeof value == 'undefined') {
                        return this._name;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'name must be a string';
                            return;
                        } else {
                            this._name = value;
                        }
                    }
                };
                return Customer;
            })();
            MiJS.Customer = Customer;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
// The MiCo.MiApp.MiJS.HistoryEntry object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.HistoryEntry class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var HistoryEntry = (function () {
                /**
                * Creates an instance of HistoryEntry
                * @constructs MiCo.MiApp.MiJS.HistoryEntry
                * @memberof MiCo.MiApp.MiJS
                * @param {string} date The date of the HistoryEntry (ISO 8601 format)
                * @param {string} description The description of the HistoryEntry
                * @param {string} queue The queue from where the HistoryEntry occurred
                * @param {string} user The user who created the HistoryEntry
                */
                function HistoryEntry(date, description, queue, user) {
                    if (typeof date !== 'string') {
                        throw 'date must be a string';
                        return;
                    }
                    if (typeof description !== 'string') {
                        throw 'description must be a string';
                        return;
                    }
                    if (typeof queue !== 'string') {
                        throw 'queue must be a string';
                        return;
                    }
                    if (typeof user !== 'string') {
                        throw 'user must be a string';
                        return;
                    }

                    /** @private */ this._date = date;
                    /** @private */ this._description = description;
                    /** @private */ this._queue = queue;
                    /** @private */ this._user = user;
                }
                /**
                * Gets or sets the date of the HistoryEntry (ISO 8601 format)
                *
                * @memberof MiCo.MiApp.MiJS.HistoryEntry
                * @param {string} value The date of the HistoryEntry (ISO 8601 format) to set. Set to undefined to retrieve the value.
                * @return {string} The date of the HistoryEntry (ISO 8601 format)
                */
                HistoryEntry.prototype.date = function (value) {
                    if (typeof value == 'undefined') {
                        return this._date;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'date must be a string';
                            return;
                        } else {
                            this._date = value;
                        }
                    }
                };

                /**
                * Gets or sets the description of the HistoryEntry
                *
                * @memberof MiCo.MiApp.MiJS.HistoryEntry
                * @param {string} value The description of the HistoryEntry to set. Set to undefined to retrieve the value.
                * @return {string} The description of the HistoryEntry
                */
                HistoryEntry.prototype.description = function (value) {
                    if (typeof value == 'undefined') {
                        return this._description;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'description must be a string';
                            return;
                        } else {
                            this._description = value;
                        }
                    }
                };

                /**
                * Gets or sets the queue of the HistoryEntry
                *
                * @memberof MiCo.MiApp.MiJS.HistoryEntry
                * @param {string} value The queue of the HistoryEntry to set. Set to undefined to retrieve the value.
                * @return {string} The queue of the HistoryEntry
                */
                HistoryEntry.prototype.queue = function (value) {
                    if (typeof value == 'undefined') {
                        return this._queue;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'queue must be a string';
                            return;
                        } else {
                            this._queue = value;
                        }
                    }
                };

                /**
                * Gets or sets the user of the HistoryEntry
                *
                * @memberof MiCo.MiApp.MiJS.HistoryEntry
                * @param {string} value The user of the HistoryEntry to set. Set to undefined to retrieve the value.
                * @return {string} The user of the HistoryEntry
                */
                HistoryEntry.prototype.user = function (value) {
                    if (typeof value == 'undefined') {
                        return this._user;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'user must be a string';
                            return;
                        } else {
                            this._user = value;
                        }
                    }
                };
                return HistoryEntry;
            })();
            MiJS.HistoryEntry = HistoryEntry;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var Token = (function () {
                /**
                * Creates an instance of Token
                * @constructs MiCo.MiApp.MiJS.Token
                * @memberof MiCo.MiApp.MiJS
                * @param {string} tokenValue The value of the Token
                * @param {Date} tokenExpiration The date the Token expires
                * @param {number} allowedTokenRequests The number of allowed token requests before the Token is invalid
                */
                function Token(tokenValue, tokenExpiration, allowedTokenRequests) {
                    if (typeof tokenValue !== 'string') {
                        throw 'tokenValue must be a string';
                        return;
                    }
                    if (typeof tokenExpiration !== 'object') {
                        throw 'tokenExpiration must be a Date';
                        return;
                    } else {
                        if (typeof tokenExpiration.getDate !== 'function') {
                            throw 'tokenExpiration must be a Date';
                            return;
                        }
                    }
                    if (typeof allowedTokenRequests !== 'number') {
                        throw 'allowedTokenRequests must be a number';
                        return;
                    }
                    this._tokenValue = tokenValue;
                    this._tokenExpiration = tokenExpiration;
                    this._allowedTokenRequests = allowedTokenRequests;
                }
                /**
                * Gets or sets the value of the Token
                *
                * @memberof MiCo.MiApp.MiJS.Token
                * @param {string} value The value of the Token to set. Set to undefined to retrieve the value.
                * @return {string} The value of the Token
                */
                Token.prototype.tokenValue = function (value) {
                    if (typeof value == 'undefined') {
                        return this._tokenValue;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'tokenValue must be a string';
                            return;
                        } else {
                            this._tokenValue = value;
                        }
                    }
                };

                /**
                * Gets or sets the expiration date of the Token
                *
                * @memberof MiCo.MiApp.MiJS.Token
                * @param {Date} value The expiration date of the Token to set. Set to undefined to retrieve the value.
                * @return {Date} The expiration date of the Token
                */
                Token.prototype.tokenExpiration = function (value) {
                    if (typeof value == 'undefined') {
                        return this._tokenExpiration;
                    } else {
                        if (typeof value !== 'Date') {
                            throw 'tokenExpiration must be a Date';
                            return;
                        } else {
                            this._tokenExpiration = value;
                        }
                    }
                };

                /**
                * Gets or sets the number of allowed requests of the Token
                *
                * @memberof MiCo.MiApp.MiJS.Token
                * @param {number} value The number of allowed requests of the Token to set. Set to undefined to retrieve the value.
                * @return {number} The number of allowed requests of the Token
                */
                Token.prototype.allowedTokenRequests = function (value) {
                    if (typeof value == 'undefined') {
                        return this._allowedTokenRequests;
                    } else {
                        if (typeof value !== 'number') {
                            throw 'allowedTokenRequests must be a number';
                            return;
                        } else {
                            this._allowedTokenRequests = value;
                        }
                    }
                };

                /**
                * Uses a number of allowed requests for the Token
                *
                * @memberof MiCo.MiApp.MiJS.Token
                * @param {number} value The number of requests to use
                */
                Token.prototype.useTokenRequests = function (value) {
                    if (typeof value !== 'number') {
                        throw 'useTokenRequests value must be a number';
                        return;
                    } else {
                        this._usedTokenRequests += value;
                    }
                };

                /**
                * Gets the number of allowed requests remaining for the Token
                *
                * @memberof MiCo.MiApp.MiJS.Token
                * @return {number} value The number of requests remaining in the Token
                */
                Token.prototype.remainingTokenRequests = function () {
                    return this._allowedTokenRequests - this._usedTokenRequests;
                };
                return Token;
            })();
            MiJS.Token = Token;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var Key = (function () {
                /**
                * Creates an instance of Key
                * @constructs MiCo.MiApp.MiJS.Key
                * @memberof MiCo.MiApp.MiJS
                * @param {string} HexE The Exponent of the RSA Key in hexidecimal format
                * @param {string} HexM The Modulus of the RSA Key in hexidecimal format
                * @param {string} XML The XML representation of the RSA Key
                */
                function Key(HexE, HexM, XML) {
                    if (typeof HexE !== 'string') {
                        throw 'HexE must be a string';
                        return;
                    }
                    if (typeof HexM !== 'string') {
                        throw 'HexM must be a string';
                        return;
                    }
                    if (typeof XML !== 'string') {
                        throw 'XML must be a string';
                        return;
                    }

                    this._HexE = HexE;
                    this._HexM = HexM;
                    this._XML = XML;
                }
                /**
                * Gets or sets Exponent of the RSA Key in hexidecimal format
                *
                * @memberof MiCo.MiApp.MiJS.Key
                * @param {number} value The Exponent of the RSA Key to set. Set to undefined to retrieve the value.
                * @return {number} The Exponent of the RSA Key
                */
                Key.prototype.HexE = function (value) {
                    if (typeof value == 'undefined') {
                        return this._HexE;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'HexE must be a string';
                            return;
                        } else {
                            this._HexE = value;
                        }
                    }
                };

                /**
                * Gets or sets Modulus of the RSA Key in hexidecimal format
                *
                * @memberof MiCo.MiApp.MiJS.Key
                * @param {number} value The Modulus of the RSA Key to set. Set to undefined to retrieve the value.
                * @return {number} The Modulues of the RSA Key
                */
                Key.prototype.HexM = function (value) {
                    if (typeof value == 'undefined') {
                        return this._HexM;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'HexM must be a string';
                            return;
                        } else {
                            this._HexM = value;
                        }
                    }
                };

                /**
                * Gets or sets an XML representation of the RSA Key
                *
                * @memberof MiCo.MiApp.MiJS.Key
                * @param {number} value The XML representation of the RSA Key to set. Set to undefined to retrieve the value.
                * @return {number} The XML representation of the RSA Key
                */
                Key.prototype.XML = function (value) {
                    if (typeof value == 'undefined') {
                        return this._XML;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'XML must be a string';
                            return;
                        } else {
                            this._XML = value;
                        }
                    }
                };
                return Key;
            })();
            MiJS.Key = Key;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var ServerInformation = (function () {
                /**
                * Creates an instance of User
                * @constructs MiCo.MiApp.MiJS.ServerInformation
                * @memberof MiCo.MiApp.MiJS
                * @param {string} version The server version
                */
                function ServerInformation(version) {
                    if (typeof version !== 'string') {
                        throw 'version must be a string';
                        return;
                    }

                    this._version = version;
                }
                /**
                * Gets or sets the server version in server information
                *
                * @memberof MiCo.MiApp.MiJS.ServerInformation
                * @param {string} value The server version in server information to set. Set to undefined to retrieve the value.
                * @return {string} The server version in server information
                */
                ServerInformation.prototype.version = function (value) {
                    if (typeof value == 'undefined') {
                        return this._version;
                    } else {
                        if (typeof value !== 'string') {
                            throw 'version must be a string';
                            return;
                        } else {
                            this._version = value;
                        }
                    }
                };
                return ServerInformation;
            })();
            MiJS.ServerInformation = ServerInformation;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /**
            * Enumeration of Server License Level types
            * @enum {string}
            * @memberof MiCo.MiApp.MiJS
            */
            var LicenseLevelType = {
                Enterprise: "Enterprise",
                Department: "Department",
                Basic: "Basic"
            };
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
/// <reference path="Scripts/jquery.d.ts" />

/// <reference path="MiCo.MiApp.MiJS.User.ts" />
/// <reference path="MiCo.MiApp.MiJS.Tools.Security.ts" />
/// <reference path="MiCo.MiApp.MiJS.Token.ts" />
/// <reference path="MiCo.MiApp.MiJS.Session.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.Workflow.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.Sync.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.Setup.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.Data.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.Auth.ts" />
/// <reference path="MiCo.MiApp.MiJS.Services.App.ts" />
/// <reference path="MiCo.MiApp.MiJS.ServerResponse.ts" />
/// <reference path="MiCo.MiApp.MiJS.ServerInformation.ts" />
/// <reference path="MiCo.MiApp.MiJS.NetworkSettings.ts" />
/// <reference path="MiCo.MiApp.MiJS.LicenseLevelType.ts" />
/// <reference path="MiCo.MiApp.MiJS.Key.ts" />
/// <reference path="MiCo.MiApp.MiJS.HistoryEntry.ts" />
/// <reference path="MiCo.MiApp.MiJS.Group.ts" />
/// <reference path="MiCo.MiApp.MiJS.Customer.ts" />
/// <reference path="MiCo.MiApp.MiJS.AppFile.ts" />
/// <reference path="MiCo.MiApp.MiJS.AppDataBundle.ts" />
/// <reference path="MiCo.MiApp.MiJS.AppData.ts" />
/// <reference path="MiCo.MiApp.MiJS.App.ts" />
// The MiCo.MiApp.MiJS.User object
// Author: 			David Nakamura
// Creation Date: 	02/05/2014
// Purpose: define the MiCo.MiApp.MiJS.User class for the Mi-JS API
var MiCo;
(function (MiCo) {
    (function (MiApp) {
        (function (MiJS) {
            /** @class */
            var User = (function () {
                /**
                * Creates an instance of User
                * @constructs MiCo.MiApp.MiJS.User
                * @memberof MiCo.MiApp.MiJS
                * @param {number} userType The type of user
                * @param {string} userName The username of the User
                * @param {string} firstName The first name of the User
                * @param {string} middleName The middle name of the User
                * @param {string} lastName The last name of the User
                */
                function User(userType, userName, firstName, middleName, lastName) {
                    /** @private */ this._userType = 1;
                    /** @private */ this._status = 1;
                    /** @private */ this._locked = false;
                    if (typeof userType !== 'number') {
                        throw 'userType must be a number';
                        return;
                    }
                    if (typeof userName !== 'string') {
                        throw 'userName must be a string';
                        return;
                    }
                    if (typeof firstName !== 'string') {
                        throw 'firstName must be a string';
                        return;
                    }
                    if (typeof middleName !== 'string') {
                        throw 'middleName must be a string';
                        return;
                    }
                    if (typeof lastName !== 'string') {
                        throw 'lastName must be a string';
                        return;
                    }

                    this._userName = userName;
                    this._firstName = firstName;
                    this._middleName = middleName;
                    this._lastName = lastName;
                }
                /**
                * Gets or sets the id of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {number} value The id of the User to set. Set to undefined to retrieve the value.
                * @return {number} The id of the User
                */
                User.prototype.id = function (value) {
                    if (typeof value == 'undefined') {
                        return this._id;
                    } else {
                        if (typeof value == 'number') {
                            this._id = value;
                        } else {
                            throw 'id must be a number';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the userType of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {number} value The userType of the User to set. Set to undefined to retrieve the value.
                * @return {number} The userType of the User
                */
                User.prototype.userType = function (value) {
                    if (typeof value == 'undefined') {
                        return this._userType;
                    } else {
                        if (typeof value == 'number') {
                            this._userType = value;
                        } else {
                            throw 'userType must be a number';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the username of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The username of the User to set. Set to undefined to retrieve the value.
                * @return {string} The username of the User
                */
                User.prototype.userName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._userName;
                    } else {
                        if (typeof value == 'string') {
                            this._userName = value;
                        } else {
                            throw 'userName must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the status of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {number} value The stauts of the User to set. Set to undefined to retrieve the value.
                * @return {number} The status of the User
                */
                User.prototype.status = function (value) {
                    if (typeof value == 'undefined') {
                        return this._status;
                    } else {
                        if (typeof value == 'number') {
                            this._status = value;
                        } else {
                            throw 'status must be a number';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the locked status of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {boolean} value The locked status of the User to set. Set to undefined to retrieve the value.
                * @return {boolean} The locked status of the User
                */
                User.prototype.locked = function (value) {
                    if (typeof value == 'undefined') {
                        return this._locked;
                    } else {
                        if (typeof value == 'boolean') {
                            this._locked = value;
                        } else {
                            throw 'locked must be a boolean';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the first name of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The first name of the User to set. Set to undefined to retrieve the value.
                * @return {string} The first name of the User
                */
                User.prototype.firstName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._firstName;
                    } else {
                        if (typeof value == 'string') {
                            this._firstName = value;
                        } else {
                            throw 'firstName must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the middle name of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The middle name of the User to set. Set to undefined to retrieve the value.
                * @return {string} The middle name of the User
                */
                User.prototype.middleName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._middleName;
                    } else {
                        if (typeof value == 'string') {
                            this._middleName = value;
                        } else {
                            throw 'middleName must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the last name of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The last name of the User to set. Set to undefined to retrieve the value.
                * @return {string} The last name of the User
                */
                User.prototype.lastName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._lastName;
                    } else {
                        if (typeof value == 'string') {
                            this._lastName = value;
                        } else {
                            throw 'lastName must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the email adddress of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The email address of the User to set. Set to undefined to retrieve the value.
                * @return {string} The email address of the User
                */
                User.prototype.email = function (value) {
                    if (typeof value == 'undefined') {
                        return this._email;
                    } else {
                        if (typeof value == 'string') {
                            this._email = value;
                        } else {
                            throw 'email must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the phone number of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The phone number of the User to set. Set to undefined to retrieve the value.
                * @return {string} The phone number of the User
                */
                User.prototype.phone = function (value) {
                    if (typeof value == 'undefined') {
                        return this._phone;
                    } else {
                        if (typeof value == 'string') {
                            this._phone = value;
                        } else {
                            throw 'phone must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the customer name of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The customer name of the User to set. Set to undefined to retrieve the value.
                * @return {string} The customer name of the User
                */
                User.prototype.customerName = function (value) {
                    if (typeof value == 'undefined') {
                        return this._customerName;
                    } else {
                        if (typeof value == 'string') {
                            this._customerName = value;
                        } else {
                            throw 'customerName must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the device id of the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {string} value The device id of the User to set. Set to undefined to retrieve the value.
                * @return {string} The device id of the User
                */
                User.prototype.deviceID = function (value) {
                    if (typeof value == 'undefined') {
                        return this._deviceID;
                    } else {
                        if (typeof value == 'string') {
                            this._deviceID = value;
                        } else {
                            throw 'deviceID must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the authentication token for the User
                *
                * @memberof MiCo.MiApp.MiJS.User
                * @param {MiCo.MiApp.MiJS.Token} value The authentication token for the User to set. Set to undefined to retrieve the value.
                * @return {MiCo.MiApp.MiJS.Token} The authentication token for the User
                */
                User.prototype.token = function (value) {
                    if (typeof value == 'undefined') {
                        return this._token;
                    } else {
                        this._token = value;
                    }
                };

                /**
                * Gets the full name of the User
                * @method
                * @memberof MiCo.MiApp.MiJS.User
                */
                User.prototype.fullName = function () {
                    return this._firstName + ' ' + this._middleName + ' ' + this._lastName;
                };

                /**
                * Sets the password for the User
                * @method
                * @memberof MiCo.MiApp.MiJS.User
                */
                User.prototype.setPassword = function (password) {
                    if (typeof password !== 'string') {
                        throw 'password must be a string';
                        return;
                    }

                    // TODO: this needs encryption
                    this._encryptedPassword = password;
                };

                /**
                * Verifies the User's password
                * @method
                * @memberof MiCo.MiApp.MiJS.User
                */
                User.prototype.verifyPassword = function (password) {
                    if (typeof password !== 'string') {
                        throw 'password must be a string';
                        return;
                    }

                    // TODO: this needs encryption
                    return (this._encryptedPassword == password);
                };
                return User;
            })();
            MiJS.User = User;

            /** @class */
            var DemographicField = (function () {
                /**
                * Creates an instance of a demographic field
                * @constructs MiCo.MiApp.MiJS.DemographicField
                * @memberof MiCo.MiApp.MiJS
                * @param {string} name The name of the Demographic Field
                * @param {string} description The description of the Demographic Field
                * @param {boolean} required The required status of the Demographic Field
                * @param {string} value The value of the Demographic Field
                */
                function DemographicField(name, description, required, value) {
                    if (typeof name !== 'string') {
                        throw 'name must be a string';
                        return;
                    }
                    if (typeof description !== 'string') {
                        throw 'description must be a string';
                        return;
                    }
                    if (typeof required !== 'boolean') {
                        throw 'required must be a boolean';
                        return;
                    }
                    if (typeof value !== 'string') {
                        throw 'value must be a string';
                        return;
                    }

                    this._name = name;
                    this._description = description;
                    this._required = required;
                    this._value = value;
                }
                /**
                * Gets or sets the name of the Demographic Field
                *
                * @memberof MiCo.MiApp.MiJS.DemographicField
                * @param {string} value The name of the Demographic Field to set. Set to undefined to retrieve the value.
                * @return {string} The name of the Demographic Field
                */
                DemographicField.prototype.name = function (value) {
                    if (typeof value == 'undefined') {
                        return this._name;
                    } else {
                        if (typeof value == 'string') {
                            this._name = value;
                        } else {
                            throw 'name must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the description of the Demographic Field
                *
                * @memberof MiCo.MiApp.MiJS.DemographicField
                * @param {string} value The description of the Demographic Field to set. Set to undefined to retrieve the value.
                * @return {string} The description of the Demographic Field
                */
                DemographicField.prototype.description = function (value) {
                    if (typeof value == 'undefined') {
                        return this._description;
                    } else {
                        if (typeof value == 'string') {
                            this._description = value;
                        } else {
                            throw 'description must be a string';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the required status of the Demographic Field
                *
                * @memberof MiCo.MiApp.MiJS.DemographicField
                * @param {boolean} value The required status of the Demographic Field to set. Set to undefined to retrieve the value.
                * @return {boolean} The required status of the Demographic Field
                */
                DemographicField.prototype.required = function (value) {
                    if (typeof value == 'undefined') {
                        return this._required;
                    } else {
                        if (typeof value == 'boolean') {
                            this._required = value;
                        } else {
                            throw 'required must be a boolean';
                            return;
                        }
                    }
                };

                /**
                * Gets or sets the value of the Demographic Field
                *
                * @memberof MiCo.MiApp.MiJS.DemographicField
                * @param {string} value The value of the Demographic Field to set. Set to undefined to retrieve the value.
                * @return {string} The value of the Demographic Field
                */
                DemographicField.prototype.value = function (value) {
                    if (typeof value == 'undefined') {
                        return this._value;
                    } else {
                        if (typeof value == 'string') {
                            this._value = value;
                        } else {
                            throw 'value must be a string';
                            return;
                        }
                    }
                };
                return DemographicField;
            })();
            MiJS.DemographicField = DemographicField;
        })(MiApp.MiJS || (MiApp.MiJS = {}));
        var MiJS = MiApp.MiJS;
    })(MiCo.MiApp || (MiCo.MiApp = {}));
    var MiApp = MiCo.MiApp;
})(MiCo || (MiCo = {}));
//
// Revision History
//
// Date         Author              Change Location             Reason for Change   Description
//
// 07/14/2014   David Nakamura      private variables           MiJS Sprint Work Item   Removed unused private member variables
//# sourceMappingURL=MiCo.MiApp.MiJS.js.map
