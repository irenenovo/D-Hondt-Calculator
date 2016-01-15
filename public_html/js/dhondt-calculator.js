var dhondt = dhondt || {};

dhondt.calculator = {
  calculate: function (data) {
    var checkVotes = function (vote) {
      var minVotes = getTotalVotes() * data.thresold / 100;
      if (vote.votes >= minVotes) {
        return true;
      } else {
        return false;
      }
    };

    var getTotalVotes = function () {
      var totalVotes = 0;
      for (var i = 0; i < data.votes.length; i++) {
        totalVotes += data.votes[i].votes;
      }
      totalVotes += data.white || 0;
      console.log(totalVotes);
      return totalVotes;
    };
    //primero ordenamos los partidos por número de votos (falta)
    var table = [];
    console.log(data);
    for (var i = 0; i < data.votes.length; i++) {
      var vote = data.votes[i];
      //comprobamos que pase el umbral mínimo para añadirlo al array
        console.log(vote);
      if (checkVotes(vote)) {
        for (var j = 1; j <= data.seats; j++) {
          var divVote = vote.votes / j;
          table.push([j, vote.name, divVote]);
        }
      }
    }
    //lo ordenamos por el número de votos
    table.sort((function (index) {
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

    console.log(table);

    var newArr = {assigned: {}};

    //ahora deberemos coger los n votos más altos
    var obj = newArr.assigned;

    console.log(obj);
    for (var i = 0; i < data.seats; i++) {
      var v = table.pop();
      var name = v[1];
      if (obj.hasOwnProperty(name)) {
        obj[name] += 1;
      } else {
        obj[name] = 1;
      }
    }
    console.log(newArr);
    return newArr;


  }
};

