import { Document, Model } from "mongoose";

export interface IQuery<T> {
  list(query?: object, options?: any): Promise<T>;
  get(query?: object): Promise<T>;
}

export interface ICommand<T> {
  create(document: T): Promise<any>;
  update(document: T): Promise<T>;
  delete(id?: string): Promise<T>;
}

export abstract class Repository<T extends Document>
  implements IQuery<T>, ICommand<T> {
  constructor(private model: Model<Document>) {}

  list = async (query?: any, options?: any): Promise<T> => {
    const defaults = {
      page: 1,
      limit: 10
    };

    const defaultOptions = Object.assign(defaults, options);

    return await this.model
      .find(query)
      .skip(defaultOptions.page)
      .limit(defaultOptions.limit)
      .lean()
      .exec();
  };

  get = async (query?: any): Promise<T> => {
    return await this.model
      .find(query)
      .lean()
      .exec();
  };

  create = async (document: T): Promise<any> => {
    return await this.model.create(document);
  };

  update = async (document: T): Promise<T> => {
    return await this.model
      .findOneAndUpdate(document.id, document, { new: true })
      .lean()
      .exec();
  };

  delete = async (id?: string): Promise<T> => {
    return await this.model
      .findByIdAndRemove(id)
      .lean()
      .exec();
  };
}
