import { Repository, IQuery } from "./repository";
import { User, IUser } from "../model/user.schema";

export class UserRepository<User> extends Repository<IUser>
  implements IQuery<IUser> {}
