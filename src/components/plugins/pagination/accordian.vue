<template>
    <div>
       <button @click="toggleAccordian($event)" class="accordion">{{number}}. {{ headingText }}</button>
        <div class="panel">
            <p><ul>
                <li v-for="list in ulList" :key="list">
                    {{ list }}
                </li>
            </ul></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      
        number : {
            type: Number,
            default: 0
        }, 
        headingText : {
            type: String,
            default: "No Data"
        },
        ulList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
               
        }
    },
    methods: {
        init() {
            let acc = document.getElementsByClassName("accordion");
            acc[0].classList.add("active");
            acc[0].nextElementSibling.style.maxHeight = "150px";
        },

        toggleAccordian(e){
            e.target.classList.toggle("active");
             let panel = e.target.nextElementSibling;
                if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                } 
        }
    },
    created() {
       
    },

    mounted(){
         this.init();
    }
}
</script>
<style scoped lang="scss">
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}
  .active, .accordion:hover {
  background-color: #ccc;
  }

  .active:after {
  content: "\2212";
}
  
  .accordion:after {
  content: '\002B';
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}
.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}








</style>
