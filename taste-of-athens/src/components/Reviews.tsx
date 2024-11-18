"use client"
import styles from './Reviews.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

interface ReviewsProps {}

interface Review {
    _id: string;
    restaurant: string;
    rating: string;
    review: string;
}



const Reviews: React.FC<ReviewsProps> = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect( () => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                console.log('data.reviews:')
                console.log(data.reviews)
                console.log('type of data.reviews:')
                console.log(typeof(data.reviews));

                setReviews(data.reviews);

            } catch (error) {
                console.log('Error from Reviews:', error);
            }
        };
        fetchReviews();
        setIsLoaded(true);
    }, []);

   
    return (
        <div>
            <h1 className={styles.header}>Reviews & Ratings</h1>

            
            {isLoaded ?
            <ul className={styles.reviewDisplay}>
                {reviews.map( 
                    review => <li key={review._id} className={styles.review}>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.review}</p>
                        </li>
                )}
            </ul> : <></>}
            


        </div>
    );
}

export default Reviews;