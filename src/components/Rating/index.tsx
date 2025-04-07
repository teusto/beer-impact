import {useEffect, useState} from 'react';
import styles from './style.module.scss';
import { FaStar } from 'react-icons/fa';

interface IRating {
    totalStars?: number;
    initialRating: number;
    size?: number;
    onChange?: (rating: number) => void;
}

const Rating = ({ totalStars = 5, initialRating, size = 24, onChange }: IRating) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
        if(onChange){
            onChange(value);
        }
    }

    useEffect(() => {
        setRating(initialRating)
    }, [initialRating])

    return (
        <div className={styles.rating}>
            {[...Array(totalStars)].map((_,index) => {
                const starValue = index + 1;
                return(
                    <FaStar 
                        key={index}
                        size={size}
                        onClick={() => handleClick(starValue)}
                        className={`${styles.star} ${(hover || rating) >= starValue ? styles.filled : styles.outline}`}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    />
                )
            })}
        </div>
    )
}

export default Rating
