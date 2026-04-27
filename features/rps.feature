Feature: RockPaperScissors 
    Scenario Outline: Player wins against bot
      Given  There's a player 'Test'
      When Player choose <PlayerChoise> and bot choose <BotChoise>
      Then Game result is 'Test wins'

    Examples: 
          |PlayerChoise |BotChoise  |
          |'scissors'   |'paper'    |
          |'rock'       |'scissors' |
          |'paper'      |'rock'     |

    Scenario Outline: Bot wins against player
      Given  There's a player 'Test'
      When Player choose <PlayerChoise> and bot choose <BotChoise>
      Then Game result is 'bot wins'

    Examples: 
      |PlayerChoise |BotChoise  | 
      |'paper'      |'scissors' |
      |'scissors'   |'rock'     |
      |'rock'       |'paper'    |

    Scenario Outline: Draw
      Given  There's a player 'Test'
      When Player choose <choise> and bot choose <choise>
      Then Game result is 'a draw'

    Examples: 
      |choise     | 
      |'paper'    |
      |'scissors' |
      |'rock'     |
    
