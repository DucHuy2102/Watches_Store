const Header_AdminPage = () => {
    return (
        <div className='bg-blue-500 flex justify-center items-center w-full h-12'>
            <div className='flex flex-1 justify-start'>
                <h1>Left</h1>
            </div>
            <div className='flex-grow justify-center'>
                <h1>Center</h1>
            </div>
            <div className='flex justify-end'>
                <h1>Right</h1>
            </div>
        </div>
    );
};

export default Header_AdminPage;
