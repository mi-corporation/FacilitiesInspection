// 
// inspection.js
// A set of functions for an inspection
//
// Author: David Nakamura
// Date: 11/15/2014
// 


var inspectionId;

var inspBundleId;
var inspBundleName = "Inspection";
var inspBundleDescription = "Facility Inspection Data";

var APPDATA_FILENAME = "Inspection Data.json";
var APPDATA_DESCRIPTION = "Inspection Data JSON";
var inspData;

var APPDATA_APPROVED_FILENAME = "approved.txt";
var APPDATA_APPROVED_DESCRIPTION = "This inspection has been approved.";

var APPDATA_UPLOAD_SUCCESSFUL_TITLE = "Submit successful";
var APPDATA_UPLOAD_SUCCESSFUL_MESSAGE = "The inspection was successfully submitted.";

myApp.generateNewInspectionData = function () {
    var inspectionData = {};

    inspectionData.facilityId = facilityId;
    inspectionData.facilityName = document.getElementById('facilityName').innerHTML;
    inspectionData.date = $$('#inspectionDate').val();
    inspectionData.contactName = $$('#inspectionContactName').val();
    inspectionData.comments = $$('#inspectionComments').val();
    inspectionData.status = $('input:radio[name=inspectionStatus]:checked').val();

    return inspectionData;
}

myApp.uploadInspection = function (bundleId, approved, success, fail) {
    var inspectionBundleName = inspBundleName + " for " + facilityName;
    var inspectionBundleDescription = inspBundleDescription + " for " + facilityName;

    function setBundleLock(bundleId, isLock, success, fail) {
        // Lock the AppDataBundle
        MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleLockStatus(customer, authToken, bundleId, isLock, username, NETSETTINGS,
            function (statusSet) {
                if (success) {
                    success();
                }
            }, function (serverResponse) {
                if (fail) {
                    fail("setAppDataBundleLockStatus failed. Details" + serverResponse.getString());
                }
            }
        );
    }

    function updateBundle(bundleId, success, fail) {
        // UpdateAppData
        MiCo.MiApp.MiJS.Services.Data.updateAppData(customer, authToken,
            0,
            bundleId,
            APPDATA_FILENAME,
            APPDATA_DESCRIPTION,
            JSON.stringify(inspData),
            false,
            NETSETTINGS,
            function (appDataId) {
                // Success

                function submitInspection(success, fail) {
                    // submitDataBundleForProcessing
                    MiCo.MiApp.MiJS.Services.Workflow.submitDataBundleForProcessing(customer, authToken,
                        bundleId,
                        NETSETTINGS,
                        function (submitted) {
                            // Success

                            if (success) {
                                success(submitted);
                            }

                        }, function (serverResponse) {
                            if (fail) {
                                fail("updateAppData failed. Details" + serverResponse.getString());
                            }
                        }
                    );
                }

                function approveInspection(success, fail) {
                    // UpdateAppData
                    MiCo.MiApp.MiJS.Services.Data.updateAppData(customer, authToken,
                        0,
                        bundleId,
                        APPDATA_APPROVED_FILENAME,
                        APPDATA_APPROVED_DESCRIPTION,
                        "",
                        false,
                        NETSETTINGS,
                        function (appDataId) {
                            // Success
                            if (success) {
                                success(appDataId);
                            }
                        }, function (serverResponse) {
                            if (fail) {
                                fail("updateAppData failed. Details" + serverResponse.getString());
                            }
                        }
                    );
                }

                if (approved) {
                    approveInspection(
                        function (appDataId) {
                            submitInspection(
                                function (submitted) {
                                    if (success) {
                                        success(submitted);
                                    }
                                },
                                function (msg) {
                                    if (fail) {
                                        fail(msg);
                                    }
                                }
                            );
                        },
                        function (msg) {
                            if (fail) {
                                fail(msg);
                            }
                        }
                    );
                }
                else {
                    submitInspection(
                        function (submitted) {
                            if (success) {
                                success(submitted);
                            }
                        },
                        function (msg) {
                            if (fail) {
                                fail(msg);
                            }
                        }
                    );
                }

            }, function (serverResponse) {
                if (fail) {
                    fail("updateAppData failed. Details" + serverResponse.getString());
                }
            }
        );
    }

    function submitBundle(bundleId, isNew) {

        MiCo.MiApp.MiJS.Services.Data.updateAppDataBundle(customer, authToken,
            APP_ID,
            bundleId,
            inspectionBundleName,
            inspectionBundleDescription,
            NETSETTINGS,
            function (bundleId) {
                // Success

                if (isNew) {
                    setBundleLock(bundleId, true,
                        function () {
                            if (success) {
                                updateBundle(bundleId, success, fail);
                            }
                        },
                        function (msg) {
                            if (fail) {
                                fail(msg);
                            }
                        }
                    );
                }
                else {
                    updateBundle(bundleId, success, fail);
                }

            }, function (serverResponse) {
                if (fail) {
                    fail("updateAppDataBundle failed. Details" + serverResponse.getString());
                }
            }
        );
    }

    if (bundleId == 0) {
        // New bundle
        submitBundle(bundleId, true);
    }
    else {
        // Existing bundle
        setBundleLock(bundleId, true,
            function () {
                submitBundle(bundleId, false);
            },
            function (msg) {
                if (fail) {
                    fail(msg);
                }
            }
        );
    }

}

