// custom-render.js
import { render as rtlRender } from '@testing-library/react';



const customRender = (ui, options = {}, authenticated = true) => {
    const Wrapper = ({ children }) => {

        return (
            <>{authenticated ? children : ""}</>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
