import * as THREE from 'three';

const APP_COLORS = {
  netflix: 0xe50914,
  canva: 0x00c4cc,
  capcut: 0xe2e8f0,
  bstation: 0x00a1d6
};

export function initThreeHero() {
  const container = document.getElementById('hero-three-stage');
  if (!container) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch {
    return null;
  }

  const width = container.clientWidth || 640;
  const height = container.clientHeight || 520;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.id = 'hero-three-canvas';
  canvas.className = 'h-full w-full block pointer-events-none';
  canvas.setAttribute('aria-hidden', 'true');
  container.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  // Main 3D rig (positioned slightly right-center on desktop)
  const rig = new THREE.Group();
  scene.add(rig);

  // 1. Inner faceted glass core
  const coreGeo = new THREE.IcosahedronGeometry(1.38, 1);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f171e,
    emissive: 0x00a8e1,
    emissiveIntensity: 0.22,
    roughness: 0.25,
    metalness: 0.35,
    transparent: true,
    opacity: 0.86,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  rig.add(coreMesh);

  // 2. Outer wireframe lattice
  const wireGeo = new THREE.IcosahedronGeometry(1.72, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xe50914,
    wireframe: true,
    transparent: true,
    opacity: 0.34
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  rig.add(wireMesh);

  // 3. Dual orbital rings
  const ring1Geo = new THREE.TorusGeometry(2.35, 0.018, 12, 96);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0x00a8e1,
    transparent: true,
    opacity: 0.48
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI * 0.38;
  ring1.rotation.y = Math.PI * 0.14;
  rig.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(2.75, 0.012, 12, 96);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI * 0.28;
  ring2.rotation.y = Math.PI * 0.32;
  rig.add(ring2);

  // 4. Depth starfield particles
  const particleCount = 140;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x9aa9b4,
    size: 0.045,
    transparent: true,
    opacity: 0.55
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0x00a8e1, 3.2, 20);
  keyLight.position.set(3.5, 3, 4.5);
  scene.add(keyLight);

  const brandLight = new THREE.PointLight(0xe50914, 3.5, 18);
  brandLight.position.set(-3.2, -2.5, 3.5);
  scene.add(brandLight);

  // Smooth color target for active slide
  const targetColor = new THREE.Color(APP_COLORS.netflix);
  const currentColor = new THREE.Color(APP_COLORS.netflix);

  const onSlideChange = (e) => {
    const appId = e.detail?.appId;
    if (appId && APP_COLORS[appId]) {
      targetColor.setHex(APP_COLORS[appId]);
    }
  };
  document.addEventListener('cozu:hero-slide', onSlideChange);

  // Pointer parallax
  let pointerX = 0;
  let pointerY = 0;
  const heroEl = document.getElementById('home');
  const onPointerMove = (e) => {
    const rect = (heroEl || container).getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Resize handler
  const onResize = () => {
    const w = container.clientWidth || 640;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Visibility / in-viewport pause
  let isVisible = true;
  if ('IntersectionObserver' in window && heroEl) {
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(heroEl);
  }

  let rafId = 0;
  const clock = new THREE.Clock();

  const tick = () => {
    rafId = requestAnimationFrame(tick);
    if (!isVisible || document.hidden) return;

    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    // Smoothly interpolate brand color
    currentColor.lerp(targetColor, Math.min(1, dt * 4));
    wireMat.color.copy(currentColor);
    brandLight.color.copy(currentColor);

    // 3D rotation + gentle floating
    coreMesh.rotation.x += dt * 0.22;
    coreMesh.rotation.y += dt * 0.34;
    wireMesh.rotation.x -= dt * 0.14;
    wireMesh.rotation.y += dt * 0.24;

    ring1.rotation.z += dt * 0.28;
    ring2.rotation.z -= dt * 0.2;

    particles.rotation.y = elapsed * 0.03;

    // Mouse parallax tilt on entire 3D rig
    rig.rotation.y += (pointerX * 0.32 - rig.rotation.y) * Math.min(1, dt * 5);
    rig.rotation.x += (-pointerY * 0.24 - rig.rotation.x) * Math.min(1, dt * 5);
    rig.position.y = Math.sin(elapsed * 1.1) * 0.12;

    renderer.render(scene, camera);
  };

  tick();

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener('cozu:hero-slide', onSlideChange);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}
