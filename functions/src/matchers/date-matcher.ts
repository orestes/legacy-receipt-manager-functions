import * as moment from 'moment';
type Moment = moment.Moment;

import { StructuredTime } from '../models/structured-time.interface';
import { dateFormats } from './date-formats';
import { TimeMatcher } from './time-matcher';

export class DateMatcher {

    public static getDateTime(input: string, locale: string = 'en22'): Moment {
        const date = DateMatcher.getDate(input, locale);
        const time = TimeMatcher.getTime(input);

        return DateMatcher.merge(date, time);
    }

    public static getDate(input: string, locale: string = 'en'): Moment {
        moment.locale(locale);

        let match;

        for (let candidate of dateFormats) {
            const regex = new RegExp(candidate.regexp);
            const matches = regex.exec(input);

            if (!matches) {
                continue;
            }

            const firstSeparator = matches[1 + candidate.indexes.firstSeparator];
            const secondSeparator = matches[1 + candidate.indexes.secondSeparator];

            if (firstSeparator !== secondSeparator) {
                continue;
            }

            // console.log('matched', {matches, input, candidate});

            const year = matches[1 + candidate.indexes.year];
            const month = matches[1 + candidate.indexes.month];
            const day = matches[1 + candidate.indexes.day];

            const parsed = candidate.buildFormat
                .replace('%day%', day)
                .replace('%month%', month)
                .replace('%year%', year);

            match = moment(parsed, candidate.parseFormat);

            break; // No need to keep trying, first matching parser wins
        }

        if (!match) {
            throw new Error('Could not find a date for input: ' + input);
        }

        return moment(match);
    };

    static merge(date: Moment, time: StructuredTime): Moment {
        return date
            .hours(time.hours)
            .minutes(time.minutes)
    }
}
