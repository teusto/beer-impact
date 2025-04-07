import { useBeer } from '../../utils/BeerProvider';
import Beer from '../Beer';
import Grid from '../Grid';
import Search from '../Search';
import styles from './style.module.scss';
import Filter from '../Filter';

const Skeleton = () => {
    const { beer } = useBeer();

    return (
        <section className={styles.skeleton}>
            <div className={styles.left}>
                <div className={styles.controls}>
                    <Search />
                    <Filter />
                </div>
                <Grid />
            </div>
            <div className={styles.image}>
                <img src={beer.image_url} />
            </div>
            <div className={styles.right}>
                <Beer />
            </div>
        </section>
    )
}

export default Skeleton;