'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // シーンのセットアップ
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f5f3, 0.002);

    // カメラのセットアップ
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // レンダラーのセットアップ
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // パーティクルとラインの作成
    const particleCount = 60; // 100 -> 60 に削減（うるささ軽減）
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    // パーティクルの初期位置と速度を設定
    const radius = 20;
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 2;
      const z = (Math.random() - 0.5) * radius * 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02, // 0.05 -> 0.02 に減速（ゆったりとした動きに）
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // パーティクルのマテリアル
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00594f,
      size: 0.25, // 0.3 -> 0.25 に縮小
      transparent: true,
      opacity: 0.6, // 0.8 -> 0.6 に変更（主張を抑える）
    });

    const particleSystem = new THREE.Points(particles, particlesMaterial);
    scene.add(particleSystem);

    // ライン用のジオメトリとマテリアル
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00594f,
      transparent: true,
      opacity: 0.08, // 0.15 -> 0.08 に変更（線を薄くして背景に馴染ませる）
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // マウスインタラクション
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // アニメーションループ
    let animationId: number;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      
      // パーティクルの更新
      for (let i = 0; i < particleCount; i++) {
        // 移動
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // 境界チェック
        const r = radius;
        if (Math.abs(positions[i * 3]) > r) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > r) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > r) particleVelocities[i].z *= -1;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // 近くのパーティクル同士を結ぶ線を更新
      const linePositions: number[] = [];
      const connectDistance = 4.5; // 5 -> 4.5 に短縮（線の発生頻度を減らす）

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDistance) {
            // 距離に応じて透明度を変える実装も可能だが、
            // ここではシンプルに描画するか否かで制御し、マテリアルのopacityで調整する
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
          }
        }
      }

      linesMesh.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // 全体の回転（マウス連動もマイルドに）
      scene.rotation.y += 0.0005 + mouseX * 0.0005; // 回転速度を半減
      scene.rotation.x += 0.0005 + mouseY * 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // リサイズハンドラ
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      scene.remove(particleSystem);
      scene.remove(linesMesh);
      particles.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
