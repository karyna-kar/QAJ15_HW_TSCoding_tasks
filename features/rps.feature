Feature: RockPaperScissors 
    Background: 
    Given The game is started
    
    Scenario Outline: Games with winner
      When Player choose <PlayerChoise> and bot choose <BotChoise>
      Then Game result is <GameResult>

      Examples: 
      |PlayerChoise |BotChoise  | GameResult   |
      |'paper'      |'scissors' |'bot wins'    |
      |'scissors'   |'rock'     |'bot wins'    |
      |'rock'       |'paper'    |'bot wins'    |
      |'scissors'   |'paper'    |'player wins' |
      |'rock'       |'scissors' |'player wins' |
      |'paper'      |'rock'     |'player wins' |

    Scenario Outline: Draw
      When Player choose <choise> and bot choose <choise>
      Then Game result is 'a draw'

      Examples: 
      |choise     | 
      |'paper'    |
      |'scissors' |
      |'rock'     |

      Scenario: Vlidate random generator for bot
        When Bot generate random move
        Then The move is valid