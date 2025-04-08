import { useState } from 'react';
import { useBeer } from '../../utils/BeerProvider';
import Rating from '../Rating';
import styles from './style.module.scss';

const Beer = () => {
    const [tooltip, setTooltip] = useState<string | null>(null);
    const { beer, updateBeerRating } = useBeer();

    const handleRatingChange = (newRating: number) => {
        if(beer && beer.id){
            updateBeerRating(beer.id, newRating);
        }
    }

    const tooltipInfo = {
        brewedFirst: 'When this beer was created.',
        abv: `Alcohol by volume (ABV) measures the percentage of alcohol in a beer. It's listed on the beer's label.`,
        ibu: `IBU stands for International Bitterness Unit, a measurement of how bitter a beer is.`
    }

    const handleTooltip = (info: string) => {
        setTooltip(info);
    }
    const handleTooltipClose = () => {
        setTooltip(null);
    }

    console.log({beer})
    return (
        <section className={styles.beer}>
            <div className={styles.top}>
                <p className={styles.name}>{beer.name}</p>
                <div className={styles.containerPills}>
                    <div className={styles.pill} onMouseEnter={() => handleTooltip('brewedFirst')} onMouseLeave={handleTooltipClose}>
                        {beer.brewedFirst}
                        {tooltip === 'brewedFirst' && <div className={styles.tooltip}>{tooltipInfo.brewedFirst}</div>}
                    </div>
                    <div className={styles.pill} onMouseEnter={() => handleTooltip('abv')} onMouseLeave={handleTooltipClose}>
                        {beer.abv}
                        {tooltip === 'abv' && <div className={styles.tooltip}>{tooltipInfo.abv}</div>}
                    </div>
                    <div className={styles.pill} onMouseEnter={() => handleTooltip('ibu')} onMouseLeave={handleTooltipClose}>
                        {beer.ibu}
                        {tooltip === 'ibu' && <div className={styles.tooltip}>{tooltipInfo.ibu}</div>}
                    </div>
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
