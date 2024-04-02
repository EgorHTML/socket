import DataBase from "../dataBase.js"
import { User } from "./models/User.js"

export default class MongoDB extends DataBase {
    models = [User]

    constructor() {
        super()
    }

    getUser(_id) {
        const model = this.models.find(model => model.modelName === 'user')

        if (!model) throw new Error('MongoDB does not have a user model')

        return model.find({ _id })
    }
}