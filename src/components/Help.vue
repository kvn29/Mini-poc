<template>
    <div id="help" v-if="help">
        <div class="icon-selected">
            <i v-if="help.icontype === 'icon'" :class="help.icon"></i>
        </div>
        <h6>{{help.title}}</h6>
        <p>
            {{help.description}}
        </p>
    </div>
</template>
<script>
export default {
    name: 'app-help',
    computed: {
        help() {
            return this.$store.state.help;
        }
    }
}
</script>
<style lang="scss">
#help {
    position: absolute;
    top: 90px;
    right: 30px;
    border: 2px solid #2c3e50;
    background: #ffffff;
    width: 250px;
    min-height: 50px;
    padding: 16px 24px;
    border-radius: 6px;
    box-shadow: 0 0 50px 5px rgba(128,128,128,.1);
    h6 {
        margin-top:4px;
        text-transform: uppercase;
    }
    p {
        font-size: 14px;
    }
    div.icon-selected {
        text-align: center;
        position: absolute;
        top: 12px;
        border-radius: 50%;
        left: -17px;
        width: 34px;
        height: 34px;
        border: 2px solid #2c3e50;
        background: white;
        svg {
            display: inline-block;
            margin-top:5px;
        }
    }
}
</style>