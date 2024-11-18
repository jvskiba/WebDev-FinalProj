"use client"
import styles from './ReviewForm.module.css';
import CircleIcon from './CircleIcon';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'next/image';
import Link from 'next/link';
import LogoutBanner from './LogoutBanner';

interface ReviewFormProps {
    restaurantName: string;
}

interface Review {
    id: number;
    rating: number;
    review: string;
}

interface Restaurant {
    id: number;
    name: string;
    image: string;
    reviews: Review[];
}

const southReviews = [{id: 19, rating: 5, review: 'I love the kitchen!'}, 
    {id: 20, rating: 5, review: 'Wowzers!'}, 
    {id: 21, rating: 3, review: 'Sample text'}];
const nationalReviews = [{id: 22, rating: 2, review: 'ehhhh'}, 
    {id: 23, rating: 2, review: 'Not my cup of tea'}, 
    {id: 24, rating: 4, review: 'My favorite place'}];
const hilltopReviews = [{id: 25, rating: 4, review: 'great food'}, 
    {id: 26, rating: 2, review: 'bad service'}, 
    {id: 27, rating: 4, review: 'i like the burger'}];
const porterhouseReviews = [{id: 28, rating: 1, review: 'does not even have steak'}, 
    {id: 29, rating: 1, review: 'unclean'}, 
    {id: 30, rating: 2, review: 'definitely a skip'}];
const flamaReviews = [{id: 31, rating: 5, review: 'loved it!'}, 
    {id: 32, rating: 4, review: 'great for birthdays'}, 
    {id: 33, rating: 2, review: '2 stars.'}];
const clockedReviews = [{id: 34, rating: 5, review: 'nice themed burgers'}, 
    {id: 35, rating: 4, review: 'awesome fries'}, 
    {id: 36, rating: 3, review: 'overpriced'}];

/*
const restaurantData = {
    'South Kitchen + Bar': { id: 0, name: 'South Kitchen + Bar', image: '/images/south-kitchen.jpg', reviews: southReviews },
    'The National': { id: 1, name: 'The National', image: '/images/the-national.jpg', reviews: nationalReviews},
    'Hilltop Grille': { id: 2, name: 'Hilltop Grille', image: '/images/hilltop-grille.jpg', reviews: hilltopReviews },
    'Porterhouse Grill': { id: 3, name: 'Porterhouse Grill', image: '/images/porterhouse-grill.jpg', reviews: porterhouseReviews },
    'Flama Brazilian Steak House': { id: 4, name: 'Flama Brazilian Steak House', image: '/images/flama-brazilian.jpg', reviews: flamaReviews },
    'Clocked': { id: 5, name: 'Clocked', image: '/images/clocked.jpg', reviews: clockedReviews },
}; 
*/

const restaurantData = {
    'South Kitchen + Bar': {
      address: '247 E Washington St, Athens, GA 30601-4532',
      phone: '+1 706-395-6125',
      hours: [
        { label: 'Happy Hour', description: '(1/2 priced select cocktails)', time: '3:00 pm - 6:00 pm Monday through Thursday' },
        { label: 'Dinner', time: '4:00 pm - 10:00 pm Monday through Thursday and Sunday' },
        { label: 'Dinner', time: '4:00 pm - 11:00 pm Friday and Saturday' },
      ],
      image: '/images/south-kitchen.jpg',
      reviews: southReviews,
    },
    'The National': {
      address: '232 W Hancock Ave, Athens, GA 30601',
      phone: '+1 706-549-3450',
      hours: [
        { label: 'Lunch', time: '11:30 am - 2:30 pm Monday through Friday' },
        { label: 'Dinner', time: '5:30 pm - 10:00 pm daily' },
      ],
      image: '/images/the-national.jpg',
      reviews: nationalReviews,
    },
    'Hilltop Grille': {
      address: '2310 W Broad St, Athens, GA 30606',
      phone: '+1 706-353-7667',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/hilltop-grille.jpg',
      reviews: hilltopReviews,
    },
    'Porterhouse Grill': {
      address: '459 E Broad St, Athens, GA 30601',
      phone: '+1 706-369-0990',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/porterhouse-grill.jpg',
      reviews: porterhouseReviews,
    },
    'Flama Brazilian Steak House': {
      address: '1550 Oglethorpe Ave, Athens, GA 30606',
      phone: '+1 706-850-8299',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/flama-brazilian.jpg',
      reviews: flamaReviews,
    },
    'Clocked': {
      address: '259 W Washington St, Athens, GA 30601',
      phone: '+1 706-548-9175',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/clocked.jpg',
      reviews: clockedReviews,
    },
    // Add other restaurants as needed
  };

