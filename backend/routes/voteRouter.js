const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const verify = require('../verify');
const Polls = require('../models/polls');
const cors = require('./cors');
const days = require('../days');

const voteRouter = express.Router();

voteRouter.use(bodyParser.json());

voteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /vote');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, verify.verifyVote, (req, res, next) => {
        var restaurant = req.body.restaurant;

        var today = days.getToday();
        //today.setDate(today.getDate() - 7);
        Polls.findOne({ date: today })
            .then((poll) => {

                if (poll === null) {
                    var newPoll = {
                        date: today,
                        options: [{ restaurant: restaurant, votes: [req.user._id] }]
                    }
                    Polls.create(newPoll)
                        .then((poll) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(poll);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else {

                    removePreviousUserVote(poll, req.user._id);
                    addUserVote(poll, restaurant, req.user._id);

                    poll.save()
                        .then((savedPoll) => {
                            Polls.findById(savedPoll._id)
                                .then((p) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(p);
                                })
                        }, (err) => next(err));
                }

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /vote');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /vote');
    });

function removePreviousUserVote(poll, userId) {
    for (let i = 0; i < poll.options.length; i++) {
        let index = poll.options[i].votes.indexOf(userId);
        if (index !== -1) {
            poll.options[i].votes.splice(index, 1);
            if (poll.options[i].votes.length === 0) {
                poll.options.splice(i, 1);
                continue;
            }
        }
    }
}

function addUserVote(poll, restaurant, userId) {
    var index = poll.options.map((e) => e.restaurant).indexOf(restaurant);
    if (index === -1) {
        poll.options.push({
            restaurant: restaurant,
            votes: [userId]
        });
        index = poll.options.length - 1;
    }
    if (poll.options[index].votes.indexOf(userId) === -1) {
        poll.options[index].votes.push(userId);
    }
}


module.exports = voteRouter;