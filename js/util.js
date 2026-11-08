const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

export {getRandomInteger, getRandomItem, createIdGenerator};

