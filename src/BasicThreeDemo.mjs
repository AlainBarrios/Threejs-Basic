export class BasicThreeDemo {
    constructor(container) {
      this.container = container;
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
  
      container.appendChild(this.renderer.domElement);
  
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
        
      this.renderer.outputEncoding = THREE.sRGBEncoding;
  
      this.camera.position.z = 10;
  
      this.assets = {};
      this.disposed = false;
  
      this.tick = this.tick.bind(this);
      this.init = this.init.bind(this);
      this.onResize = this.onResize.bind(this);
    }
  
    init() {
      this.initEvents();
      this.tick();
    }
  
    axesHelper(size) {
      const axesHelper = new THREE.AxesHelper(size);
      this.scene.add(axesHelper);
    }
  
    gridHelper(size, divisions) {
      const gridHelper = new THREE.GridHelper( size, divisions );
      this.scene.add(gridHelper);
    }
  
    initEvents() {
      window.addEventListener("resize", this.onResize);
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
  
    onResize() {
      const _w = this.container.offsetWidth;
      const _h = this.container.offsetHeight;
  
      this.renderer.setSize(_w, _h);
      this.camera.aspect = _w / _h;
  
      this.camera.updateProjectionMatrix();
    }
  
    update() {}
  
    render() {
      this.renderer.render(this.scene, this.camera);
    }
  
    tick() {
      if (this.disposed) return;
  
      this.render();
      this.update();
      window.requestAnimationFrame(this.tick);
    }
  }
  
