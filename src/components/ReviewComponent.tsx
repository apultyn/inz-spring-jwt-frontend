import { useState } from "react";
import type { Review } from "../utils/interfaces";
import { getIsAdmin } from "../utils/token";
import DeleteReview from "./DeleteReview";

interface ReviewComponentProps {
    review: Review;
    fetchBook: () => void;
}

export default function ReviewComponent({
    review,
    fetchBook,
}: ReviewComponentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [stars, setStars] = useState(review.stars);
    const [comment, setComment] = useState(review.comment);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isAdmin = getIsAdmin();

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            /* TODO: PATCH /reviews/{id} – send { stars, comment } */
            // await api.patch(`/reviews/${review.id}`, { stars, comment });
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <article className="mb-3 rounded-lg border bg-white p-4 shadow-sm">
            {!isEditing && (
                <>
                    <header className="mb-2 flex items-center justify-between">
                        <h4 className="break-all font-semibold text-gray-800">
                            {review.userEmail}
                        </h4>
                        <p className="text-sm text-yellow-500">
                            {"★".repeat(stars)}
                            {"☆".repeat(5 - stars)}
                        </p>
                    </header>
                    <p className="text-gray-600">{comment}</p>
                </>
            )}

            {isEditing && (
                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div className="flex gap-1 text-2xl">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setStars(n)}
                                className={`transition-colors ${
                                    n <= stars
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving…" : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setStars(review.stars);
                                setComment(review.comment);
                            }}
                            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {isAdmin && !isEditing && (
                <div className="mt-3 flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            )}

            {showConfirm && (
                <DeleteReview
                    review={review}
                    setShowConfirm={setShowConfirm}
                    fetchBook={fetchBook}
                />
            )}
        </article>
    );
}
