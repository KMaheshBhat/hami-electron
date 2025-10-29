import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-none h-[24px] bg-[#2a2a2e] border-b-[1px] border-b-[#2f2f34]'>Header</div>
      <div className='grow flex flex-row'>
        <div className='flex-none w-[24px] bg-[#2a2a2e] border-r-[1px] border-r-[#2f2f34]'>1</div>
        <div className='flex-none w-[100px] bg-[#2a2a2e] border-r-[1px] border-r-[#2f2f34]'>2</div>
        <div className='grow'>3</div>
        <div className='flex-none w-[100px] bg-[#2a2a2e] border-l-[1px] border-l-[#2f2f34]'>4</div>
      </div>
      <div className='flex-none h-[24px] bg-[#2a2a2e] border-t-[1px] border-t-[#2f2f34]'>Footer</div>
    </div>
  );
};

const root = createRoot(document.body);
root.render(<App />);
