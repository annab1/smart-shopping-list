
class User {
  constructor(config) {
    this.id = config.id || null;
    this.firstName = config.firstName || "";
    this.lastName = config.lastName || "";
    this.email = config.email || "";
    this.password = config.password || ""; //TODO: we probably shouldn't store the password
    this.birthDay = config.birthDay || null;
    this.isFemale = config.isFemale;
    this.isSingle = config.isSingle;
    this.childrenCount = config.childrenCount;
  }
}

export default User;