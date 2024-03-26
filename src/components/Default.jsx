import { Header, Footer } from './exportComponents';

const Default = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Default;
