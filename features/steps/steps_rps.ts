import { Given, When, Then } from '@cucumber/cucumber';
import { Move, RockPaperScissors } from '../../rps';
import { expect } from 'chai';

type TestContex = {
  game: RockPaperScissors;
  result: string;
  generatedMove: Move;
};

Given("There's a player {string}", function (name: string) {
  return (this.game = new RockPaperScissors(name));
});

When('Player choose {string} and bot choose {string}', function (this: TestContex, playerMove: Move, botMove: Move) {
  return (this.result = this.game.determineWinner(playerMove, botMove));
});

Then('Game result is {string}', function (this: TestContex, expectedResult: string) {
  expect(this.result).to.equal(expectedResult);
});
