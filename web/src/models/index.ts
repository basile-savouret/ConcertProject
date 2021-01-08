export interface User {
    exp: number
    name: string
    email: string
    roles: string[]
}

export interface loginResponse {
    token: string
}

export interface PaginatedList<T> {
    list: T[]
    total: number
}

export interface Member {
    id: number
    name: string
    firstName: string
    job: string
}

export interface Band {
    id: number
    name: string
    style: string
    yearOfCreation: number
    lastAlbumName: string
    members: Member[]
}

export interface Hall {
    id: number
    name: string
    capacity: number
    city: string
    address: string
}

export interface Show {
    id: number
    band: Band
    tourName: string
    hall: Hall
    date: number
}