myApp.getInspectionFromDB = function (inspectionId, success, fail) {
    var sqlSearch;
    var inspection;

    if (typeof drDb !== 'undefined') {
        // Start a transaction
        drDb.transaction(function (tx) {

            sqlSearch = "SELECT * FROM inspection WHERE inspectionID = '" + inspectionId + "';";

            tx.executeSql(sqlSearch, [], function (tx, res) {
                if (res.rows.length == 1) {
                    inspection = {};

                    inspection.inspectionID = inspectionId;
                    inspection.facilityID = res.rows.item(0).facilityID;
                    inspection.date = new Date(res.rows.item(0).date);
                    inspection.contact = res.rows.item(0).contact;
                    inspection.statusId = res.rows.item(0).status;
                    inspection.comments = res.rows.item(0).comments;

                    if (success) {
                        success(inspection)
                    }
                }
                else {
                    // SQL query failed to return the expected inspection...
                    if (fail) {
                        fail("Could not find the inspection.");
                    }
                }
            }, function (tx, error) {
                if (fail) {
                    fail(error);
                }

            });
        }, function (error) {
            if (fail) {
                fail(error);
            }
        });
    }
}

myApp.getInspectionFromServer = function (bundleId, success, fail) {
    var inspection;

    function getDetails() {
        MiCo.MiApp.MiJS.Services.Data.getAppDataBundleDetails(customer, authToken,
            bundleId,
            NETSETTINGS,
            function (appDataBundle) {
                // Success

                var appDataIds = [];
                for (var i = 0; i < appDataBundle.appData().length; i++) {
                    if (appDataBundle.appData()[i].fileName() == APPDATA_FILENAME) {
                        appDataIds.push(appDataBundle.appData()[i].id());
                    }
                }
                MiCo.MiApp.MiJS.Services.Data.getAppDataBundleContent(customer, authToken,
                    bundleId,
                    appDataIds,
                    NETSETTINGS,
                    function (appDataContents) {
                        // Success

                        // Unlock the AppDataBundle
                        MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleLockStatus(customer, authToken, bundleId, false, username, NETSETTINGS,
                            function (statusSet) {
                            }, function (serverResponse) {
                                if (fail) {
                                    fail("setAppDataBundleLockStatus failed. Details" + serverResponse.getString());
                                }
                            }
                        );

                        if (appDataContents.length > 0) {
                            var json = JSON.parse(appDataContents[appDataContents.length - 1]);
                            var inspection = {};

                            if (typeof json.inspectionId !== 'undefined') {
                                inspection.inspectionID = json.inspectionId;
                            }
                            else {
                                inspection.inspectionID = "0";
                            }

                            inspection.facilityID = json.facilityId;
                            inspection.date = new Date(json.date);
                            inspection.contact = json.contactName;
                            inspection.statusId = myApp.getFacilityInspectionStatusId(json.status);
                            inspection.comments = json.comments;

                            if (typeof json.facilityName !== 'undefined') {
                                inspection.facilityName = json.facilityName;
                            }

                            if (success) {
                                success(inspection)
                            }

                        }
                        else {
                            if (fail) {
                                fail("getAppDataBundleContent failed to find the correct data file.");
                            }
                        }
                    }, function (serverResponse) {
                        if (fail) {
                            fail("getAppDataBundleContent failed. Details" + serverResponse.getString());
                        }
                    }
                );
            }, function (serverResponse) {
                if (fail) {
                    fail("getAppDataBundleDetails failed. Details" + serverResponse.getString());
                }
            }
        );
    }

    // Lock the AppDataBundle
    MiCo.MiApp.MiJS.Services.Workflow.setAppDataBundleLockStatus(customer, authToken, bundleId, true, username, NETSETTINGS,
        function (statusSet) {
            getDetails();
        }, function (serverResponse) {
            if (serverResponse.serverError()._type == 'ExpectedError') {
                getDetails();
            }
            else {
                if (fail) {
                    fail("setAppDataBundleLockStatus failed. Details" + serverResponse.getString());
                }
            }
        }
    );
}

