var newFriends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(newFriends);
    });

    app.post("/api/friends", function (req, res) {
        var totalDifferences = [];
        var index = 0;
        var myScores = req.body.scores;
        for (var i = 0; i < newFriends.length; i++) {
            var totalDifference = 0;
            var friendScores = newFriends[i].scores;

            //subtract my first score from each first score, ... store the results and move to the next
            for (var x = 0; x < friendScores.length && x < myScores.length; x++) {
                var friendScore = friendScores[x];
                var myScore = myScores[x];
                var difference = friendScore - myScore;
                if (difference < 0) {
                    difference = myScore - friendScore;
                }
                totalDifference += difference;
            }
            totalDifferences[i] = totalDifference;
            //find the newFriends[i] that has the lowest total

        }
        var lowestDifference = totalDifferences[0];
        for (var y = 0; y < totalDifferences.length; y++) {
            if (totalDifferences[y] < lowestDifference) {
                lowestDifference = totalDifferences[y];
                index = y;
            }
        }
        res.json(newFriends[index]);
    });
}
