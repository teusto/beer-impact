import styles from './style.module.scss';
import { useBeer } from '../../utils/BeerProvider';

const Search = () => {
    const { setSearchTerm, searchTerm } = useBeer();

    const handleInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
      }

    return (
        <section className={styles.search}>
            <input type="text" placeholder="Search ..." className={styles.searchBar} onChange={handleInputChange} value={searchTerm}/>
        </section>
    )
}

export default Search;
