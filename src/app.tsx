import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { HAMITestFlow, HAMITestNode } from './hami';

const App = () => {
    const [content, setContent] = useState('');
    (async () => {
        // Validate HAMI Core library
        const hamiTestNode = new HAMITestNode();
        const hamiTestFlow = new HAMITestFlow(hamiTestNode, {});
        await hamiTestFlow.run({})
        setContent('HAMI test passed');
    })();
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Content from React</h2>
            <p>{content}</p>
        </div>
    );

};

const root = createRoot(document.body);
root.render(<App />);
