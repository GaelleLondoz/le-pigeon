import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { USERS_URL } from "../../config";
import usersAPI from "../services/usersApi";

const PersonList = () => {

    useEffect(() => {
        fetchUsers();
      
    }, []);

    let listsUsers = []
    console.log(listsUsers[0])
    // const [allUsers, listsUsers] = useState({
    //     firstName: "",
    //     lastName: "",
    //     avatar: "",
    // });



    const fetchUsers = async () => {
        try {
            const users = await usersAPI.getUsers()
            listsUsers.push(users)
            console.log(listsUsers[0])

        } catch (error) {
            throw error.response;
        }
    };


    return (
        <>
            <h1>Test</h1>

            <ul>{listsUsers[0]}{/* 
            {listsUsers[0].map(function (element) { 
                return '<li>' + element.firstName  + '</li>';  
            }).join('')} */}


            </ul>

        </>
    )

}

export default PersonList
