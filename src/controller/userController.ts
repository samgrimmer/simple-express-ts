import { Response, Request, NextFunction } from 'express';
import { User } from '../model/user';

export class UserController {
    
    list = async(req: Request, res: Response) => {
        
        const options = {
            page: 1,
            limit: 10,
            sort: 'firstName'
        };

        options.page = Number(req.params.page);
        options.limit = Number(req.params.limit);

        const query = {};

        const result = 
            await User.find(query)
                .sort(options.sort)
                    .skip(options.page)
                        .limit(options.limit)
                            .lean().exec();

        return res.status(200).json(result);

    }

    getByEmail = async(req: Request, res: Response) => {

        const user = 
            await User.find({ email : req.params.email })
                .lean().exec();

        return res.status(200).json(user);
        
    }
    
    create = async(req: Request, res: Response, next: NextFunction) => {
        
        try {

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });

            const result = await User.create(newUser);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
        
    }

    update = async(req: Request, res: Response, next: NextFunction) => {

        try {

            const updateUser = new User(req.body);

            const result = await User.findOneAndUpdate(updateUser.id, updateUser, { new : true });

            return res.status(200).json(result);

        } catch (error) { 
            next(error);
        }
        
    }

    delete = async(req: Request, res: Response, next: NextFunction) => {
        
        try {

            const id = req.params.id;

            const result = await User.findByIdAndRemove(id).lean().exec();

            return res.status(200).json(result); 

        } catch (error) {
            next(error);
        }

    }
    
}
