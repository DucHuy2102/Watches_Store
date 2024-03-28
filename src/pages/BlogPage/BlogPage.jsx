import Blog from '../../components/Blog';

const BlogPage = () => {
    return (
        <div className='flex justify-center'>
            <div className='mt-5 grid grid-cols-3 gap-5'>
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
            </div>
        </div>
    );
};

export default BlogPage;
