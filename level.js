class Level {
  constructor(map, updateInterval = 40) {
    this.map = map;
    this.player = {x: -1, y: -1};
    this.updateInterval = updateInterval;
  }

  makeBoard() {
    const board = new Board(this.map[0].length, this.map.length);
    for (let j = 0; j < this.map.length; ++j) {
      for (let i = 0; i < this.map[0].length; ++i) {
        switch (this.map[j][i]) {
          case ' ':
            continue;
          case 'W':
            board.set(i, j, new Cell(true, CellType.WALL));
            break;
          case 'E':
            board.set(i, j, new Cell(true, CellType.END));
            break;
          case '*':
            board.set(i, j, new Cell(true, CellType.DITCH));
            break;
          case 'P':
            board.set(i, j, new Cell(true, CellType.PLAYER));
            this.player = {x: i, y: j};
            break;
          case '.':
            board.set(i, j, new Cell(true));
            break;
          case 'A':
            board.set(i, j, new Cell(true, CellType.STAY_ALIVE))
        }
      }
    }
    return board;
  }

  getPlayer() {
    return this.player;
  }
}

const shapes = [
  // Spaceship going right
  [
    ' .....',
    '.    .',
    '     .',
    '.   . ',
    '  .   ',
  ],
  // Spaceship going left
  [
    '..... ',
    '.    .',
    '.     ',
    ' .   .',
    '   .  ',
  ],
];

const levels = [
  new Level([
    '**************************************************',
    '*EE                                              *',
    '*EE                                              *',
    '**************************************           *',
    '*                        .           *           *',
    '*                      . .           *           *',
    '*            ..      ..            .A*           *',
    '*           .   .    ..            .A*           *',
    '*A.        .     .   ..              *           *',
    '*A.        .   . ..    . .           *           *',
    '*          .     .       .           *           *',
    '*           .   .                    *           *',
    '*            ..                      *           *',
    '*                                    *           *',
    '**********************      **********           *',
    '* WWWWWWWWWWWWWWWWW                  *           *',
    '* . . . . . . . . .                  *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                       .A.          *           *',
    '*                                                *',
    '*                                                *',
    '*                          .A.                   *',
    '*                                                *',
    '*                                                *',
    '*                             .A.                *',
    '*   P                                            *',
    '*                                                *',
    '*                                .A.             *',
    '*                                                *',
    '*                                 ****************',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '**************************************************',
  ]),
  new Level([
    '***********************',
    '*                 *   *',
    '*  ************** * * *',
    '*  EE   *         * * *',
    '*  EE   * ********* * *',
    '*       * *   *   * * *',
    '*     AA* * * * * * * *',
    '*     AA*   * * * * * *',
    '****  ******* * * * * *',
    '*           * * * * * *',
    '*   P       * * * * * *',
    '*           *   *   * *',
    '*           ********* *',
    '*                     *',
    '***********************',
  ]),
  new Level([
    '**************************************************************************',
    '*AA                                                                      *',
    '*AA                                                                      *',
    '*EE                                                                      *',
    '*EE                                                                 P    *',
    '*EE                                                                      *',
    '*AA                                                                      *',
    '*AA                                                                      *',
    '*                                                                        *',
    '*AA                                             .....                    *',
    '*AA                                             .    .                   *',
    '*                                               .                        *',
    '*AA                                              .   .                   *',
    '*AA                                                .                     *',
    '**************************************************************************',
  ]),
  new Level([
    '**************************************************************************',
    '*AA                                                                     E*',
    '*AA                                                                     E*',
    '*                                                                       E*',
    '*      *******************************************************************',
    '*AA    *                                                                 *',
    '*AA    *                                                                 *',
    '***    *                                                                 *',
    '***    *                                                            P    *',
    '***    *                                                                 *',
    '*AA    *                                                                 *',
    '*AA    *                                                                 *',
    '*                                                                        *',
    '*AA                                                           .....      *',
    '*AA                                                           .    .     *',
    '*                                                             .          *',
    '*AA                                                            .   .     *',
    '*AA                                                              .       *',
    '**************************************************************************',
  ]),
  new Level(
      [
        '*****************',
        '* .           . *',
        '* A           A *',
        '* .     .     . *',
        '*       A       *',
        '*       .       *',
        '*P             E*',
        '*****************',
      ],
      300),
  new Level([
    '***************************************************************',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*        WW    WW   W   W   WWW  WWW     W  WWWWW  WWW        *',
    '*       W  W  W  W  WW  W  W   W W  W   W W   W   W   W       *',
    '*       W    W AA W W W W W    W W W   W   W  W   W           *',
    '*       W    W    W W W W W      WW    WWWWW  W    WWW        *',
    '*       W    W AA W W W W W  WWW W W   W   W  W       W       *',
    '*       W  W  W  W  W  WW  W   W W  W  W   W  W   W   W       *',
    '*        WW    WW   W   W   WWW  W   W W   W  W    WWW        *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '***************************************************************',
  ]),
];
