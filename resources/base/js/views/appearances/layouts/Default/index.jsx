import React, { Suspense, useState } from 'react'; 
import { Container } from '@mui/material';

// Partials
import Aside from '@/views/partials/Aside';
import Loader from '@/views/partials/Loader';
import Page from '@/views/partials/Page';
import HeaderBar from '@/views/partials/HeaderBar';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styles
import useStyles from './style';

// Config
import useMenu from '~/config/menu';

const Default = ({ children }) => {
	
    /**
     * Styles
     */
    const classesDefault = useStyles();

    /**
     * Hooks
     */
    const menu = useMenu();

    const [ open, setOpen ] = useState(false);

    return (
        <div className={classesDefault.root}>

            <HeaderBar 
                onOpenSidebar={() => setOpen(true)}
            />
            
            <Aside menu={menu} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>  
                            
            <div className={classesDefault.main}>
                <Suspense fallback={<Loader />}>
                    <Page>
                        <Container maxWidth='xl'>
                            { children }
                        </Container>
                    </Page>
                </Suspense>
            </div>
            
        </div>
    );
};

export default Default;