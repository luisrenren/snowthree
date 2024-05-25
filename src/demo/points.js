import * as THREE from 'three';

// 创建Points几何体
const vertices = new Float32Array([
  -10,-10,10,
  10,-10,10,
  10,10,10,
  -10,10,10
]);

const sphere = new THREE.SphereGeometry(50)
const cube = new THREE.BoxGeometry(100,100,100,10,10,10)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute("position",cube.getAttribute('position'))

// 创建Points材质
const material = new THREE.PointsMaterial({ 
  color: 0xffffff,
  size: 1,
  transparent: true
 });

// 创建Points粒子系统
const points = new THREE.Points(geometry, material);

export default points;