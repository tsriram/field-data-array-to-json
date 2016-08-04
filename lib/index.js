var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var sample_input = '../data/sample_input.json';
var requiredArgs = ['in', 'out'];

function validateArgs(){
	var hasValidArgs = true;
	var missingArgs = []
	requiredArgs.forEach(function(a){
		if(!argv[a]){
			missingArgs.push(a);
			hasValidArgs = false;
		}
	});
	if(!hasValidArgs){
		console.error('Missing required arguments - ', missingArgs);
		console.log('\nUsage: fda2j --in data.json --out transformed_data.json');
		process.exit(0);
	}
}

function validate(json){
	return typeof json == "object" && Array.isArray(json.fields) && Array.isArray(json.data);	
}

function transform(){
	validateArgs();

	var json_data = require(path.resolve(argv.in));

	if(!validate(json_data)){
		console.error('JSON data is not valid. Please ensure the input JSON is as per the below format:');
		console.log(JSON.stringify(require(sample_input), null, '  '));
		process.exit(0);
	}

	var fields = json_data.fields;
	var data = json_data.data;

	var transformed_data = [];

	data.forEach(function(v){
		var record = {};
		v.map(function(r, i){
			record[fields[i].label] = r
		});
		transformed_data.push(record);
	});

	fs.writeFile(path.resolve(argv.out), JSON.stringify(transformed_data), function(err){
		if(err){
			console.log(err);
			process.exit(0);
		}
		console.log("Transformed data written to ", path.resolve(argv.out));
		process.exit(0);
	})
}

exports.transform = transform;