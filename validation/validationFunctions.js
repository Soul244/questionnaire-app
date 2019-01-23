export function checkItemEmpty(item) {
  if (
    item.content === ''
      || item.content === undefined
      || item.content === null
  ) {
    return item;
  }
  return null;
}

export function checkEmpty(data) {
  return data.filter(item => checkItemEmpty(item));
}

export function checkObjectEmpty(object) {
  const values = Object.values(object);
  for (let index = 0; index < values.length; index++) {
    if (
      values[index] === ''
        || values[index] === undefined
        || values[index] === null
    ) return true;
  }
  return false;
}
