/**
 * Deep-field backdrop: lensed-free starfield, cold nebula wash and a warm
 * bloom sitting where the package does. It is deliberately cheap — the
 * subject of the hero is real geometry now, so the quad only has to sell
 * depth behind it.
 */

export const VERTEX_SHADER = `
  void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uOffset;
  uniform vec2  uMouse;
  uniform float uZoom;
  uniform float uWarp;
  uniform float uIntensity;

  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
  vec3 starfield(vec2 p){
    vec3 col = vec3(0.0);
    for (int i = 0; i < 3; i++){
      float fi = float(i);
      float sc = 70.0 + fi * 130.0;
      vec2 g  = p * sc;
      vec2 id = floor(g);
      vec2 f  = fract(g) - 0.5;
      float h = hash21(id + fi * 41.7);
      if (h > 0.955){
        vec2 jit = (vec2(hash21(id + 1.3), hash21(id + 2.7)) - 0.5) * 0.62;
        float d  = length(f - jit);
        float tw = 0.55 + 0.45 * sin(uTime * (0.8 + h * 3.2) + h * 42.0);
        float s  = smoothstep(0.055, 0.0, d) * tw;
        vec3 tint = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.92, 0.82), hash21(id + 5.1));
        col += s * tint * (0.35 + 0.9 * fract(h * 23.0));
      }
    }
    return col;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    vec2 p  = uv - uOffset * 0.35;
    p += uMouse * 0.012;
    p *= mix(1.0, 0.86, clamp(uZoom * 0.25, 0.0, 1.0));

    vec2 sp = p + vec2(uTime * 0.0022, uTime * 0.0009);
    vec3 col = starfield(sp);
    col += starfield(sp * 1.31 + vec2(0.0, uTime * 0.004)) * (0.35 + uWarp * 0.9);

    float neb = fbm(p * 1.25 + vec2(uTime * 0.010, uTime * 0.006));
    col += vec3(0.030, 0.055, 0.135) * neb * 0.95;

    float r = length(p);
    col += vec3(1.0, 0.42, 0.12) * exp(-r * 3.4) * 0.075 * uIntensity;
    col += vec3(0.18, 0.38, 1.0) * exp(-r * 1.5) * 0.030;

    col = col / (1.0 + col * 0.6);
    col = pow(max(col, 0.0), vec3(0.94));
    col += vec3(0.007, 0.011, 0.026);
    col *= 1.0 - 0.40 * dot(uv, uv);
    col += (hash21(gl_FragCoord.xy + uTime) - 0.5) * 0.015;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const DUST_VERTEX = `
  attribute float aSeed;
  uniform float uTime; uniform float uDpr;
  varying float vS;
  void main(){
    vS = aSeed;
    vec3 p = position;
    p.x += sin(uTime * (0.06 + aSeed * 0.10) + aSeed * 30.0) * 1.3;
    p.y += cos(uTime * (0.05 + aSeed * 0.08) + aSeed * 21.0) * 0.9;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (aSeed * 2.1 + 0.5) * uDpr * (26.0 / max(0.4, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;

export const DUST_FRAGMENT = `
  varying float vS; uniform float uOpacity;
  void main(){
    float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
    vec3 c = mix(vec3(0.55, 0.75, 1.0), vec3(1.0, 0.68, 0.32), step(0.62, vS));
    gl_FragColor = vec4(c, a * (0.10 + vS * 0.30) * uOpacity);
  }
`;
