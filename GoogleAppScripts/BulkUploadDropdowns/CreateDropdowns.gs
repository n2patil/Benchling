function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Benchling API Menu')
      .addItem('Bulk Import Dropdowns','startSidebar')
      .addToUi();      
}


function startSidebar()
{

//Sidebar to fill out API information
var form= HtmlService.createHtmlOutputFromFile('Form').setTitle('Import Dropdowns');
SpreadsheetApp.getUi().showSidebar(form);

}


//onsubmit function
function processForm(formObject) {
  
  
  var ui = SpreadsheetApp.getUi();
  
  //uncomment to confirm user input
  //ui.alert([ formObject.apikey, formObject.registryid, formObject.benchlingurl])
  
  //
  createDropdowns([ formObject.apikey, formObject.registryid, formObject.benchlingurl])
  
  
  ui.alert("Import Completed")
  
  return 
  
  }



function createDropdowns(formvalues) {
  var ui = SpreadsheetApp.getUi();
  var ActiveSheet= SpreadsheetApp.getActiveSheet();

  //console.log(formvalues)


  var sheet = SpreadsheetApp.getActiveSheet();
  
  //requires GSheetsUtils Library imported from Resources Tab
  var drops = GSheetsUtils.getRowsData(sheet, {columnHeadersRowIndex: 1});


  //when form values are not filled
  if (formvalues[1] == '' || formvalues[1] == null || formvalues[0] == '' || formvalues[0] == null || formvalues[2] == '' || formvalues[2] == null ){
      
      ui.alert('Invalid Input in Form');
      return
    
    }
    

  var USERNAME = formvalues[0]
  var PASSWORD= '';
  
  //make API Call for every dropdown row in sheet
  for (var i=0; i<drops.length; i++) {
     
     
     create_options=[]
      
     //console.log(sheet.getLastColumn())
     
     //list of options per new dropdown
     for (var j=1; j < sheet.getLastColumn()-1; j++) { 
       create_options.push( {'name' : drops[i]["DD"+ j]})  
     
     }
     
   

     var payload={
    'name': drops[i]['Dropdown Name'],
    'registryId': formvalues[1],
    'options': create_options
     }
     
    //console.log(payload);
  
  //build POST request 
    var authHeader = {'Authorization': 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD)};
    var options = {
      'headers': authHeader,
      'method': 'post',
      'ContentType' : "application/json",
      'payload': JSON.stringify(payload),
      'muteHttpExceptions':true
    }
  
    var API_URL= 'https://' + formvalues[2] + '/api/v2/dropdowns'
  
    
   //console.log(API_URL)
   //Send POST request
    var response = UrlFetchApp.fetch(API_URL, options);

    //track response
    console.log(response)
    
    if(response.getResponseCode() == 200) 
    {
    sheet.getRange(i+2,1).setValue(response.getResponseCode())
    }
    
    else {
    
    sheet.getRange(i+2,1).setValue(response.getContentText())
    }
    
  }
  
  }


