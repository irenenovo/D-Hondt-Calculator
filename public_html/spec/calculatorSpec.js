
describe('Votes', function () {
    
    var vote;

    beforeEach(function () {
        //inicializamos con set de datos
        octopus.setWhiteVotes(100);
        octopus.setStrip(5);
        octopus.setSeats(100);
        vote = { name: "PSOE", votes: 100 };
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
    
    var vote;

    beforeEach(function () {
        //inicializamos con set de datos
        octopus.setWhiteVotes(100);
        octopus.setStrip(5);
        octopus.setSeats(100);
        vote = {name: "PSOE", votes: 100};
    });

    //caso 1: descartar partido si tiene menos de 5% de los votos totales + blancos
    it('should discard votes with less than '+ octopus.getStrip() +'%', function () {

        expect(octopus.checkVotes(vote)).toBe(true);
    });

});