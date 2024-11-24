"use client"
import styles from './Reviews.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useRouter } from 'next/navigation';

interface ReviewsProps {}

interface Review {
    _id: string;
    restaurant: string;
    rating: string;
    review: string;
    imageUrl:string;
}

interface RestaurantInfoProps {
    restaurantName: string;
  }

const Reviews: React.FC<RestaurantInfoProps> = ({ restaurantName }) => {
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect( () => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                 console.log(data);  // Check the structure of the data

                setReviews(data.reviews.filter(
                    (review: Review)  => review.restaurant === restaurantName
                ));
            } catch (error) {
                console.log('Error from Reviews:', error);
            }
        };
        fetchReviews();
        setIsLoaded(true);
    }, []);

    const handleDelete = () => {
        router.push('/');
    }

    return (
        <div>
            <Header />
            <h1 className={styles.header}>Reviews & Ratings</h1>

            
            {isLoaded ?
            <ul className={styles.reviewDisplay}>
                {reviews.map( 
                    review => <li key={review._id} className={styles.review}>
                        <p className={styles.userReview}>Rating: {review.rating}</p>
                        <p className={styles.userReview}>Review: {review.review}</p>
                      

                        <button className={styles.modifyReviewButton} onClick={() => {router.push(`/modify-review/${review._id}?name=${encodeURIComponent(restaurantName)}&id=${encodeURIComponent(review._id)}`)}}>Modify Review</button>
                        </li>
                )}
            </ul> : <></>}
            


        </div>
    );
}

export default Reviews;