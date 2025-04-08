import { createContext, useContext, useEffect, useState } from "react";

const BeerContext = createContext<IBeerContext>({} as IBeerContext);

interface IBeerContext {
    beer: BeerType;
    setBeer: (beer: BeerType) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    newBeer: creation;
    setNewBeer: (newBeer: creation) => void;
    filters: IFilter;
    setFilters: (filters: IFilter) => void;
    collection: BeerType[];
    setCollection: (collection: BeerType[]) => void;
    addBeerToCollection: (beer: Partial<BeerType>) => BeerType;
    updateBeerRating: (id: number, rating: number) => void;
}

interface creation {
    formData: {},
    status: 'idle' | 'loading' | 'success' | 'error' | 'initial'
}

interface IFilter {
    year: string;
    abvMin: number;
    abvMax: number;
}

export interface BeerType {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image_url: string | null;
    abv: number;  // Alcohol by volume
    ibu?: number;
    brewedFirst?: string;
    rating?: number
}

const INITIAL_COLLECTION: BeerType[] = [
    {
        id: 1,
        name: "Punk IPA",
        tagline: "Post Modern Classic. Spiky. Tropical. Hoppy.",
        description: "This light, golden classic has been subverted with new world hops to create an explosion of flavour. Bursts of caramel and tropical fruit with an all-out riot of grapefruit, pineapple and lychee, precede a spiky bitter finish.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png",
        abv: 5.6,
        ibu: 35,
        brewedFirst: "04/2007",
        rating: 0,
    },
    {
        id: 2,
        name: "Trashy Blonde",
        tagline: "You Know You Shouldn't",
        description: "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say?",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/h4a/h43/11635363905566.png",
        abv: 4.1,
        ibu: 41,
        brewedFirst: "04/2008",
        rating: 2,
    },
    {
        id: 3,
        name: "Berliner Weisse",
        tagline: "German Sour Wheat Beer.",
        description: "Our take on this classic German style sour wheat beer.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/hd2/hfd/11348869382174.png",
        abv: 4.2,
        ibu: 8,
        brewedFirst: "11/2015",
        rating: 1,
    },
    {
        id: 4,
        name: "Pilsen Lager",
        tagline: "Unleash the Yeast Series.",
        description: "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/h60/hb2/8800955105310.png",
        abv: 6.3,
        ibu: 55,
        brewedFirst: "09/2013",
        rating: 0,
    },
    {
        id: 5,
        name: "Avery Brown Dredge",
        tagline: "Bloggers' Imperial Pilsner.",
        description: "An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/h53/hf1/11139791421470.png",
        abv: 7.2,
        ibu: 59,
        brewedFirst: "02/2011",
        rating: 1,
    },
    {
        id: 6,
        name: "Electric India",
        tagline: "Vibrant Hoppy Saison.",
        description: "Re-brewed as a spring seasonal, this beer – which appeared originally as an Equity Punk shareholder creation – retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/h83/he6/11931937210398.png",
        abv: 5.2,
        ibu: 38,
        brewedFirst: "05/2013",
        rating: 0,
    },
    {
        id: 7,
        name: "AB:12",
        tagline: "Imperial Black Belgian Ale.",
        description: "An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries, tayberries and blackberries beause they were local.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/hba/h54/11931504771102.png",
        abv: 11.2,
        ibu: 35,
        brewedFirst: "07/2012",
        rating: 0,
    },
    {
        id: 8,
        name: "Fake Lager",
        tagline: "Bohemian Pilsner.",
        description: "Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Our post-modern nightmare encompasses everything from the clean German Pilsner to the fruity easy-drinking lagers of New Zealand.",
        image_url: "https://www.totalwine.com/media/sys_master/twmmedia/h0c/h86/8810864082974.png",
        abv: 4.7,
        ibu: 40,
        brewedFirst: "03/2013",
        rating: 0,
    }
];

const BeerProvider = ({children}) => {
    const [beer, setBeer] = useState<BeerType>({} as BeerType);
    const [searchTerm, setSearchTerm] = useState('');
    const [newBeer, setNewBeer] = useState<creation>({formData: {}, status: 'initial'});
    const [filters, setFilters] = useState<IFilter>({year: '', abvMin: 0, abvMax: 15});
    const [collection, setCollection] = useState<BeerType[]>(() => {
        try {
            const storedCollection = localStorage.getItem('collection');
            return storedCollection ? JSON.parse(storedCollection) : INITIAL_COLLECTION;
        } catch (error) {
            console.error('Local storage error:', error);
            return INITIAL_COLLECTION;
        }
    })

    const addBeerToCollection = (beer: Partial<BeerType>) => {
        const newId = collection.length > 0 ? Math.max(...collection.map(data => data.id)) + 1 : 1;
        const newBeer: BeerType = {
            id: newId,
            name: beer.name || 'default name',
            tagline: 'default tagline',
            description: beer.description || 'No description provided',
            image_url: '',
            abv: beer.abv || 6.0,
            ibu: beer.ibu || 0,
            brewedFirst: '01/2025',
            rating: 0,
        };
        setCollection([...collection, newBeer]);
        return newBeer
    }

    const updateBeerRating = (id: number, rating: number) => {
        const updatedCollection = collection.map(item => item.id === id ? {...item, rating}: item);
        setCollection(updatedCollection);

        if(beer && beer.id === id) {
            setBeer({...beer, rating});
        }

        return updatedCollection.find(item => item.id === id);
    }

    //TODO set a first beer to render if none is selected
    useEffect(() => {
        if(collection.length > 0 && !beer.id) {
            setBeer(collection[0]);
        }
    }, [collection]);

    //TODO store user data locally to maintain collection between sessions
    useEffect(() => {
        localStorage.setItem('collection', JSON.stringify(collection));
    }, [collection]);

    return <BeerContext.Provider value={{beer, setBeer, setSearchTerm, searchTerm, newBeer, setNewBeer, filters, setFilters, collection, setCollection, addBeerToCollection, updateBeerRating}}>{children}</BeerContext.Provider>;
};

export default BeerProvider;

export const useBeer = () => {
    return useContext(BeerContext);
}
