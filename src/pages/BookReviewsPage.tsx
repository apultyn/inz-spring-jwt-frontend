import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Book } from "../utils/interfaces";
import api from "../utils/api";
import ReviewComponent from "../components/ReviewComponent";

export default function BookReviewsPage() {
    const {bookId} = useParams();
    const [book, setBook] = useState<Book | null>(null);
    console.log("Book: ", book);

    const fetchBook = useCallback(async () => {
        try {
            const response = await api.get(`/books/${bookId}`);
            console.log(response);
            setBook(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [bookId]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

    return book && (<div>
        <h2>{book.title} - {book.author}</h2>
        {book.reviews.map((review) => <ReviewComponent key={review.id} review={review}/>)}
    </div>)
}