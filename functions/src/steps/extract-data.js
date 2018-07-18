"use strict";
exports.__esModule = true;
var date_matcher_1 = require("../matchers/date-matcher");
var total_matcher_1 = require("../matchers/total-matcher");
var time_matcher_1 = require("../matchers/time-matcher");
exports.extractData = function (fileName, inputText) {
    console.log('Using input', inputText);
    var date = date_matcher_1.DateMatcher.getDate(inputText, 'es');
    var time = time_matcher_1.TimeMatcher.getTime(inputText);
    var datetime = date_matcher_1.DateMatcher.merge(date, time);
    var doc = {
        date: datetime,
        total: total_matcher_1.TotalMatcher.getTotal(inputText, ['€', 'EUR']),
        tags: ['pending'],
        fileName: fileName,
        created: new Date()
    };
    console.log('Data extracted', doc);
    return doc;
};
