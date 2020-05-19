function buildAPIcall(){

  
  if (SpreadsheetApp.getActiveSheet()== null )
  {
    var ss = SpreadsheetApp.openById("GOOGLE_SHEET_ID");
    SpreadsheetApp.setActiveSpreadsheet(ss);
   }
  
  var ActiveSheet= SpreadsheetApp.getActiveSheet();
  //Logger.log(ActiveSheet)
    
  //Logger.log(ActiveSheet)
  var USERNAME = 'YOUR_API_KEY';
  var PASSWORD= '';

  var ActiveRow = ActiveSheet.getLastRow();
  //Logger.log(ActiveRow)

  var projectid = ActiveSheet.getRange("B"+ActiveRow).getValue();
  var deliverto = ActiveSheet.getRange("D"+ActiveRow).getValue(); 
  var assigneeid = getUserId(ActiveSheet.getRange("C"+ActiveRow).getValue())
  var amount = ActiveSheet.getRange("E"+ActiveRow).getValue();
  var date = ActiveSheet.getRange("F"+ActiveRow).getValue();
  var comments = ActiveSheet.getRange("G"+ActiveRow).getValue();
  var requestorid= getUserId(ActiveSheet.getRange("H"+ActiveRow).getValue())
  
  var samples= ActiveSheet.getRange("I"+ActiveRow).getValue()
  
  
  var jsonSamples = "";
  
  //Logger.log(samples)
  
  var stringtest= samples;
  
  //you can build the sample map using the entity schema endpoint but I just hardcoded the entity ids here 
  var samplemap= { 'mCherry Protein (L1)' : 'ENTITY_ID',
                  'mTangerine Protein (L1)' : 'ENTITY_ID' ,
                  'mBanana Protein (L1)' : 'ENTITY_ID'
                  };
                  
  var samplesJson = [];
  var myList = stringtest.split(",");

  for (var x = 0; x < myList.length; x++){
     //Logger.log(myList[x])
     var id = samplemap[myList[x].trim()];
     //Logger.log(id)
     samplesJson.push(
     {
       "id": null,
       "samples": 
       {
         //name of the column configured in request schema
         "Fluorescent Protein": 
          {
            "entityId": id
          }
       }
      });
    }

  //Logger.log(JSON.stringify(samplesJson));
  
  var payload= {
     'projectId':  ActiveSheet.getRange("B"+ActiveRow).getValue(),
     'schemaId': 'REQUEST_SCHEMA_ID',
     'requestorId': requestorid,
      'fields': {
      'date_of_request': { 'value': date},
      'deliver_fluorescent_protein_to': { 'value': deliverto},
      'amount_needed_mg': { 'value': amount},
      'request_comments': { 'value': comments} },
      'assignees':[{ "userId": assigneeid, "teamId": null}],
      'sampleGroups': samplesJson
        }
   

  var authHeader = {'Authorization': 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD)};
  var options = {
    'headers': authHeader,
    'method': 'post',
    'ContentType' : "application/json",
    'payload': JSON.stringify(payload),
    'muteHttpExceptions':false
  }
  
  //Logger.log(options)
  return options

}

function getUserId(name){
  
  //add to JSON for a library of userids and update the form dropdown options with names
  var userlist= { 'Brandon Kirk' : 'BENCHLING_USER_ID',
                  'Namitha Patil' : 'BENCHLING_USER_ID' 
                  };
  
  return userlist[name];
  //Logger.log(name)
  //Logger.log("userID: "+userid)
 
}

function createRequest(e) {

 try {

  var options= buildAPIcall()
  
  
  API_URL= 'https://onboarding.benchling.com/api/v2/requests';
  
  //Logger.log(API_URL)
   
  // Include 'options' object in every request
  var response = UrlFetchApp.fetch(API_URL, options);

  //Logger.log(response.getContentText());
  
  }
  
  catch (error) { Logger.log(error.toString())}
  
  
}

