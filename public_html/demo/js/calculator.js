$(function () {

    var view = {
        init: function () {
            //funcionalidad al hacer click en "Añadir partido"
            $("#addNew").on("click", function () {
                var name = $("#name").val();
                var votes = parseInt($("#votes").val());
                //comprobamos si los datos son correctos
                if (name !== "" && !isNaN(votes)) {
                    var vote = {name: name, votes: votes};
                    dhondt.insertVote(vote);
                    $("#explain").show();
                    $("#name").val("");
                    $("#votes").val("");

                    $("#explain").append("<div>" + dhondt.getHTMLVote(dhondt.getVotesLenght() - 1) + "</div>");
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
                    if (dhondt.getVotesLenght() > 0) {
                        dhondt.setWhiteVotes(wVotes);
                        dhondt.setStrip(strip);
                        dhondt.setSeats(seats);

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