const shaders = {
  vertex: `
    varying vec2 vUv;

    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
    `,
  fragment: `
    #define PI 3.14159265359
    #define PI2 6.28318530718
    #define S(a,b,n) smoothstep(a,b,n)

    uniform float u_time;
    
    uniform vec2 u_resolution;    
    uniform vec2 u_mouse;

    varying vec2 vUv;

    void main(){
      vec2 uv = vUv;
      vec2 st = gl_FragCoord.xy / u_resolution * 2. - 1.;

      uv -= .5;
      uv.x *= u_resolution.x / u_resolution.y;

      float l = length(uv);
      float a = atan(uv.x, uv.y);
      float d = cos(10. * a + u_time + cos(a + PI * u_time + sin(10. + u_time)) * .5 ) * .2;
      vec3 e = vec3(smoothstep(d, d + .02, l));

      gl_FragColor = vec4(e, 1.);
    }
    `
};

class MathUtils {
  lerp(a, b, n) {
    return n * (b - a) + a;
  }
}

class WebGL {
  constructor(canvas) {
    this.width = innerWidth;
    this.height = innerHeight;

    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      1000
    );
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock()

    this.uniforms = {
      u_time: { type: "f", value: 0 },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2(this.width, this.height)
      },
      u_mouse: { type: "v2", value: new THREE.Vector2(0, 0) }
    };
    this.mouse = {
      x: 0,
      y: 0
    }
    
    this.math = new MathUtils()
    
    this.onMouse = this.onMouse.bind(this);
    this.onResize = this.onResize.bind(this);
    this.update = this.update.bind(this);
  }

  init() {
    this.renderer.setSize(this.width, this.height);
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);

    this.addMesh();
    this.onResize()
    this.update();
    
    canvas.addEventListener('mousemove', this.onMouse)
    window.addEventListener('resize', this.onResize)
  }

  addMesh() {
    const geometry = new THREE.PlaneBufferGeometry(this.width, this.height, 60, 60);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }
  
  onMouse({clientX, clientY}){
    this.mouse = {
      x: clientX,
      y: clientY
    }
  }

  onResize() {
    const w = innerWidth;
    const h = innerHeight;
    
    this.uniforms.u_resolution.value.x = w
    this.uniforms.u_resolution.value.y = h
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;

    if (w / h > 1) {
      this.mesh.scale.x = this.mesh.scale.y = 1.05 * w / h;
    }

    this.camera.updateProjectionMatrix();
  }

  update() {
    this.uniforms.u_time.value = this.clock.getElapsedTime()
    
    this.uniforms.u_mouse.value.x = this.math.lerp(this.mouse.x, this.uniforms.u_mouse.value.x, .5)
    
    this.uniforms.u_mouse.value.y = this.math.lerp(this.mouse.y, this.uniforms.u_mouse.value.y, .5)
    
    this.draw();
    requestAnimationFrame(this.update);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}

const webgl = new WebGL(canvas);

webgl.init();


