// 
// index.js
// A set of functions for the Facility Inspection app
//
// Author: David Nakamura
// Date: 10/18/2014
// 

var ERROR_OCCURRED = "An error occurred";

// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true            // Because we use fixed-through navbar we can enable dynamic navbar
});

// Register required Template7 helpers, before templates compilation

// Page navigation handling
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;

    if (page.name === 'about') {
    }
    else if (page.name === 'home') {
    }
    else if (page.name === 'facilities') {
        // Page init by login...
        if (typeof drDb == 'undefined') {
            if (!useDataReplication()) {
                myApp.displayFacilitiesJSON(FacilitiesData);
            }
            else {
                myApp.syncFacilities(customer, username, password);
            }
        }
        else {
            myApp.searchFacilities();
        }

        $$('#availableFacilitiesSync').on('click', function () {
            myApp.syncFacilities(customer, username, password);
        });

        $$('#availableFacilitiesList').on('search', function (e) {
            myApp.updateFacilitiesList(e.detail.foundItems.length, drTotalFacilities);
        });


    }
    else if (page.name === 'facility') {

        // *** Render the facility...
        var templateFacility = $$('#templateFacility').html();

        // compile it with Template7
        var compiledTemplateFacility = Template7.compile(templateFacility);

        // Now we may render our compiled template by passing required context
        myApp.getFacility(page.query.i,
            function (facility) {
                var htmlFacility = compiledTemplateFacility(facility);
                document.getElementById("facilityInfo").innerHTML = htmlFacility;

                facilityName = facility.name;
            },
            function (msg) {
                myApp.alert(msg, ERROR_OCCURRED,
                    function () {
                        mainView.goBack();
                    }
                );
            }
        );

        // *** Render the facility inspections list...
        var template = $$('#templateListInspections').html();

        // compile it with Template7
        var compiledTemplate = Template7.compile(template);

        // Now we may render our compiled template by passing required context
        var context = {};

        myApp.getFacilityInspections(page.query.i,
            function (inspections) {
                context.inspections = inspections;
                context.number = inspections.number;

                var html = compiledTemplate(context);
                document.getElementById("inspectionsList").innerHTML = html;

                $('#inspections').off();
                $('#inspections').on('change', function () {
                    if ($(this).val() == "") {
                        $('#editExistingInspectionListItem').hide();
                    }
                    else {
                        $('#editExistingInspectionListItem').show();
                    }
                });

                $$('#inspections').val('');
            }
            ,
            function (msg) {
                myApp.alert(msg, ERROR_OCCURRED,
                    function () {
                        mainView.goBack();
                    }
                );
            }
        );

        // localStorage.setItem('facilityID', page.query.i);
        facilityId = page.query.i;

    }
    else if (page.name === 'inspection') {
        
        if (page.query.t == 'edit') {
            // Edit inspection...
            $$('#editExistingInspectionListItem i').addClass('ion-loading-a');

            inspectionId = $$('#inspections').val();
            inspBundleId = 0;
            var inspection = myApp.getInspectionFromDB(inspectionId,
                function (inspection) {
                    myApp.configureInspectionPage(inspection);
                    $$('#editExistingInspectionListItem i').removeClass('ion-loading-a');
                },
                function (msg) {
                    myApp.alert(msg, ERROR_OCCURRED,
                        function () {
                            $$('#editExistingInspectionListItem i').removeClass('ion-loading-a');
                            mainView.goBack();
                        }
                    );
                }
            );

            myApp.displayFacilityForInspection(facilityId);
        }
        else if (page.query.t == 'assigned') {
            // Assigned inspection...
            inspBundleId = page.query.bId;
            var inspection = myApp.getInspectionFromServer(page.query.bId,
                function (inspection) {
                    myApp.configureInspectionPage(inspection);

                    myApp.displayFacilityForInspection(inspection.facilityID);
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
        else {
            // New inspection...
            inspectionId = 0;
            inspBundleId = 0;
            myApp.configureInspectionPage();

            // Set the Inspection Date
            document.getElementById('inspectionDate').valueAsDate = new Date();

            myApp.displayFacilityForInspection(facilityId);
        }

        
    }
    else if (page.name === 'assignedInspections') {
        myApp.getAssignedInspections(
            function (appDataBundles) {
                myApp.displayAssignedInspections(appDataBundles);
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
});
