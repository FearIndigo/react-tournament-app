export class TeamStats {
  wins: number
  loses: number
  draws: number

  constructor() {
    this.wins = 0
    this.loses = 0
    this.draws = 0
  }

  points() {
    return this.wins * 3 + this.draws
  }

  gamesPlayed() {
    return this.wins + this.loses + this.draws
  }

  add(other: TeamStats) {
    this.wins += other.wins
    this.loses += other.loses
    this.draws += other.draws

    return this
  }
}
