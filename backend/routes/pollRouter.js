const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Polls = require('../models/polls');
const cors = require('./cors');
const days = require('../days');
const pollRouter = express.Router();

pollRouter.use(bodyParser.json());

pollRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {

        var today = days.getToday()
        var monday = days.getMonday(today);

        Polls.find({ date: { $gte: monday, $lte: today } })
            .then((polls) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(polls);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /polls');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /polls');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Polls.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

pollRouter.route('/myvote')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        var today = days.getToday()
        var monday = days.getMonday(today);
        Polls.find({ date: { $gte: monday, $lte: today } })
            .then((polls) => {
                var myVote = getCurrentVote(polls, req.user._id);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(myVote);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

function getCurrentVote(polls, userId)
{
    var today = days.getToday();
    var currentVote = null;
    if(userId != null){
        for (poll of polls){
            if (today.getTime() == poll.date.getTime()){
                for (option of poll.options){
                    if(option.votes.indexOf(userId) !== -1)
                        currentVote = option.restaurant;
                }
            }   
        }
    }
    return currentVote;
}

module.exports = pollRouter;