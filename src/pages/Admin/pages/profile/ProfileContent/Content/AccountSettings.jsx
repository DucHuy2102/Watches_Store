import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../redux/slides/userSlide';

function AccountSettings() {
    const data_From_Redux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(data_From_Redux.username ?? '');
    const [phone, setNumberPhone] = useState(data_From_Redux.phone ?? '');
    const [firstname, setFirstName] = useState(data_From_Redux.firstname ?? '');
    const [lastname, setLastName] = useState(data_From_Redux.lastname ?? '');
    const [email, setEmail] = useState(data_From_Redux.email ?? '');
    const [address, setAddress] = useState(data_From_Redux.address ?? '');

    useEffect(() => {
        dispatch(updateUser({ ...data_From_Redux, username, phone, firstname, lastname, email, address }));
    }, [username, firstname, lastname, email, phone, dispatch, data_From_Redux, address]);

    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
            {/* username */}
            <FormControl id='username'>
                <FormLabel>Tên người dùng</FormLabel>
                <Input
                    disabled
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Tim'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>

            {/* email */}
            <FormControl id='emailAddress'>
                <FormLabel>Email liên hệ</FormLabel>
                <Input
                    disabled
                    focusBorderColor='brand.blue'
                    type='email'
                    placeholder='email@gmail.com'
                    value={email}
                    onChange={(e) => {
                        const value = e.target.value;
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            e.target.setCustomValidity('Email không hợp lệ.');
                        } else {
                            e.target.setCustomValidity('');
                        }
                        setEmail(value);
                    }}
                />
            </FormControl>

            {/* first name */}
            <FormControl id='firstName'>
                <FormLabel>Họ và chữ lót</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Nguyễn Văn'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormControl>

            {/* last name */}
            <FormControl id='lastName'>
                <FormLabel>Tên</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='A'
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormControl>

            {/* phone number */}
            <FormControl id='phoneNumber'>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='tel'
                    placeholder='(+84) 979-657-587'
                    value={phone}
                    onChange={(e) => {
                        const value = e.target.value;
                        const isValid = /^\d*$/.test(value);
                        if (!isValid) {
                            if (value.length !== 10) {
                                e.target.setCustomValidity('Số điện thoại phải có đúng 10 chữ số.');
                            } else {
                                e.target.setCustomValidity('Số điện thoại chỉ được chứa số.');
                            }
                        } else {
                            e.target.setCustomValidity('');
                        }
                        setNumberPhone(value);
                    }}
                    required
                    onInvalid={(e) => {
                        e.target.setCustomValidity('Số điện thoại không được để trống.');
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>

            {/* address */}
            <FormControl id='address'>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Số 117, Đường Võ Văn Ngân, Thủ Đức, TP.HCM'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    onInvalid={(e) => {
                        e.target.setCustomValidity('Địa chỉ không được để trống.');
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>
        </Grid>
    );
}

export default AccountSettings;
