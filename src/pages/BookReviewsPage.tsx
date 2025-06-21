import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Book } from "../utils/interfaces";
import api from "../utils/api";
import ReviewComponent from "../components/ReviewComponent";
import TopBar from "../components/TopBar";

export default function BookReviewsPage() {
    const { bookId } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    const fetchBook = useCallback(async () => {
        try {
            const response = await api.get(`/books/${bookId}`);
            setBook(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [bookId]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

    return (
        <>
            <TopBar />
            {book && (
                <main className="mx-auto max-w-4xl px-4 py-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                        {book.title}
                        <span className="ml-1 text-gray-500">
                            — {book.author}
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {book.reviews.length ? (
                            book.reviews.map((r) => (
                                <ReviewComponent key={r.id} review={r} />
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews found.</p>
                        )}
                    </div>
                </main>
            )}
        </>
    );
}
