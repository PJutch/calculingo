import { MathJaxContext } from 'better-react-mathjax';
import Login from '../Login';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../redux/store';

export default {
    title: 'Pages/Login',
    component: Login,
    decorators: [
        (Story: React.FC) => (
            <div style={{ width: "50%", height: "100vh" }}>
                <Provider store={store}>
                    <MemoryRouter>
                        <MathJaxContext>
                            <Story />
                        </MathJaxContext>
                    </MemoryRouter>
                </Provider>
            </div >
        ),
    ],
}

export const Default = {}
