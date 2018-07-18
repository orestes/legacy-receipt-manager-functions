import { StructuredTime } from '../models/structured-time.interface';

export class TimeMatcher {
    public static getTime(input: string, diff: number = 2): StructuredTime {
        const matches = /(\d\d)\:(\d\d)(:(\d\d))?/.exec(input);

        if (!matches) {
            return {
                hours: 0,
                minutes: 0,
                diff,
            };
        }

        const hours = parseInt(matches[1]);
        const minutes = parseInt(matches[2]);

        return {
            hours,
            minutes,
            diff,
        };
    }
}
