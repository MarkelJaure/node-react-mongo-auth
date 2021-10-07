const UserModel = require('../../../common/api-server/src/models/User');
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";

class UsersController {
  @TryCatchErrorDecorator
  static async index(req, res) {
    const users = await UserModel.find().select("_id name email");

    res.json(users);
  }

  static async findAll(req, res, next) {
    try {
      let someModels = await UserModel.find();
      res.json({ status: "success", data: someModels });
    } catch (error) {
      throw 'Error recuperando: ' + UserModel.collection.collectionName + ': ' + error;
    }
  }

  static async populate(someResults) {
    try {
      if (typeof this.optsPopulate !== 'undefined' && this.optsPopulate !== null && this.optsPopulate !== "") {
        someResults = await this.model.populate(someResults, this.optsPopulate);
        //console.log('crud.service.populate --> someResults: ',someResults);
        return someResults;
      } else {
        return someResults;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UsersController;
