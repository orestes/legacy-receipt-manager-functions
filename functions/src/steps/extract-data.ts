import { Moment } from 'moment';

import { DateMatcher } from '../matchers/date-matcher';
import { TotalMatcher } from '../matchers/total-matcher';

import { Receipt } from '../models/receipt.interface';

export const extractData = function (fileName, inputText): Receipt {
    const datetime: Moment = DateMatcher.getDateTime(inputText, 'es');

    const total = TotalMatcher.getTotal(inputText, ['€', 'EUR']);

    return {
        date: datetime.toDate(),
        total: total,
        category: 'pending',
        fileName: fileName,
        created: new Date(),
        text: inputText,
    };
};
