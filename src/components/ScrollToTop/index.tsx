import { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const ScrollToTop = (props: any) => {

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    return props.children;
}

export default withRouter(ScrollToTop);