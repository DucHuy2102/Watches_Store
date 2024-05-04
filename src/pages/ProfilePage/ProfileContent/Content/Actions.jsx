import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as UserService from '../../../../services/UserService';

function Actions() {
    const userInfo_From_Redux = useSelector((state) => state.user);

    const mutation = useMutationHook(({ getToken, userInfo_From_Redux }) => {
        UserService.updateInfoUser(getToken, userInfo_From_Redux);
    });
    const { data } = mutation;

    const getToken = localStorage.getItem('token');
    const handleUpdateUser = (e) => {
        e.preventDefault();
        mutation.mutate({ getToken, userInfo_From_Redux });
    };
    return (
        <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor='brand.light'>
            <Button onClick={handleUpdateUser}>Lưu thay đổi</Button>
        </Box>
    );
}

export default Actions;
