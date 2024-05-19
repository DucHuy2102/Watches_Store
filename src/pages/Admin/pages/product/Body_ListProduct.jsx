import { useNavigate } from 'react-router-dom';

const Body_ListProduct = (props) => {
    const navigate = useNavigate();
    const handleNavigation = (id) => {
        navigate(`/admin/product/edit/${id}`);
    };

    const { id, productName, img } = props.product;

    return (
        <tbody className='border border-black'>
            <tr>
                <td className='py-4 border border-black'>
                    <div className='flex items-center pl-10'>
                        {/* image */}
                        <img className='h-20 w-20' src={img[0]} alt='Product image' />

                        {/* name */}
                        <span className='w-80 font-semibold'>{productName}</span>
                    </div>
                </td>
                {/* state */}
                <td className='py-4 text-center border border-black'>
                    <button className='rounded-md py-2 px-4 mr-2 bg-blue-500 text-white hover:cursor-pointer hover:text-white '>
                        Đang bán
                    </button>
                </td>
                {/* price */}
                <td className='py-4 text-center border border-black'>2.075.000</td>
                {/* size */}
                <td className='py-4 text-center border border-black'>10 Cái</td>
                {/* color */}
                <td className='py-4 text-center border border-black'>27 Cái</td>
                {/* quantity */}
                <td className='py-4 border border-black'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <button
                            onClick={() => handleNavigation(id)}
                            className='bg-gray-300 rounded-md py-2 px-4 hover:bg-yellow-500 hover:cursor-pointer hover:text-white'
                        >
                            Sửa
                        </button>
                        <button className='bg-gray-300 rounded-md py-2 px-4 hover:bg-red-500 hover:cursor-pointer hover:text-white'>
                            Xóa
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default Body_ListProduct;
