import pandas as pd
import requests 
import json
import click


class BadRequestException(Exception):
    def __init__(self, message, rv):
        super(BadRequestException, self).__init__(message)
        self.rv = rv


def api_patch(domain, api_key, path,seq, body):
    url = "https://{}/api/v2/{}/{}".format(domain, path, seq)
    #print(url)
    rv = requests.patch(url, json=body, auth=(api_key, ""))

    #print(rv)

    if rv.status_code >= 400:
        raise BadRequestException(
            "Server returned status {}. Response:\n{}".format(
                rv.status_code, json.dumps(rv.json())
            ),
            rv,
        )
    return rv.status_code

def api_get(domain, api_key, path, paramsjson):
    url = "https://{}/api/v2/{}".format(domain, path)
    rv = requests.get(url, auth=(api_key, ""), params=paramsjson)
    if rv.status_code >= 400:
        raise BadRequestException(
            "Server returned status {}. Response:\n{}".format(
                rv.status_code, json.dumps(rv.json())
            ),
            rv,
        )
    return rv.json()


@click.command()
@click.option(
    "--domain",
    help="Domain name of your Benchling instance, e.g. example.benchling.com",
    required=True,
)

@click.option("--apikey", help="Your API key", required=True)

@click.argument("csv_file_to_import", type=click.File("r"))

def updateBases(domain, apikey, csv_file_to_import):


	#api endpoint to send requests to
	endpoint='dna-sequences'

	#set csv file path
	data = pd.read_csv(csv_file_to_import)
	#print(data.head())

	for index, row in data.iterrows():

		#Entity Name Column from CSV (case sensitive)
		entityname=row['Entity names']

		#Bases Column from CSV (case sensitive)
		newbases=row['Bases']


		#payload for listing dna sequences
		namejson= { "name": entityname }
		response=api_get(domain, apikey, endpoint, namejson)
		#print(response)

		#extract sequence id
		seq_id= response['dnaSequences'][0]['id']

		#payload for patch sequence *** will wipe out annotations and traslations ***
		payload= {
		"bases": newbases,"annotations": [],"translations": [] }

		patchresponse= api_patch(domain,apikey,endpoint, seq_id, payload)

		if patchresponse == 200:
			print("Updated {}. Sequence ID: {}".format(entityname,seq_id))
		else:
			print("ERROR Updating {}. Sequence ID: {}. Response Code: {}".format(entityname,seq_id,patchresponse))


	print("SCRIPT COMPLETED!")
	return 


if __name__ == "__main__":
	updateBases()




