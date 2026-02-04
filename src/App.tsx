import { ChamferBox } from "./components/ChamferBox";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-12 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-4">
        Chamfer Box Wrapper Variants
      </h1>

      {/* 1. Wrapped Button Style (Like Ref 1) */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl text-gray-400">Wrapper as Button (Dark)</h2>
        <ChamferBox
          as="button"
          orientation="tl-br"
          className="px-6 py-3 flex items-center gap-3 cursor-pointer hover:brightness-125"
        >
          <div className="w-8 h-8 bg-red-500 flex items-center justify-center font-bold text-white text-xl">
            S
          </div>
          <span className="font-medium">Sanity</span>
        </ChamferBox>
      </div>

      {/* 2. Wrapped Link Style with Shadow (Like Ref 2) */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl text-gray-400">
          Wrapper as Link (Light + Shadow)
        </h2>
        <div className="flex gap-8">
          <ChamferBox
            as="a"
            // href="#"
            variant="light"
            orientation="tr-bl"
            hasShadow={true}
            shadowPosition="left"
            className="px-6 py-3 flex items-center gap-3 cursor-pointer hover:brightness-110"
          >
            <div className="w-8 h-8 bg-[#2c2c2c] rounded-full flex items-center justify-center text-white">
              ✈
            </div>
            <span className="font-medium text-gray-800">Message Now</span>
          </ChamferBox>

          <ChamferBox
            as="a"
            // href="#"
            variant="light"
            orientation="tr-bl"
            hasShadow={true}
            shadowPosition="right"
            className="px-6 py-3 flex items-center gap-3 cursor-pointer hover:brightness-110"
          >
            <div className="w-8 h-8 bg-[#2c2c2c] rounded-full flex items-center justify-center text-white">
              ✈
            </div>
            <span className="font-medium text-gray-800">Message Now</span>
          </ChamferBox>
        </div>
      </div>

      {/* 3. Wrapped Content Box */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl text-gray-400">Wrapper for Content Box</h2>
        <ChamferBox orientation="tl-br" className="p-6 max-w-sm">
          <p className="text-gray-300 text-sm">
            This is a <strong>ChamferBox</strong> acting as a container. You can
            wrap any layout inside it, and it will keep the sci-fi aesthetic.
          </p>
        </ChamferBox>
      </div>
    </div>
  );
}

export default App;
