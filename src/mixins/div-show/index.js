export const divShow = {
    data(){
        return {
            show:false
        }
    },
    mounted() {
        setTimeout(() => {
            this.show=true
        }, 100);
    },
}