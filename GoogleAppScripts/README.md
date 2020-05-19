## Get DNA Sequences

Link to google sheet template for the script to run.

Google Sheet Template [here](https://docs.google.com/spreadsheets/d/1HBgoA871QFl9BUXUr3zCOG6S22vZasLM2c5u3j3vCKs/edit?usp=sharing ).


- Make a copy of the sheet above. 
- Go to Tools Menu> Script Editor 
- Copy and paste the GETDNA code into the code editor and save.

---------------------------------------------------------------------------
## Create Request

Create Request uses a trigger on a googlesheet that is linked to a form: 

Pre-filled SampleSheet [Link](https://docs.google.com/spreadsheets/d/1rj32WeU18kUANX7_XZJWN9fU84o2a97QBK5wZvfxgE0/edit?usp=sharing)

- Make a copy of the sheet above. 
- Go to Tools Menu> Script Editor and copy and paste the CreateRequest code into the code editor and save.
- Set up a form and link to this spreadsheet to add rows to this sheet. 
- Lastly add a Google App Trigger to this sheet to run the CreateRequest function OnFormSubmit! 

Request Schema JSON Configuration in Benchling Request Settings
```
{
    "fields": [
        {
            "isMulti": false,
            "type": "date",
            "displayName": "Date of Request",
            "name": "date_of_request",
            "isRequired": true
        },
        {
            "isMulti": false,
            "type": "text",
            "displayName": "Deliver Fluorescent Protein To",
            "name": "deliver_fluorescent_protein_to",
            "isRequired": false
        },
        {
            "isMulti": false,
            "type": "float",
            "displayName": "Amount Needed (mg)",
            "name": "amount_needed_mg",
            "isRequired": false
        },
        {
            "isMulti": false,
            "type": "text",
            "displayName": "Request Comments",
            "name": "request_comments",
            "isRequired": false
        }
    ],
    "idPrefix": "Req",
    "taskSchemas": [],
    "samplesSchema": [
        {
            "isMulti": false,
            "isRequired": false,
            "schemaId": "SAMPLE_ENTITY_SCHEMA_ID",
            "type": "entity_link",
            "name": "Fluorescent Protein"
        }
    ]
}
```

