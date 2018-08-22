import { createContext } from 'react';

const RetranslateContext = createContext();

const { Provider, Consumer } = RetranslateContext;

export default RetranslateContext;
export { Provider, Consumer };
