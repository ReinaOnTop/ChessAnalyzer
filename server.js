// Add to server.js
app.post('/api/analyze', (req, res) => {
  const { fen } = req.body;
  // Mock response (replace with Stockfish later)
  res.json({
    evaluation: '+0.5',
    bestMove: 'e2e4',
    lines: ['e2e4', 'e7e5', 'g1f3']
  });
});
