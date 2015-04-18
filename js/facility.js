// 
// facility.js
// A set of functions for a facility
//
// Author: David Nakamura
// Date: 10/25/2014
// 


var facilityId;
var facilityName;

myApp.getFacility = function (id, success, fail) {
    if (typeof drDb !== 'undefined') {
        // Start a transaction
        drDb.transaction(function (tx) {

            sqlSearch = "SELECT * FROM facility WHERE facilityID = '" + id + "';";
            tx.executeSql(sqlSearch, [], function (tx, res) {

                if (res.rows.length > 0){
                    var facility = {};

                    facility.id = id;
                    facility.name = res.rows.item(0).name;
                    facility.description = res.rows.item(0).description;
                    facility.phone = res.rows.item(0).phone;
                    facility.address = res.rows.item(0).address;
                    facility.city = res.rows.item(0).city;
                    facility.state = res.rows.item(0).state;
                    facility.zip = res.rows.item(0).zip;
                    facility.contact = res.rows.item(0).contact;
                    facility.type = res.rows.item(0).type;

                    if (success) {
                        success(facility);
                    }
                }
                else {
                    if (fail) {
                        fail("No facility found with id " + id + ".");
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
    else {
        for (var i = 0; i < FacilitiesData.length; i++) {
            var fac = JSON.parse(FacilitiesData[i]);

            if (fac.facilityID == id) {
                var facility = {};

                facility.id = id;
                facility.name = fac.name;
                facility.description = fac.description;
                facility.phone = fac.phone;
                facility.address = fac.address;
                facility.city = fac.city;
                facility.state = fac.state;
                facility.zip = fac.zip;
                facility.contact = fac.contact;
                facility.type = fac.type;

                if (success) {
                    success(facility);
                }
                break;
            }
        }
    }
}


myApp.getFacilityInspections = function (facilityId, success, fail) {
    if (typeof drDb !== 'undefined') {
        // Start a transaction
        drDb.transaction(function (tx) {

            sqlSearch = "SELECT * FROM inspection WHERE facilityID = '" + facilityId + "';";
            tx.executeSql(sqlSearch, [], function (tx, res) {
                var inspections = [];

                for (var i = 0; i < res.rows.length; i++) {
                    var inspection = {};
                    inspection.id = res.rows.item(i).inspectionID;
                    inspection.inspectionID = res.rows.item(i).inspectionID;
                    inspection.facilityID = res.rows.item(i).facilityID;
                    inspection.date = new Date(res.rows.item(i).date).toLocaleDateString();
                    inspection.contact = res.rows.item(i).contact;
                    inspection.status = myApp.getFacilityInspectionStatus(res.rows.item(i).status);
                    inspection.comments = res.rows.item(i).comments;

                    inspections.push(inspection);
                }

                inspections.number = res.rows.length;

                if (success) {
                    success(inspections);
                }

            }, function (tx, error) {
                if (fail) {
                    fail;
                }
            });
        }, function (error) {
            if (fail) {
                fail;
            }
        });
    }
}

myApp.getFacilityTypes = function () {
    if (typeof drDb !== 'undefined') {
        // Start a transaction
        drDb.transaction(function (tx) {

            sqlSearch = "SELECT * FROM facility_type;";
            tx.executeSql(sqlSearch, [], function (tx, res) {
                facilityTypes = [];
                for (var i = 0; i < res.rows.length; i++) {
                    var facilityType = {};
                    facilityType.id = res.rows.item(i).id;
                    facilityType.name = res.rows.item(i).name;

                    facilityTypes.push(facilityType);
                }

            }, function (tx, error) {
            });
        }, function (error) {
        });
    }
}

