import { useEffect, useState } from "react";
import api from "../utils/api";
import BookComponent from "../components/BookComponent";
import type { Book } from "../utils/interfaces";

export default function MainPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchString, setSearchString] = useState("");

    console.log("Books: ", books);

    const fetchBooks = async (searchString = "") => {
        try {
            const response = await api.get("/books", {
                params: {searchString}
            });
            console.log(response);
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
    <h1>Hi</h1>
    {books.map((book) => <BookComponent key={book.id} book={book} />)}
    <button onClick={() => setSearchString("")}>Button</button>
    </>
}