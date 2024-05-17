import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AccountSettings from './AccountSettings';
import Actions from './Actions';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';

const tabs = ['Tài khoản cá nhân', 'Thông báo'];

const Content_ProfilePage = () => {
    return (
        <Box
            as='main'
            flex={3}
            d='flex'
            flexDir='column'
            justifyContent='space-between'
            pt={5}
            bg='white'
            rounded='md'
            borderWidth={1}
            borderColor='gray.200'
            style={{ transform: 'translateY(-100px)' }}
        >
            <Tabs>
                <TabList px={5}>
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            mx={3}
                            px={0}
                            py={3}
                            fontWeight='semibold'
                            color='brand.cadet'
                            borderBottomWidth={1}
                            _active={{ bg: 'transparent' }}
                            _selected={{ color: 'brand.dark', borderColor: 'brand.blue' }}
                        >
                            {tab}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels px={3} mt={5}>
                    {/* account */}
                    <TabPanel>
                        <AccountSettings />
                    </TabPanel>

                    {/* company */}
                    {/* <TabPanel>
                        <CompanySettings />
                    </TabPanel> */}

                    {/* notification */}
                    <TabPanel>
                        <Notifications />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Actions />
        </Box>
    );
};

export default Content_ProfilePage;
