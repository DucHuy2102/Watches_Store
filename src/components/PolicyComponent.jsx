import React from 'react';

const policyData = [
    {
        img: 'https://casio-hcm.vn/wp-content/uploads/2024/03/relationship.png',
        title: '100%',
        subtitle: 'chính hãng',
    },
    {
        img: 'https://casio-hcm.vn/wp-content/uploads/2024/03/guarantee.png',
        title: 'bảo hành tận nơi',
        subtitle: 'toàn quốc',
    },
    {
        img: 'https://casio-hcm.vn/wp-content/uploads/2024/03/delivery-status.png',
        title: '30 ngày',
        subtitle: 'đổi mới',
    },
    {
        img: 'https://casio-hcm.vn/wp-content/uploads/2024/03/low-battery.png',
        title: 'thay pin miễn phí',
        subtitle: 'trọn đời',
    },
    {
        img: 'https://casio-hcm.vn/wp-content/uploads/2024/03/discount.png',
        title: 'giá luôn',
        subtitle: 'ưu đãi',
    },
];

const PolicyComponent = () => {
    return (
        <div className='mt-5 mb-5 w-full flex justify-between items-center px-10'>
            {policyData.map((item, index) => (
                <div
                    key={index}
                    className='h-56 w-64 flex flex-col justify-center items-center gap-5 border border-gray-300 rounded-lg hover:shadow-2xl hover:cursor-pointer hover:transition hover:duration-300'
                >
                    <img src={item.img} className='h-16 w-16 object-cover' />
                    <div className='flex flex-col justify-center items-center text-lg'>
                        <p className='uppercase font-bold'>{item.title}</p>
                        <p className='uppercase font-bold'>{item.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PolicyComponent;
