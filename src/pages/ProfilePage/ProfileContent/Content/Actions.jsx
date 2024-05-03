import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as UserService from '../../../../services/UserService';

function Actions() {
    const userInfo_From_Redux = useSelector((state) => state.user);
    // console.log('userInfo_From_Redux_AfterDispatch:', userInfo_From_Redux);

    const mutation = useMutationHook(({ getToken, userInfo_From_Redux }) => {
        // console.log('dataUseMutation:', data);
        console.log('getToken:', getToken);
        UserService.updateInfoUser(getToken, userInfo_From_Redux);
    });
    const { data } = mutation;
    // console.log('dataUpdated:', data);

    const getToken = localStorage.getItem('token');
    const handleUpdateUser = (e) => {
        e.preventDefault();
        console.log('userInfo_From_Redux_AfterDispatch:', userInfo_From_Redux);
        mutation.mutate({ getToken, userInfo_From_Redux });
    };
    return (
        <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor='brand.light'>
            <Button onClick={handleUpdateUser}>Lưu thay đổi</Button>
        </Box>
    );
}

export default Actions;
