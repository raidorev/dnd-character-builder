export const ruPluralRule = (choice: number) => {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1

  if (choice < 10 || teen) {
    return 1
  }

  if (endsWithOne) {
    return 2
  }

  return choice < 5 ? 3 : 4
}
