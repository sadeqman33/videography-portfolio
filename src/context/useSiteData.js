import { useContext } from 'react';
import { SiteContext } from './siteContextDefinition';

export function useSiteData() {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSiteData must be used within a SiteProvider');
    }
    return context;
}
