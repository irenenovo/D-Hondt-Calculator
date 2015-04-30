
describe('Votes', function () {

    var vote;

    beforeEach(function () {
        //inicializamos con set de datos
        octopus.setWhiteVotes(100);
        octopus.setStrip(5);
        octopus.setSeats(100);
        vote = {name: "PSOE", votes: 100};
    });

    //caso 1: comprobar que los datos estén bien metidos
    it('should only introduce int numbers', function () {

        expect(vote.votes).toMatch(/\d{1,}/);
    });

    //caso 2: comprobar que puede insertar una votación
    it('should be able to add a vote', function () {

        octopus.insertVote(vote);

        expect(octopus.getVote(0)).toBe(vote);
    });

    //caso 3: comprobar que se ha borrado bien una votación
    it('should be able to delete a vote', function () {

        octopus.deleteVote(0);

        expect(octopus.getVote(0)).not.toBeDefined();
    });

});

describe('Calculator', function () {

    var vote1, vote2;

    beforeEach(function () {

        octopus.clearData();

        //inicializamos con set de datos
        octopus.setWhiteVotes(100);
        octopus.setStrip(5);
        octopus.setSeats(5);

    });

    //caso 1: descartar partido si tiene menos de 5% de los votos totales + blancos
    it('should discard votes with less than ' + octopus.getStrip() + '%', function () {
        vote1 = {name: "PP", votes: 300};
        octopus.insertVote(vote1);
        expect(octopus.checkVotes(vote1)).toBe(true);
    });

    //caso 2: caso en el que se reparten bien los escaños
    it('should return the seats well', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 300};
        vote2 = {name: "PSOE", votes: 420};

        octopus.insertVote(vote1);
        octopus.insertVote(vote2);

        //resultado que esperamos
        var result = {PSOE: 3, PP: 2};

        expect(octopus.getSeatVotes()).toEqual(result);
    });

    //caso 3: caso de empate -> debería haber sorteo
    it('should return draw', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 100};
        vote2 = {name: "PSOE", votes: 200};

        octopus.insertVote(vote1);
        octopus.insertVote(vote2);

        //expect(octopus.getSeatVotes()).toBe("Sorteo");

    });

    //caso 3: caso de empate -> debería haber sorteo
    it('should ignore PP votes', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 10};
        vote2 = {name: "Podemos", votes: 1000};

        octopus.insertVote(vote1);
        octopus.insertVote(vote2);

        //resultado que esperamos
        var result = {Podemos: 5};

        expect(octopus.getSeatVotes()).toEqual(result);

    });

});