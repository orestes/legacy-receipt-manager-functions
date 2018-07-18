import test from 'ava';

import { extractData } from './extract-data';
import { Receipt } from '../models/receipt.interface';
import moment = require('moment');

test(`Receipt parsed correctly`, t => {
    const actual = extractData('foo.png', 'this is a test on 03-feb-2001 around 21:30 or so. I need 2.345,67 EUR' +
        ' aprox');
    const expected: Partial<Receipt> = {
        total: 2345.67,
        category: 'pending',
        fileName: 'foo.png',
        date: moment('2001-02-03T21:30').toDate(),
    };

    t.deepEqual(expected, {
        total: actual.total,
        category: actual.category,
        fileName: actual.fileName,
        date: actual.date,
    });
});

test(`Receipt parsed correctly with currency in front`, t => {
    const actual = extractData('foo.png', 'this is a test on 03-feb-2001 around 21:30 or so. I need €1,234.56' +
        ' aprox');
    const expected: Partial<Receipt> = {
        total: 1234.56,
        category: 'pending',
        fileName: 'foo.png',
        date: moment('2001-02-03T21:30').toDate(),
    };

    t.deepEqual(expected, {
        total: actual.total,
        category: actual.category,
        fileName: actual.fileName,
        date: actual.date,
    });
});

test(`Receipt 1 parsed`, t => {
    const actual = extractData('foo.png', `470LUIS ENRIQUE VALCARCEGONZALEZ DEBANGON.I.F. 51.388.555-TPLAZA EL MARQUES, 10BAJO IZQUIERDA-GIJONEMPLEADO#0121:3023-JUN-2018 000339FACTURA SIMPLIFICADAFACTURA: 0003351 REFRESCO1 REFRESCO1 REFRESCO1 REFRESCOSUBTOTALIVA 10%ST SIN IVATOTALTOTAL/CAJA€2.30€2.30€2.30€2.30€9.20€0.84€8.36€9.20€9.20VENTA CONTADO10% DE IVA INCLUIDOGRACIAS POR SU VISITA`);
    const expected: any = {
        total: 9.2,
        category: 'pending',
        fileName: 'foo.png',
        date: '2018-06-23 21:30',
    };

    t.deepEqual(expected, {
        total: actual.total,
        category: actual.category,
        fileName: actual.fileName,
        date: moment(actual.date).format('YYYY-MM-DD HH:mm'),
    });
});

test(`Receipt 3 parsed`, t => {
    const actual = extractData('foo.png', `Pepa Gourmet, S.L C/ Cobián Roffignac, 2 36602 PONTEVEDRA PONTEV CIF: B94101011 FACTURA SIMPLIFICADA: T001/60288 FECHA 15/07/2016 MESA 4 COMENSALES 2 UDS DESCRIPCION PVP IMPORTE * * * * 0% 4 w 3 AGUA CABREIROA 33CL 1 ENSALADA CAPRESE 1 PEPITA ARTESANO 1 REILLY 1 PATATAS FINAS 1,5 6,5 6,5 7,75 2,5 4,50€ 6,50€ 6.50€ 7,75€ 2,50€ Co w wwmasa Now wa w we re wa a ** * BASE IMP IVA CUOTA SUBTOTAL 27,75 € 25,23 10% 2,52 *** GRACIAS POR SU VISITA *** ATENDIDO POR: LETI TABLET`);
    const expected: any = {
        total: 27.75,
        category: 'pending',
        fileName: 'foo.png',
        date: '2016-07-15',
    };

    t.deepEqual(expected, {
        total: actual.total,
        category: actual.category,
        fileName: actual.fileName,
        date: moment(actual.date).format('YYYY-MM-DD'),
    });
});
