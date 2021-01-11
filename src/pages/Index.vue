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

   <q-card class="row"
   flat bordered v-for="(item, index) in tasks" :key="index">
   <q-card-section class="col" v-html="item.texto" :class="item.estado ? 'tachar' : ' '" />
   <q-btn 
   flat color="blue" @click="item.estado = !item.estado">Accion</q-btn>

   <q-btn flat color="red" @click="eliminar(index)">Eliminar</q-btn>
    </q-card>

   <div  class="flex flex-center" v-if="tasks.length == 0">
  <h5>Sin Notas</h5>
  </div>

  </div>
</template>
    
  </div>

</template>

<script>
export default {
  data() {
    return {
      editor: '',
      tasks: [
        {texto: 'Tarea #1', estado: false},
        {texto: 'Tarea #2', estado: true},
        {texto: 'Tarea #3', estado: false},

      ]
    }
  },
  methods: {
    saveWork () {
      this.tasks.push({
        texto: this.editor,
       estado: false 
      })
      this.$q.notify({
        message: 'Tarea guardada',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    eliminar(index){
      this.$q.dialog({
        title: 'Accion Peligrosa',
        message: 'Realmente quieres Eliminar la tasks?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
         this.tasks.splice(index,1);
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