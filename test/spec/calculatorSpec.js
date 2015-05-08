
describe('Votes', function () {

    var vote;

    beforeEach(function () {
        //inicializamos con set de datos
        dhondt.setWhiteVotes(100);
        dhondt.setStrip(5);
        dhondt.setSeats(100);
        vote = {name: "PSOE", votes: 100};
    });

    //caso 1: comprobar que los datos estén bien metidos
    it('should only introduce int numbers', function () {

        expect(vote.votes).toMatch(/\d{1,}/);
    });

    //caso 2: comprobar que puede insertar una votación
    it('should be able to add a vote', function () {

        dhondt.insertVote(vote);

        expect(dhondt.getVote(0)).toBe(vote);
    });

    //caso 3: comprobar que se ha borrado bien una votación
    it('should be able to delete a vote', function () {

        dhondt.deleteVote(0);

        expect(dhondt.getVote(0)).not.toBeDefined();
    });

});

describe('Calculator', function () {

    var vote1, vote2;

    beforeEach(function () {

        dhondt.clearData();

        //inicializamos con set de datos
        dhondt.setWhiteVotes(100);
        dhondt.setStrip(5);
        dhondt.setSeats(5);

    });

    //caso 1: descartar partido si tiene menos de 5% de los votos totales + blancos
    it('should discard votes with less than ' + dhondt.getStrip() + '%', function () {
        vote1 = {name: "PP", votes: 300};
        dhondt.setSeats(5);
        dhondt.insertVote(vote1);
        expect(dhondt.checkVotes(vote1)).toBe(true);
    });

    //caso 2: caso en el que se reparten bien los escaños
    it('should return the seats well', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 300};
        vote2 = {name: "PSOE", votes: 420};

        dhondt.insertVote(vote1);
        dhondt.insertVote(vote2);

        //resultado que esperamos
        var result = {assigned: {PSOE: 3, PP: 2}};

        expect(dhondt.getSeatVotes()).toEqual(result);
    });

    //caso 3: caso de de ignorar votos por estar debajo del umbral
    it('should ignore PP votes', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 10};
        vote2 = {name: "Podemos", votes: 1000};

        dhondt.insertVote(vote1);
        dhondt.insertVote(vote2);

        //resultado que esperamos
        var result = {assigned: {Podemos: 5}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

});

describe('Draw cases', function () {

    beforeEach(function () {

        dhondt.clearData();

        //inicializamos con set de datos
        dhondt.setWhiteVotes(5);
        dhondt.setStrip(5);

    });

    // caso de empate 1-> debería ganar el escaño el PSOE porque tiene más votos
    it('In case of draw, PSOE should win the seat because it has more votes', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 200};
        vote2 = {name: "PSOE", votes: 400};
        dhondt.setSeats(2);
        dhondt.insertVote(vote1);
        dhondt.insertVote(vote2);

        var result = {assigned: {PSOE: 2}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

    // caso de empate 2-> debería haber sorteo entre PP y PSOE
    it('should be a draw in case of draw', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 400};
        vote2 = {name: "PSOE", votes: 400};
        dhondt.setSeats(3);
        dhondt.insertVote(vote1);
        dhondt.insertVote(vote2);

        var result = {assigned: {PSOE: 1, PP: 1}, draw: {seats: 1, draw: ["PP", "PSOE"]}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

    // caso de empate 3-> debería haber sorteo entre C, D y E
    it('should be a draw between C, D and E', function () {

        dhondt.setSeats(6);

        //votos de prueba
        vote1 = {name: "A", votes: 900};
        vote2 = {name: "B", votes: 900};
        vote3 = {name: "C", votes: 450};
        vote4 = {name: "D", votes: 450};
        vote5 = {name: "E", votes: 450};

        dhondt.insertVote(vote1);
        dhondt.insertVote(vote2);
        dhondt.insertVote(vote3);
        dhondt.insertVote(vote4);
        dhondt.insertVote(vote5);

        var result = {assigned: {A: 2, B: 2}, draw: {seats: 2, draw: ["C", "D", "E"]}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

});