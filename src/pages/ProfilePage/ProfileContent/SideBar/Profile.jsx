import { useState, useRef, useEffect } from 'react';
import {
    Avatar,
    AvatarBadge,
    Badge,
    Button,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { updateUser } from '../../../../redux/slides/userSlide';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as UserService from '../../../../services/UserService';

function Profile() {
    // get user profile from redux
    const userProfile_From_Redux = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [avatarImg, setAvatarImage] = useState(userProfile_From_Redux.avatarImg ?? '');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const profileImage = useRef(null);

    const openChooseImage = () => {
        profileImage.current.click();
    };

    const mutation = useMutationHook(({ getToken, userInfo_From_Redux }) => {
        UserService.updateInfoUser(getToken, userInfo_From_Redux);
    });
    const getToken = localStorage.getItem('tokenUser');

    const handleUpdateAvatar = async (e) => {
        e.preventDefault();
        const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
        const selected = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => setAvatarImage(reader.result);
        reader.readAsDataURL(selected);

        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            const formData = new FormData();
            formData.append('file', selected);
            formData.append('upload_preset', 'avatarPreset');

            const res = await Axios.post(
                'https://api.cloudinary.com/v1_1/dajzl4hdt/image/upload',
                formData
            );
            const response = res.data;
            dispatch(updateUser({ ...userProfile_From_Redux, avatarImg: response.secure_url }));
            mutation.mutate({
                getToken,
                userInfo_From_Redux: { ...userProfile_From_Redux, avatarImg: response.secure_url },
            });
        } else {
            onOpen();
        }
    };

    return (
        <VStack spacing={3} py={5} borderBottomWidth={1} borderColor='brand.light'>
            {/* avatar */}
            <Avatar
                size='2xl'
                cursor='pointer'
                onClick={openChooseImage}
                src={
                    avatarImg
                        ? avatarImg
                        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXm5uampqajo6Pa2trp6emhoaHl5eXg4OCoqKjc3Nzf39/W1tatra2wsLDIyMi8vLy2trbExMTOzs61tbXhv6YVAAAEl0lEQVR4nO2d27aqMAxFpYSbioL+/79uEPEGW4WmSepY8+287Tlikza0OZsNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKUMcmL4ptUeTDP36JTqc6ted9mTiXOZeU+3N7qja/YtnZHZqyF3ukUy2bQ2ep/ed5Q9tD7V7s7pauPmzjdqS0SebtbpZJk8brSOn5n+g9R/IcqSNVdfZRbyCrq/gcKW+/iN89jm0emSPt9t/7XRz3u6gUqV3md3Fs41Gk/LxcsFM8x/JLpapcI9gplnEkHNqt0huIYTHSbl0Ar2G0r0ipj2CnaL36U+Un2CkaX4tF6SmYJGWhLfGW2jeEXRBrbYk30NFfsFM8mv2d0u7brfZ7MrMJNWfx68m1Vebh+Y32GP2d+pX6F0Wbv9OaTTBJLOZTOvGkmYHsZDCIe0bBJNlr60zgqhQj9ioGca7CntqaYcUbwi6IlbbSM3y1cMRaTcz9zxSvlLY2NozVfsTttKUeWdM9/Ghoq7vInUl7TO1rtgEEk2SrrXWHc9N9x9L2mw5BDA+GDNmr4cXQUkUMkWhMpZoA9b7HUM0vgggmiZ3OqXejex5nZ/Pt+a3iX8NUW+xGyn10Gsjs7EyZz/cwVOD31+Hv59IwRwtLh4vf39PkvN3gkb0dQ2qCnC0aO2eLEG0aW40aOgUxtPR1Jki5MFQsAqUaQ4kmTBvDVBMjyEI0tQzDnPLtnPB7qGEXNFQNL7AfoAwdnQaIe2taGgshe9vbUsP7Ct+VrwFLxXCAd29qaU96g+Hy7B2T12g5V6LBVXiBb3Nq70bUBWJrDGdWL+xzJRuTaeYKw0V241fZedqKdpqIUziuLFi6oDCD/z1ak3dnH6HWTzEznGWu+CVUy2n0hk8UI4hgDx3WKmZGN2sTaPdhkMI8LooXpANUrCj9ri6iEexZnG9cq/0nL2ThyIHYBg700JJPbq6JbhoPbdtFj/Jd2UY1qIbS44KxH1dHd7R6KpxAabPYb3CMYxgPFev8ro7mKwblbea1L82MD6pZPJZmxtFy3aCc6bW61TBSunJqy0SxtJlxfr4jnB9Z3wE31r7MUOGdYp5xe1t1g20JPiiaWoyUMusN2FEM87DLUOc0lKAZxXCCRhSpCubXY2BqFOvH7Sn6n7tzlg9q/+Nq5dIf5m3lk6LuFcX17e3vUW2E+8+f+wbNGXWBXiG8ondZOMwV/Sl6n9wCPeiaUdR64iXzG+3RuUEUZszAPDpn/kJOsFNU2NqEr/VPhgp1X6QUPiiKP6CRDaFGEIVDKB9E6RDKBzHUJIx3iKZTyVo4IlsT2d+PfIPoG5NAgzDekwnuTuXzTI9krgn0/v4Tgu/zA3ZI3yE3Z1DnRyr5MxVqXkwRa2eI79hGpHZuYeYLfGUodMtdaxkKLkStZSjWr9HYdY/I7L7FmohTZNqKeolGKtVIdbpnDUW633qpVCqZss+XX4LILHqV0++IyCmYe7TAMiR2pqLd/FdEuvu/b7jV6NGMZBJvhH/fkP3/6lhkKHFC3GZOD5EY5qkm1i5HAwAAAAAAAAAAAAAAAAAAAACAJf4AKkJE8O36wbkAAAAASUVORK5CYII='
                }
            >
                <AvatarBadge bg='brand.blue' boxSize='1em'>
                    <svg className='bg-black' width='0.4em' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                        />
                    </svg>
                </AvatarBadge>
            </Avatar>

            {/* hidden input */}
            <input hidden type='file' ref={profileImage} onChange={handleUpdateAvatar} />

            {/* modal update avatar */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-red-500 font-bold text-center'>
                        Lỗi Cập Nhật Ảnh Đại Diện
                    </ModalHeader>
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

            {/* name and job */}
            <VStack spacing={1}>
                {/* name */}
                <Heading as='h3' fontSize='xl' color='brand.dark'>
                    {`${userProfile_From_Redux.firstname} ${userProfile_From_Redux.lastname}`}
                </Heading>

                {/* job */}
                <Text color='brand.gray' fontSize='md'>
                    {userProfile_From_Redux.username}
                </Text>
            </VStack>
        </VStack>
    );
}

export default Profile;
