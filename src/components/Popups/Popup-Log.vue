<template>
    <div>
        Test: <br/>
        <input v-model="title" type="text" />
        <button type="button" @click="closePopup()">CLOSE</button>
    </div>
</template>
<script>
export default {
    name: 'popup-logs',
    props: ['popupContainer', 'popper'],
    data() {
        return {
            title: 'hello'
        }
    },
    methods: {
        closePopup() {
            this.popupContainer.hide();
            this.popper.destroy();
        }
    },
    mounted() {
        console.log(this.popupContainer);
    }
}
</script>