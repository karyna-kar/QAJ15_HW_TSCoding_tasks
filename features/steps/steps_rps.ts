import { Given, When, Then } from '@cucumber/cucumber';
import { Move, RockPaperScissors } from '../../rps';
import { expect } from 'chai';

type TestContex = {
  game: RockPaperScissors;
  result: string;
  generatedMove: Move;
};

Given('The game is started', function () {
  return (this.game = new RockPaperScissors());
});

When('Player choose {string} and bot choose {string}', function (this: TestContex, playerMove: Move, botMove: Move) {
  return (this.result = this.game.determineWinner(playerMove, botMove));
});

Then('Game result is {string}', function (this: TestContex, expectedResult: string) {
  expect(this.result).to.equal(expectedResult);
});

When('Bot generate random move', function (this: TestContex) {
  return (this.generatedMove = this.game.generateMove());
});

Then('The move is valid', function (this: TestContex) {
  expect(this.generatedMove).to.be.oneOf(this.game.moves);
});
