const { Role } = require('../models');
const CrudRepository = require("./crud-repository");

class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }

    async getRoleByName(name) {
        const response = await Role.findOne({
            where: {
                name: name
            }
        });

        return response;
    }
}

module.exports = RoleRepository;