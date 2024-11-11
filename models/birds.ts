export interface BirdData {
  name: string
  family?: string
  genus?: string
  region?: string
  color?: string
  population?: number
  billSize?: number
  isEndangered?: boolean
  isRound?: boolean
}

export interface Bird extends BirdData {
  id: number
}
