import { Rate } from 'antd';

const TheReviews = () => {
    return (
        <div className='w-full bg-gray-200'>
            <div className='px-10'>
                {/* title */}
                <div>
                    <p className='font-PlayfairDisplay pt-5 text-5xl'>
                        &ldquo;
                    </p>
                    <p className='font-PlayfairDisplay text-xl'>
                        Đánh giá của khách hàng
                    </p>
                    <p className='font-PlayfairDisplay text-4xl'>
                        Cùng xem những đánh giá về cửa hàng của chúng tôi
                    </p>
                </div>

                {/* reviews */}
                <div className='mt-4 grid grid-cols-3'>
                    <div className='text-lg font-PlayfairDisplay p-5'>
                        <Rate disabled count={5} defaultValue={5} />
                        <p>
                            Mua lần thứ 3. Thực sự bán hàng rất chất lượng, nhân
                            viên tư vấn nhiệt tình, giá cả hợp lý. Rất hài lòng
                            với dịch vụ của cửa hàng. Sẽ ủng hộ dài dài !!!
                        </p>
                        <p className='mt-2 text-end'>
                            Nguyễn Hoài Linh - Hà Nội
                        </p>
                    </div>
                    <div className='text-lg font-PlayfairDisplay p-5'>
                        <Rate disabled count={5} defaultValue={5} />
                        <p>
                            Thực sự rất hài lòng về chất lượng đồng hồ cũng như
                            chất lượng phục vụ, chăm sóc khách hàng. Sẽ ủng hộ
                            trong tương lai.
                        </p>
                        <p className='mt-2 text-end'>Lâm Thanh Hà - Đà Nẵng</p>
                    </div>
                    <div className='text-lg font-PlayfairDisplay p-5'>
                        <Rate disabled count={5} defaultValue={5} />
                        <p>
                            Giá cả hợp lý, chất lượng sản phẩm tốt, nhân viên tư
                            vấn nhiệt tình. Rất hài lòng với dịch vụ của cửa
                            hàng.
                        </p>
                        <p className='mt-2 text-end'>
                            Nguyễn Tấn Công - Hồ Chí Minh
                        </p>
                    </div>
                </div>
                <div>
                    <p className='font-PlayfairDisplay text-end text-5xl'>
                        &rdquo;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TheReviews;
