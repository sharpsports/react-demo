const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const InitiateMongoServer = require("./config/db");
const cors = require('cors');
const User = require("./model/User");
const axios = require("axios");
const Bet = require("./model/Bet");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json(),cors());

app.get("/",(req, res, next) => {
  res.json({ message: "API Working" });
});

app.post("/bettorcreated", (req, res) => {
  res.json({message: "endpoint working"});
  console.log(req.body);
  const findemail = req.body.data.internalId;
  const bettorid = req.body.data.id;
  console.log(typeof findemail,typeof bettorid);
  try {

    var myquery = {email: findemail};
    var newvalues = {$set: {bettorId: bettorid}};

    User.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      // close();
    });

  }
  catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Webhook");
  }
  res.status(200).end();
  try{
    return axios({ method: 'post', url: (`https://api.sharpsports.io/v1/bettors/${bettorid}/refreshbets`), body:{}, headers: { 'Authorization': 'Token 1fb886d9aff543cb6e2d87691a8b977abf12d312' }});
  }
  catch (res){
    console.log(res);
  }
});

app.post("/refresh", (req, res) => {
  res.json({message: "endpoint working"});
  console.log(req.body);
  const refreshresponse = req.body.data.id;
  console.log(refreshresponse);
  res.status(200).end();
  try {
    console.log('here');
    axios({ method: 'get', url: (`https://api.sharpsports.io/v1/bets/?refreshResponse=${refreshresponse}`), headers: { 'Authorization': 'Token 1fb886d9aff543cb6e2d87691a8b977abf12d312' }})
    .then(function(response) {
      console.log("RESPONSE DATA",response.data);

      function saveBet(betres) {
        id = betres.id;
        bettor = betres.bettor;
        book = betres.book.name;
        bettorAccount = betres.bettorAccount;
        parlayId = betres.parlayId;
        parlayOdds = betres.parlayOdds;
        timePlaced = betres.timePlaced;
        status = betres.status;
        contest = betres.contest.name;
        period = betres.period;
        proposition = betres.proposition;
        position = betres.position;
        outcome = betres.outcome;
        toWin = betres.toWin;
        atRisk = betres.atRisk;
        line = betres.line;
        odds = betres.odds;
        refreshResponse = betres.refreshResponse;

        bet = new Bet({
          id,
          bettor,
          book,
          bettorAccount,
          parlayId,
          parlayOdds,
          timePlaced,
          status,
          contest,
          period,
          proposition,
          position,
          outcome,
          toWin,
          atRisk,
          line,
          odds,
          refreshResponse
        });

        bet.save();
      }

      var betres = response.data;
      betres.forEach(saveBet);
      });
      }
  catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Webhook");
    }
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
