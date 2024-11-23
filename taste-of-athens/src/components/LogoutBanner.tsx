import { FaUser } from "react-icons/fa";
import styles from './LogoutBanner.module.css';
import Image from 'next/image';
import { doLogout } from "../userSignIn"

interface LogoutBannerProps {}

const LogoutBanner: React.FC<LogoutBannerProps> = () => {
    const handleLogout = () => {
        doLogout();
    }

    return (
        <div className={styles.banner}>
            <Image src ="/images/logo.png" alt = "logo" className = {styles.logo}
                    width={200} height={5000}/>

            <button onClick={handleLogout} className={styles.logoutButton}>
                <FaUser />
                Logout
            </button>
        </div>
    );
}

export default LogoutBanner;