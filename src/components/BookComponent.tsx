import type { Book } from "../utils/interfaces";

interface IBookComponent {
    book: Book;
}

export default function BookComponent({ book }: IBookComponent) {
    return <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
    </div>
}