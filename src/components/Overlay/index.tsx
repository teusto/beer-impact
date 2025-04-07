import { useEffect, useRef } from 'react';
import { useBeer } from '../../utils/BeerProvider';
import styles from './style.module.scss';
import gsap from 'gsap';

const Overlay = ({ content }: any) => {
    const { setNewBeer } = useBeer();
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    const handleClose = (e) => {
        e.preventDefault();
        setNewBeer({ formData: {}, status: 'initial' })
    }

    useEffect(() => {
        gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: .3 }
        );

        gsap.fromTo(
            contentRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, delay: .1 }
        );
    }, [])

    return (
        <div className={styles.overlay} onClick={(e) => handleClose(e)} ref={overlayRef}>
            <div className={styles.contentWrapper} onClick={(e) => e.stopPropagation()} ref={contentRef}>
                {content}
            </div>
        </div>
    )
}


export default Overlay