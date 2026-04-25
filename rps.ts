export type Move = 'rock' | 'paper' | 'scissors';

export class RockPaperScissors {
  moves: Move[];
  name: string;

  constructor(name: string = 'player') {
    this.name = name;
    this.moves = ['rock', 'paper', 'scissors'];
  }

  generateMove(): Move {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }

  determineWinner(player: Move, bot: Move) {
    if (player == bot) {
      return 'a draw';
    }
    const playerIndex = this.moves.indexOf(player);
    const botIndex = this.moves.indexOf(bot);
    const result = playerIndex - botIndex;
    if (result == -1 || result == this.moves.length - 1) {
      return 'bot wins';
    }
    return `${this.name} wins`;
  }
}
