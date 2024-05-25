import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import model from "./demo/sprite.js";

let camera, scene, renderer, stats, gui;

function init(){
    //场景
    scene = new THREE.Scene();

    //添加物体
    scene.add(model)
    //scene.add(cube)
    //scene.add(points)

    //相机
    camera = new THREE.PerspectiveCamera(
        90,  // 视野角度
        window.innerWidth / window.innerHeight,  //长宽比
        0.1,  //近截面
        1000,  //远截面
    );
    camera.position.set(50,50,50);
    camera.lookAt(0,0,0);

    //光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(30, 30, 30);
    pointLight.decay = 0;  //设置光源不随距离衰减
    scene.add(pointLight);

    // 点光源辅助观察
    //const pointLightHelpler = new THREE.PointLightHelper(pointLight);
    //scene.add(pointLightHelpler);

    //环境光
    //const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    //scene.add(ambientLight);

    //渲染器
    renderer = new THREE.WebGLRenderer({antialias:true,});
    renderer.setClearColor('rgb(242,151,199)',1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene,camera);
    document.body.appendChild(renderer.domElement);

    //监听自适应窗口
    // window.addEventListener('resize',onWindowResize);
    window.onresize = onWindowResize;

    //视图辅助
    //initHelper();

    //initGUI(pointLight,ambientLight);
}

// 在全局定义一个变量来保存鼠标的位置
var  mouseY = 0;

// 监听鼠标移动事件，更新鼠标位置
document.addEventListener('mousemove', function(event) {
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate(){
    //浏览器刷新的时候浏览器重新渲染
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
    // 立方体旋转
    //model.rotation.y += 0.002;
    model.rotation.y = mouseY * Math.PI * 0.5;
    stats.update();
}

//窗口被调整大小时发生
function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

//视图辅助
function initHelper(){
    //坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);
    //轨道控制器
    const constrols = new OrbitControls(camera,renderer.domElement);
    constrols.addEventListener('change',() => {
        renderer.render(scene,camera);
    })

    //参数1 网格大小 参数2 分成几份 参数3  中心轴颜色 参数4 网格线的颜色
    const gridHelper = new THREE.GridHelper(1000,100,0x000000,0x0000ff);
    scene.add(gridHelper);

    //创建stats对象
    stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
}

init();
animate();