const isLoggedIn = false;

const ReviewForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurantName } = location.state || {};

    const restaurant = restaurantData[restaurantName];
    const [reviews, setReviews] = useState(restaurant.reviews)

    const [rating, setRating] = useState('0');
    const [review, setReview] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');

    const updateReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const handleRadioButton = (n: string) => {
        setRating(n);
        setSelectedRadio(n);
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // only submit if user has entered rating and review
        if (rating !== '0' && review !== '') {
            // create new review object to add to reviews array
            const newReview = {id: reviews.length * 100 + 1,
                rating: rating,
                review: review,
            }

            setRating('0'); // reset rating value
            setSelectedRadio(''); // reset selected radio
            setReview(''); // reset textbox

            // add review and rating to restaurant.reviews[]
            setReviews( (prevReviews: Review[]) => [...prevReviews, newReview])
        }
        else {
            alert('Please enter a rating and a review')
        }
    }
    

    return (
        <div className={styles.pageContainer}>
            {isLoggedIn ? <LogoutBanner /> : <Header />}

            <h1 className={styles.name}>{restaurantName}</h1>

            <div className={styles.reviewComponents}>
                <Image src={restaurant.image} alt={restaurant.name || 'Restaurant image'} 
                    width={250} height={250} className={styles.image}/>

                <form className={styles.formContainer}>
                    {/* Rating Buttons */}
                    <div className={styles.ratingContainer}>
                        <h3>How would you rate your experience?</h3>
                        <div className={styles.ratingButtonsForm}>
                        <p className={styles.radioLabel}>Excellent</p>
                            <label className={styles.radioContainer}>
                                <input type='radio' name='rating' className={styles.radio} 
                                    value='5' onChange={() => handleRadioButton('5')}
                                    checked={selectedRadio === '5'}></input>
                                <div className={styles.radioIcon}>
                                    <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/>
                                </div>
                            </label>

                            <p className={styles.radioLabel}>Very Good</p>
                            <label className={styles.radioContainer}>
                                <input type='radio' name='rating' className={styles.radio}
                                    value='4' onChange={() => handleRadioButton('4')}
                                    checked={selectedRadio === '4'}></input>
                                <div className={styles.radioIcon}>
                                    <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='white' size='1em'/>
                                </div>
                            </label>

                            <p className={styles.radioLabel}>Average</p>
                            <label className={styles.radioContainer}>
                                <input type='radio' name='rating' className={styles.radio}
                                    value='3' onChange={() => handleRadioButton('3')}
                                    checked={selectedRadio === '3'}></input>
                                <div className={styles.radioIcon}>
                                    <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/>
                                </div>
                            </label>

                            <p className={styles.radioLabel}>Poor</p>
                            <label className={styles.radioContainer}>
                                <input type='radio' name='rating' className={styles.radio}
                                    value='2' onChange={() => handleRadioButton('2')}
                                    checked={selectedRadio === '2'}></input>
                                <div className={styles.radioIcon}>
                                    <CircleIcon color='green' size='1em'/> <CircleIcon color='green' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/>
                                </div>
                            </label>

                            <p className={styles.radioLabel}>Terrible</p>
                            <label className={styles.radioContainer}>
                                <input type='radio' name='rating' className={styles.radio}
                                    value='1' onChange={() => handleRadioButton('1')}
                                    checked={selectedRadio === '1'}></input>
                                <div className={styles.radioIcon}>
                                    <CircleIcon color='green' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/> <CircleIcon color='white' size='1em'/> 
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Textbox */}
                    <div className={styles.reviewContainer}>
                        <h3>What feedback do you have?</h3>
                        <textarea value={review} placeholder={'Leave a review'} cols={40} rows ={8}
                            onChange={updateReview} className={styles.textbox}/>
                    </div>

                    {/* Submit Button*/}
                    {isLoggedIn ? <button onClick={handleSubmit} className={styles.submitButton}>Submit</button> 
                        : <Link href='/signin' className={styles.signinPrompt}>Sign in</Link>}



                </form>
            </div>

            {/* Temp Display of Ratings */}
            <ul className={styles.ratingsDisplay}>
                {reviews.map( 
                    review => <li key={review.id}>
                        <p>Rating: {review.rating} &nbsp; Review: {review.review}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ReviewForm;