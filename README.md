# FacilitiesInspection
A Mi-Enterprise Apps hybrid app project

About
This app demonstrates a simple use case where facilities are inspected. The app has access to a local database of existing facilities and in-process inspections assigned to the user. User roles are defined using the Mi-Enterprise Apps Server which also handles data workflow and exports to Download Center and Mi-Analytics.

Installation
Use Cordova CLI to create a new Cordova project and use the www files. Add the following plugins:
org.apache.cordova.network-information
com.MiCo.MiApp.DataReplication.Plugin

Build the project for iOS or Android.

Technical Details
The Facilities Inspection app is a demonstration hybrid iOS / Android app using Cordova and HTML/JS/CSS. 

It uses the following Mi-Corporation products:

•	Mi-JS – a JavaScript library to assist in the development of Mi-Enterprise Apps (MEA) apps

•	Data Replication Cordova Plugin – a Cordova CLI plugin for synchronization with a Mi-Co Data Replication Server

Please note that although the application uses Data Replication for offline data lookup of facilities and inspections, the demo app is dependent upon a network connection to interact with the Mi-Enterprise Apps Server while handling app data bundles.
The Mi-Enterprise Server handles authentication, user roles, workflow of inspections, and server-side exports.
The Data Replication Server provides data synchronization services to local devices for the facilitation of offline data access of facilities and inspections. The demo facilities and inspections are fabricated.
The Mi-Analytics Server provides insightful trend analysis with charting and reporting tools.
The Download Center provides access to an online repository of data exports.

Configuration
When the app is opened, the settings are pre-configured to support the Mi-Co Mobility Summit 2015 Mi-Enterprise Apps & Data Replication Server demo server (192.168.168.21). To override this default, tap “Adjust Server Settings” and update the configuration settings. These settings will persist as long as the app is installed on the device. 

Log In
Keep “mms” as the Customer name. Enter “inspector1” or “approver1” and a password of “pass”. Tap “Sign In”.

Home Screen, Facility Details, Facility Inspection

To view a list of inspections that are assigned to you, tap “Assigned Inspections”.
Tap an assigned inspection.
Approvers have the ability to check “Approve Inspection?” and tap “Submit this Inspection” which will finalize the inspection and initiate the process of exporting inspection data. 
To view and search on a list of all available facilities, tap “Search Facilities”.
Tap any facility to view details.
Tap “Add a New Inspection for this Facility” to start a new inspection.
Tap “Existing Inspections” to view other facility inspections and edit. 
