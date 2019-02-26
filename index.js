const init = () => {
  const content = document.querySelector(".content-canvas");
  const gl = {
    renderer: new THREE.WebGLRenderer(),
    camera: new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    ),
    scene: new THREE.Scene()
  };

  const addScene = () => {
    gl.renderer.setSize(innerWidth, innerHeight);
    gl.camera.position.z = 5;
    gl.controls = new THREE.OrbitControls(gl.camera, gl.renderer.domElement);
    content.append(gl.renderer.domElement);
    gl.scene.add(gl.camera);
  };

  const addMesh = () => {
    const geometry = new THREE.PlaneGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#F9E26E" });

    gl.mesh = new THREE.Mesh(geometry, material);

    gl.scene.add(gl.mesh);
  };

  const update = () => {
    render();
    requestAnimationFrame(update);
  };

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    gl.renderer.setSize(w, h);
    gl.camera.aspect = w / h;

    // calculate scene
    const dist = gl.camera.position.z - gl.mesh.position.z;
    const height = 1;
    gl.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

    if (w / h > 1) {
      gl.mesh.scale.x = gl.mesh.scale.y = 1.05 * w / h;
    }

    gl.camera.updateProjectionMatrix();
  };

  const render = () => {
    gl.renderer.render(gl.scene, gl.camera);
  };

  addScene();
  addMesh();
  update();
  //resize()
  //window.addEventListener('resize', resize)
};

init();
