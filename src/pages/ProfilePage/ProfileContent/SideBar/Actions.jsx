import { useEffect, useRef, useState } from 'react';
import { Button, Input, InputGroup, InputRightAddon, useClipboard, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneOutlined } from '@ant-design/icons';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as ProductService from '../../../../services/ProductService';
import { useDispatch } from 'react-redux';
import { addOrderDetail } from '../../../../redux/slides/orderSlide';
import { toast } from 'react-toastify';

const value = 'https://DucHuy.github.io';

export default function Actions() {
    const [hasPendingToast, setHasPendingToast] = useState(false);
    const { hasCopied, onCopy } = useClipboard(value);
    const profileUrl = useRef(null);
    useEffect(() => {
        if (hasCopied) {
            profileUrl.current.focus();
            profileUrl.current.select();
        }
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // ----------------- GET ORDER BY UDER_ID -----------------
    const token = localStorage.getItem('tokenUser');

    // mutation get order by user id
    const mutation = useMutationHook((token) => ProductService.getOrderByUserId(token));
    const { isPending } = mutation;

    // isPending && toast.info('Đang tải dữ liệu...');
    useEffect(() => {
        if (isPending && !hasPendingToast) {
            toast.info('Đang tải dữ liệu...');
            setHasPendingToast(true);
        }
    }, [isPending, hasPendingToast]);

    // handle get all orders and navigate to list orders page
    const handleGetOrderById = () => {
        mutation.mutate(token, {
            onSuccess: (data) => {
                dispatch(addOrderDetail(data?.data));
                navigate('/list-orders');
            },
            onError: (error) => {
                console.log('Get order by user id failed', error);
            },
        });
    };

    return (
        <VStack py={8} px={5} spacing={3}>
            <button
                onClick={handleGetOrderById}
                className='w-[18vw] text-center hover:border-gray-300 border border-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-[#e2e8f0] hover:text-black transition-colors duration-300'
            >
                Danh sách đơn hàng
            </button>

            <span className='w-full font-bold'>Thông tin liên hệ:</span>
            <div className='bg-gray-200 cursor-pointer rounded-lg w-full flex flex-col justify-center items-center py-5 space-y-1'>
                <div className='flex justify-center items-center gap-2'>
                    <PhoneOutlined className='text-xl' />
                    <span className='font-bold text-lg'>Hotline</span>
                </div>
                <span>1900-0809</span>
                <span className='italic'>1000 đ/phút, 8h-21h kể cả thứ 7, CN</span>
            </div>
            {/* <InputGroup>
                <Input
                    ref={profileUrl}
                    type='url'
                    color='brand.blue'
                    value={value}
                    userSelect='all'
                    isReadOnly
                    _focus={{ borderColor: 'brand.blue' }}
                />
                <InputRightAddon bg='transparent' px={0} overflow='hidden'>
                    <Button onClick={onCopy} variant='link'>
                        <svg width='1.2em' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
                            <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
                        </svg>
                    </Button>
                </InputRightAddon>
            </InputGroup> */}
        </VStack>
    );
}
