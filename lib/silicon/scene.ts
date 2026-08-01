import * as THREE from "three";
import { seededRandom } from "./palette";
import {
  chipFieldTextures,
  glowTexture,
  heroDieTextures,
  heroSubstrateTextures,
  padArrayTexture,
  studioEnvironment,
} from "./textures";
import { DUST_FRAGMENT, DUST_VERTEX } from "./background.glsl";

/**
 * The TZ-100 stage: one hero package, a ring of data packets orbiting it, and
 * a field of smaller chips streaming past. Nothing here knows about scroll or
 * React — `update()` takes the animated numbers and moves the world.
 */

const PACKAGE_WIDTH = 2.05;

export interface SceneFrame {
  time: number;
  delta: number;
  /** master light + emissive level, already remapped out of the 0.18 floor */
  light: number;
  /** how hard the chip field streams */
  warp: number;
  /** current rig distance, used to fade the ring as the camera closes in */
  zoom: number;
}

export interface SiliconScene {
  scene: THREE.Scene;
  dustMaterial: THREE.ShaderMaterial;
  update: (frame: SceneFrame, camera: THREE.Camera) => void;
  dispose: () => void;
}

interface Chip {
  x: number; y: number; z: number;
  scale: number;
  axis: THREE.Vector3;
  spin: number;
  rotation: number;
  speed: number;
}

