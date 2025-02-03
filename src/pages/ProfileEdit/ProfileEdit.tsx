import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from './ProfileEdit.module.scss';
import fallbackImage from '../../images/car-svgrepo-com.svg';
import { updateProfilePicture } from "../../api/sparkplugApi";

function ProfileEdit() {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const { userAuth } = useAuth();

    useEffect(()=> {
        const imageUrl = localStorage.getItem('profilePicture');
        if(imageUrl) {
            setImageUrl(imageUrl);
        } else {
            setImageUrl(fallbackImage);
        }
    }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Only take the first file

        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        };
    }

    const handleSubmit = async () => {
        if(!image) {
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('picture', image); 
        await updateProfilePicture(userAuth?.authToken!, formDataToSubmit);
    }

    return(
        <>
            <img src={imageUrl} className={styles.profilePicture}></img>
            <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit changes</button>
        </>
    );
}

export default ProfileEdit;