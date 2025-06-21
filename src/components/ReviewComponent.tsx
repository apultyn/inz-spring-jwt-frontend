import type { Review } from "../utils/interfaces"

interface IReviewComponent {
    review: Review;
}

export default function ReviewComponent({review}: IReviewComponent) {
    return <div>
        <h4>{review.userEmail} - {review.stars} stars</h4>
        <p>{review.comment}</p>
    </div>
}