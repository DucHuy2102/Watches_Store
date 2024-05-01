import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';

function AccountSettings() {
    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
            <FormControl id='username'>
                <FormLabel>Tên người dùng</FormLabel>
                <Input focusBorderColor='brand.blue' type='text' placeholder='Tim' />
            </FormControl>
            <FormControl id='phoneNumber'>
                <FormLabel>Số điện thoại</FormLabel>
                <Input focusBorderColor='brand.blue' type='tel' placeholder='(+84) 979-657-587' />
            </FormControl>
            <FormControl id='firstName'>
                <FormLabel>First Name</FormLabel>
                <Input focusBorderColor='brand.blue' type='text' placeholder='Tim' />
            </FormControl>
            <FormControl id='lastName'>
                <FormLabel>Last Name</FormLabel>
                <Input focusBorderColor='brand.blue' type='text' placeholder='Cook' />
            </FormControl>
            <FormControl id='emailAddress'>
                <FormLabel>Địa chỉ email liên hệ</FormLabel>
                <Input focusBorderColor='brand.blue' type='email' placeholder='email@gmail.com' />
            </FormControl>
            <FormControl id='address'>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='email'
                    placeholder='Số 117, Đường Võ Văn Ngân, Thành phố Hồ Chí Minh'
                />
            </FormControl>
        </Grid>
    );
}

export default AccountSettings;
