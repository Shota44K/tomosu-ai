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
    // 背景色になじむフォグを設定（奥行き感の強調）
    scene.fog = new THREE.FogExp2(0xf5f5f3, 0.008); // フォグを濃くして奥行きを出す

    // カメラのセットアップ
    const camera = new THREE.PerspectiveCamera(
      60, // 視野角を少し狭めて歪みを減らす
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // カメラ位置調整
    camera.position.z = 40;

    // レンダラーのセットアップ
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // デバイス判定
    const isMobile = window.innerWidth < 768;

    // パーティクル設定
    // モバイルでは数を減らしてパフォーマンス確保、PCでは増やして密度を出す
    const particleCount = isMobile ? 50 : 140;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginalPositions: { x: number; y: number; z: number }[] = [];
    const particleSpeeds: number[] = [];

    // 球体状にパーティクルを配置（AIの「コア」や「知性」を表現）
    const radius = isMobile ? 14 : 22; // 分布半径

    for (let i = 0; i < particleCount; i++) {
      // 球面座標系でランダム配置しつつ、中心に密度を集める
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // 半径にゆらぎを持たせて、完全な球ではなく有機的な形状にする
      const r = radius * (0.8 + Math.random() * 0.6); 

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // 元の位置を保存（ゆらぎ用）
      particleOriginalPositions.push({ x, y, z });
      
      // 個別の揺らぎ速度
      particleSpeeds.push(Math.random() * 0.02 + 0.005);
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // パーティクルのマテリアル（より洗練された色味）
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00594f, // プライマリーカラー
      size: isMobile ? 0.3 : 0.35,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true, // 遠近感を持たせる
    });

    const particleSystem = new THREE.Points(particles, particlesMaterial);
    scene.add(particleSystem);

    // ライン用のジオメトリとマテリアル
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00594f,
      transparent: true,
      opacity: 0.12, // 少し濃くしてネットワークを強調
      linewidth: 1,
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // マウスインタラクション
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // ジャイロセンサー（スマホ用）の対応も検討可能だが、
    // ここではシンプルに自動回転をメインにする

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // アニメーションループ
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.005;

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      
      // パーティクルの有機的な動き（呼吸するように）
      for (let i = 0; i < particleCount; i++) {
        const original = particleOriginalPositions[i];
        const speed = particleSpeeds[i];
        
        // 中心からの距離を周期的に変化させて「脈動」を表現
        // sin波を使って、各パーティクルが独自のリズムで少しだけ内外に動く
        const scale = 1 + Math.sin(time * 3 + i) * 0.05;
        
        positions[i * 3] = original.x * scale;
        positions[i * 3 + 1] = original.y * scale;
        positions[i * 3 + 2] = original.z * scale;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // ネットワーク接続の更新
      const linePositions: number[] = [];
      // モバイルとPCで接続距離を変える
      const connectDistance = isMobile ? 5.0 : 6.5; 

      for (let i = 0; i < particleCount; i++) {
        // 全探索だと重いので、近傍探索を簡略化するか、ループ回数を減らす工夫も可能だが、
        // particleCountが140程度なら全探索でも最近のPC/スマホなら問題ない
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectDistance * connectDistance) {
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

      // 全体の回転制御
      // マウス位置に向かって滑らかに回転
      targetRotationY += 0.001; // 自動回転
      
      if (!isMobile) {
        // マウスによる追加回転
        targetRotationX += (mouseY * 0.5 - targetRotationX) * 0.05;
        targetRotationY += (mouseX * 0.5 - (targetRotationY - 0.001)) * 0.05;
      }

      scene.rotation.y = targetRotationY;
      scene.rotation.x = targetRotationX * 0.5; // 縦回転は控えめに

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
      
      // 画面サイズ変更時にパーティクル再生成はコストが高いので、
      // レンダリング領域の調整のみ行う
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
      
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ 
        pointerEvents: 'none',
        opacity: 0.8 // 背景の主張を少し抑えてテキスト可読性を確保
      }}
    />
  );
}
