
describe('Votes', function () {

  var vote, votes, data;

  data = {
    census: 100,
    seats: 5,
    thresold: 5,
    votes: [
      {name: "Party A", votes: 100}
    ]
  };
  beforeEach(function () {
    //inicializamos con set de datos

    vote = {name: "PSOE", votes: 100};
    votes = [vote];

  });

  it('should return something', function () {
    expect(dhondt.calculator.calculate(data)).toBeDefined();
  });
});

describe('Calculator', function () {

  var vote1, vote2;

  //caso 1: descartar partido si tiene menos de 5% de los votos totales + blancos
  it('should discard votes with less than  %', function () {
    data = {
      census: 100,
      seats: 5,
      thresold: 40,
      white: 0,
      null: 0,
      votes: [
        {name: "Party A", votes: 100},
        {name: "Party Discarded", votes: 39}
      ]
    };

    var result = dhondt.calculator.calculate(data);
    console.log(result);
    expect(result.assigned["Party A"]).toBe(5);
    expect(result.assigned["Party B"]).not.toBeDefined();
  });

  //caso 2: caso en el que se reparten bien los escaños
  it('should return the seats well', function () {

    data = {
      census: 800,
      seats: 5,
      thresold: 5,
      white: 0,
      null: 0,
      votes: [
        {name: "Party A", votes: 300},
        {name: "Party B", votes: 420}
      ]
    };
    //resultado que esperamos
    var expected = {assigned: {"Party B": 3, "Party A": 2}};

    var result = dhondt.calculator.calculate(data);
    expect(result).toEqual(expected);
  });

  //caso 3: caso de de ignorar votos por estar debajo del umbral
  it('should ignore P1 votes', function () {

    data = {
      census: 100,
      seats: 50,
      thresold: 5,
      white: 0,
      null: 0,
      votes: [
        {name: "P1", votes: 49},
        {name: "P2", votes: 1000}
      ]
    };
    var result = dhondt.calculator.calculate(data);

    //resultado que esperamos
    var expected = {assigned: {P2: 50}};

    expect(result).toEqual(expected);
  });
});

describe('Draw cases', function () {

  var vote1, vote2, vote3, vote4, vote5;

  // caso de empate 1-> debería ganar el escaño el PSOE porque tiene más votos
  it('In case of draw, PSOE should win the seat because it has more votes', function () {
    data = {
      census: 100,
      seats: 2,
      thresold: 5,
      white: 0,
      null: 0,
      votes: [
        {name: "P1", votes: 200},
        {name: "P2", votes: 400}
      ]
    };

    var result = dhondt.calculator.calculate(data);

    var expected = {assigned: {"P2": 2}};

    expect(result).toEqual(expected);
  });

  // caso de empate 2-> debería haber sorteo entre PP y PSOE
  it('should be a draw between A and B', function () {
    data = {
      census: 1000,
      seats: 3,
      thresold: 5,
      white: 0,
      null: 0,
      votes: [
        {name: "P1", votes: 400},
        {name: "P2", votes: 400}
      ]
    };

    var result = dhondt.calculator.calculate(data);
    var expected = {assigned: {P1: 1, P2: 1}, draw: {seats: 1, draw: ["P1", "P2"]}};

    expect(result).toEqual(expected);
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
    data = {
      census: 1000,
      seats: 6,
      thresold: 5,
      white: 0,
      null: 0,
      votes: votes
    };

    var result = dhondt.calculator.calculate(data);
    var expected = {assigned: {A: 2, B: 2}, draw: {seats: 2, draw: ["C", "D", "E"]}};

    expect(result).toEqual(expected);
  });
});