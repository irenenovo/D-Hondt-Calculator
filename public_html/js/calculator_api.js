
var model = {
    whiteVotes: 0,
    seats: 0,
    strip: 0,
    votes: []
};

var dhondt = {
    checkVotes: function (vote) {
        var minVotes = this.getTotalVotes() * 0.05;
        if (vote.votes >= minVotes) {
            return true;
        } else {
            return false;
        }
    },
    clearData: function () {
        model.whiteVotes = 0;
        model.seats = 0;
        model.strip = 0;
        model.votes = [];
    },
    getVotes: function () {
        return model.votes;
    },
    getTotalVotes: function () {
        var totalVotes = 0;
        for (var i = 0; i < model.votes.length; i++) {
            totalVotes += model.votes[i].votes;
        }
        totalVotes += this.getWhiteVotes();
        return totalVotes;
    },
    getWhiteVotes: function () {
        return model.whiteVotes;
    },
    setWhiteVotes: function (newWhiteVotes) {
        model.whiteVotes = newWhiteVotes;
    },
    insertVote: function (vote) {
        model.votes.push(vote);
    },
    getVote: function (index) {
        return model.votes[index];
    },
    getHTMLVote: function (index) {
        return "<b>" + model.votes[index].name + "</b>: " + model.votes[index].votes + " votos.";
    },
    getVotesLenght: function () {
        return model.votes.length;
    },
    deleteVote: function (index) {
        model.votes.splice(index, 1);
    },
    getSeats: function () {
        return model.seats;
    },
    setSeats: function (newSeats) {
        model.seats = newSeats;
    },
    getStrip: function () {
        return model.strip;
    },
    setStrip: function (newStrip) {
        model.strip = newStrip;
    },
    getSeatVotes: function () {
        var arr = [];
        for (var i = 0; i < model.votes.length; i++) {
            var vote = model.votes[i];
            //comprobamos que pase el umbral mínimo para añadirlo al array
            if (this.checkVotes(vote)) {
                console.log("NO ignora los votos de " + vote.name);
                for (var j = 1; j <= model.seats; j++) {
                    var divVote = vote.votes / j;

                    arr.push([j, vote.name, divVote]);
                }
            } else {
                console.log("ignora los votos de " + vote.name);
            }
        }

        //lo ordenamos por el número de votos
        arr.sort((function (index) {
            return function (a, b) {
                var w = (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
                console.log("devuelve " + w);
                return w;
            };
        })(2));

        console.log(arr);

        var newArr = {};

        //ahora deberemos coger los n votos más altos
        for (var i = 0; i < this.getSeats(); i++) {
            var v = arr.pop();
            var name = v[1];
            if ((newArr).hasOwnProperty(name)) {
                newArr[name] += 1;
            } else {
                newArr[name] = 1;
            }
        }
        console.log(newArr);
        return newArr;
    },
    getSeatVotesHTML: function (newArr) {
        var html = "";
        for (a in newArr) {
            html += "El <b>" + a + "</b> obtiene <b>" + newArr[a] + "</b> escaños.<br>";
        }
        return html;
    }
};