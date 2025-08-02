document.addEventListener('DOMContentLoaded', () => {
  const board = Chessboard('board', {
    position: 'start',
    draggable: true,
    pieceTheme: 'https://cdn.jsdelivr.net/npm/chessboardjs@0.3.0/img/chesspieces/wikipedia/{piece}.png'
  });

  const game = new Chess();
  const moveHistory = document.getElementById('move-history');
  const engineOutput = document.getElementById('engine-output');

  // Flip board
  document.getElementById('flip-btn').addEventListener('click', () => {
    board.flip();
  });

  // Analyze button (mock for now)
  document.getElementById('analyze-btn').addEventListener('click', () => {
    engineOutput.innerHTML = `<div class="eval-bar"></div><p>Analyzing... (connect Stockfish later)</p>`;
  });

  // Update move history
  function updateMoveHistory() {
    moveHistory.innerHTML = game.history().join(', ');
  }

  // Handle moves
  function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';
    board.position(game.fen());
    updateMoveHistory();
  }

  board.onDrop = onDrop;
});
