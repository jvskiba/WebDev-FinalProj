"use client"
import styles from './Reviews.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CircleIcon from './CircleIcon';

interface ReviewsProps {}

interface Review {
    _id: string;
    restaurant: string;
    rating: string;
    review: string;
    image: string;
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

    const renderRating = (rating: string) => {
        // Rating to label mapping
        const ratingLabels: { [key: number]: string } = {
          1: 'Terrible',
          2: 'Poor',
          3: 'Average',
          4: 'Very Good',
          5: 'Excellent',
        };
      
        const ratingNumber = parseInt(rating);
      
      
        const radioIcon = ['1', '2', '3', '4', '5'].map((value) => (
          <div key={value} className={styles.ratingIcon}>
            <CircleIcon
              color={ratingNumber >= parseInt(value) ? 'green' : 'white'}
              size="1em"
            />
          </div>
        ));
      
        return (
          <div className={styles.ratingContainer}>
           
            <div className={styles.ratingLabel}>{ratingLabels[ratingNumber]}</div>
            <div className={styles.radioIcons}>{radioIcon}</div>
          </div>
        );
      };

    const handleDelete = () => {
        router.push('/');
    }

    const { data: session } = useSession();

    return (
        <div>
            <Header />
            <h1 className={styles.header}>Reviews & Ratings</h1>

            
            {isLoaded ?
            <ul className={styles.reviewDisplay}>
                {reviews.map( 
                    review => <li key={review._id} className={styles.review}>
                        <p className={styles.userReview}>Rating: {review.rating}</p>

                        <div className={styles.userReview}>{renderRating(review.rating)}</div>
                       
                        <p className={styles.userReview}>Review: {review.review}</p>
                        {review.image ? <img src={review.image} alt="review image" className={styles.image}/> : ""}

                        {session ? <button className={styles.modifyReviewButton} onClick={() => {router.push(`/modify-review/${review._id}?name=${encodeURIComponent(restaurantName)}&id=${encodeURIComponent(review._id)}`)}}>Modify Review</button> : ""}
                        </li>
                )}
            </ul> : <></>}
            


        </div>
    );
}

export default Reviews;