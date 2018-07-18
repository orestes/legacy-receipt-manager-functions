"use strict";
exports.__esModule = true;
var moment = require("moment");
var date_formats_1 = require("./date-formats");
var DateMatcher = /** @class */ (function () {
    function DateMatcher() {
    }
    DateMatcher.getDate = function (input, locale) {
        if (locale === void 0) { locale = 'en'; }
        moment.locale(locale);
        var match;
        for (var _i = 0, dateFormats_1 = date_formats_1.dateFormats; _i < dateFormats_1.length; _i++) {
            var candidate = dateFormats_1[_i];
            var regex = new RegExp(candidate.regexp);
            var matches = regex.exec(input);
            if (!matches) {
                console.log('does not match', { input: input, candidate: candidate });
                break; // Does not match
            }
            console.log('matches', { input: input, candidate: candidate });
            var year = matches[1 + candidate.indexes.year];
            var month = matches[1 + candidate.indexes.month];
            var day = matches[1 + candidate.indexes.day];
            var parsed = candidate.buildFormat
                .replace('%day%', day)
                .replace('%month%', month)
                .replace('%year%', year);
            match = moment(parsed, candidate.parseFormat);
        }
        if (!match) {
            throw new Error('Could not find a date for input: ' + input);
        }
        return moment(match);
    };
    ;
    DateMatcher.merge = function (date, time) {
        return date
            .utcOffset(time.diff)
            .hours(time.hours)
            .minutes(time.minutes)
            .toDate();
    };
    return DateMatcher;
}());
exports.DateMatcher = DateMatcher;
