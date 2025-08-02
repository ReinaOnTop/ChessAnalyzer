import { getMoveCategory } from './moveGrader.js';

const stockfish = new Worker('/engine/stockfish.js');

let currentResolve = null;

stockfish.onmessage = function (e) {
  const line = e.data;

  if (line.includes('bestmove') && currentResolve) {
    currentResolve();
    currentResolve = null;
  }

  if (line.startsWith('info') && line.includes('score cp')) {
    const match = line.match(/score cp (-?\d+)/);
    if (match) {
      const evalCp = parseInt(match[1]);
      if (window.__onEvalScore) {
        window.__onEvalScore(evalCp);
      }
    }
  }
};

function send(cmd) {
  stockfish.postMessage(cmd);
}

export async function evaluateMove(fen, prevEval) {
  return new Promise((resolve) => {
    send('ucinewgame');
    send('position fen ' + fen);
    send('go depth 15');

    window.__onEvalScore = (score) => {
      const diff = score - prevEval;
      const category = getMoveCategory(diff);
      resolve({ score, category });
    };

    currentResolve = () => resolve({ score: prevEval, category: 'Unknown' }); // fallback
  });
}
