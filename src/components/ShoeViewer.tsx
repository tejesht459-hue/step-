import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

interface ShoeViewerProps {
  modelUrl: string;
}

export const ShoeViewer: React.FC<ShoeViewerProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-[400px] bg-gray-50 rounded-3xl overflow-hidden relative group">
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest text-primary border border-gray-200">
          Interactive 3D View
        </span>
      </div>
      
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls 
          makeDefault 
          autoRotate 
          autoRotateSpeed={0.5} 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.25} 
          scale={10} 
          blur={1.5} 
          far={0.8} 
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-gray-400 font-medium">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

// Preload the sample model
useGLTF.preload('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb');
