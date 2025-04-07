import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { useBeer } from '../../utils/BeerProvider';

const Filter = () => {
    const [ years, setYears ] = useState<string[]>([]);
    const { filters, setFilters } = useBeer();

    useEffect(() => {
        // TODO: grab the range from the list
        setYears(['2007','2008','2009','2010','2011','2012','2013','2014','2015','All'])
    }, [])

    const handleYearChange = (e) => {
        const year = e.target.value === 'All' ? '' : e.target.value;
        setFilters({ ...filters, year})
    }

    return (
        <section className={styles.filter}>
            <select onChange={handleYearChange} value={filters.year || 'All'}>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>  
                ))}
            </select>
        </section>
    )
}

export default Filter