import Sidebar_ProfilePage from './SideBar/Sidebar_ProfilePage';
import Content_ProfilePage from './Content/Content_ProfilePage';
import { Container } from '@chakra-ui/react';

const UserProfilePage = () => {
    return (
        <Container display={{ base: 'block', md: 'flex' }} maxW='container.xl'>
            <Sidebar_ProfilePage />
            <Content_ProfilePage />
        </Container>
    );
};

export default UserProfilePage;
