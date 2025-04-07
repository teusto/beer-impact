import { useBeer } from '../../utils/BeerProvider';
import Rating from '../Rating';
import styles from './style.module.scss';

const Beer = () => {
    const { beer, updateBeerRating } = useBeer();

    const handleRatingChange = (newRating: number) => {
        if(beer && beer.id){
            updateBeerRating(beer.id, newRating);
        }
    }

    console.log({beer})
    return (
        <section className={styles.beer}>
            <div className={styles.top}>
                <p className={styles.name}>{beer.name}</p>
                <div className={styles.containerPills}>
                    <div className={styles.pill}>{beer.brewedFirst}</div>
                    <div className={styles.pill}>{beer.abv}</div>
                    <div className={styles.pill}>{beer.ibu}</div>
                </div>    
            </div>
            <div className={styles.bottom}>
                <div className={styles.description}>
                    <p className={styles.title}>Description</p>
                    <p className={styles.content}>{beer.description}</p>
                </div>
                <div className={styles.stars}><Rating initialRating={beer.rating || 0} onChange={handleRatingChange} /></div>
            </div>            
        </section>
    )
}

export default Beer
