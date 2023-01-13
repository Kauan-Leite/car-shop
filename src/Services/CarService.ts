import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  // private createCar(car: ICar): Car {
  //   return new Car(car);
  // }

  public async create(data: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(data);
    
    return new Car({
      id: newCar.id,
      model: newCar.model,
      year: newCar.year,
      color: newCar.color,
      status: newCar.status,
      buyValue: newCar.buyValue,
      doorsQty: newCar.doorsQty,
      seatsQty: newCar.seatsQty,
    });
  }
}

export default CarService;