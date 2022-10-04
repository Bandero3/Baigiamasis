import HTTP from "./index";

const saveUser = (data) => HTTP.post('/users', data);
const login = (data) => HTTP.post('login', data);

export {
    saveUser,
    login
}