myApp.configureInspectionPage = function (inspection) {

    // Set up the Submit button
    $$('#submitInspection').on('click', function () {
        $$('#submitInspection i').addClass('ion-loading-a');
        $$('#submitInspection i').removeClass('ion-checkmark-circled');

        if (!hasNetwork()) {
            $$('#submitInspection i').addClass('ion-checkmark-circled');
            $$('#submitInspection i').removeClass('ion-loading-a');

            myApp.alert(NO_NETWORK_MESSAGE, NO_NETWORK_TITLE);
            return;
        }

        // Is the inspection approved?
        var approved = false;

        approved = (typeof $('input:checkbox[name=inspectionApproval]:checked').val() !== 'undefined');

        function startUpload() {
            inspData = myApp.generateNewInspectionData();
            inspData.inspectionId = inspectionId;

            myApp.uploadInspection(inspBundleId,
                approved,
                function (appDataId) {
                    // success

                    myApp.alert(APPDATA_UPLOAD_SUCCESSFUL_MESSAGE, APPDATA_UPLOAD_SUCCESSFUL_TITLE,
                        function () {
                            $$('#submitInspection i').addClass('ion-checkmark-circled');
                            $$('#submitInspection i').removeClass('ion-loading-a');

                            mainView.goBack();

                            myApp.removeDisplayedInspection(inspBundleId);
                        }
                    );
                },
                function (msg) {
                    // fail
                    $$('#submitInspection i').addClass('ion-checkmark-circled');
                    $$('#submitInspection i').removeClass('ion-loading-a');

                    myApp.alert(msg, "Upload inspection error");
                }
            );
        }

        if (typeof authToken == 'undefined') {
            // User logged in while offline - we need an authToken
            myApp.authenticateUser(
                function () {
                    // Success
                    myApp.signInSucceeded();
                    myApp.setPassword(customer, username, password);
                },
                function () {
                    // Fail
                    if (myApp.verifyPassword(customer, username, password)) {
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
        }
        else {
            startUpload();
        }
    });

    // Set up the Approval checkbox
    if (userIsApprover) {
        $$("#inspectionApprovalSection").show();
    }
    else {
        $$("#inspectionApprovalSection").hide();
    }

    // Set up existing inspection
    if (typeof inspection !== 'undefined') {
        // Date
        document.getElementById('inspectionDate').valueAsDate = inspection.date;

        // Contact Name
        $$('#inspectionContactName').val(inspection.contact);

        // Comments
        $$('#inspectionComments').val(inspection.comments);

        // Inspection Status
        setCheckedValue(document.getElementsByName('inspectionStatus'), myApp.getFacilityInspectionStatus(inspection.statusId));
    }
}

myApp.getFacilityInspectionStatus = function (statusId) {
    if (statusId == "1") {
        return "Open";
    }
    else if (statusId == "2") {
        return "Assigned";
    }
    else if (statusId == "3") {
        return "Violation";
    }
    else if (statusId == "4") {
        return "Completed";
    }
    else {
        return "Unknown";
    }
}

myApp.getFacilityInspectionStatusId = function (status) {
    if (status == "Open") {
        return "1";
    }
    else if (status == "Assigned") {
        return "2";
    }
    else if (status == "Violation") {
        return "3";
    }
    else if (status == "Completed") {
        return "4";
    }
    else {
        return "0";
    }
}

myApp.displayFacilityForInspection = function (facilityId) {
    // *** Render the facility...
    var templateFacility = $$('#templateFacility').html();

    // compile it with Template7
    var compiledTemplateFacility = Template7.compile(templateFacility);

    // Now we may render our compiled template by passing required context
    // myApp.getFacility(localStorage.getItem('facilityID'), 
    myApp.getFacility(facilityId,
        function (context) {
            var htmlFacility = compiledTemplateFacility(context);
            document.getElementById("inspectionFacilityInfo").innerHTML = htmlFacility;

        },
        function (msg) {
            myApp.alert(msg, ERROR_OCCURRED,
                function () {
                    mainView.goBack();
                }
            );
        }
    );

}