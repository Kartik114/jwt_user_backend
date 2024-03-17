
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// export let users=JSON.parse(localStorage.getItem('users'))||
//                 [
//                     {
//                         id: 1,
//                         userName: "John",
//                         email: "abc@gmail",
//                         address:"123 abc",
//                         password: "1234"
//                     }
//                 ];

export const useUsers = (initialVal = []) => {
    const [users, setUsers] = useState(initialVal);

    const initializeUsers =()=>{
        setUsers(JSON.parse(localStorage.getItem('users')) || []);  
    }

    const saveToUsers = (updatedUsers) => {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log("save to users");
        console.log(users);
        console.log(localStorage.getItem("users"));
    };

    // Function to generate a random orderId
    const generateUserId = () => {
        return uuidv4();
    };

    const isEmailExists = (email) => {
        return users.some(user => user.email === email);
    };

    const addToUsers = (userName,email,address,password) => {
        if (isEmailExists(email)) {
            // Handle case where email already exists
            console.error("Email already exists. Please choose a different email.");
            return false;
        }
        const newUser = {
            id: generateUserId(),
            userName: userName,
            email: email,
            address: address,
            password: password,
            };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        saveToUsers([...users, newUser]);
        return true;
    };

    const validateUser = (email, password) => {
        const user = users.find(user => user.email == email && user.password == password);
        return user; // Returns the matched user or null if not found
    };

    return {users, initializeUsers, addToUsers, saveToUsers, validateUser};
};

// const validateUser = async (email, password) => {
//     return new Promise((resolve, reject) => {
//       // Simulate an asynchronous operation, e.g., fetching user data from a server
//       setTimeout(() => {
//         const user = users.find(user => user.email === email && user.password === password);
//         resolve(user); // Resolving with the matched user or null if not found
//       }, 1000); // Simulating a delay of 1 second (adjust as needed)
//     });
//   };
  