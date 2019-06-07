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

    if (userInfo.name == null || userInfo.bio == null) {
        res.status(400).json({
            success: false,
            errorMessage: 'Please provide name and bio for the user.'
        })
    } else {
        db.insert(userInfo)
            .then(user => {
                res.status(201).json({ success: true, user })
            })
            .catch(err => res.status(500).json({ success: false, error: 'There was an error while saving the user to the database.' }))
    }



})

