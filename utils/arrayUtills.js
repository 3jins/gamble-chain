'use strict';

const arrayDiff = (a, b) => {
    const tmp = {}, res = [];

    for (let i = 0; i < a.length; i++)
        tmp[a[i]] = 1;
    for (let i = 0; i < b.length; i++)
        if (tmp[b[i]]) delete tmp[b[i]];
    for (let k in tmp)
        res.push(k);

    return res;
};

export {arrayDiff};