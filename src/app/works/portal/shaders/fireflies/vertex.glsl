uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
attribute float aScale;

varying vec2 vUv;
varying float vRam;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 100.0 + uTime * 1.1) * 0.2 * aScale;
    modelPosition.x += sin(modelPosition.x * 100.0 + uTime * 0.5) * 0.2 * aScale * 2.2;
    modelPosition.z += sin(modelPosition.x * 2.0 + uTime * 0.1) * 0.2 * aScale * 0.4;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    float ram = clamp(sin(uTime * 3.0 / 10.0) * cos(uTime * 5.0 - 3.141592 / 6.0), 1.0, 3.0);

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio * ram;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vUv = uv;
    vRam = ram;
}