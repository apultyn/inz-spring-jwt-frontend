import { useEffect, useState } from "react";
import api from "../utils/api";
import BookComponent from "../components/BookComponent";
import type { Book } from "../utils/interfaces";
import TopBar from "../components/TopBar";

export default function MainPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchString, setSearchString] = useState("");

    const fetchBooks = async (searchString = "") => {
        try {
            const response = await api.get("/books", {
                params: {searchString}
            });
            if (response.data) {
                setBooks(response.data);
            } else setBooks([]);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBooks(searchString);
    }, [searchString]);

    return <>
    <TopBar />
    <h1>Books</h1>
    {books.map((book) => <BookComponent key={book.id} book={book} />)}
    <button onClick={() => setSearchString("")}>Button</button>
    </>
}