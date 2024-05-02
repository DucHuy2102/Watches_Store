import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../redux/slides/userSlide';
import { regexPhoneNumber, validateEmail } from '../../../../helpers/checkIndex';

function AccountSettings() {
    const dataAccountSetting = useSelector((state) => state.user);
    console.log('dataAccountSetting:', dataAccountSetting);

    const [username, setUsername] = useState(dataAccountSetting.username ?? '');
    const [phone, setNumberPhone] = useState(dataAccountSetting.phone ?? '');
    const [firstname, setFirstName] = useState(dataAccountSetting.firstname ?? '');
    const [lastname, setLastName] = useState(dataAccountSetting.lastname ?? '');
    const [email, setEmail] = useState(dataAccountSetting.email ?? '');
    const [address, setAddress] = useState(dataAccountSetting.address ?? '');

    const dispatch = useDispatch();
    useEffect(() => {
        const saveUserInfo = () => {
            const userInfo = {
                username,
                phone,
                firstname,
                lastname,
                email,
                address,
            };
            dispatch(updateUser(userInfo));
        };
        saveUserInfo();
    }, [username, firstname, lastname, email, address, dispatch, phone]);

    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
            <FormControl id='username'>
                <FormLabel>Tên người dùng</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Tim'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onInvalid={(e) => {
                        e.target.setCustomValidity('Tên người dùng không được để trống.');
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>
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
            <FormControl id='firstName'>
                <FormLabel>Họ và chữ lót</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Tim'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    onInvalid={(e) => {
                        if (!e.target.validity.valid) {
                            e.target.setCustomValidity('Email không hợp lệ.');
                        }
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>
            <FormControl id='lastName'>
                <FormLabel>Tên người dùng</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='text'
                    placeholder='Cook'
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    onInvalid={(e) => {
                        e.target.setCustomValidity('Tên người dùng không được để trống.');
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>
            <FormControl id='emailAddress'>
                <FormLabel>Email liên hệ</FormLabel>
                <Input
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
                    required
                    onInvalid={(e) => {
                        e.target.setCustomValidity('Địa chỉ email không được để trống.');
                        e.target.oninput = () => {
                            e.target.setCustomValidity('');
                        };
                    }}
                />
            </FormControl>
            <FormControl id='address'>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                    focusBorderColor='brand.blue'
                    type='email'
                    placeholder='Số 117, Đường Võ Văn Ngân, Thành phố Hồ Chí Minh'
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
