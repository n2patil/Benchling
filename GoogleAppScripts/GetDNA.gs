function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Benchling API Menu')
      .addItem('Display DNA Sequences','getDNA')
      .addItem('Clear Result','clearResult')
      .addToUi();
      
}

function clearResult() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange("D1:D").clearContent();
  sheet.getRange("E1:E").clearContent();
  sheet.getRange("B8").clearContent();
}

function handleJsonResponse(data) {
  //Parse response and get sheet
  var response = JSON.parse(data);
  //.getSheetByName(response.name)
  var sheet= SpreadsheetApp.getActiveSheet();
  if (sheet == null) {
    //Error here
  }
   //for (var col = 0; col < numCols; col++)
   const resplength=Object.keys(response.dnaSequences);
   //Logger.log(resplength.length);
  //Loop through data and add it to spreadsheet
  
    var fields=Object.keys(response.dnaSequences[0]);
    var fieldnames= fields.join(', ')
    sheet.getRange('B8').setValue(fieldnames).setWrap(true);
    
    sheet.getRange(1, 4).setValue('Name');
    sheet.getRange(1, 5).setValue('Bases');

   for(var i = 0; i < resplength.length; i++) {
     //Logger.log(response.dnaSequences[i]);
     var obj = response.dnaSequences[i];
     //Logger.log(sheet);
     
     
     sheet.getRange(i + 2, 4).setValue(obj.name);
     
     //excel has a limit of 5000 characters in a cell
     sheet.getRange(i + 2, 5).setValue(obj.bases.slice(0,5000));
    //Logger.log(obj.bases);
  }
}

function buildAPIcall(){

 
  var sheet= SpreadsheetApp.getActiveSheet();
  var USERNAME = sheet.getRange('B3').getValue();
  var PASSWORD= '';

  var authHeader = 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD);
   
  var registryid= sheet.getRange(5,2).getValue();
  
  var schemaid= sheet.getRange(6,2).getValue();

  var payload= {
            'schemaId': schemaid,
             'registryId':  registryid,
             
        }
        
  var authHeader = {'Authorization': 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD)};
  var options = {
    'headers': authHeader,
    'method': 'get',
    'ContentType' : "application/json",
    'params': JSON.stringify(payload),
    'muteHttpExceptions':false
  }
  
  return options

}

function getDNA() {
 
  var sheet= SpreadsheetApp.getActiveSheet();
  var domain= sheet.getRange(2,2).getValue();
  var endpoint= sheet.getRange(4,2).getValue();

  var API_URL= 'https://' + domain + '/api/v2/' + endpoint
   
  var options= buildAPIcall()
  
  Logger.log(options)
  
  // Include 'options' object in every request
  //Call Benchling API DNA Sequences
  var response = UrlFetchApp.fetch(API_URL, options);

  //Logger.log(response.getContentText());
  
  var json = response.getContentText(); 
  handleJsonResponse(json)
  
}

