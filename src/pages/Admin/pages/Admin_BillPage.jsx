import Admin_HeaderComponent from '../components/Admin_HeaderComponent';

const Admin_BillPage = () => {
    return (
        <>
            <div>
                <div className='bg-[#222831] py-2 flex flex-col font-PlayfairDisplay'>
                    {/* header */}
                    <Admin_HeaderComponent />
                </div>
                <div>
                    <h1>Quản lý Hóa Đơn</h1>
                </div>
            </div>
        </>
    );
};

export default Admin_BillPage;
