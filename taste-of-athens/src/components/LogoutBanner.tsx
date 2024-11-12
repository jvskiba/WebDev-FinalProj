import { FaUser } from "react-icons/fa";
import styles from './LogoutBanner.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface LogoutBannerProps {}

const LogoutBanner: React.FC<LogoutBannerProps> = () => {
    return (
        <div className={styles.banner}>
            <Image src ="/images/logo.png" alt = "logo" className = {styles.logo}
                    width={200} height={5000}/>

            <Link href='/' className={styles.logoutButton}>
                <FaUser />
                Logout
            </Link>
        </div>
    );
}

export default LogoutBanner;