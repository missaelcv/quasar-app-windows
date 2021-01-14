    <template>

  <div class="q-pa-md q-gutter-sm">

    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Tarea Guardada',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
   <q-editor v-if="modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Tarea Guardada',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-editor v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar nota',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

   <q-card class="row"
   flat bordered v-for="(item, index) in tasks" :key="index">
   <q-card-section class="col" v-html="item.texto" :class="item.estado ? 'tachar' : ' '" />
   <q-btn 
   flat color="blue" @click="item.estado = !item.estado">Accion</q-btn>

   <q-btn flat color="yellow" @click="editar(index, item.id)">Editar</q-btn>

   <q-btn flat color="red" @click="eliminar(index,item.id)">Eliminar</q-btn>
    </q-card>

   <div  class="flex flex-center" v-if="tasks.length == 0">
  <h5>Sin Notas</h5>
  </div>

  </div>
</template>
    
  </div>

</template>

<script>
import { db } from "boot/firebase";
export default {
  data() {
    return {
      editor: '',
          tasks: [],
          index:null,
          modoEdicion: false,
          id: null
    }
  },
  created() {
    this.listarTareas();
  },
  methods: {
    async updateWork(){
      try {
        const resDB = await db.collection('tareas').doc(this.id).update({
          texto: this.editor
        })
        this.tasks[this.index].texto = this.editor

         this.$q.notify({
        message: 'Tarea Actualizada',
        color: 'dark',
        textColor: 'white',
        icon: 'cloud_done'
         })

      } catch (error) {
        console.editor(error);
      } finally {
      this.modoEdicion = false;
      this.index = null;
      this.id = null;
      this.editor = ''
      }



      console.log('editar');
    },
    editar(index,id){
      this.modoEdicion = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].texto
    },
    async listarTareas(){
        try {
          const resDB = await db.collection('tareas').get()
          
          resDB.forEach(res => {
            console.log(res.id);

            const tarea = {
              id: res.id,
              texto: res.data().texto,
              estado: res.data().estado
            }
             this.tasks.push(tarea);
          })

         
          
        } catch (error) {
          console.log(error);
        }
    },

   async saveWork () {
      try {
        
          const resDB  = await db.collection('tarea').add ({
            texto: this.editor,
            estado: false
            
          })

        this.tasks.push({
        texto: this.editor,
       estado: false,
       id: resDB.id
      })

      this.editor = ''
      this.$q.notify({
        message: 'Tarea guardada',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
      } catch (error) {
        console.log(error);
      }

    },
    async eliminar(index,id){
      this.$q.dialog({
        title: 'Accion Peligrosa',
        message: 'Realmente quieres Eliminar la tasks?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        // console.log('>>>> OK')
        try {
          
          await db.collection('tareas').doc(id).delete()
           this.tasks.splice(index,1);

        } catch (error) {
          console.log(error);
        }
        
      })
    }
  },
   
}
</script>

<style>
.tachar{
  text-decoration: line-through;
}
</style>