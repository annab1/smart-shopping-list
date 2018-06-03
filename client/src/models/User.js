
class User {
  constructor(config = {}) {
    this.id = config.id || null;
    this.username = config.username;
    this.firstName = config.firstName || "";
    this.lastName = config.lastName || "";
    this.email = config.email || "";
    this.birthDay = config.birth_date || null;
    this.isFemale = config.gender === "F";
    this.isSingle = config.relationship === "N";
    this.childrenCount = config.childrenCount;
  }

  static parse(apiUser) {

  }
}

export default User;