export function buildSiliconScene(opts: { mobile: boolean; dpr: number }): SiliconScene {
  const rnd = seededRandom(4242);
  const scene = new THREE.Scene();
  const env = studioEnvironment();
  const disposables: { dispose: () => void }[] = [env];
  const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

  /* ---- lights ---- */
  const ambient = new THREE.AmbientLight(0x1b2b4a, 1.15);
  const keyLight = new THREE.DirectionalLight(0xffa257, 1.55);
  keyLight.position.set(4, 5, 3);
  const rimLight = new THREE.DirectionalLight(0x4f8bff, 0.85);
  rimLight.position.set(-5, -2, -4);
  const coreLight = new THREE.PointLight(0xff7a1a, 2.1, 14, 2);
  coreLight.position.set(0, 0.55, 0);
  scene.add(ambient, keyLight, rimLight, coreLight);

  /* ---- materials ---- */
  const substrateTex = heroSubstrateTextures();
  const dieTex = heroDieTextures();
  const fieldTex = chipFieldTextures();

  const sideMat = track(new THREE.MeshStandardMaterial({
    color: 0x0a1018, metalness: 0.55, roughness: 0.62, envMap: env, envMapIntensity: 0.55,
  }));
  const faceMat = track(new THREE.MeshStandardMaterial({
    map: substrateTex.map, emissiveMap: substrateTex.emissive, emissive: 0xffffff,
    emissiveIntensity: 1, metalness: 0.7, roughness: 0.4, envMap: env, envMapIntensity: 0.85,
  }));
  const dieMat = track(new THREE.MeshStandardMaterial({
    map: dieTex.map, emissiveMap: dieTex.emissive, emissive: 0xffffff,
    emissiveIntensity: 1.25, metalness: 0.82, roughness: 0.26, envMap: env, envMapIntensity: 1.15,
  }));
  const dieSideMat = track(new THREE.MeshStandardMaterial({
    color: 0x121a28, metalness: 0.85, roughness: 0.3, envMap: env, envMapIntensity: 1,
  }));
  /* memory lids stay matte: heavy metalness turned them into bright white fins
     that pulled the eye off the die */
  const lidMat = track(new THREE.MeshStandardMaterial({
    color: 0x131c2b, metalness: 0.45, roughness: 0.62, envMap: env, envMapIntensity: 0.3,
  }));
  const padMat = track(new THREE.MeshStandardMaterial({
    map: padArrayTexture(512, 22), metalness: 0.85, roughness: 0.42, envMap: env, envMapIntensity: 0.9,
  }));
  const padMatSmall = track(new THREE.MeshStandardMaterial({
    map: padArrayTexture(256, 14), metalness: 0.85, roughness: 0.45, envMap: env, envMapIntensity: 0.9,
  }));
  const fieldMat = track(new THREE.MeshStandardMaterial({
    map: fieldTex.map, emissiveMap: fieldTex.emissive, emissive: 0xffffff,
    emissiveIntensity: 1.1, metalness: 0.75, roughness: 0.38, envMap: env, envMapIntensity: 0.9,
  }));

  /* BoxGeometry material order is +x -x +y -y +z -z */
  const boxFaces = (side: THREE.Material, top: THREE.Material, bottom: THREE.Material) =>
    [side, side, top, bottom, side, side];

  /* ---- hero package ---- */
  const hero = new THREE.Group();
  scene.add(hero);

  const substrateGeo = track(new THREE.BoxGeometry(PACKAGE_WIDTH, 0.085, PACKAGE_WIDTH));
  hero.add(new THREE.Mesh(substrateGeo, boxFaces(sideMat, faceMat, padMat)));

  const interposerGeo = track(new THREE.BoxGeometry(PACKAGE_WIDTH * 0.66, 0.035, PACKAGE_WIDTH * 0.66));
  const interposerMat = track(new THREE.MeshStandardMaterial({
    color: 0x0b1220, metalness: 0.7, roughness: 0.45, envMap: env, envMapIntensity: 0.7,
  }));
  const interposer = new THREE.Mesh(interposerGeo, interposerMat);
  interposer.position.y = 0.06;
  hero.add(interposer);

  const dieGeo = track(new THREE.BoxGeometry(PACKAGE_WIDTH * 0.44, 0.048, PACKAGE_WIDTH * 0.44));
  const die = new THREE.Mesh(dieGeo, boxFaces(dieSideMat, dieMat, dieSideMat));
  die.position.y = 0.101;
  hero.add(die);

  const hbmGeo = track(new THREE.BoxGeometry(PACKAGE_WIDTH * 0.085, 0.062, PACKAGE_WIDTH * 0.185));
  for (let i = 0; i < 8; i++) {
    const stack = new THREE.Mesh(hbmGeo, lidMat);
    stack.position.set(
      (i < 4 ? -1 : 1) * PACKAGE_WIDTH * 0.268,
      0.108,
      ((i % 4) - 1.5) * PACKAGE_WIDTH * 0.205,
    );
    hero.add(stack);
  }

  /* ---- data ring ---- */
  const RING_COUNT = opts.mobile ? 70 : 130;
  const ringGeo = track(new THREE.BoxGeometry(0.017, 0.017, 0.1));
  const ringMat = track(new THREE.MeshBasicMaterial({
    transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const ring = new THREE.InstancedMesh(ringGeo, ringMat, RING_COUNT);
  ring.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const packets = Array.from({ length: RING_COUNT }, () => {
    const band = rnd();
    return {
      radius: 1.52 + band * 1.05,
      angle: rnd() * Math.PI * 2,
      y: (rnd() - 0.5) * 0.13,
      speed: (0.3 + rnd() * 0.55) * (band < 0.5 ? 1 : 0.72),
      length: 0.6 + rnd() * 1.05,
      band,
    };
  });
  const warm = new THREE.Color(0xff7a1a);
  const hot = new THREE.Color(0xffd9a0);
  const cool = new THREE.Color(0x4f8bff);
  packets.forEach((p, i) => ring.setColorAt(i, p.band < 0.3 ? hot : p.band < 0.78 ? warm : cool));
  if (ring.instanceColor) ring.instanceColor.needsUpdate = true;
  scene.add(ring);

  /* ---- chip field ---- */
  const FIELD_COUNT = opts.mobile ? 26 : 64;
  const fieldGeo = track(new THREE.BoxGeometry(1, 0.075, 1));
  const field = new THREE.InstancedMesh(fieldGeo, boxFaces(sideMat, fieldMat, padMatSmall), FIELD_COUNT);
  field.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(field);

  const seatChip = (c: Chip, fresh: boolean) => {
    const angle = rnd() * Math.PI * 2;
    const radius = 4.8 + rnd() * 11;
    c.x = Math.cos(angle) * radius;
    c.y = Math.sin(angle) * radius * 0.62 + (rnd() - 0.5) * 2.4;
    c.z = fresh ? -26 - rnd() * 12 : -26 + rnd() * 32;
    c.scale = 0.26 + rnd() * 0.6;
    c.axis = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize();
    c.spin = (rnd() - 0.5) * 0.55;
    c.rotation = rnd() * Math.PI * 2;
    c.speed = 0.55 + rnd() * 1.5;
  };
  const chips: Chip[] = Array.from({ length: FIELD_COUNT }, () => {
    const c = {} as Chip;
    seatChip(c, false);
    return c;
  });

  /* ---- glow plate ---- */
  const glowGeo = track(new THREE.PlaneGeometry(6.2, 6.2));
  const glowMat = track(new THREE.MeshBasicMaterial({
    map: glowTexture(), transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, depthTest: false, opacity: 0.85,
  }));
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.renderOrder = -1;
  scene.add(glow);

  /* ---- foreground dust ---- */
  const DUST_COUNT = opts.mobile ? 380 : 1000;
  const positions = new Float32Array(DUST_COUNT * 3);
  const seeds = new Float32Array(DUST_COUNT);
  for (let i = 0; i < DUST_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24 - 2;
    seeds[i] = Math.random();
  }
  const dustGeo = track(new THREE.BufferGeometry());
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  const dustMaterial = track(new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDpr: { value: opts.dpr }, uOpacity: { value: 1 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: DUST_VERTEX, fragmentShader: DUST_FRAGMENT,
  }));
  const dust = new THREE.Points(dustGeo, dustMaterial);
  dust.frustumCulled = false;
  scene.add(dust);

  /* ---- per-frame ---- */
  const dummy = new THREE.Object3D();
  const tiltAxis = new THREE.Vector3(1, 0, 0);
  const wobble = new THREE.Quaternion();

  const update = ({ time, delta, light, warp, zoom }: SceneFrame, camera: THREE.Camera) => {
    dustMaterial.uniforms.uTime.value = time;

    hero.rotation.y = time * 0.085;
    hero.rotation.z = Math.sin(time * 0.21) * 0.03;
    hero.rotation.x = Math.cos(time * 0.17) * 0.022;
    hero.position.y = Math.sin(time * 0.33) * 0.045;

    ambient.intensity = 1.15 * light;
    keyLight.intensity = 1.55 * light;
    rimLight.intensity = 0.85 * light;
    coreLight.intensity = (1.85 + Math.sin(time * 1.7) * 0.35) * light;
    dieMat.emissiveIntensity = (1.25 + Math.sin(time * 2.3) * 0.16) * light;
    faceMat.emissiveIntensity = 0.95 * light;
    fieldMat.emissiveIntensity = 1.05 * light;

    /* the ring is scenery, not subject — let it recede as the rig closes in */
    ringMat.opacity = (0.16 + 0.42 * light) * (1 - Math.min(0.55, Math.max(0, (zoom - 1.35) * 0.42)));

    glow.position.copy(hero.position);
    glow.quaternion.copy(camera.quaternion);
    glowMat.opacity = (0.16 + 0.4 * light) * (0.78 + 0.22 * Math.sin(time * 0.9));

    const ringSpin = 1 + warp * 2.2;
    for (let i = 0; i < RING_COUNT; i++) {
      const p = packets[i];
      p.angle += p.speed * ringSpin * delta;
      dummy.position.set(
        Math.cos(p.angle) * p.radius,
        p.y + Math.sin(time * 0.6 + i) * 0.03,
        Math.sin(p.angle) * p.radius,
      );
      dummy.rotation.set(0, -p.angle, 0);
      dummy.scale.set(1, 1, p.length * (0.85 + warp * 1.5));
      dummy.updateMatrix();
      ring.setMatrixAt(i, dummy.matrix);
    }
    ring.instanceMatrix.needsUpdate = true;

    const flow = 0.9 + warp * 3.4;
    for (let i = 0; i < FIELD_COUNT; i++) {
      const c = chips[i];
      c.z += c.speed * flow * delta;
      c.rotation += c.spin * delta * (1 + warp);
      if (c.z > 8) seatChip(c, true);
      dummy.position.set(c.x, c.y, c.z);
      dummy.quaternion.setFromAxisAngle(c.axis, c.rotation);
      wobble.setFromAxisAngle(tiltAxis, Math.sin(time * 0.3 + i) * 0.25);
      dummy.quaternion.multiply(wobble);
      dummy.scale.setScalar(c.scale);
      dummy.updateMatrix();
      field.setMatrixAt(i, dummy.matrix);
    }
    field.instanceMatrix.needsUpdate = true;
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    [substrateTex, dieTex, fieldTex].forEach((s) => { s.map.dispose(); s.emissive.dispose(); });
    ring.dispose();
    field.dispose();
  };

  return { scene, dustMaterial, update, dispose };
}
