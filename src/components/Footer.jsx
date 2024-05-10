import { Typography } from '@material-tailwind/react';

const SITEMAP = [
    {
        title: 'Công ty',
        links: ['Về chúng tôi', 'Sự phát triển', 'Đội ngũ hoạt động', 'Các dự án'],
    },
    {
        title: 'Trung tâm trợ giúp',
        links: ['Discord', 'Twitter', 'GitHub', 'Facebook'],
    },
    {
        title: 'Tài nguyên khác',
        links: ['Các bài blog', 'Tin tức đồng hồ', 'Sản phẩm trải nghiệm', 'Dịch vụ quảng cáo'],
    },
    {
        title: 'Thông tin liên hệ',
        links: [
            'Địa chỉ: 01 Võ Văn Ngân, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            'Hotline: 0979657587 (Mr.Huy)',
            'Email: watcHes@gmail.com',
            'Giờ mở cửa: 7h - 22h00, Thứ 2 - Thứ 7',
        ],
    },
];
const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <footer className='bg-gray-200 mb-0 w-full border-t'>
            <div className='mx-auto w-full max-w-7xl px-8'>
                {/* top footer */}
                <div className='mx-auto grid w-full grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4'>
                    {SITEMAP.map(({ title, links }, key) => (
                        <div key={key} className='w-full'>
                            {/* title */}
                            <Typography
                                variant='small'
                                color='blue-gray'
                                className='mb-4 font-bold uppercase opacity-50 font-PlayfairDisplay'
                            >
                                {title}
                            </Typography>

                            {/* links */}
                            <ul className='space-y-1'>
                                {links.map((link, key) => (
                                    <Typography key={key} as='li' color='blue-gray' className=''>
                                        <a
                                            href='#'
                                            className='font-Montserrat inline-block py-1 pr-2 transition-transform hover:scale-105'
                                        >
                                            {link}
                                        </a>
                                    </Typography>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* bottom footer */}
                <div className='flex w-full flex-col items-center justify-center border-t border-white py-4 md:flex-row md:justify-between'>
                    <Typography
                        variant='paragraph'
                        className='mb-4 flex flex-col text-center text-blue-gray-900 md:mb-0'
                    >
                        <span className='font-PlayfairDisplay font-bold'>Trường Đại học Sư phạm Kỹ thuật</span>
                        <span className='font-PlayfairDisplay font-bold'>Thành phố Hồ Chí Minh</span>
                    </Typography>
                    <Typography
                        variant='paragraph'
                        className='font-PlayfairDisplay mb-4 text-center text-blue-gray-900 md:mb-0'
                    >
                        &copy; {currentYear} <a href='https://material-tailwind.com/'>Nguyễn Đức Huy</a> -{' '}
                        <a href='https://www.facebook.com/profile.php?id=100011281114118'>Huỳnh Lê Huy</a>
                    </Typography>
                    <div className='flex gap-4 text-blue-gray-900 sm:justify-center'>
                        {/* facebook */}
                        <Typography
                            as='a'
                            href='https://www.facebook.com/Duc.Huy2102'
                            className='opacity-80 transition-opacity hover:opacity-100'
                        >
                            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                <path
                                    fillRule='evenodd'
                                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Typography>
                        {/* github */}
                        <Typography
                            as='a'
                            href='https://github.com/HuYssss/WatchStore.git'
                            className='opacity-80 transition-opacity hover:opacity-100'
                        >
                            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                <path
                                    fillRule='evenodd'
                                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
