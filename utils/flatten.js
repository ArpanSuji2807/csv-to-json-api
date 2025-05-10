function unflatten(obj) {
    const result = {};
    for (const key in obj) {
      const keys = key.split('.');
      keys.reduce((acc, curr, i) => {
        if (i === keys.length - 1) acc[curr] = obj[key];
        else acc[curr] = acc[curr] || {};
        return acc[curr];
      }, result);
    }
    return result;
  }
  
  module.exports = unflatten;  