export interface Review {
    id: number;
    userEmail: string;
    stars: number;
    comment: string;
    bookId: number;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    reviews: Review[];
}

export interface SpringError {
    detail: string;
    description: string | null;
    violations: string[] | null;
}

export interface ReceivedToken {
    exp: number;
    iat: number;
    sub: string;
    roles: { name: string }[];
}

export interface DecodedToken {
    exp: number;
    iat: number;
    sub: string;
    roles: string[];
}
