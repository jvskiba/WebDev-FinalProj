"use client"
import styles from './ModifyItem.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import LogoutBanner from './LogoutBanner';
import Header from './Header';
import CircleIcon from './CircleIcon';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface ModifyItemProps {
    restaurantName: keyof typeof restaurantData;
  }

interface Review {
    _id: string;
    restaurant: string;
    rating: string;
    review: string;
}

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
    },
    'The National': {
      address: '232 W Hancock Ave, Athens, GA 30601',
      phone: '+1 706-549-3450',
      hours: [
        { label: 'Lunch', time: '11:30 am - 2:30 pm Monday through Friday' },
        { label: 'Dinner', time: '5:30 pm - 10:00 pm daily' },
      ],
      image: '/images/the-national.jpg',
    },
    'Hilltop Grille': {
      address: '2310 W Broad St, Athens, GA 30606',
      phone: '+1 706-353-7667',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/hilltop-grille.jpg',
    },
    'Porterhouse Grill': {
      address: '459 E Broad St, Athens, GA 30601',
      phone: '+1 706-369-0990',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/porterhouse-grill.jpg',
    },
    'Flama Brazilian Steak House': {
      address: '1550 Oglethorpe Ave, Athens, GA 30606',
      phone: '+1 706-850-8299',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/flama-brazilian.jpg',
    },
    'Clocked': {
      address: '259 W Washington St, Athens, GA 30601',
      phone: '+1 706-548-9175',
      hours: [
        { label: 'Lunch', time: '11:00 am - 3:00 pm Monday through Friday' },
        { label: 'Dinner', time: '5:00 pm - 10:00 pm daily' },
      ],
      image: '/images/clocked.jpg',
    },
    // Add other restaurants as needed
  };

export default function ModifyItem ( {restaurantName} : ModifyItemProps) {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');    
    const restaurant = restaurantData[restaurantName];
    //const [reviewItem, setReviewItem] = useState<Review>({ _id: id, restaurant: '', rating: '', review: ''});
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`/api/modify-review/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('DATA::::');
                console.log(data.review);
                
                await setRating(data.review.rating);
                await setReview(data.review.review);
                await setSelectedRadio(data.review.rating);
            } catch (error) {
                console.log('Error from ModifyItem');
            }
        };

        if (id) {
            fetchReview();
            setIsLoaded(true);
        }
    }, [id]);    
    
    const updateReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const handleRadioButton = (n: string) => {
        setRating(n);
        setSelectedRadio(n);
    }

    const handleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/modify-review/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            router.push(`/reviews?name=${encodeURIComponent(restaurantName)}`);
        } catch (error) {
            console.error('Error in ModifyItem');
        }
    }

    const handleModify = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // only submit if user has entered rating and review
        if (rating !== '0' && review !== '') {
            // create new review object to add to reviews array
            const newReview = {
                restaurant: restaurantName,
                rating: rating,
                review: review,
            };

            try {
                const response = await fetch(`/api/modify-review/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReview),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setRating('0'); // reset rating value
                setSelectedRadio(''); // reset selected radio
                setReview(''); // reset textbox

                router.push(`/reviews?name=${encodeURIComponent(restaurantName)}`);
            } catch (error) {
                console.error('Error in ModifyItem!', error);
            }
        }
        else {
            alert('Please enter a rating and a review')
        }
    };

    const isLoggedIn = true;

    return (
        <div className={styles.pageContainer}>
            {isLoggedIn ? <LogoutBanner /> : <Header />}
            <h1 className={styles.name}>{restaurantName}</h1>
            <div className={styles.reviewComponents}>
                <Image src={restaurant.image} alt={restaurantName || 'Restaurant image'} 
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
                    {isLoggedIn ? <div className={styles.formButtons}>
                                    <button onClick={handleModify} className={styles.submitButton}>Modify</button>
                                    <button onClick={handleDelete}className={styles.submitButton}>Delete</button>
                                  </div> 
                        : <Link to='/signin' className={styles.signinPrompt}>Sign in</Link>}
                </form>
            </div>
        </div>
    );
}