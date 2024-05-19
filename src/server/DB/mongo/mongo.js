import DataBase from "../dataBase.js"
import { User, UserData } from "./models/User.js"

export default class MongoDB extends DataBase {
    models = [User, UserData]

    constructor() {
        super()
    }

    getUser(_id) {
        const model = this.getModel('user')

        return model.find({ _id })
    }

    getUsers() {
        const model = this.getModel('user')

        try{
            const users = model.find({})
            return users
        }catch(error){
            console.log(error);
            return []
        }
    }

    getModel(name) {
        const model = this.models.find(model => model.modelName === name)

        if (!model) throw new Error(`MongoDB does not have a ${name} model`)

        return model
    }
}