import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAll();
    return this.res.status(200).json(cars);
  }

  public async getByID() {
    const { id } = this.req.params;

    if (id.length !== 24 || !id) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const cars = await this.service.getByID(id);

    if (typeof cars === 'string') {
      return this.res.status(404).json({ message: 'Car not found' });
    }

    return this.res.status(200).json(cars);
  }

  public async updateByID() {
    const { id } = this.req.params;
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    if (id.length !== 24 || !id) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const cars = await this.service.updateByID(id, car);

    if (typeof cars === 'string') {
      return this.res.status(404).json({ message: 'Car not found' });
    }

    return this.res.status(200).json(cars);
  }
}

export default CarController;