export interface IMatch {
    id: number,
    homeTeam: ITeam,
    awayTeam: ITeam,
    time: Date,
    matchTitle: string
}

export interface ITeam {
    name: string,
    logo: string
}

export type MouseORTouchEvent = DragEvent | TouchEvent;