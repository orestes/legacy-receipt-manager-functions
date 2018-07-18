import test from 'ava';

import * as moment from 'moment';
type Moment = moment.Moment;

import { DateMatcher } from './date-matcher';

test(`DateMatcher parses 21-FEB-2001`, t => {
    const date: Moment = DateMatcher.getDate('aa21-FEB-2001bb');
    t.is('2001-02-21', date.format('YYYY-MM-DD'));
});

test(`DateMatcher parses 21-FEB-01`, t => {
    const date: Moment = DateMatcher.getDate('aa21-FEB-01bb');
    t.is('2001-02-21', date.format('YYYY-MM-DD'));
});

test(`DateMatcher parses 31*12*01`, t => {
    const date: Moment = DateMatcher.getDate('31*12*01');
    t.is('2001-12-31', date.format('YYYY-MM-DD'));
});

test(`DateMatcher parses 31*12*2001`, t => {
    const date: Moment = DateMatcher.getDate('531*12*20015');
    t.is('2001-12-31', date.format('YYYY-MM-DD'));
});

test(`DateMatcher parses 09 07 201821:18033298`, t => {
    const date: Moment = DateMatcher.getDateTime('09 07 201821:18033298');
    t.is('2018-07-09 21:18', date.format('YYYY-MM-DD HH:mm'));
});
