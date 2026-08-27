import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FinFlowCanvasProps {
  interactive?: boolean;
}

export const FinFlowCanvas: React.FC<FinFlowCanvasProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Group for primary objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Abstract Flowing Financial Ribbon / Knot
    const knotGeometry = new THREE.TorusKnotGeometry(4.2, 1.1, 200, 36, 2, 5);
    
    // Custom Glow Material with wireframe & points overlay
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8B5CF6,
      emissive: 0x4C1D95,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    mainGroup.add(knotMesh);

    // Wireframe overlay for cyber-futuristic structure
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const wireframeMesh = new THREE.Mesh(knotGeometry, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.015);
    mainGroup.add(wireframeMesh);

    // Outer Orbiting Data Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringGeom1 = new THREE.TorusGeometry(8.5, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818CF8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(7.2, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 2. Floating Cyber Financial Particle Swarm
    const particleCount = 1400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPurple = new THREE.Color(0x8B5CF6);
    const colorCyan = new THREE.Color(0x06B6D4);
    const colorBlue = new THREE.Color(0x3B82F6);
    const palette = [colorPurple, colorCyan, colorBlue];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical distribution around center
      const radius = 6 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;

      scales[i] = Math.random() * 2.5 + 0.8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0x0a0c16, 2.5);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8B5CF6, 8, 50);
    purpleLight.position.set(10, 10, 10);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06B6D4, 6, 50);
    cyanLight.position.set(-10, -8, 8);
    scene.add(cyanLight);

    const topBlueLight = new THREE.DirectionalLight(0x3B82F6, 1.5);
    topBlueLight.position.set(0, 15, 5);
    scene.add(topBlueLight);

    // Mouse Tracking & Smooth Lerp
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      const scrollFactor = currentScrollY * 0.0015;

      // Rotate 3D Flowing Ribbon
      knotMesh.rotation.x = elapsedTime * 0.2 + scrollFactor * 1.5 + currentMouseY * 0.4;
      knotMesh.rotation.y = elapsedTime * 0.28 + scrollFactor * 2.0 + currentMouseX * 0.4;
      knotMesh.rotation.z = Math.sin(elapsedTime * 0.15) * 0.3;

      wireframeMesh.rotation.copy(knotMesh.rotation);

      // Subtle float motion
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.4 - (scrollFactor * 3.5);
      mainGroup.position.x = Math.cos(elapsedTime * 0.5) * 0.3 + (currentMouseX * 1.5);
      mainGroup.position.z = Math.sin(scrollFactor) * 2 - (scrollFactor * 1.2);

      // Rotate Orbiting Rings
      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Rotate Particles slowly
      particles.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.1;
      particles.rotation.x = elapsedTime * 0.015 - currentMouseY * 0.1;

      // Camera parallax
      camera.position.x = currentMouseX * 1.2;
      camera.position.y = -currentMouseY * 1.2;
      camera.lookAt(0, -scrollFactor * 2.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      knotGeometry.dispose();
      knotMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
      aria-hidden="true"
    />
  );
};
