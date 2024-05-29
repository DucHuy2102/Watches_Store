import {
    Carousel,
    PolicyComponent,
    ShopNow,
    ReadMoreToBlogs,
    SayThanks,
    TheReviews,
} from '../../components/exportComponents';

const HomePage = () => {
    return (
        <div>
            <Carousel />
            <PolicyComponent />
            <ShopNow />
            <ReadMoreToBlogs />
            <TheReviews />
            <SayThanks />
        </div>
    );
};

export default HomePage;
