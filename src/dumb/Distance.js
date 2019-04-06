export const Distance = ({children}) => {
  const value = Number(children)

  if (value < 1000) {
    return `${value}m`
  }

  return `${Math.round((value / 1000) * 100) / 100}Km`
}
