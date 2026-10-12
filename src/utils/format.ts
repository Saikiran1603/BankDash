export const money = (n: number) => (n < 0 ? '-' : '+') + '$' + Math.abs(n).toLocaleString()
export const usd = (n: number) => '$' + n.toLocaleString()
