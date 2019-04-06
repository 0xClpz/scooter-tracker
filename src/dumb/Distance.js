export const formatDistance = value => {
  if (value < 1000) {
    return `${value}m`
  }

  return `${Math.round((value / 1000) * 100) / 100}Km`
}

export const Distance = ({children}) => {
  const value = Number(children)

  return formatDistance(value)
}
