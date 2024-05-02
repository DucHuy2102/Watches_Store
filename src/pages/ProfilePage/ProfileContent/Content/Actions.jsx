import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as UserService from '../../../../services/UserService';

function Actions() {
    const userInfo = useSelector((state) => state.user);
    // console.log('userInfo:', userInfo);

    const mutation = useMutationHook((data) => {
        UserService.updateInfoUser(userInfo?.access_token, data);
    });
    const { data } = mutation;

    // console.log('dataUpdate:', data);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        mutation.mutate(userInfo);
    };
    return (
        <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor='brand.light'>
            <Button onClick={handleUpdateUser}>Lưu thay đổi</Button>
        </Box>
    );
}

export default Actions;
