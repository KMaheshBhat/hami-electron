import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Content from React</h2>
            <p>Live reload</p>
        </div>
    );

};

const root = createRoot(document.body);
root.render(<App />);
