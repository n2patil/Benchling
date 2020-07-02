
# **Python Script Update DNA Sequences via API**

***Disclaimer***: Script will wipe all annotations and translations from updated sequences

* *Can be modified to save annotations/translation positions and reapply at the same index position*

    * ie. If bases are only added to the beginning or end of the sequence and could be easily readjusted


Script assumes input CSV file with format below (Headers are case sensitive) 


**_Steps To Run Script:_**


1. *Download Python Script:* updateseqs.py 

2. *Download Dependencies:*  Pipfile

3. _Install Python 3 and [Pipenv](https://pypi.org/project/pipenv/)_

4. _Install dependencies from Pipfile:_

     ```pipenv install Pipfile```

5. _Run Script in pipenv:_

  * Update parameters:
      * --domain [benchling url]
      * --apikey [benchling user apikey]
      * [path to csv file]

    ```python3 pipenv run python3 updateseqs.py --domain company.benchling.com --apikey XXXXXXXXXXXXX updatebases_example.csv ```

     _Example Output in Terminal:_

6. _Remove Virtual Env & Delete pipfiles:_

    ```pipenv --rm ```

    ```rm Pipfile ```

    ```rm Pipfile.lock```

