$(function () {

    var view = {
        init: function () {
            
            var arrVoting = [];
            
            //funcionalidad al hacer click en "Añadir partido"
            $("#addNew").on("click", function () {
                var name = $("#name").val();
                var votes = parseInt($("#votes").val());
                //comprobamos si los datos son correctos
                if (name !== "" && !isNaN(votes)) {
                    var vote = {name: name, votes: votes};
                    arrVoting.push(vote);
                    $("#explain").show();
                    $("#name").val("");
                    $("#votes").val("");
                    $("#explain").append("<div>" + "<b>" + vote.name + "</b>: " + vote.votes + " votos." + "</div>");
                } else {
                    alert("Revisa los datos");
                }
            });
            //funcionalidad al hacer click en "Repartir escaños"
            $("#calculator").on("submit", function (e) {
                e.preventDefault();
                var wVotes = parseInt($("#white_votes").val());
                var strip = $("#strip").val();
                var seats = $("#seats").val();
                //comprobaos que todos los campos esté completados
                if (!wVotes || !strip || !seats) {
                    alert("Completa todos los campos");
                } else {
                    //comprobamos que se haya introducido algún partido político
                    if (arrVoting.length > 0) {
                        
                        dhondt.voting(wVotes, seats, strip, arrVoting);
                        
                        $("#data").hide();
                        $("#result").show();
                        $("#goBack").show();
                        $("#result").append(dhondt.getSeatVotesHTML(dhondt.getSeatVotes()));
                    } else {
                        alert("No has introducido ningún partido");
                    }
                }
            });
            //vuelve a cargar la página
            $("#goBack").on("click", function () {
                location.reload();
            });
        }
    };

    view.init();

}());