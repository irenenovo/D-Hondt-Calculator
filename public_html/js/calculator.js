
//$(function () {

var model = {
    whiteVotes: 0,
    seats: 0,
    strip: 0,
    votes: []
};

var octopus = {
    checkVotes: function (vote) {
        var minVotes = this.getTotalVotes() * 0.05;
        if (vote.votes >= minVotes) {
            return true;
        } else
            return false;
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
    getStringVote: function(index){
        return "Partido: "+model.votes[index].name + ", votos: " + model.votes[index].votes;
    },
    getVotesLenght: function(){
        return model.votes.length;
    },
    deleteVote: function (index) {
        model.votes.splice(index, 1);
    },
    getSeats: function(){
        return model.seats;
    },
    setSeats: function(newSeats){
        model.seats = newSeats;
    },
    getStrip: function(){
        return model.strip;
    },
    setStrip: function(newStrip){
        model.strip = newStrip;
    }
};

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
            for(var i = 0; i< octopus.getVotesLenght(); i++){
                var vote = octopus.getVote(i);
                if(octopus.checkVotes(vote)){
                    html+= "</br>El partido "+vote.name + " obtiene escaños";
                }else{
                    html+= "</br>El partido "+vote.name + " NO obtiene escaños por no llegar al listón electoral.";
                }
            }
            $("#result").append(html);
        });

        $("#addNew").on("click", function () {
            var name = $("#name").val();
            var votes = parseInt($("#votes").val());
            var vote = {name: name, votes: votes};
            octopus.insertVote(vote);
            
            $("#name").val("");
            $("#votes").val("");
            
            $("#explain").append("<div>"+octopus.getStringVote(octopus.getVotesLenght()-1)+ "</div>"); 
        });
    }
};

view.init();

//}());