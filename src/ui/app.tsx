import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div className="bg-[#0E0E10] grid h-screen grid-rows-[50px_1fr_30px] box-border">
      <header className="flex pl-4 items-center border-b  border-b-[#2F2F34]   bg-[#1A1A1D] text-white box-border">
        HAMI
      </header>
      <div className="grid grid-cols-[50px_250px_1fr_250px] box-border border-b  border-b-[#2F2F34] overflow-hidden">
        <div className="flex flex-col gap-2 items-center border-r  border-r-[#2F2F34] bg-[#1A1A1D] py-2 text-gray-400 box-border">
          <span className="mb-2 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
          </span>
          <span className="mb-2 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-unplug-icon lucide-unplug"><path d="m19 5 3-3" /><path d="m2 22 3-3" /><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" /><path d="M7.5 13.5 10 11" /><path d="M10.5 16.5 13 14" /><path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" /></svg>
          </span>
          <span className="mb-2 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-blocks-icon lucide-blocks"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" /></svg></span>
          <span className="mb-2 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-folder-code-icon lucide-folder-code"><path d="M10 10.5 8 13l2 2.5" /><path d="m14 10.5 2 2.5-2 2.5" /><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" /></svg>
          </span>
        </div>
        <div className="bg-[#1A1A1D] p-2 text-gray-200 box-border overflow-auto">
          <p className="mb-4 text-sm font-bold">Directories</p>
          <ul className="space-y-2 text-xs">
            <li>index.html</li>
            <li>style.css</li>
            <li>app.js</li>
          </ul>
        </div>
        <div className="overflow-auto bg-[#0E0E10] p-4 text-gray-100 box-border">
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A ratione animi dicta odio? Dignissimos quibusdam, iure esse nostrum aliquam minima aut tempora reprehenderit minus necessitatibus omnis facilis fugit ex enim?
          </p>
        </div>
        <div className="bg-[#1A1A1D] p-2 text-gray-200 box-border overflow-auto">
          <p className="mb-2 text-sm font-bold">TERMINAL</p>
          <div className="rounded bg-black p-2 text-xs text-green-400 box-border">
            <p>$ npm start</p>
          </div>
        </div>
      </div>
      <footer className="bg-[#1A1A1D] flex items-center  text-white box-border">
        <span className="pl-4 text-[12px]">Bottom</span>
        <span className="pl-4 text-[12px]">Status</span>
        <span className="pl-4 text-[12px]">Footer</span>

      </footer>
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
