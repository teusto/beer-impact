import Form from '../Form';
import { BeerType, useBeer } from '../../utils/BeerProvider';
import Overlay from '../Overlay';
import styles from './style.module.scss';
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Grid = () => {
    const { setBeer, searchTerm, newBeer, setNewBeer, filters, collection } = useBeer();
    const addRef = useRef(null);

    const selectBeer = (beer: BeerType) => {
        setBeer(beer);
    }

    const filteredBeers = collection.filter((beer) => {

        const matchesName = searchTerm === '' || beer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const beerYear = beer.brewedFirst ? beer.brewedFirst.split('/')[1] : '';
        const matchesYear = filters.year === '' || beerYear === filters.year;
        return matchesName && matchesYear;
    })

    useEffect(() => {
        const addButton = addRef.current;
        const btnAnimation = gsap.timeline({repeat: -1, repeatDelay: 3})
            .to(addButton, {scale: 1.02, duration: .3})
            .to(addButton, { scale: 1, duration: .3});

        return () => {
            btnAnimation.kill();
        }
    }, [])

    return (
        <section className={styles.grid}>
            <div className={styles.addCard} onClick={() => setNewBeer({...newBeer, status: 'idle'})} ref={addRef}>
                <IoAddCircleOutline />
                <span>Add new beer</span>
            </div>
            {filteredBeers.map((beer) => (
                <div key={beer.id} className={styles.card} onClick={() => selectBeer(beer)}>
                    {beer.name}
                </div>
            ))}
            {newBeer.status === 'idle' && <Overlay content={<Form/>} />}
        </section>
    )
}

export default Grid