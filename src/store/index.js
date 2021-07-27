import axios from 'axios'
import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  Scene,
  TrackballControls,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  FogExp2,
  // BoxGeometry,
  // MeshPhongMaterial,
  // Mesh,
  Points,
  PointsMaterial,
  Float32BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  AmbientLight,
  LineBasicMaterial,
  Geometry,
  Vector3,
  Line
} from 'three-full'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slam: true,
    idSelected: 2,
    width: 0,
    height: 0,
    camera: null,
    controls: null,
    scene: null,
    renderer: null,
    axisLines: [],
    pyramids: [],
    points: null,
    geometry: new BufferGeometry()

  },
  mutations: {
    changeId(state, newId) {
      state.idSelected = newId
    },
    unSlam(state) {
      state.slam = false
    },
    putSlam(state) {
      state.slam = true
    },
    async GET_DATA (state) {
      const messageRef = firebase.database().ref('3D_points')
      return await axios.get(messageRef.toString() + '.json').then((response) => {
        state.points = response.data   
      })   
    },
    SET_VIEWPORT_SIZE (state, { width, height }) {
      state.width = width
      state.height = height
    },
    INITIALIZE_RENDERER (state, el) {
      state.renderer = new WebGLRenderer({ antialias: true })
      state.renderer.setPixelRatio(window.devicePixelRatio)
      state.renderer.setSize(state.width, state.height)
      el.appendChild(state.renderer.domElement)
    },
    INITIALIZE_CAMERA (state) {
      state.camera = new PerspectiveCamera(
        // 1. Field of View (degrees)
        60,
        // 2. Aspect ratio
        state.width / state.height,
        // 3. Near clipping plane
        1,
        // 4. Far clipping plane
        1000
      )
      state.camera.position.z = 500
    },
    INITIALIZE_CONTROLS (state) {
      state.controls = new TrackballControls(
        state.camera,
        state.renderer.domElement
      )
      state.controls.rotateSpeed = 1.0
      state.controls.zoomSpeed = 1.2
      state.controls.panSpeed = 0.8
      state.controls.noZoom = false
      state.controls.noPan = false
      state.controls.staticMoving = true
      state.controls.dynamicDampingFactor = 0.3
    },
    INITIALIZE_SCENE (state) {
      state.scene = new Scene()
      state.scene.background = new Color(0xcccccc)
      state.scene.fog = new FogExp2(0xcccccc, 0.00)
      // var geometry = new BoxGeometry(10, 10, 10)
      // var material = new MeshPhongMaterial({
      //   color: 0xffffff,
      //   flatShading: true
      // })
      // for (var i = 0; i < 1; i++) {
      //   var mesh = new Mesh(geometry, material)
      //   mesh.position.x = (Math.random() - 0.5) * 1000
      //   mesh.position.y = (Math.random() - 0.5) * 1000
      //   mesh.position.z = (Math.random() - 0.5) * 1000
      //   mesh.updateMatrix()
      //   mesh.matrixAutoUpdate = false
      //   state.pyramids.push(mesh)
      // }
      // state.scene.add(...state.pyramids)
      // lights
      var lightA = new DirectionalLight(0xffffff)
      lightA.position.set(1, 1, 1)
      state.scene.add(lightA)
      var lightB = new DirectionalLight(0x002288)
      lightB.position.set(-1, -1, -1)
      state.scene.add(lightB)
      var lightC = new AmbientLight(0x222222)
      state.scene.add(lightC)
      // Axis Line 1
      var materialB = new LineBasicMaterial({ color: 0x0000ff })
      var geometryB = new Geometry()
      geometryB.vertices.push(new Vector3(0, 0, 0))
      geometryB.vertices.push(new Vector3(0, 1000, 0))
      var lineA = new Line(geometryB, materialB)
      state.axisLines.push(lineA)
      // Axis Line 2
      var materialC = new LineBasicMaterial({ color: 0x00ff00 })
      var geometryC = new Geometry()
      geometryC.vertices.push(new Vector3(0, 0, 0))
      geometryC.vertices.push(new Vector3(1000, 0, 0))
      var lineB = new Line(geometryC, materialC)
      state.axisLines.push(lineB)
      // Axis 3
      var materialD = new LineBasicMaterial({ color: 0xff0000 })
      var geometryD = new Geometry()
      geometryD.vertices.push(new Vector3(0, 0, 0))
      geometryD.vertices.push(new Vector3(0, 0, 1000))
      var lineC = new Line(geometryD, materialD)
      state.axisLines.push(lineC)
      state.scene.add(...state.axisLines)
    },
    RESIZE (state, { width, height }) {
      state.width = width
      state.height = height
      state.camera.aspect = width / height
      state.camera.updateProjectionMatrix()
      state.renderer.setSize(width, height)
      state.controls.handleResize()
      state.renderer.render(state.scene, state.camera)
    }
  },
  actions: {
    INIT ({ state, commit }, { width, height, el }) {
      return new Promise(resolve => {
        commit('SET_VIEWPORT_SIZE', { width, height })
        commit('INITIALIZE_RENDERER', el)
        commit('INITIALIZE_CAMERA')
        commit('INITIALIZE_CONTROLS')
        commit('INITIALIZE_SCENE')
        // Initial scene rendering
        state.renderer.render(state.scene, state.camera)
        // Add an event listener that will re-render
        // the scene when the controls are changed
        state.controls.addEventListener('change', () => {
          state.renderer.render(state.scene, state.camera)
        })
        resolve()
      })
    },
    ANIMATE ({ state, dispatch }) {
      window.requestAnimationFrame(() => {
        dispatch('ANIMATE')
        state.controls.update()
      })
    },
    CHANGE_SCENE (context) {
      var material = new PointsMaterial( { size: 5, sizeAttenuation: true, color: 'red', alphaTest: 0.5, transparent: true } );
      var vertices = new Float32Array(context.state.points.length * 3)
      // console.log(`je : ${context.state.points}`)
      // context.commit('getData')
      context.state.pyramids = []
      for (var i = 0; i < context.state.points.length; i++) {
        vertices[i * 3 + 0] = context.state.points[i][0] * 100
        vertices[i * 3 + 1] = context.state.points[i][1] * 100
        vertices[i * 3 + 2] = context.state.points[i][2] * 100
      }
      // context.state.geometry = [...new Set(context.state.geometry)]
      context.state.geometry.setAttribute( 'position', new Float32BufferAttribute(vertices, 3));
      var point = new Points(context.state.geometry, material)
      context.state.pyramids.push(point)

      context.state.scene.add(...context.state.pyramids)
      // Initial scene rendering
      context.state.renderer.render(context.state.scene, context.state.camera)
      // Add an event listener that will re-render
      // the scene when the controls are changed
      context.state.controls.addEventListener('change', () => {
        context.state.renderer.render(context.state.scene, context.state.camera)
      })
    },
  },
  modules: {
  }
})
