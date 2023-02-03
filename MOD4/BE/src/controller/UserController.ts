import {Request, Response} from "express";
import userService from "../service/UserService";


class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    login = async (req: Request, res: Response)=>{
        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response)
    }

    signup = async (req: Request, res: Response) => {
        let user = await this.userService.register(req.body);
        res.status(201).json(user);
    }

}

export default new UserController();