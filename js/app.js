/*
  Please add all Javascript code to this file.
*/

var bluePrint = {};


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


//store customer and project details in an object



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

      var goto = $(this).data('block');
      $('.active').removeClass('active');
      $('#'+goto).addClass('active');

        });
//end customer and project detail in object


});
