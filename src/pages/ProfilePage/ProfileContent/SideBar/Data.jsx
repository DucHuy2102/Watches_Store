import { Box, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function Data() {
    const orders_Redux = useSelector((state) => state.orderProduct);
    console.log(orders_Redux);
    const ordersLength = orders_Redux.length > 0 ? orders_Redux.length : 0;

    // list data for sidebar
    const list = [
        {
            id: 1,
            name: 'Tổng đơn hàng của bạn',
            value: ordersLength,
            color: 'yellow',
        },
        {
            id: 2,
            name: 'Đơn hàng đã thanh toán',
            value: 26,
            color: 'green',
        },
        {
            id: 3,
            name: 'Đơn hàng bị hủy',
            value: 6,
            color: 'cadet',
        },
    ];

    return (
        <VStack as='ul' spacing={0} listStyleType='none'>
            {list.map((item) => (
                <Box
                    key={item.id}
                    className='w-full py-3 px-5 flex justify-between items-center border-b-2 border-brand-light'
                >
                    <Text color='brand.dark'>{item.name}</Text>
                    <Text color={`brand.${item.color}`} fontWeight='bold'>
                        {item.value}
                    </Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Data;
