import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

interface ShoeViewerProps {
  modelUrl: string;
}

export const ShoeViewer: React.FC<ShoeViewerProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-[500px] glass-panel overflow-hidden relative group border-white/10">
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-secondary/90 backdrop-blur-xl text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(255,99,33,0.4)] border border-white/20 w-fit"
        >
          Interactive 3D Experience
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white/80 border border-white/10 w-fit"
        >
          Real-time Rendering
        </motion.span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
        <Suspense fallback={null}>
          <Stage environment="night" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          makeDefault 
          autoRotate 
          autoRotateSpeed={0.8} 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={2}
          maxDistance={6}
        />
        <ContactShadows 
          position={[0, -1, 0]} 
          opacity={0.4} 
          scale={12} 
          blur={2} 
          far={1.2} 
        />
      </Canvas>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Controls</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
              <p className="text-[10px] text-white/60 font-medium">Drag to Rotate</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <p className="text-[10px] text-white/60 font-medium">Scroll to Zoom</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest leading-none">360° View <br/><span className="text-[8px] opacity-50">Active</span></p>
        </div>
      </div>
    </div>
  );
};

// Preload the sample model
useGLTF.preload('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb');
