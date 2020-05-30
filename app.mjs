import { BasicThreeDemo } from "./src/BasicThreeDemo.mjs";
import { OrbitControls } from "https://rawcdn.githack.com/mrdoob/three.js/79edf22a345079dc6cf5d8c6ad38ee22e9edab3c/examples/jsm/controls/OrbitControls.js";

class App extends BasicThreeDemo {
    constructor(container) {
      super(container);
    }
  
    // Iniciar la escena
    init() {
      const control = new OrbitControls(this.camera, this.renderer.domElement);
  
      this.camera.position.z = 5;
      this.camera.position.y = 5;
  
      this.initEvents();
      this.axesHelper(5);
      this.gridHelper(10, 100)
      this.addMesh();
      this.tick();
    }
  
    // Agregar las geometrias aqui
    addMesh() {
      const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff61 });
      this.mesh = new THREE.Mesh(geometry, material);
      
      this.mesh.position.y = 0.5
      
      this.scene.add(this.mesh);
    }
  
    // Aquí se actualizaran los valores
    update() {
      
      const time = this.clock.getElapsedTime();
    }
  }
  
  const container = document.querySelector("#app");
  
  const myApp = new App(container);
  
  myApp.init();
  