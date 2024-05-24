import React from 'react';
import { Comment_Component } from '../../components/exportComponents';

const BlogDetail = () => {
    return (
        <>
            {/* blog detail */}
            <div className='flex flex-col justify-center items-center font-PlayfairDisplay shadow-md'>
                {/* title */}
                <div className='mt-5 mb-5 font-bold text-4xl'>
                    <p>Đồng hồ cổ xưa đo thời gian bằng nước</p>
                </div>

                {/* content */}
                <div className='px-20 mb-5 text-xl flex flex-col justify-center items-center gap-5'>
                    {/* short description */}
                    <div>
                        Trước khi phát minh thiết bị điện tử, con người từng xem
                        giờ bằng đồng hồ nước, vật dụng gồm các thùng chứa kẻ
                        vạch và lỗ thoát nước nhỏ.
                    </div>

                    {/* image */}
                    <div>
                        <img
                            src='https://i1-vnexpress.vnecdn.net/2024/05/02/Clepsydra-of-Karnak-min-7148-1714640356.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=F6H9ZZjykZpEihRbHq940w'
                            className='h-full w-full object-cover'
                            alt='Image'
                        />
                    </div>

                    {/* content blog */}
                    <div>
                        <p>
                            Ngày nay, theo dõi giờ giấc dường như là điều hiển
                            nhiên. Mọi người chỉ cần liếc nhìn đồng hồ hoặc điện
                            thoại di động để nắm được thời gian, thậm chí chính
                            xác đến từng giây. Nhưng trước khi phát minh ra
                            những thiết bị chạy bằng pin như vậy, việc theo dõi
                            thời gian hoàn toàn khác.
                        </p>
                        <p className='mt-5'>
                            Ví dụ, thời cổ đại, đồng hồ Mặt Trời được sử dụng
                            phổ biến. Tuy nhiên, phương pháp đo thời gian này có
                            những hạn chế. Đồng hồ Mặt Trời chỉ hoạt động khi có
                            ánh sáng Mặt Trời và không thể duy trì sự phân chia
                            thời gian liên tục. Để bù đắp những thiếu sót này,
                            đồng hồ nước được phát minh.
                        </p>
                        <p className='mt-5'>
                            Có hai dạng đồng hồ nước: dòng chảy ra và dòng chảy
                            vào. Với đồng hồ nước chảy ra, bên trong thùng chứa
                            đánh dấu các vạch đo. Thùng được đổ đầy nước và rò
                            rỉ dần ra ngoài với tốc độ ổn định. Những người quan
                            sát có thể biết giờ giấc thông qua mực nước thay
                            đổi. Đồng hồ nước chảy vào hoạt động theo nguyên tắc
                            tương tự, nghĩa là nước nhỏ giọt đều đặn. Tuy nhiên,
                            các vạch đo lại nằm trong thùng chứa thứ hai. Dựa
                            vào lượng nước nhỏ giọt xuống từ thùng thứ nhất,
                            người xưa có thể biết thời gian đã trôi qua bao lâu.
                        </p>
                        <p className='mt-5'>
                            Đồng hồ nước cổ xưa nhất với bằng chứng xác thực tồn
                            tại vào khoảng năm 1417 - 1379 trước Công nguyên,
                            trong thời pharaoh Amenhotep III, được sử dụng trong
                            đền Amen-Re ở Karnak. Trong khi đó, đồng hồ nước
                            được đề cập sớm nhất là trong nội dung khắc dưới hầm
                            mộ của một vị quan từ thế kỷ 16 trước Công nguyên ở
                            Ai Cập.
                        </p>
                        <p className='mt-5'>
                            Đồng hồ nước Karnak khi được phát hiện đã vỡ thành
                            nhiều mảnh. Cổ vật này làm từ thạch cao, thiết kế
                            giống một chậu hoa lớn, có những hình vẽ đặc trưng
                            xếp thành ba hàng ngang bên ngoài và hình vua
                            Amenhotep III. Đồng hồ nước có 12 cột chạm khắc với
                            11 vạch cách đều nhau, tượng trưng cho các giờ trong
                            đêm. Nước chảy qua một lỗ nhỏ ở giữa đáy. Để nắm
                            được thời gian, người xưa sẽ nhìn vào trong đồng hồ,
                            quan sát mực nước và xác định giờ dựa vào vạch gần
                            nhất.
                        </p>
                        <p className='mt-5'>
                            Tuy nhiên, đồng hồ nước cũng có một số nhược điểm.
                            Đầu tiên, cần có áp suất nước không đổi để giữ cho
                            dòng nước chảy với tốc độ không đổi. Để giải quyết
                            vấn đề này, đồng hồ lấy nước từ một bể chứa lớn,
                            trong đó nước được giữ ở mức không đổi.
                        </p>
                        <p className='mt-5'>
                            Một vấn đề khác là độ dài ngày và đêm thay đổi theo
                            mùa nên đồng hồ cần được hiệu chỉnh mỗi tháng. Người
                            xưa đã áp dụng một số biện pháp để giải quyết vấn đề
                            này. Ví dụ, một chiếc đĩa có 365 lỗ với kích thước
                            khác nhau được sử dụng để điều chỉnh dòng nước. Lỗ
                            lớn nhất tương ứng với đông chí, khi ngày ngắn nhất,
                            và lỗ nhỏ nhất tương ứng với ngày dài nhất trong năm
                            - hạ chí. Hai lỗ này nằm ở hai đầu đối diện của đĩa,
                            những lỗ khác được sắp xếp ở giữa với kích thước
                            tăng dần hoặc giảm dần. Các lỗ tương ứng với các
                            ngày trong năm và sẽ được xoay chuyển cuối mỗi ngày.
                        </p>
                        <p className='mt-5'>
                            Dù nguyên lý cơ bản của đồng hồ nước tương đối đơn
                            giản, người xưa vẫn phải đối mặt với một số thách
                            thức liên quan đến áp lực nước và sự chuyển mùa,
                            khiến loại đồng hồ này ngày càng trở nên phức tạp.
                            So sánh với sự dễ dàng khi xem giờ ngày nay, có vẻ
                            nhân loại đã trải qua một chặng đường phát triển rất
                            dài.
                        </p>
                    </div>

                    {/* author */}
                    <div className='flex flex-col justify-center items-end gap-2 w-full'>
                        <div className='flex justify-center items-center gap-2'>
                            <p>Thu Thảo</p>
                            <p>
                                (Theo{' '}
                                <span className='italic font-bold'>
                                    Ancient Origins
                                </span>
                                )
                            </p>
                        </div>
                        <div>
                            <p>26, Tháng 3, 2024</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* more blog */}
            <div className='mt-5 mb-5 px-20 font-bold text-2xl'>
                <p>Các bài viết khác</p>
            </div>
            <div className='w-full px-10 mb-10 grid grid-cols-3 gap-5'>
                <div className='h-[540px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
                    {/* image watches  */}
                    <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                        <img
                            src='https://i1-vnexpress.vnecdn.net/2024/05/02/Clepsydra-of-Karnak-min-7148-1714640356.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=F6H9ZZjykZpEihRbHq940w'
                            alt='Image'
                            className='h-full w-full object-cover'
                        />
                    </div>

                    {/* title blog & date  */}
                    <div className='mt-3 mb-3'>
                        {/* title */}
                        <div className='font-bold'>
                            Đồng hồ cổ xưa đo thời gian bằng nước
                        </div>

                        {/* date */}
                        <div className='text-gray-500'>7, Tháng 10, 2021</div>
                    </div>
                </div>

                <div className='h-[540px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
                    {/* image watches  */}
                    <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                        <img
                            src='https://i1-vnexpress.vnecdn.net/2024/05/02/Clepsydra-of-Karnak-min-7148-1714640356.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=F6H9ZZjykZpEihRbHq940w'
                            alt='Image'
                            className='h-full w-full object-cover'
                        />
                    </div>

                    {/* title blog & date  */}
                    <div className='mt-3 mb-3'>
                        {/* title */}
                        <div className='font-bold'>
                            Đồng hồ cổ xưa đo thời gian bằng nước
                        </div>

                        {/* date */}
                        <div className='text-gray-500'>7, Tháng 10, 2021</div>
                    </div>
                </div>

                <div className='h-[540px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
                    {/* image watches  */}
                    <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                        <img
                            src='https://i1-vnexpress.vnecdn.net/2024/05/02/Clepsydra-of-Karnak-min-7148-1714640356.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=F6H9ZZjykZpEihRbHq940w'
                            alt='Image'
                            className='h-full w-full object-cover'
                        />
                    </div>

                    {/* title blog & date  */}
                    <div className='mt-3 mb-3'>
                        {/* title */}
                        <div className='font-bold'>
                            Đồng hồ cổ xưa đo thời gian bằng nước
                        </div>

                        {/* date */}
                        <div className='text-gray-500'>7, Tháng 10, 2021</div>
                    </div>
                </div>
            </div>

            {/* comment */}
            {/* <div className='mb-5 px-10 font-bold text-2xl'>
                <p>Tất cả các bình luận</p>
            </div>
            <div className=''>

            </div> */}
        </>
    );
};

export default BlogDetail;
