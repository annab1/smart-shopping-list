
class User {
    constructor({ config }) {
        this.id = config.id;
        this.name = config.name || "";
    }
}

export default User;