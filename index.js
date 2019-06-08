// implement your API here
const express = require('express');

// import express from 'express'

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log('Working on port 5000')
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if ((userInfo.name == '' || userInfo.name == null) || (userInfo.bio == '' || userInfo.bio == null)) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else {
        db.insert(userInfo)
            .then(user => {
                res.status(201).json({ userInfo })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

