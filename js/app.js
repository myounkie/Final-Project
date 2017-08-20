/*
  Please add all Javascript code to this file.
*/

var bluePrint = {};

//Firebase

var config = {
  apiKey: "AIzaSyCgV6yFUoV3DApO0O16c6lWAfXx19KyMSY",
  authDomain: "blueprint-ee532.firebaseapp.com",
  databaseURL: "https://blueprint-ee532.firebaseio.com",
  projectId: "blueprint-ee532",
  storageBucket: "blueprint-ee532.appspot.com",
  messagingSenderId: "15563904260"
};
firebase.initializeApp(config);

//storage reference to database in a varaible
var messageAppReference = firebase.database();


//Handlebars
bluePrint.createForm = function(item) {
  var projectdetailsTemplate = $('#projectdetailsTemplate').html();
  var compileTemplate= Handlebars.compile(projectdetailsTemplate);
  return compileTemplate(item);
}

// This is the same as document ready btw.
$(function() {


var customerForm = function(){

//project details section of customer page
var projectDetails = {
    "Verticals": [
        { "verticalID": "software", "Name": "Software" },
        { "verticalID": "warehouseDistribution", "Name": "Warehouse Distribution" },
    ],
    "Solutions": [
        { "solutionID": "softwareEM", "Name": "Software EM" },
        { "solutionID": "softwareMM", "Name": "Software MM" },
        { "solutionID": "warehouseDEM", "Name": "Warehouse Distribution EM" },
        { "solutionID": "warehouseDMM", "Name": "Warehouse Distribution MM" },
    ],
    "StairStep": [
        { "stepID": "remediate", "Name": "Remediate" },
        { "stepID": "grow", "Name": "Grow" },
        { "stepID": "enhance", "Name": "Enhance" },
        { "stepID": "visionary", "Name": "Visionary" },
    ],
    "Products": [
        { "ColourID": 1, "SizeID": 1, "Name": "SuiteSuccess"},
    ]
};
//handlebars for project details
var t = Handlebars.compile($('#t').html());
$('#verticalInfo').append(t(projectDetails ));  

/*comment out so not executing each time
//setup requirements in firebase (once created, comment out so not recreated each page load)
var requirementsMaster = {
    "Software EM": [
        { "processArea" : "Record to Report", "requirement": "Departments will be used" },
        { "processArea" : "Record to Report", "requirement": "Multiple currencies will be used"},
        { "processArea" : "Record to Report", "requirement": "Customers default to taxable"},
    ],
    "Software MM": [
        { "processArea" : "Record to Report", "requirement": "3 Subsidiaries or Less" },
        { "processArea" : "Record to Report", "requirement": "One Account Structure will be used for all subsidiaries"},
        { "processArea" : "Record to Report", "requirement": "CConsolidated exchange rate tables will be used"},
    ],
    "Warehouse Distribution EM": [
        { "processArea" : "Record to Report", "requirement": "Departments will be used"},
        { "processArea" : "Record to Report", "requirement": "Departments tracked on header level"},
        { "processArea" : "Record to Report", "requirement": "Departments Tracked on line level"},
    ],
    "Warehouse Distribution MM": [
        { "processArea" : "Record to Report", "requirement": "Period close checklist will be used" },
        { "processArea" : "Record to Report", "requirement": "Budgets created annually"},
        { "processArea" : "Record to Report", "requirement": "Budgets created outside of NetSuite & Imported"},
    ]
};

      var firebaseRef = firebase.database().ref();
      //set child object and provide vaue of "Some Value". use .push to create new child each time. do .child to overwite
      firebaseRef.child("requirementsMaster").set(requirementsMaster);

//end setup of requirements in firebase
*/

  }
  customerForm()


//store customer and project details in an object


  $('#customerSubmit').on("click", function(event){
      event.preventDefault();

      var companyProfile = {companyName:"", numberUsers:"", jobNumber:"", pserNumber:"", vertical:"", solution:"", stairStep:""};
      var companyName = $("#companyName").val();
      var numberUsers = $("#numberUsers").val();
      var jobNumber = $("#jobNumber").val();
      var pserNumber = $("#pserNumber").val();
      var companyVertical = $("#vertical").val();
      var companySolution = $("#solution").val();
      var companyStairstep = $("#stairstep").val();
      console.log(companyVertical);
      console.log($("#vertical"));
      //will company object with customer variables
      companyProfile.companyName = companyName;
      companyProfile.numberUsers = numberUsers;
      companyProfile.jobNumber = jobNumber;
      companyProfile.pserNumber = pserNumber;
      companyProfile.vertical = companyVertical;
      companyProfile.solution = companySolution;
      companyProfile.stairStep = companyStairstep;
      console.log(companyProfile);

  //add to firebase. helpful series https://www.youtube.com/watch?v=F6UWb9FNnj4
      //path to root object
      var firebaseRef = firebase.database().ref();
      //set child object and provide vaue of "Some Value". use .push to create new child each time. do .child to overwite
      // add customer to top level of DB
        //firebaseRef.push().set(companyProfile);
      // add customer to the customer level of the DB
      firebaseRef.child("customers").push().set(companyProfile);


//switch to Project detail form html forms
      var goto = $(this).data('block');
      $('.active').removeClass('active');
      $('#'+goto).addClass('active');

        });
//end customer and project detail in object

//begin Add-On form


 $('#addonSubmit').on("click", function(event){
      event.preventDefault();

      //switch to requirements determination html form
      var goto = $(this).data('block');
      $('.active').removeClass('active');
      $('#'+goto).addClass('active');

//end add-on form

//begin requirements determintation page

      //display requirements
      var firebaseRequirements = firebase.database().ref().child("requirementsMaster");
      firebaseRequirements.on('value', function(datasnapshot){
        //console.log(datasnapshot.val());
        var requirementsMaster = datasnapshot.val();
        console.log(requirementsMaster);

        //loop through requirment results from firebase
        for (i = 0; i < requirementsMaster.length; i++) {

           for (j = 0; j < requirementsMaster[i].length; j++) { 
              console.log(requirementsMaster[i][j].requirement);

            }
        }

        //handlebars for project details
        var requirementsTable = Handlebars.compile($('#requirementsTable').html());
       // $('#displayRequirements').append(requirementsTable(requirementsMaster)); 
        console.log(requirementsTable(requirementsMaster));

//end requirements determination page


      });


  
  });


});
