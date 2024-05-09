export const carData = [];

export const addCar = (newCar) => {
  carData.push(newCar);
  console.log('New Car Details OLD', newCar)
  console.log("CAR DATAAAA", carData)
};