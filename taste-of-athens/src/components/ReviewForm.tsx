"use client"
import styles from './ReviewForm.module.css';
import CircleIcon from './CircleIcon';
import { useState, ChangeEvent } from 'react';
import Header from './Header';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import LogoutBanner from './LogoutBanner';
import { useRouter } from 'next/navigation';

interface Review {
    id: number;
    rating: string;
    review: string;
    imageUrl: string;
}

interface RestaurantInfoProps {
    restaurantName: keyof typeof restaurantData;
  }

interface Restaurant {
    id: number;
    name: string;
    image: string;
    reviews: Review[];
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

const ReviewForm: React.FC<RestaurantInfoProps> = ({ restaurantName }) => {
    const router = useRouter();

    const restaurant = restaurantData[restaurantName];

    const [rating, setRating] = useState('0');
    const [review, setReview] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [image, setImage] = useState<File | null>(null); // state to store selected image
    const [imagePreview, setImagePreview] = useState<string | null>(null); // state to store image preview URL

    const updateReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const handleRadioButton = (n: string) => {
        setRating(n);
        setSelectedRadio(n);
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Set image preview URL
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // only submit if user has entered rating and review
        if (rating !== '0' && review !== '') {
            // create new review object to add to reviews array
            const newReview = {
                restaurant: restaurantName,
                rating: rating,
                review: review,
                imageUrl: imagePreview, // Save the image preview URL (or upload the image to the backend
            };

            try {

                const response = await fetch('/api/leave-review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReview),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setRating('0'); 
                setSelectedRadio(''); 
                setReview(''); 
                setImage(null); 
                setImagePreview(null); // Clear image preview

                router.push(`/reviews?name=${encodeURIComponent(restaurantName)}`);
            } catch (error) {
                console.error('Error in ReviewForm!', error);
            }
        }
        else {
            alert('Please enter a rating and a review')
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />

            <h1 className={styles.name}>{restaurantName}</h1>

            <div className={styles.reviewComponents}>
                <Image src={restaurant.image} alt={restaurantName || 'Restaurant image'} 
                    width={250} height={250} className={styles.image}/>

                <form className={styles.formContainer}>
                    {/* Rating Buttons */}
                    <div className={styles.ratingContainer}>
                        <h3>Your Rating</h3>
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
                        <h3>Write Feedback</h3>
                        <textarea value={review} placeholder={'Leave a review'} cols={40} rows ={8}
                            onChange={updateReview} className={styles.textbox}/>
                    </div>

                    {/* Image Upload */}
                    <div className={styles.imageUpload}>
                        <label htmlFor="image" className={styles.imageLabel}>
                            Upload Image
                        </label>
                        <input 
                            type="" 
                            id="image" 
                            onChange={handleImageChange} 
                            accept="image/*"
                            className={styles.imageInput} 
                        />

                        {/* Display Image Preview */}
                        {imagePreview && (
                            <div className={styles.imagePreviewContainer}>
                                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                            </div>
                        )}
                    </div>

                    {/* Submit Button*/}
                    <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewForm;
