
$(function () {

    /*var model = {
     whiteVotes: 0,
     seats: 0,
     strip: 0,
     votes: []
     };
     
     var octopus = {
     
     };*/

    var view = {
        init: function () {
            $("#calculator").on("submit", function (e) {
                e.preventDefault();
                var wVotes = parseInt($("#white_votes").val());
                var strip = $("#strip").val();
                var seats = $("#seats").val();

                octopus.setWhiteVotes(wVotes);
                octopus.setStrip(strip);
                octopus.setSeats(seats);

                $("#explain").empty();
                $("#result").empty();
                var html = "Resultados: ";
                for (var i = 0; i < octopus.getVotesLenght(); i++) {
                    var vote = octopus.getVote(i);
                    if (octopus.checkVotes(vote)) {
                        html += "</br>El partido " + vote.name + " obtiene escaños";
                    } else {
                        html += "</br>El partido " + vote.name + " NO obtiene escaños por no llegar al listón electoral.";
                    }
                }

                var res = JSON.stringify(octopus.getSeatVotes());
                console.log(res);

                $("#result").append(res);
            });

            $("#addNew").on("click", function () {
                var name = $("#name").val();
                var votes = parseInt($("#votes").val());
                var vote = {name: name, votes: votes};
                octopus.insertVote(vote);

                $("#name").val("");
                $("#votes").val("");

                $("#explain").append("<div>" + octopus.getStringVote(octopus.getVotesLenght() - 1) + "</div>");
            });
        }
    };

    view.init();

}());