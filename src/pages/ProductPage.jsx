import { CardComponent } from '../components/exportComponents';

const ProductPage = () => {
    return (
        <div className='flex justify-center'>
            <div className='mt-10 mb-10 grid grid-cols-3 gap-5'>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
        </div>
    );
};

export default ProductPage;
// ml-20 mb-5 mt-5 grid grid-cols-3 gap-5 justify-center items-center
