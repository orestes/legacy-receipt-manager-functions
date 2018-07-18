"use strict";
exports.__esModule = true;
exports.dateFormats = [
    // {
    //     result: '2001-12-31',
    //     sample: '31*12*01',
    //     parseFormat: 'DD-MM-YY',
    //     buildFormat: '%day%-%month%-%year%',
    //     indexes: {
    //         day: 0,
    //         month: 1,
    //         year: 2,
    //     },
    //     regexp: `(\\d{1,2}).{1}(\\d{1,2}).{1}(\\d{2})`,
    // },
    // {
    //     result: '2001-02-03',
    //     sample: '03*02*2001',
    //     parseFormat: 'DD-MM-YYYY',
    //     buildFormat: '%day%-%month%-%year%',
    //     indexes: {
    //         day: 0,
    //         month: 1,
    //         year: 2,
    //     },
    //     regexp: `(\\d{1,2}).{1}(\\d{1,2}).{1}(\\d{4})`,
    // },
    // {
    //     result: '2001-12-31',
    //     sample: '31*DEC*01',
    //     parseFormat: 'DD-MMM-YY',
    //     buildFormat: '%day%-%month%-%year%',
    //     indexes: {
    //         day: 0,
    //         month: 1,
    //         year: 2,
    //     },
    //     regexp: `(\\d{2}).{1}(\\w{3}).{1}(\\d{2})`,
    // },
    {
        result: '2001-12-31',
        sample: '31*DEC*2001',
        buildFormat: '%day%-%month%-%year%',
        parseFormat: 'DD-MMM-YYYY',
        indexes: {
            day: 0,
            month: 1,
            year: 2
        },
        regexp: "(\\d{2}).{1}(\\w{3}).{1}(\\d{4})"
    },
];
