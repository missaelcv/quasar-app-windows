# Quasar App 
A Quasar Framework app

<img src="Texto.png" alt="Texto.png" style="width:500px;height:600px;">

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

Ejecutar PowerShell como administrador
Ejecutar: Get-ExecutionPolicy si devuelte: Restricted ejecutar: Set-ExecutionPolicy AllSigned o Set-ExecutionPolicy Bypass -Scope Process
Ahora ejecutar: Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
Pff listo ejecuta: choco y deberías ver algo.
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
