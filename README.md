# D-Hondt-Calculator

JavaScript library that allows using the **D'Hondt method**.

## Installation

```
bower install D-Hondt-Calculator
````

## Data structure

For example:

```
var voting = {
	whiteVotes: 200,
	seats: 5,
	strip: 5,
	votes: [{name: "PP", votes: 300} {name: "PSOE", votes: 300} ]
}
```

## Usage

Create/Get the **voting**:
```
dhondt.voting(whiteVotes, seats, strip, votes);
var voting = dhondt.getVoting();
```

Check if is the number of votes is valid
```
var isValid = dhondt.checkVotes(votes);
```

Get/Delete **votes**
```
var vote = dhondt.getVote(index);
dhondt.deleteVote(index);
```

Returns a JSON with the results of the strips per political party
```
var results = dhondt.getSeatVotes();
```

Returns an HTML with the results of the strips per political party
```
var htmlResult = dhondt.getSeatVotesHTML(results);
```

https://travis-ci.org/irenenovo/D-Hondt-Calculator.svg
