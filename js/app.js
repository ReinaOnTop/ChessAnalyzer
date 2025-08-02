import { evaluateMove } from './chesskit-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const board = Chessboard('board', {
    position: 'start',
    draggable: true,
    pieceTheme: 'https://cdn.jsdelivr.net/npm/chessboardjs@0.3.0/img/chesspieces/wikipedia/{piece}.png'
  });

  const game = new Chess();
  const engineOutput = document.getElementById('engine-output');
  const analyzeBtn = document.getElementById('analyze-btn');

  function updateBoard() {
    board.position(game.fen());
  }

  function onDrop(source, target) {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    });

    if (move === null) return 'snapback';
    updateBoard();
  }

  board.onDrop = onDrop;

  analyzeBtn.addEventListener('click', async () => {
    engineOutput.innerHTML = 'Analyzing...';
    const moves = game.history();
    const cloned = new Chess();
    let prevEval = 0;
    const result = [];

    for (let i = 0; i < moves.length; i++) {
      cloned.move(moves[i]);
      const fen = cloned.fen();
      const { score, category } = await evaluateMove(fen, prevEval);
      result.push({ move: moves[i], category, score });
      prevEval = score;
    }

    engineOutput.innerHTML = result
      .map(r => `<div><strong>${r.move}</strong>: ${r.category} (${r.score})</div>`)
      .join('');
  });
});
