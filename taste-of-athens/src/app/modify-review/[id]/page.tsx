"use client"
import ModifyItem from '../../../components/ModifyItem';
import { useSearchParams } from 'next/navigation';



const ModifyReviewPage = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    if (!name) {
        return <p>Restaurant not specified.</p>;
    }

    return (
        <ModifyItem restaurantName={name}/>
    )
}

export default ModifyReviewPage;