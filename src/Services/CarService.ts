import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private dataCar(infos: ICar): Car {
    return new Car({
      id: infos.id,
      model: infos.model,
      year: infos.year,
      color: infos.color,
      status: infos.status,
      buyValue: infos.buyValue,
      doorsQty: infos.doorsQty,
      seatsQty: infos.seatsQty,
    });
  }

  public async create(data: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(data);
    
    return this.dataCar(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();

    return allCars.map((car) => this.dataCar(car));
  }

  public async getByID(id: string) {
    const carODM = new CarODM();

    try {
      const car = await carODM.findByID(id);
      
      if (car !== null) {
        return this.dataCar(car);
      }
      return 'NOT_FOUND';
    } catch (error) {
      return 'NOT_FOUND';
    }
  }

  public async updateByID(id: string, dataCar: ICar) {
    const carODM = new CarODM();

    try {
      const car = await carODM.update(id, dataCar);
      
      if (car !== null) {
        return this.dataCar(car);
      }
      return 'NOT_FOUND';
    } catch (error) {
      return 'NOT_FOUND';
    }
  }
}

export default CarService;