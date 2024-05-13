import Admin_HeaderComponent from '../components/Admin_HeaderComponent';
import ListProduct from './ListProduct';

const Admin_ListProduct = () => {
    return (
        <>
            {/* header */}
            <div>
                <div className='bg-[#222831] py-2 flex flex-col font-PlayfairDisplay'>
                    <Admin_HeaderComponent />
                </div>
            </div>

            {/* content */}
            <div className='w-full'>
                <div className=''>
                    <h1>Danh sách sản phẩm trong cửa hàng</h1>
                </div>

                <ListProduct />
            </div>
        </>
    );
};

export default Admin_ListProduct;
