/**
 * Takes raw tests string and splits it into strings representing individual test units.
 * 
 * @param {string} raw tests string
 * @return {array} individual tests
 */
var _splitRawTests = function(rawTests) {
  
  // De CR/CR+LF
  //rawTests = rawTests.replace(/\r?\n/gim, "\n");
  rawTests = rawTests.replace(/(\r\n|\r|\n)/gim, "\n");
  
  // Split all into individual tests
  var rawSplit = rawTests.split(/(.*\d+:)/gim);
  
  if (rawSplit.length === 0) {
    throw "Split returned zero tests. Incorrect input format?";
  }
  
  /*
  The above is going to give us output as below:

["", "Q1:", " How many certification levels are there in the ABC Essentials certification?
A. 1
B. 2
C. 3
D. 4
", "Q2:", " Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified"]

  So we need to merge the question number used as a separator that is extracted from regex.
  */
  
  var ret = [];
  
  // Removing first empty string
  rawSplit.splice(0, 1);
  
  for (var i = 0; i < rawSplit.length; i += 2) {
    ret.push(rawSplit[i] + rawSplit[i + 1]);
  }
  
  //console.log(ret);
  return ret;
}

/**
 * Extracts question id and question text from the individual test string.
 * 
 * @param {string} Output of splitRawTests
 * @return {object} Example: {id: "Q1", text: "Question text"}
 */
var _getQuestion = function(unitTxt) {
  // Sometimes question text may have multiple new lines
  // we are splitting text by option number to find out where the question ends.
  var qWithNewLine = unitTxt.split(/\n.+\.\s./gim)[0];
  var qWithoutNewline = qWithNewLine.replace(/\n/, " ");
  
  var re = /^(.*\d+):\s(.+)$/gim;
  var reres = re.exec(qWithoutNewline);
  if (reres.length < 3) {
    throw "getQuestion regex failed. Incorrect input format?";
  }
  var ret = {};
  ret.id = reres[1];
  ret.text = reres[2];
  
  //console.log(ret);
  return ret;
}

/**
 * Extracts answer options from the individual test string.
 * 
 * @param {string} Output of splitRawTests
 * @return {array} Example: [{order: 0, id: "A", text: "Option A text"}, {}]
 */
var _getOptions = function(unitTxt) {
  var re = /^(.+)\.\s(.+)$/gim;
  var ret = [], reres, i = 0;
  
  while(reres = re.exec(unitTxt)) {
    if (reres.length < 3) {
      throw "getOptions regex failed. Incorrect input format?";
    }
    ret.push({
      order: i,
      id: reres[1],
      text: reres[2]
    });
    i++;
  }
  
  //console.log(ret);
  return ret;
}

/**
 * Extracts answer options from the individual test string.
 * 
 * @param {string} String with raw tests
 * @return {object} Object with tests
 */
var convert = function(rawTests) {
  var ret = {tests: []};
  var individualTests = _splitRawTests(rawTests);
  var testIdx = 0;
  individualTests.forEach(function(rawTest){
    var question = _getQuestion(rawTest);
    var options = _getOptions(rawTest);
    var test = {};
    test.order = testIdx;
    test.id = question.id;
    test.question = question.text;
    test.options = options;
    ret.tests.push(test);
    testIdx++;
  });
  return ret;
}


module.exports.splitRawTests = _splitRawTests;
module.exports.getQuestion = _getQuestion;
module.exports.getOptions = _getOptions;
module.exports.convert = convert;