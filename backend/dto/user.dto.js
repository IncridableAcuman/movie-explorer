module.exports = class UserResponse {
    id;
    username;
    email;
    constructor(id,username,email){
        this.id=id;
        this.username = username;
        this.email=email;
    }
}