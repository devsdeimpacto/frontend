import { useContext } from 'react';
import { CollapseDrawerContext } from '@/views/contexts/CollapseDrawer';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;