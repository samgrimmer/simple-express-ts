import { Response, Request, NextFunction } from "express";
import { User, IUser } from "../model/user.schema";
import { UserRepository } from "../repository/user.repository";

export class UserController {
  private _userRepository: UserRepository<IUser>;

  constructor() {
    this._userRepository = new UserRepository<IUser>(User);
  }

  list = async (req: Request, res: Response) => {
    const options = {
      page: Number(req.params.page),
      limit: Number(req.params.limit)
    };
    const result = await this._userRepository.list(null, options);
    return res.status(200).json(result);
  };

  getByEmail = async (req: Request, res: Response) => {
    const result = this._userRepository.get({ email: req.params.email });
    return res.status(200).json(result);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });

      const result = await this._userRepository.create(newUser);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUser = new User(req.body);

      const result = await this._userRepository.update(updateUser);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const result = await this._userRepository.delete(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
