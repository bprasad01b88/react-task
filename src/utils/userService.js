import axios from "axios";
const url = "https://react-hauper-app-default-rtdb.firebaseio.com/users.json";
const geturl = `https://react-hauper-app-default-rtdb.firebaseio.com/users.json`;

export function setUser(user){
    return axios.post(url, {
        name : user.name,
        email : user.email,
        phone : user.phone
    });
}

export function updateUserData(userId, user){
    return axios.patch(`https://react-hauper-app-default-rtdb.firebaseio.com/users/${userId}.json`, {
        name : user.name,
        email : user.email,
        phone : user.phone
    });
}

export const getUser = () => {
    return axios.get(geturl);
}

export const deleteUser = (userId) => {
    return axios.delete(`https://react-hauper-app-default-rtdb.firebaseio.com/users/${userId}.json`);
}