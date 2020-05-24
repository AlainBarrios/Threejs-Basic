export class BasicThreeDemo {
  constructor(container) {
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      1000
    );
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    
    container.appendChild(this.renderer.domElement)
    
    this.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    
    this.camera.position.z = 10;

    this.assets = {};
    this.disposed = false;

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  init() {
    this.tick();
  }

  setSize(width, height, updateStyle) {
    this.renderer.setSize(width, height, false);
  }
  
  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }
  
  dispose() {
    this.disposed = true;
  }
  
  onResize() {}
  update() {}

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  tick() {
    if (this.disposed) return;
    
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.onResize();
    }
    
    this.render();
    this.update();
    requestAnimationFrame(this.tick);
  }
}

const resizeRendererToDisplaySize = (renderer, setSize) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    setSize(width, height, false);
  }
  return needResize;
};

