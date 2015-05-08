# D-Hondt-Calculator

JavaScript library that allows using the **D'Hondt method**.

## Installation

```
bower install D-Hondt-Calculator
````

## Usage

Get/set **white votes**: 

```
var Whitevotes = octopus.getWhiteVotes();
octopus.setWhiteVotes(5);
```

Get/set **seats**: 

```
var seats = octopus.getSeats();
octopus.setSeats(5);
```

Get/set **strip**: 

```
var strip = octopus.getStrip();
octopus.setStrip(5);
```

Insert/delete/get **vote**:

```
octopus.insertVote(vote)
var vote = octopus.getVote(0);
octopus.deleteVote(0);
```

Get votes and votes length
```
var votes = octopus.getVotes();
var lenght = octopus.getVotesLenght();
```


> Blockquotes

*Italic*

**Bold**

**Bold an _italic_**

~~Strikethrough~~

* List1
* List1

- List2
- List2

1. List3
2. List3


[link1](link2)
