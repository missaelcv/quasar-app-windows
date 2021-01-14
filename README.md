# Quasar App 
A Quasar Framework app

<img src="C:\Users\Usuario\Desktop\Texto.png" alt="Texto.png" style="width:500px;height:600px;">

### Build the app for production
```
quasar create nombre-proyecto
```

## Layout
Esta es la plantilla principal de nuestro proyecto, donde contamos con el menú de navegación y un navbar, además tenemos un componente muy importante que es el <router-view /> para pintar nuestras páginas

## Router
Por ahora no tocaremos las rutas de nuestra web pero es importante saber donde podemos modificarlas router/routes.js Utilizaremos Index.vue que ya está preconfigurado

## Q-editor
Vamos a incorporar nuestro primer componente para poder agregar HTML a nuestras tareas <a href="https://quasar.dev/vue-components/editor#Examples">Documentacion</a>

## Guardar Task
Agregaremos un boton para guardar: <a href="https://quasar.dev/vue-components/editor#Example--Add-new-commands">Documentacion</a>

## Q Notify Plugins
Ingresa al siguiente enlace aquí
<a href="https://https://quasar.dev/quasar-plugins/notify#Introduction">Documentacion</a>
Pega el código en quasar.conf.js

## Tasks Array
Agregregaremos un array de objetos con nuestras tareas:
```
data() {
  return {
    editor: '',
    tasks: [
      {texto: 'Tarea #1', estado: false},
      {texto: 'Tarea #2', estado: true},
      {texto: 'Tarea #3', estado: true},
    ]
  }
}
```

## Q-btn y Flexbox
Utilizaremos flexbox y botones para agregar mayores funcionalidades <a href="https://quasar.dev/layout/grid/row#Example--Horizontal-alignment">Documentacion</a>

## Eliminar Task
Agregaremos un método eliminar:
```
eliminar(index){
  this.$q.dialog({
    title: 'Cuidado!',
    message: 'Desea eliminar la nota?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    this.tasks.splice(index, 1);
  })
}
```

## Q Dialog plugins
Nuevamente agregar el plugins:<a href="https://quasar.dev/quasar-plugins/dialog#Installation">Documentacion</a>

## Compilar a windows
```
quasar.conf.js y agregar:

 packager: {
        platform: 'win32'
```

## Ejecutar:
```
quasar build -m electron
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```
Problemas
En caso de fallar existen varias posibles soluciones:

Eliminar carpeta node_modules y volver a instalar los paquetes con npm i, si no funciona paso 2
Instalar npm install --global windows-build-tools en caso de que falle paso 3.
Instalar Chocolatey https://quasar.dev/quasar-cli/developing-electron-apps/preparation#A-note-for-Windows-Users
#Chocolatey
https://chocolatey.org/install Es un gestor de paquetes para PowerShell v2+ su instalación:

## Ejecutar PowerShell como administrador
Ejecutar: Get-ExecutionPolicy si devuelte: Restricted ejecutar: Set-ExecutionPolicy AllSigned o Set-ExecutionPolicy Bypass -Scope Process
Ahora ejecutar: Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
Pff listo ejecuta: choco y deberías ver algo.
```
# Segunda Parte 
Boot
Si nos fijamos en nuestro directorio de carpetas existe una llamada boot aquí vamos a crear un archivo llamado firebase.js, recuerde antes crear un nuevo proyecto en su consola de firebase

## Importa esto despues de haber creado el archivo firebase.js
```
import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
```

## Luego en nuestro archivo quasar.conf.js añadimos este archivo:
```
boot: [
  'axios', 'firebase'
],
```


## Array Tasks
Nuestro array de Tasks lo modificaremos de la siguiente manera:
```
tasks: [
  {
    id: "idTask",
    texto: "Aquí irá el texto de la nota",
    estado: false
  }
];
```

## GET Tasks
Crearemos el siguiente método:
```
import { db } from "boot/firebase"; // no olvidar importar db

async leerDatos(){
  try {
    this.$q.loading.show()
    const query = await db.collection('metas').get();
    query.forEach(element => {
      let task = {id: element.id, texto: element.data().texto, estado: element.data().estado}
      this.tasks.push(task);
    });
  } catch (error) {
    console.log(error);
  } finally {
    this.$q.loading.hide()
  }
},
```

## Además de llamarlo en created():
```
created(){
  this.leerDatos()
},
```

## POST Task
Modificaremos el siguiente método:
```
async saveWork () {
  try {
    this.$q.loading.show()
    const query = await db.collection('metas').add({
      texto: this.editor,
      estado: false
    })
    this.tasks.push({
      texto: this.editor,
      estado: false,
      id: query.id
    })
    this.editor = ''
    this.$q.notify({
      message: 'Tarea Guardada con éxito!',
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done'
    })
  } catch (error) {
    this.$q.notify({
      message: error,
      color: 'red',
      textColor: 'white',
      icon: 'clear'
    })
  } finally {
    this.$q.loading.hide()
  }
},
```

## DELETE Task
Agregar botón:
```
<q-btn flat color="red" @click="eliminar(index, item.id)">Eliminar</q-btn>
eliminar(index, id){
  this.$q.dialog({
    title: 'Cuidado!',
    message: 'Desea eliminar la nota?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      this.$q.loading.show()
      const query = await db.collection('metas').doc(id).delete()
      this.tasks.splice(index, 1);
    
    } catch (error) {
      this.$q.notify({
        message: error,
        color: 'red',
        textColor: 'white',
        icon: 'clear'
      })
    } finally {
      this.$q.loading.hide()
    }
  })
}
```
## #UPDATE Task
Agregar boton y nuevo editor:
```
<q-editor
  v-else
  v-model="editor"
  min-height="5rem"
  :definitions="{
    save: {
      tip: 'Actualizar nota',
      icon: 'save',
      label: 'Actualizar',
      handler: updateWork
    }
  }"
  :toolbar="[
    ['bold', 'italic', 'strike', 'underline','unordered', 'ordered'],
    ['save']
  ]"
/>
```

```
<q-btn flat color="yellow" @click="editar(index, item.id)">Editar</q-btn>
```
## Datos:

```
data() {
  return {
    editor: '',
    tasks: [],
    index: null,
    modoEdicion: false,
    id: null
  }
},
Métodos:

editar(index, id){
  this.editor = this.tasks[index].texto
  this.index = index;
  this.modoEdicion = true;  
  this.id = id;
},
async updateWork(){
  try {
    this.$q.loading.show()
    const query = await db.collection('metas').doc(this.id).update({
      texto: this.editor
    })

    this.tasks[this.index].texto = this.editor;
    this.index = null;
    this.modoEdicion = false;  
    this.id = null;
    this.editor = ''
    this.$q.notify({
      message: 'Tarea actualizada con éxito!',
      color: 'dark',
      textColor: 'white',
      icon: 'cloud_done'
    })
  } catch (error) {
    this.$q.notify({
      message: error,
      color: 'red',
      textColor: 'white',
      icon: 'clear'
    })
  } finally {
    this.$q.loading.hide()
  }
},
```
### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
