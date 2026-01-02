import { MathJaxContext } from 'better-react-mathjax';
import Menu from '../Menu';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Pages/Menu',
    component: Menu,
    decorators: [
        (Story: React.FC) => (
            <div style={{ width: "50%", height: "100vh" }}>
                <MemoryRouter>
                    <MathJaxContext>
                        <Story />
                    </MathJaxContext>
                </MemoryRouter>
            </div >
        ),
    ],
}

export const Default = {}
