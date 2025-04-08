import {useForm, SubmitHandler} from 'react-hook-form';
import styles from './style.module.scss';
import { IoBeer } from "react-icons/io5";
import { useBeer } from '../../utils/BeerProvider';


type Inputs = {
    name: string
    description: string
  }

const Form = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<Inputs>();
    const {addBeerToCollection, setNewBeer} = useBeer();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const newBeerData = addBeerToCollection({
            name: data.name,
            description: data.description,
            image_url: null,
            abv: 6.0,
            brewedFirst: '01/2025'
        });

        setNewBeer({
            formData: newBeerData,
            status: 'success'
        });
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p><IoBeer /> Add a new beer on your collection</p>
            <label htmlFor="name">Name</label>
            <input {...register("name")}/>
            <label htmlFor="description">Description</label>
            <input {...register("description")}/>
            <input type='submit' value='Add Beer' />
        </form>
    )
}

export default Form
