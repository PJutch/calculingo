import { MathJaxContext } from 'better-react-mathjax';
import Browse from '../Browse';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../redux/store';

export default {
    title: 'Pages/Browse',
    component: Browse,
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
