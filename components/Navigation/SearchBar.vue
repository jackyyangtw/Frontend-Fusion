<template>
    <div class="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 stroke-slate-700 dark:stroke-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <div class="search-bar text-slate-700 max-w-[200px] md:max-w-[350px]
        dark:text-white
        ">
            <input class="text-slate-700 border border-indigo-600
            dark:text-white dark:border-white
            " 
            type="text" placeholder="Search" v-model="searchText" @keyup.enter="search"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        components: {},
        data() {
            return {
                searchText:''
            };
        },
        methods: {
            search() {
                // debounce
                this.$store.dispatch("setLoading", true);
                const searchText = this.searchText;
                setTimeout(() => {
                    if (searchText === this.searchText) {
                        this.$store.commit("setSearchText", this.searchText);
                        this.$router.push({ name: "search", params: { searchText: this.searchText } });
                    }
                }, 1000);
            }
        }
        
    }
</script>

<style scoped>
.search-bar {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: rgb(255, 255, 255,0.3); */
    z-index: 100;
    box-sizing: border-box;
    padding-left: 10px;
    /* color: white; */
    font-size: 1rem;
    border-radius: 30px;
}

.search-bar input {
    position: relative;
    width: 100%;
    height: 100%;
    /* border: none; */
    outline: none;
    background-color: rgba(255, 255, 255, 0.1);
    /* color: white; */
    font-size: 1.2rem;
    transition: all 0.2s ease-in-out;
    border-radius: 30px;
    padding: 3px;
    padding-left: 20px;
    /* border: solid 1px rgba(255, 255, 255, 0.4); */
}

.search-bar input::placeholder {
    /* color: white; */
    margin: 0 10px;
    transition: all 0.2s ease-in-out;
    border-radius: 30px;
    padding: 5px;
}

.search-bar input:focus {
    background-color: white;
    /* color: black; */
}

</style>