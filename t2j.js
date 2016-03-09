#!/usr/bin/env node

/*
tests2json -i tests.txt -o tests.json
tests2json --input tests.txt --output tests.json
cat tests.txt | tests2json >> tests.json
*/

var program = require('commander'),
    fs = require('fs'),
    t2j = require('./lib/tests2json');
    
program
  .version('0.0.1')
  .option('-i, --input [value]', 'Input tests text file.')
  .option('-o, --output [value]', 'Output tests json file.')
  .parse(process.argv);

if (program.input) {
  console.log('  - input: ', program.input);
}
if (program.output) {
  console.log('  - output: ', program.output);
}

if (!program.input || !program.output) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", function(data){
    //console.log("Here is some data:", data);
    //process.stdout.write("Here is some data:" + data);
    process.stdout.write(processTests(data));
  });  
} else {
  try {
    var input = fs.readFileSync(program.input).toString();
  } catch (err) {
    throw "Input file doesn't exists? Error: " + err;
  }
  var output = processTests(input);
  if (!program.output) {
    console.log(output);
  } else {
    fs.writeFileSync(program.output, output);
    console.log('* Tests converted and saved as json to: %s.', program.output);
  }
}

function processTests(inputTests) {
  return JSON.stringify(t2j.convert(inputTests));
}

/*
**************************************************************************************
Example imput file:
**************************************************************************************

Q1: How many certification levels are there in the ABC Essentials certification?
A. 1
B. 2
C. 3
D. 4
Q2: Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified
Q3: Which one of the following describes three principles of the ABC Essentials
certification program?
A. Characteristic1, Characteristic2, Characteristic3
B. Characteristic1, Characteristic2, Characteristic4
C. Characteristic2, Characteristic3, Characteristic4
D. Characteristic3, Characteristic4, Characteristic5
E. All of these

**************************************************************************************
Example output:
**************************************************************************************

{
   "tests":[
      {
         "order":0,
         "id":"Q1",
         "question":"How many certification levels are there in the ABC Essentials certification?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"1"
            },
            {
               "order":1,
               "id":"B",
               "text":"2"
            },
            {
               "order":2,
               "id":"C",
               "text":"3"
            },
            {
               "order":3,
               "id":"D",
               "text":"4"
            }
         ]
      },
      {
         "order":1,
         "id":"Q2",
         "question":"Which one of the following is the entry level certification for an individual?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"ABC Certified"
            },
            {
               "order":1,
               "id":"B",
               "text":"ABC Foundation"
            },
            {
               "order":2,
               "id":"C",
               "text":"ABC Professional"
            },
            {
               "order":3,
               "id":"D",
               "text":"ABC Qualified"
            }
         ]
      },
      {
         "order":2,
         "id":"Q3",
         "question":"Which one of the following describes three principles of the ABC Essentials certification program?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"Characteristic1, Characteristic2, Characteristic3"
            },
            {
               "order":1,
               "id":"B",
               "text":"Characteristic1, Characteristic2, Characteristic4"
            },
            {
               "order":2,
               "id":"C",
               "text":"Characteristic2, Characteristic3, Characteristic4"
            },
            {
               "order":3,
               "id":"D",
               "text":"Characteristic3, Characteristic4, Characteristic5"
            },
            {
               "order":4,
               "id":"E",
               "text":"All of these"
            }
         ]
      }
   ]
}

*/

// Info on node cli: http://shapeshed.com/command-line-utilities-with-nodejs/