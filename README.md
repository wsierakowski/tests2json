# Tests To Json (tests2json / t2j)
Converts tests in text format to json. 
Uses regex to parse the input text file with tests to dig out question number, question text and options.
Outputs as JS object when used programatically or json when used from CLI. 

Can be used as module programatically or from command line.

## Installation
Globally (recommended for cli)
``` bash
  $ [sudo] npm install tests2json -g
```

Locally (recommended for programatic use)
``` bash
  $ cd /path/to/your/project
  $ [sudo] npm install tests2json
```

## Data format

### Input file format
```
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
```

### Output JSON file format
```
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
```

## Usage

### Command Line Usage
``` bash
  $tests2json -i tests.txt -o tests.json
  
  $tests2json --input tests.txt --output tests.json

  $ tests2json --help

  Usage: tests2json [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -i, --input [value]   Input tests text file.
    -o, --output [value]  Output tests json file.
```

or

``` bash
  cat tests.txt | tests2json >> tests.json
```