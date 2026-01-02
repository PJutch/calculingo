import { MathJaxContext } from 'better-react-mathjax';
import Task from '../Task';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
    title: 'Pages/Task',
    component: Task,
    decorators: [
        (Story: React.FC) => (
            <div style={{ width: "50%", height: "100vh" }}>
                <Provider store={store}>
                    <MathJaxContext>
                        <MemoryRouter initialEntries={["/solve/collection1/task1"]}>
                            <Routes>
                                <Route path="/solve/:collection/:task" element={<Story />} />
                            </Routes>
                        </MemoryRouter>
                    </MathJaxContext>
                </Provider>
            </div >
        ),
    ],
}

export const Default = {}
