# field-data-array-to-json

This is a simple script which converts a JSON object with fields and data arrays to an array of JSON objects with mapped  fields and data. I mainly wanted this to convert JSON data exported from [data.gov.in](https://data.gov.in/) (Example - [https://data.gov.in/node/356981/datastore/export/json](https://data.gov.in/node/356981/datastore/export/json)) which has two arrays for `fields` and `data`. This might not be readily usable in an app hence wrote this module to transform JSON file as shown below.

## Usage

This can be installed as a global module to transform JSON
```
npm i field-data-array-to-json -g
```
Once installed you can use `fda2j` command (I know the name sucks, suggest a better one please!) to transform the JSON files:
```
fda2j --in <path to input JSON file> --out <path for saving transformed JSON file>
```


**Sample Input**

```
{
	"fields": [
		{
			"id": 1,
			"label": "city"
		},
		{
			"id": 2,
			"label": "state"
		}
	],
	"data": [
		[
			"Chennai",
			"Tamilnadu"
		],
		[
			"Mumbai",
			"Maharashtra"
		]
	]
}
```
**Output**
```
[
  {
    "city": "Chennai",
    "state": "Tamilnadu"
  },
  {
    "city": "Mumbai",
    "state": "Maharashtra"
  }
]
```


