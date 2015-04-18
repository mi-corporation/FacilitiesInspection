// 
// assignedInspections.js
//          A set of functions for assigned inspections
//
// Author: David Nakamura
// Date: 11/18/2014
// 


myApp.getAssignedInspections = function (success, fail) {

    // Got network?
    if (!hasNetwork()) {
        if (fail) {
            fail(NO_NETWORK_MESSAGE);
            return;
        }
    }

    var includeInactive = false;

    MiCo.MiApp.MiJS.Services.Workflow.getAppDataBundles(customer, authToken, username, includeInactive, NETSETTINGS,
        function (appDataBundles) {

            if (success) {
                success(appDataBundles);
            }

        }, function (serverResponse) {
            // Fail - getAuthToken

            if (fail) {
                fail(serverResponse.getString());
            }
        }
    );
}

myApp.displayAssignedInspections = function (appDataBundles) {
    // *** Render the Assigned Inspections...
    var templateAssignedInspections = $$('#templateListAssignedInspections').html();

    // compile it with Template7
    var compiledTemplateAssignedInspections = Template7.compile(templateAssignedInspections);

    // Now we may render our compiled template by passing required context
    var context = {};
    context.appDataBundles = appDataBundles;
    var htmlAssignedInspections= compiledTemplateAssignedInspections(context);
    document.getElementById("assignedInspectionsBlock").innerHTML = htmlAssignedInspections;
}

myApp.removeDisplayedInspection = function (bundleId) {
    var items = $$('#assignedInspectionsBlock a');
    for (var i = 0; i < items.length; i++) {
        if (items[i].toString().indexOf("bId=" + bundleId + "&t") > -1) {
            $$(items[i]).hide();
            break;
        }
    }
}