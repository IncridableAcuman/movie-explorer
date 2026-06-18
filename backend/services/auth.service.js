const tokenService = require("./token.service");
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');

class AuthService {

    async register(username,email,password){

    }
    async login(){

    }
    async refresh(){

    }
    async logout(){

    }

}
module.exports = new AuthService();