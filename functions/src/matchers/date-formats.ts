export const dateFormats: DateParserConfig[] = [
    {
        locale: 'en',
        result: '2001-12-31',
        sample: '31*12*01',
        parseFormat: 'DD-MM-YY',
        buildFormat: '%day%-%month%-%year%',
        indexes: {
            day: 0,
            firstSeparator: 1,
            month: 2,
            secondSeparator: 3,
            year: 4,
        },
        regexp: `(\\d{1,2})([^\\d]{1})(\\d{1,2})([^\\d]{1})(\\d{2})($|[^\\d])`,
    },
    {
        locale: 'en',
        result: '2001-02-03',
        sample: '03*02*2001',
        parseFormat: 'DD-MM-YYYY',
        buildFormat: '%day%-%month%-%year%',
        indexes: {
            day: 0,
            firstSeparator: 1,
            month: 2,
            secondSeparator: 3,
            year: 4,
        },
        regexp: `(\\d{1,2})([^\\d]{1})(\\d{1,2})([^\\d]{1})(\\d{4})`,
    },
    {
        locale: 'en',
        result: '2001-12-31',
        sample: '31*DEC*01',
        parseFormat: 'DD-MMM-YY',
        buildFormat: '%day%-%month%-%year%',
        indexes: {
            day: 0,
            firstSeparator: 1,
            month: 2,
            secondSeparator: 3,
            year: 4,
        },
        regexp: `(\\d{2})(.{1})(\\w{3})(.{1})(\\d{2})([^\\d]|$)`,
    },
    {
        locale: 'en',
        result: '2001-12-31',
        sample: '31*DEC*2001',
        buildFormat: '%day%-%month%-%year%',
        parseFormat: 'DD-MMM-YYYY',
        indexes: {
            day: 0,
            firstSeparator: 1,
            month: 2,
            secondSeparator: 3,
            year: 4,
        },
        regexp: `(\\d{2})(.{1})(\\w{3})(.{1})(\\d{4})`,
    },
];

export interface DateParserConfig {
    locale: string;
    result: string;
    sample: string;
    buildFormat: string;
    parseFormat: string;
    indexes: {
        year: number;
        firstSeparator: number;
        month: number;
        secondSeparator: number;
        day: number;
    };
    regexp: string;
}
