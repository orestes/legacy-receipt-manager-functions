import test from 'ava';
import { dateFormats } from './date-formats';

import * as moment from 'moment';

dateFormats.forEach(target => {
    test(`Date format definition for sample: ${target.sample}`, t => {
        const regex = new RegExp(target.regexp);
        const matches = regex.exec(target.sample);

        const year = matches[1 + target.indexes.year];
        const month = matches[1 + target.indexes.month];
        const day = matches[1 + target.indexes.day];

        const parsed = target.buildFormat
            .replace('%day%', day)
            .replace('%month%', month)
            .replace('%year%', year);

        const date = moment(parsed, target.parseFormat);

        const v = date.format('YYYY-MM-DD');

        t.is(target.result, v, `Target RegExp did not match expected result for this sample: ${target.sample}`);
    });
});
