import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../../../../../hooks/useMutationHook';
import * as UserService from '../../../../../../services/UserService';

function Actions() {
    const dataAdmin_Redux = useSelector((state) => state.user);

    const mutation = useMutationHook(({ getToken, dataAdmin_Redux }) => {
        UserService.updateInfoUser(getToken, dataAdmin_Redux);
    });

    const getToken = localStorage.getItem('adminToken');
    const handleUpdateUser = (e) => {
        e.preventDefault();
        mutation.mutate({ getToken, dataAdmin_Redux });
    };
    return (
        <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor='brand.light'>
            <Button onClick={handleUpdateUser}>Lưu thay đổi</Button>
        </Box>
    );
}

export default Actions;
