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

/* Check if two given arrays are same or not.
 * If 'isStrict' option is true, it checks the order of elements as well as.
 */
const compareArray = (a, b, isStrict = true) => {
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a.length !== b.length) return false;
    const len = a.length;

    if (!isStrict) return arrayDiff(a, b).length === 0;

    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

export {arrayDiff, compareArray};