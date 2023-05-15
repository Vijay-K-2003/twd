import axios from "axios";

export const getUsers = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')    
    return data
}
