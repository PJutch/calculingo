import Loading from '../Loading';

export default {
    title: 'Pages/Loading',
    component: Loading,
    decorators: [
        (Story: React.FC) => (
            <div style={{ width: "50%", height: "100vh" }}>
                <Story />
            </div >
        ),
    ],
}

export const Default = {}
