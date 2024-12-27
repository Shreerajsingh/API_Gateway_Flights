const { User } = require("../models");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async checkEmail(email) {
        const response = await User.findOne({
            where: {
                email: email
            }
        })

        return response;
    }
}

module.exports = UserRepository;