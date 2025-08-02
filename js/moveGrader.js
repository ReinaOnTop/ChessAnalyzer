export function getMoveCategory(scoreDiff) {
  if (scoreDiff >= 300) return 'Brilliant';
  if (scoreDiff >= 100) return 'Great';
  if (scoreDiff >= 30) return 'Good';
  if (scoreDiff > -30) return 'Inaccuracy';
  if (scoreDiff > -100) return 'Mistake';
  return 'Blunder';
}
