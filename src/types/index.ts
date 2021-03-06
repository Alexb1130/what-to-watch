export interface User {
    avatar_url: string
    email: string
    id: number
    name: string
}

export interface Movie {
    background_color: string
    background_image: string
    description: string
    director: string
    genre: string
    id: number
    is_favorite: boolean
    name: string
    poster_image: string
    preview_image: string
    preview_video_link: string
    rating: number
    released: number
    run_time: number
    scores_count: number
    starring: Array<string>
    video_link: string
}

export interface Comment {
    comment: string
    date: Date
    id: number
    rating: number
    user: {
        id: string,
        name: string
    }
}

export enum FavoriteStatus {
    add = '1',
    remove = '0'
}

export type TabList = 'Overview' | 'Details' | 'Reviews';
