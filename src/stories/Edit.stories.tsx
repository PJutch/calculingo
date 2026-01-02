import { MathJaxContext } from 'better-react-mathjax';
import Edit from '../Edit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
    title: 'Pages/Edit',
    component: Edit,
    decorators: [
        (Story: React.FC) => (
            <div style={{ width: "50%", height: "100vh" }}>
                <Provider store={store}>
                    <MathJaxContext>
                        <MemoryRouter initialEntries={["/edit/collection1"]}>
                            <Routes>
                                <Route path="/edit/:collection" element={<Story />} />
                            </Routes>
                        </MemoryRouter>
                    </MathJaxContext>
                </Provider>
            </div >
        ),
    ],
}

export const Default = {}
