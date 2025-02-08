
import { useEffect, useState } from 'react';
import styles from './FilterForm.module.scss';
import { Manufacturer } from '../../api/sparkplugModels';
import { fetchManufacturers, fetchModelsByManufacturer } from '../../api/sparkplugMiscApi';
import CustomSelect from '../Select/CustomSelect';
import { fetchPostingsByQuery } from '../../api/sparkplugApi';
import { useNavigate } from 'react-router-dom';

function FilterForm() {
    const navigate = useNavigate();

    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

    const [selectedBrand, setSelectedBrand] = useState<string | undefined>();

    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string | undefined>();
    
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');

    const [priceTo, setPriceTo] = useState('');

    const [displacementFrom, setDisplacementFrom] = useState('');
    const [displacementTo, setDisplacementTo] = useState('');

    const [sortingOption, setSortingOption] = useState('');

    useEffect(() => {
        const fetchAllManufacturers = async () => {
            try {
                const data = await fetchManufacturers();
                setManufacturers(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAllManufacturers();
    }, []);

    useEffect(() => {
        const fetchAllModels = async () => {
            if (selectedBrand) {
                try {
                    const data = await fetchModelsByManufacturer(selectedBrand);
                    setModels(data);
                } catch (e) {
                    console.error(e);
                }
            } else {
                setModels([]);
            }
        }

        fetchAllModels();
    }, [selectedBrand])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let q: string = '';
    
        if (selectedBrand) q += ('car.manufacturer.name:' + selectedBrand + ',');
        if (selectedModel) q += ('car.model:' + selectedModel + ',');
        if (yearFrom) q += ('car.year>' + yearFrom + ',');
        if (yearTo) q += ('car.year<' + yearTo + ',');
        if (priceTo) q += ('price<' + priceTo + ',');
        if (displacementFrom) q += ('car.engine.displacement>' + displacementFrom + ',');
        if (displacementTo) q += ('car.engine.displacement<' + displacementTo + ',');
        // Remove trailing comma
        q = q.replace(/,$/, '');
;
        let uri: string = '?';
        
        if(q.length > 0) uri += ('q=' + encodeURIComponent(q) + '&'); 
        if(sortingOption.length > 0) uri += ('sort=' + encodeURIComponent(sortingOption))

        navigate(uri);

        console.log(q);

        const postings = await fetchPostingsByQuery(q);
        console.log(postings);
    };

    return (
        <div className={styles.formContainer}>

            <h2>Filtered Search</h2>

            <form className={styles.searchForm} onSubmit={handleSubmit}>

                <div className={styles.formGroup1}>
                    <CustomSelect 
                        placeholder='Brand'
                        options={manufacturers.map((m) => ({ value: m.name, label: m.name }))}
                        onChange={(option) => { setSelectedBrand(option?.value); setSelectedModel('') }}
                    />
                </div>
                <div className={styles.formGroup2}>
                    <CustomSelect 
                        placeholder='Model'
                        key={selectedBrand}
                        options={models.map((m) => ({ value: m, label: m }))}
                        onChange={(option) => { setSelectedModel(option?.value) }}
                    />
                </div>

                <div className={styles.formGroup3}>
                    <input type="number" placeholder='Year from' value={yearFrom} min={1910} onChange={(e) => setYearFrom(e.target.value)} />
                    <input type="number" placeholder='Year to' value={yearTo} min={1910} onChange={(e) => setYearTo(e.target.value)} />
                </div>

                <div className={styles.formGroup4}>
                    <input type="number" placeholder='Displacement from' value={displacementFrom} min={0} onChange={(e) => setDisplacementFrom(e.target.value)} />
                    <input type="number" placeholder='Displacement to' value={displacementTo} min={0} onChange={(e) => setDisplacementTo(e.target.value)} />
                </div>

                <div className={styles.formGroup5}>
                    <input type="number" placeholder='Price to' value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
                </div>

                <div className={styles.formActions}>
                    <button type="reset" className={styles.btnReset}>Reset</button>
                    <button type="submit" className={styles.btnSubmit}>See postings</button>
                </div>
            

            </form>

            <div className={styles.sortContainer}>
                <CustomSelect 
                    placeholder="Sort by"
                    key={selectedBrand}
                    options={ [
                        {value: "priceAsc", label: "Price, ascending"},
                        {value: "priceDesc", label: "Price, descending"},
                        {value: "mileageAsc", label: "Mileage, ascending"},
                        {value: "mileageDesc", label: "Mileage, descending"},
                    ] }
                    onChange={(option) => { setSortingOption(option?.value || '') }}
                    styles={ styles }
                />
            </div>

        </div>
    );
}

export default FilterForm;