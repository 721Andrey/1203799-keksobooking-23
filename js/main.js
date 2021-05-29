// Задание 1

const getRandomNumber = (min, max) => {

  if (min < 0 || max < 0) {
    return 'Требуется ввести число из диапазона';
  }
  if (min >= max) {
    return 'Меньшее число не может быть больше большего числа или равняться ему';
  }
  return Math.round(Math.random() * (max - min + 1)) + min;
};

getRandomNumber(0, 10);

// Задание 2

const getCoordinate = (min, max, numberAfterDot) => {

  if (min < 0 || max < 0 || numberAfterDot < 0) {
    return 'Требуется ввести число из диапазона';
  }
  if (min >= max) {
    return 'Меньшее число не может быть больше большего числа или равняться ему';
  }
  return (Math.random() * (max - min + 1) + min).toFixed(numberAfterDot);
};

getCoordinate(0, 10, 1);
