# Memory Game

This is a memory game implementation where the player turns around a card and tries to match same cards in the 
same sequence to remove them from the game.

### Features
- Different Grid Sizes: 2x2, 2x4, 4x4x 8x4 etc...
- Select amount of cards to match: 2-4
- Play with arrow keys on keyboard


### BUGS
- Sometimes the width/height bugs out when resizing to size such as 2x4, or 4x8 (not 2x2, 4x4)
  - Possible solution is to use connectedCallback or look at the logic when the width/height is updated
- In the welcome screen, When selecting 4 matches, the order of grid sizes is not correct according to the 
  total size of squares: 6x6, 12x6 (72), 6x12, 8x8 (64)

### QoL Improvements
- The grid could be scaled up for very big grid sizes such as 8x8. In its current form the small cards can be hard to see
- When the user wins and matches all cards on the grid, the animation is cut midway and the victory screen is shown
  imediately, this could be fixed by waiting to see the last card flipped and when it is flipped show the victory screen

### DEBUG
- Show correct cards
  - In 'memory_board.js' swap comments between lines 72 and 73 to make all the cards swap face-to-back