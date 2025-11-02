import { memo } from 'react';
import { useBreadcrumb } from 'react-router-mapping';

// Hooks
import usePage from '@/hooks/usePage';

const Page = memo(({ children }) => {

    /**
     * Hooks
     */
    const breadcrumb = useBreadcrumb();

    usePage({
        title : breadcrumb[0] ? [ ...breadcrumb ].reverse()[0].label : null
    });

    return children;
});

export default Page;