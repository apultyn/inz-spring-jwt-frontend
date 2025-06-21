export interface Review {
    id: number;
    userEmail: string;
    stars: number;
    comment: string;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    reviews: Review[];
}
