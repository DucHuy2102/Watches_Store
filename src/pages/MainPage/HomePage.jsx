import {
    Carousel,
    PolicyComponent,
    ShopNow,
    ReadMoreToBlogs,
    SayThanks,
} from '../../components/exportComponents';

const HomePage = () => {
    return (
        <div>
            <Carousel />
            <PolicyComponent />
            <ShopNow />
            <ReadMoreToBlogs />
            <SayThanks />
        </div>
    );
};

export default HomePage;
