import styles from './style.module.scss';
import { useBeer } from '../../utils/BeerProvider';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Search = () => {
    const { setSearchTerm, searchTerm } = useBeer();
    const searchRef = useRef(null);

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    }

    const handleFocus = () => {
        gsap.to(searchRef.current, { scale: 1.05, duration: .3, ease: 'expo.out' })
    }

    const handleNoFocus = () => {
        gsap.to(searchRef.current, { scale: 1, duration: .3, ease: 'expo.in' })
    }

    useGSAP(() => {
        gsap.fromTo(
            searchRef.current,
            { width: '0%', opacity: 0 },
            { width: '100%', opacity: 1, duration: .3 }
        )
    })

    return (
        <section className={styles.search}>
            <input 
                ref={searchRef}
                type="text"
                placeholder="Search ..."
                className={styles.searchBar}
                onChange={handleInputChange}
                value={searchTerm}
                onFocus={handleFocus}
                onBlur={handleNoFocus}
            />
        </section>
    )
}

export default Search;
