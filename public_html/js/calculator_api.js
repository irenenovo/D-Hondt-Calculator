
var model = {
    whiteVotes: 0,
    seats: 0,
    strip: 0,
    votes: []
};

var dhondt = {
    voting: function (wVotes, seats, strip, votes) {
        model.whiteVotes = wVotes;
        model.seats = seats;
        model.strip = strip;
        model.votes = votes;
    },
    getVoting: function () {
        return model;
    },
    checkVotes: function (vote) {
        var minVotes = this.getTotalVotes() * 0.05;
        if (vote.votes >= minVotes) {
            return true;
        } else {
            return false;
        }
    },
    getVotes: function () {
        return model.votes;
    },
    getTotalVotes: function () {
        var totalVotes = 0;
        for (var i = 0; i < model.votes.length; i++) {
            totalVotes += model.votes[i].votes;
        }
        totalVotes += this.getVoting().whiteVotes;
        return totalVotes;
    },
    getVote: function (index) {
        return model.votes[index];
    },
    deleteVote: function (index) {
        model.votes.splice(index, 1);
    },
    getSeatVotes: function () {

        //primero ordenamos los partidos por número de votos (falta)

        var arr = [];
        console.log(model);
        for (var i = 0; i < model.votes.length; i++) {
            ;
            var vote = model.votes[i];
            //comprobamos que pase el umbral mínimo para añadirlo al array
            if (this.checkVotes(vote)) {
                for (var j = 1; j <= model.seats; j++) {
                    var divVote = vote.votes / j;

                    arr.push([j, vote.name, divVote]);
                }
            } 
        }

        //lo ordenamos por el número de votos
        arr.sort((function (index) {
            return function (a, b) {
                var w = (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
                //console.log("devuelve " + w + " "+ a);
                if (w === 0) {
                    a.draw = "empate con " + b;
                    b.draw = "empate con " + a;
                }
                //console.log("devuelve 2 " + w + " "+ a);
                return w;
            };
        })(2));

        console.log(arr);

        var newArr = {assigned: {}};

        //ahora deberemos coger los n votos más altos
        var obj = newArr.assigned;

        console.log(obj);
        for (var i = 0; i < model.seats; i++) {
            var v = arr.pop();
            var name = v[1];
            if (obj.hasOwnProperty(name)) {
                obj[name] += 1;
            } else {
                obj[name] = 1;
            }
        }
        console.log(newArr);
        return newArr;
    },
    getSeatVotesHTML: function (newArr) {
        var html = "";
        for (a in newArr.assigned) {
            html += "El <b>" + a + "</b> obtiene <b>" + newArr.assigned[a] + "</b> escaños.<br>";
        }
        return html;
    }
};