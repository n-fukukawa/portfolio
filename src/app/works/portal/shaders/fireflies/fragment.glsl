varying vec2 vUv;
varying float vRam;
uniform float uTime;
uniform vec3 uColor;

void main() {
    float strength = 0.05 / distance(gl_PointCoord, vec2(0.5)) - 0.05 * 2.0;
    strength *= vRam;
    
    gl_FragColor = vec4(uColor, strength);
}