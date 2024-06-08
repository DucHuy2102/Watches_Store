import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../../../redux/slides/userSlide';

function AccountSettings() {
    const dataAdmin_Redux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(dataAdmin_Redux.username ?? '');
    const [phone, setNumberPhone] = useState(dataAdmin_Redux.phone ?? '');
    const [firstname, setFirstName] = useState(dataAdmin_Redux.firstname ?? '');
    const [lastname, setLastName] = useState(dataAdmin_Redux.lastname ?? '');
    const [email, setEmail] = useState(dataAdmin_Redux.email ?? '');
    const [address, setAddress] = useState(dataAdmin_Redux.address ?? '');

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(
    //         updateUser({
    //             ...dataAdmin_Redux,
    //             username,
    //             phone,
    //             firstname,
    //             lastname,
    //             email,
    //             address,
    //         })
    //     );
    // };

    useEffect(() => {
        const user = {
            username,
            phone,
            firstname,
            lastname,
            email,
            address,
        };

        if (
            user.username !== dataAdmin_Redux.username ||
            user.phone !== dataAdmin_Redux.phone ||
            user.firstname !== dataAdmin_Redux.firstname ||
            user.lastname !== dataAdmin_Redux.lastname ||
            user.email !== dataAdmin_Redux.email ||
            user.address !== dataAdmin_Redux.address
        ) {
            dispatch(updateUser(user));
        }
    }, [
        username,
        phone,
        firstname,
        lastname,
        email,
        address,
        dispatch,
        dataAdmin_Redux.username,
        dataAdmin_Redux.phone,
        dataAdmin_Redux.firstname,
        dataAdmin_Redux.lastname,
        dataAdmin_Redux.email,
        dataAdmin_Redux.address,
    ]);

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
