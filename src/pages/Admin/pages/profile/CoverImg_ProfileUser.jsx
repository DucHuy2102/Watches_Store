import { useRef, useState } from 'react';
import {
    Badge,
    Box,
    Button,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin } from '../../../../redux/slides/adminSlide';
import Axios from 'axios';
import * as UserService from '../../../../services/UserService';
import { useMutationHook } from '../../../../hooks/useMutationHook';

const CoverImg_ProfileUser = () => {
    const adminProfile_Redux = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const [backgroundImg, setBackgroundImg] = useState(adminProfile_Redux.backgroundImg ?? '/assets/cover.jpg');
    const inputRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openChooseFile = () => {
        inputRef.current.click();
    };

    const mutation = useMutationHook(({ getToken, userInfo_From_Redux }) => {
        UserService.updateInfoUser(getToken, userInfo_From_Redux);
    });
    const getToken = localStorage.getItem('adminToken');

    const handleChangeBackgroundImage = async (event) => {
        event.preventDefault();
        const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
        const selected = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => setBackgroundImg(reader.result);
        reader.readAsDataURL(selected);

        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            const formData = new FormData();
            formData.append('file', selected);
            formData.append('upload_preset', 'gioeqwaa');

            const res = await Axios.post('https://api.cloudinary.com/v1_1/dajzl4hdt/image/upload', formData);
            const response = res.data;
            dispatch(updateAdmin({ ...adminProfile_Redux, backgroundImg: response.secure_url }));
            mutation.mutate({
                getToken,
                userInfo_From_Redux: { ...adminProfile_Redux, backgroundImg: response.secure_url },
            });
        } else {
            onOpen();
        }
    };

    return (
        <Box h={60} overflow='hidden'>
            {/* image cover */}
            <Image
                w='full'
                h='full'
                objectFit='cover'
                src={backgroundImg ? backgroundImg : '/assets/cover.jpg'}
                alt='Cover'
            />

            {/* button: change cover */}
            <Button onClick={openChooseFile} position='absolute' top={20} right={4} variant='ghost'>
                <svg width='1.2em' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                    />
                </svg>
                <Text ml={2}>Cập nhật ảnh nền</Text>
                <input ref={inputRef} type='file' onChange={handleChangeBackgroundImage} hidden />
            </Button>

            {/* modal: file not supported */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-red-500 font-bold text-center'>Lỗi Cập Nhật Ảnh Nền</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>File bạn vừa chọn không được hỗ trợ!</Text>
                        <HStack mt={1}>
                            <Text color='brand.cadet' fontSize='sm'>
                                Những loại file được hỗ trợ:
                            </Text>
                            <Badge colorScheme='green'>PNG</Badge>
                            <Badge colorScheme='green'>JPG</Badge>
                            <Badge colorScheme='green'>JPEG</Badge>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Đã hiểu</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CoverImg_ProfileUser;
