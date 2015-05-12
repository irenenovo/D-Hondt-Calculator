
describe('Votes', function () {

    var vote, votes;

    beforeEach(function () {
        //inicializamos con set de datos

        vote = {name: "PSOE", votes: 100};
        votes = [vote];

        dhondt.voting(100, 100, 5, votes);
    });

    //caso 1: comprobar que los datos estén bien metidos
    it('should only introduce int numbers', function () {

        expect(dhondt.getVoting().votes[0].votes).toMatch(/\d{1,}/);
    });

    //caso 2: comprobar que puede insertar una votación
    it('should be able to add a vote', function () {

        expect(dhondt.getVoting().votes[0]).toBe(vote);
    });

    //caso 3: comprobar que se ha borrado bien una votación
    it('should be able to delete a vote', function () {

        dhondt.deleteVote(0);

        expect(dhondt.getVoting().votes[0]).not.toBeDefined();
    });

});

describe('Calculator', function () {

    var vote1, vote2;

    //caso 1: descartar partido si tiene menos de 5% de los votos totales + blancos
    it('should discard votes with less than  %', function () {

        vote1 = {name: "PP", votes: 300};

        var votes = [vote1];

        dhondt.voting(100, 5, 5, votes);

        expect(dhondt.checkVotes(vote1)).toBe(true);
    });

    //caso 2: caso en el que se reparten bien los escaños
    it('should return the seats well', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 300};
        vote2 = {name: "PSOE", votes: 420};

        var votes = [vote1, vote2];

        dhondt.voting(100, 5, 5, votes);

        //resultado que esperamos
        var result = {assigned: {PSOE: 3, PP: 2}};

        expect(dhondt.getSeatVotes()).toEqual(result);
    });

    //caso 3: caso de de ignorar votos por estar debajo del umbral
    it('should ignore PP votes', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 10};
        vote2 = {name: "Podemos", votes: 1000};

        var votes = [vote1, vote2];

        dhondt.voting(100, 5, 5, votes);

        //resultado que esperamos
        var result = {assigned: {Podemos: 5}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

});

describe('Draw cases', function () {

    var vote1, vote2, vote3, vote4, vote5;

    // caso de empate 1-> debería ganar el escaño el PSOE porque tiene más votos
    it('In case of draw, PSOE should win the seat because it has more votes', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 200};
        vote2 = {name: "PSOE", votes: 400};

        var votes = [vote1, vote2];

        dhondt.voting(100, 2, 5, votes);

        var result = {assigned: {PSOE: 2}};

        expect(dhondt.getSeatVotes()).toEqual(result);

    });

    // caso de empate 2-> debería haber sorteo entre PP y PSOE
    it('should be a draw between A and B', function () {

        //votos de prueba
        vote1 = {name: "PP", votes: 400};
        vote2 = {name: "PSOE", votes: 400};

        var votes = [vote1, vote2];

        dhondt.voting(100, 3, 5, votes);

        var result = {assigned: {PSOE: 1, PP: 1}, draw: {seats: 1, draw: ["PP", "PSOE"]}};

        expect(dhondt.getVoting().seal()).toEqual(result);

    });

    // caso de empate 3-> debería haber sorteo entre C, D y E
    it('should be a draw between C, D and E', function () {

        //votos de prueba
        vote1 = {name: "A", votes: 900};
        vote2 = {name: "B", votes: 900};
        vote3 = {name: "C", votes: 450};
        vote4 = {name: "D", votes: 450};
        vote5 = {name: "E", votes: 450};

        var votes = [vote1, vote2, vote3, vote4, vote5];

        dhondt.voting(100, 6, 5, votes);

        var result = {assigned: {A: 2, B: 2}, draw: {seats: 2, draw: ["C", "D", "E"]}};

        expect(dhondt.getVoting().seats).toEqual(result);

    });

});