<template>
    <div class="graph-log-modal" v-if="opened">
        <a href="" @click.prevent="download()"><i class="fas fa-download"></i> télécharger les journaux</a>
        <hr/>
        <!-- {{logs}} -->
        <table>
            <tr v-for="log in logs">
                <td class="time">{{log.time}}</td>
                <td class="log">{{log.type}} <span v-if="log.type === 'budget'"> inférieur à {{log.condition.lt}}</span></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'app-logs',
    data() {
        return {
            logs: [],
            opened: false
        }
    },
    methods: {
        add(args) {
            this.logs.push(args);
        },
        download() {
            let raw = ``;
            this.logs.map(log => {
                raw += `${log}\n`
            });
            console.log(raw);
        }
    }
}
</script>
<style lang="scss">
.graph-log-modal {
    position: absolute;
    top: 60px;
    right: 30px;
    width: 300px;
    min-height: 300px;
    background: white;
    z-index: 9;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    border-top-width: 4px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #66B0FF;
    a, a:hover{
        display: block;
        width: 100%;
        padding: 5px 10px;
        color: #66B0FF;
        text-transform: uppercase;
        font-size: 11px;
        text-decoration: none;
        color: #157ffb;
        &:hover {
            opacity: .70;
        }
    }
    hr {
        padding: 0;
        margin: 0;
        border: 0;
        background: #66B0FF;
        height: 1px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        tr {
            border-bottom: 1px solid #efefef;
            td {
                padding: 0 5px;
                width: 50%;
                &.time {
                    font-weight: bold;
                    font-size: 12px;
                }
                &.log {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>