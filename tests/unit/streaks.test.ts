export const calculateCurrentStreak = (
  completions: string[],
  today: string
): number => {
  const unique = Array.from(new Set(completions));

  if (!unique.includes(today)) return 0;

  const sorted = unique.sort((a, b) => b.localeCompare(a));

  let streak = 0;

  for (let i = 0; i < sorted.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);

    const expectedStr = expected.toISOString().split("T")[0];

    if (sorted[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};