<template>
    <div id="panel">
        <div class="group">
            <label>MISC</label>
            <div>
                <div class="item" data-opts='{"key": "log", "icon": "fas fa-info"}' @mouseover="over('log')" @mouseout="out()">
                    <i class="fas fa-info"></i>
                </div>
                <div class="item" data-opts='{"key": "temp", "icon": "far fa-clock"}' @mouseover="over('temp')" @mouseout="out()">
                    <i class="far fa-clock"></i>
                </div>
                <div class="item" data-opts='{"key": "clock", "icon": "fas fa-wallet"}'>
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="item" data-opts='{"key": "clock", "icon": "fas fa-gift"}'>
                    <i class="fas fa-gift"></i>
                </div>
                <div class="item" data-opts='{"key": "clock", "icon": "fas fa-balance-scale"}'>
                    <i class="fas fa-balance-scale"></i>
                </div>
            </div>
        </div>
        <div class="group">
            <label>OPERATORS</label>
            <div>
                <div class="item" data-opts='{"key": "and", "text": "and"}'>
                    <span>and</span>
                </div>
                <div class="item" data-opts='{"key": "or", "text": "or"}'>
                    <span>or</span>
                </div>
            </div>
        </div>
        <div class="group">
            <label>ACTIONS</label>
            <div>
                <div class="item" data-opts='{"key": "buy", "text": "buy"}'>
                    <span>buy</span>
                </div>
                <div class="item" data-opts='{"key": "sell", "text": "sell"}'>
                    <span>sell</span>
                </div>
            </div>
        </div>
        <div class="group">
            <label>ANALYSIS</label>
            <div>
                <div class="item">
                    <span>RSI</span>
                </div>
                <div class="item">
                    <span>MACD</span>
                </div>
                <div class="item">
                    <span>BOLL</span>
                </div>
                <div class="item">
                    <span>ICHI</span>
                </div>
            </div>
        </div>
        <div class="group">
            <label>NOTIFICATIONS</label>
            <div>
                <div class="item" data-opts='{"key": "clock", "icon": "far fa-envelope"}'>
                    <i class="far fa-envelope"></i>
                </div>
                <div class="item" data-opts='{"key": "clock", "icon": "far fa-bell"}'>
                    <i class="far fa-bell"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app-panel',
    data() {
        return {
            
        }
    },
    mounted() {
        $('.item').draggable({
            appendTo: '#main',
            helper: 'clone',
            stop: (event, ui) => {
                // console.log(event.target.dataset);
                this.$parent.$refs.main.add(ui, JSON.parse(event.target.dataset.opts));
            }
        });
    },
    methods: {
        add() {
            this.$parent.$refs.main.add();
        },
        over(key) {
            this.$store.commit('setSelectedKey', key);
            this.$store.dispatch('getInformation');
        },
        out() {
            this.$store.commit('setSelectedKey', null);
            this.$store.dispatch('getInformation');
        }
    }
}
</script>
<style lang="scss">
#panel {
    width: 99px;
    height: calc(100% - 60px);
    background: white;
    position: absolute;
    top: 60px;
    left: 0px;
    border-right: 1px solid #CED4DA;
    padding: 0px 10px;
}
.group {
    &:nth-of-type(1) {
        margin-top: 40px;
    }
    margin-top: 10px;
    overflow: hidden;
    label {
        font-size:9px;
        text-transform: uppercase;
        display: block;
        padding: 0;
        margin: 0;
    }
    div.item {
        float: left;
        margin: 2px;
        border: 1px solid #2c3e50;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
        background: white;
        color:black;
        width: 35px;
        height: 35px;
        cursor: grab;
        padding:5px 0px;
        text-align: center;
        span {
            display: block;
            text-transform: uppercase;
            font-size:9px;
            font-weight: 900;
            margin-top:5px;
        }
    }
}
</style>