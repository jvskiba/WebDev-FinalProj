import { FaCircle } from 'react-icons/fa6'
import { IconContext } from 'react-icons';

interface CircleProps {
    color: string;
    size: string;
}

const CircleIcon: React.FC<CircleProps> = ({color, size}) => {
    return (
        <IconContext.Provider value={{ color: color, size: size}}>
            <FaCircle></FaCircle>
        </IconContext.Provider>
    );
}

export default CircleIcon;