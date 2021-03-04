import { bignumber, format } from 'mathjs';
import Toastify from 'toastify-js';

export const reduceNumberWithDot = (numberStr, displayRange) =>
  numberStr.length > displayRange
    ? `${numberStr.slice(0, displayRange)}...`
    : numberStr;

export const deleteExponential = number =>
  format(bignumber(number), { notation: 'fixed' });

export const Toast = (msg, duration) =>
  Toastify({
    text: msg,
    duration: duration,
    gravity: 'bottom',
    position: 'center',
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    stopOnFocus: false
  });
