<template>
    <div class="mainContainer">
        <div class="searchConatiner">
            <div class="searchInner">
                <div class="w100 searchMain">
                    <input v-model="searchOKR" v-on:keyup="search(searchOKR)" v-on:keydown="Emptysearch()" v-on:keyup.enter="search(searchOKR)" type="text" class=""  placeholder="Search by Category" autocomplete="on" id="searchInput"/>
                    
                    <div class="btnDv">
                    <button class="btn new-btn" type="button" @click="search(searchOKR)">
                        <span class="search-icon" >SEARCH</span>
                    </button>
                    
                    </div>
                    <div class="btnDvNew" v-if="searchOKR != ''">
                    <button class="btn new-btn" type="button" @click="clearSearch()">
                        <span class="search-icon" >X</span>
                    </button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="okrListContainer">
            <div v-if="okrList.length > 0">
                <h3> TOTAL OKRS : {{totalCount}} </h3>
                <h4 >Categories:
                    <span v-for="filter in filterList" :key="filter">{{ filter }}, </span>
                </h4>
            </div>
            <div v-if="okrList.length == 0"><h2>NO OKRs FOUND</h2></div>

            <div class="okrCard">  
                <div v-for="(mokrList, index) in mainOkrList" :key="mokrList.id" :id="okrList.id" class="tabcontent" >
                   <Accordian :number="index+1" :headingText="mokrList.title" :ulList="mokrList.children"></Accordian>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Utils from './../common/Utils';
import * as Constant from '../common/Constants';
import { publishEvent } from '../common/Observer';
import {getOkrs} from '../service/okrService'
import Accordian from './plugins/pagination/accordian.vue';




export default {
    data() {
        return {
            searchOKR:'',
            okrList: [],
            totalCount: 0,
            activeindex:0,
            filterList:[],
            mainOkrList:[]
     }
    },
     components: {
         Accordian
    },
    created() {
        this.fetchTransactions();
    },
    mounted(){
              
    },
    methods: { 
        clearSearch(){
            this.searchOKR = '';
            this.Emptysearch();
        },

        async fetchTransactions() {
            publishEvent(Constant.SHOW_LOADER);
            try{
                let response = await getOkrs();
                this.okrList = response.data.data;
                this.okrListing();
                publishEvent(Constant.HIDE_LOADER);
                this.filterListing();
            }
            catch(e){
                console.log(e);
            }
            localStorage.setItem('okrList', JSON.stringify(this.okrList));
        },

        okrListing(){
            this.mainOkrList = this.okrList.reduce((acc, cur) => {
                    if(cur.parent_objective_id === "") {
                        cur.children = [];
                        acc.push(cur);
                        
                    } else {
                        parent = acc.find(item => item.id === cur.parent_objective_id);
                        if(parent){
                            parent.children.push(cur.title);
                        }
                        
                    }
                    return acc;
                },[]);
                this.totalCount = this.mainOkrList.length;
                localStorage.setItem('mainOkrList', JSON.stringify(this.mainOkrList));
        },

        filterListing(){
                for (const [key, value] of Object.entries(this.mainOkrList)) {
                    if(!this.filterList.includes(value.category)){
                        this.filterList.push(value.category);
                    }
                }
        },

        search(text) {
            let searchResults = []
            let searchOKR = text.toLowerCase();
            this.okrList = JSON.parse(localStorage.getItem('okrList'));
            if(text != ''){
                searchResults = this.okrList.filter(a => a.category.toLowerCase().search(text) > -1)
                this.totalCount = searchResults.length;
                this.okrList = [...searchResults];
            } else {
                this.Emptysearch();
                return;
            }
      },

      Emptysearch() {
           if (this.searchOKR != '' ) {} else {
            this.okrList = JSON.parse(localStorage.getItem('okrList'));
            this.totalCount = this.okrList.length;
            }
        },
      
        
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
.mainContainer {
    
    width:100%;
   .searchConatiner{background:url(./../assets/img/bg.jpg) no-repeat;background-position:100% 50%;width:100%;height:250px;background-size:cover;position:relative;
    .searchInner{position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);min-width:60%;}
    .searchMain{position:relative;}
    input{width:78%;border: unset;margin-right:3%;}
    .btnDv{display: inline-block;width:12%;}
    .searchResultDv{margin-top: 20px;background: lightgrey;padding: 10px;
        span{display:inline-block;background: #fff;padding:2px 4px;margin-right:4px;
        .close{margin:0 2px; cursor:pointer; color: grey;}}
    }
    .btnDvNew{display: inline-block;width:4%;}
    }   

   .okrListContainer{
       width:90%;padding:2% 5%;
       .okrCard{box-shadow: 0 6px 14px 6px rgba(0, 0, 0, 0.08); width:96%;padding:2%;display:inline-block;
       }
       .btnDv{display: inline-block;width:12%;padding-left:20px;}
       }

    .tabcontent {padding: 6px 12px;width:100%;}
   }


.show{display:block;}

</style>
