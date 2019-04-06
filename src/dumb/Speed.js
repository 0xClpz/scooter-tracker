export const Speed = ({children}) => {
  const value = Number(children)

  return `${Math.round(value * 3.6 * 100) / 100}Km/h`
}
