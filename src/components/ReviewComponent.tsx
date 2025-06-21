import type { Review } from "../utils/interfaces";

interface IReviewComponent {
    review: Review;
}

export default function ReviewComponent({ review }: IReviewComponent) {
    return (
        <article className="rounded-lg border bg-white p-4 shadow-sm mb-3">
            <header className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 break-all">
                    {review.userEmail}
                </h4>
                <p className="text-yellow-500 text-sm">
                    {"★".repeat(review.stars)}
                    {"☆".repeat(5 - review.stars)}
                </p>
            </header>

            <p className="text-gray-600">{review.comment}</p>
        </article>
    );
}
