<template>
    <div class="mainContainer">
        <div class="searchConatiner">
            <div class="searchInner">
                <div class="w100 searchMain">
                    <input v-model="searchPeople" v-on:keyup="search(searchPeople)" v-on:keydown="Emptysearch()" v-on:keyup.enter="search(searchPeople)" type="text" class=""  placeholder="Search for peoples near you (location , skills)" autocomplete="on" id="searchInput"/>
                    
                    <div class="btnDv">
                    <button class="btn new-btn" type="button" @click="search(searchPeople)">
                        <span class="search-icon" >SEARCH</span>
                    </button>
                    
                    </div>
                    <div class="btnDvNew" v-if="searchPeople != ''">
                    <button class="btn new-btn" type="button" @click="clearSearch()">
                        <span class="search-icon" >X</span>
                    </button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="jobConatiner">
            <div v-if="peoples.length > 0">
                <h3> TOTAL PEOPLE : {{totalCount}} </h3>
            </div>
            <div v-if="peoples.length == 0"><h2>NO PEOPLE FOUND</h2></div>

        
            
            <div class="jobCard clearfix">  
                <div class="tab fLft">
                    <button v-for="(people, index) in peoples" :key="index" class="tablinks" :class="activeindex === index ? 'active':'' " @click="openCity(index, people.name)">{{people.name}}</button>
                </div>
                

                <div v-for="(people, index) in peoples" :key="index" :id="people.name" class="tabcontent" :class="activeindex === index ? 'show fLft':'' ">
                   <div class="clearfix">
                       <div class="profileImg fLft"><img :src="people.img" /></div>
                       <div class="profileHead fLft">
                            <button class="btn new-btn" type="button" @click="search(searchPeople)">
                                <span class="search-icon">SEND MESSAGE</span>
                            </button>
                            <div class="profileRating">
                                <img v-for="img in people.rating" src="./../assets/img/like.png" />
                                <img v-for="img in (5 - people.rating)" src="./../assets/img/dislike.png" />
                            </div>
                    </div>
                   </div>
                   <p>{{people.Description}}</p>
                   <div class="clearfix profileSubDv">
                    <div class="fLft profileLike">
                        <div>Likes</div>
                        <div v-for="like in people.Likes" >{{like}}</div>
                    </div>
                    <div class="fLft profileLike">
                        <div>Dislikes</div>
                        <div v-for="dislike in people.Dislikes" >{{dislike}}</div>
                    </div>
                   </div>
                </div>
              
            </div>
        </div>

    </div>
</template>

<script>
import Utils from './../common/Utils';
import * as Constant from '../common/Constants';
import { publishEvent } from '../common/Observer';
import people from './../people.json';



export default {
   
    data() {
        return {
            searchPeople:'',
            peoples: [],
            totalCount: 0,
            activeindex:0,
        }
    },
     components: {
        //Pagination
    },
    created() {
        this.fetchTransactions();
    },
    mounted(){
              
    },
    methods: { 
        clearSearch(){
            this.searchPeople = '';
            this.Emptysearch();
        },
         openCity(index, cityName) {
             this.activeindex = index;
        },

        fetchTransactions() {
            publishEvent(Constant.SHOW_LOADER);
            this.peoples = people.People;
            this.totalCount = people.People.length;
            publishEvent(Constant.HIDE_LOADER);
            localStorage.setItem('peoples', JSON.stringify(people.People));
        },

        search(text) {
            let searchResults = []
            let searchPeople = text.toLowerCase();
            this.peoples = JSON.parse(localStorage.getItem('peoples'));
            if(text != ''){
                searchResults = this.peoples.filter(a => a.name.toLowerCase().search(text) > -1)
                this.totalCount = searchResults.length;
                this.peoples = [...searchResults];
            } else {
                this.Emptysearch();
                return;
            }
      },

      Emptysearch() {
           if (this.searchPeople != '' ) {} else {
            this.peoples = JSON.parse(localStorage.getItem('peoples'));
            this.totalCount = this.peoples.length;
            }
        },
      
        
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
.mainContainer {width:100%;
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
.sorterDV{
        .btnDv{.new-btn{width:100%;}}
        }
   .jobConatiner{
       width:90%;padding:2% 5%;
       .jobCard{box-shadow: 0 6px 14px 6px rgba(0, 0, 0, 0.08); width:92%;padding:2%;margin:2%;display:inline-block;
           .jobImgDv{width:90%;img{width:110px;height:110px;}
               .jobName{font-size:16px;line-height:18px;font-weight:bold;margin-bottom:10px;}
               .jobotherType{font-size:13px;}
               .jobBottom{font-size:14px;margin-top:10px;
                .timeSpan{display:inline-block;width:100%; img{width:16px;height:16px;vertical-align:-3px;padding-right:4px;}}
               }
           }
           .jobLinkDv{margin: 40px 0 20px 0;
               a{text-decoration: none;
               &:hover{text-decoration: none;}}
            }
       }
       .sorterDV{margin-bottom:20px;width:100%;
       .btnDv{display: inline-block;width:12%;padding-left:20px;}
       }
   }
   /* Style the tab */
.tab {overflow: hidden;border: 1px solid #ccc;background-color: #f1f1f1;width:20%;}
.tab button {background-color: inherit;border: none;outline: none;cursor: pointer;padding: 20px 16px;transition: 0.3s;font-size: 17px;display:block;width:100%;}
.tab button:hover {background-color: #ddd;}
.tab button.active {background-color: #ccc;}

.tabcontent {display: none;padding: 6px 12px;border: 1px solid #ccc;width:75%;
    .profileImg{width:200px; margin-right:30px;img{width:100%;}}
    .profileSubDv{width:60%;border:1px solid #000;
        .profileLike{width:50%;line-height:28px;
        div{height:28px;font-size:14px;}
        div:nth-of-type(odd){background:#ddd;}
        div:nth-of-type(even){background:#fff;}
        div:first-of-type{background:#ccc;font-size:16px;font-weight:bold;}
             }
    }
    .profileRating{margin-top:20px; 
    img{width:32px;margin-left:4px;}
    }
}
.show{display:block;}
}
</style>
