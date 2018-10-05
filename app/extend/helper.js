'use strict';
const moment = require('moment');
const _ = require('lodash');

exports.relativeTime = time =>
  moment(new Date(time * 1000)).fromNow();

function strHasId(str = '', id) {
  if (str === _.toString(id)) {
    return true;
  }
  id = _.toString(id);
  const reg = new RegExp(`^${id},|,${id},|,${id}$`);
  return reg.test(str);
}

exports.strHasId = strHasId;

exports.strAddId = (str = '', id) => {
  if (strHasId(str, id)) {
    return str;
  }
  if (str === '' || !str || str === 'null') {
    return _.toString(id);
  }
  return str + ',' + id;
}

exports.strRemoveId = (str = '', id) => {
  if (!strHasId(str, id)) {
    return str;
  }
}

exports.idsToStr = (ids = []) => {
  return ids.join(',');
}

exports.strToIds = (str = '') => {
  if (str === '') {
    return [];
  }
  return str.split(',').map(x => parseInt(x));
}
