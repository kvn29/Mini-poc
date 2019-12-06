<template>
    <div id="graph" :class="{'opened': paneOpened}">
        <div class="chart-container">
            <canvas id="chart"></canvas>
        </div>
        <div class="graph-config">
            <nav class="navbar">
                <form class="form-inline my-2 my-lg-0">
                    <b-form-select size="sm" class="my-sm-0" v-model="form.instrument" :options="options" disabled></b-form-select>
                    <b-input-group size="sm" class="money" append="BTC">
                        <b-form-input v-model="form.wallet.money1"  disabled></b-form-input>
                    </b-input-group>
                    <b-input-group size="sm" class="money" append="USD">
                        <b-form-input v-model="form.wallet.money2"  disabled></b-form-input>
                    </b-input-group>
                    <button class="btn btn-primary btn-sm my-2 my-sm-0" type="button" @click="launchStrategie();" v-if="interval === null">Test</button>
                    <button class="btn btn-warning btn-sm my-2 my-sm-0" type="button" @click="stopStrategie();" v-else>Stop</button>
                    <span v-if="progression !== 0">{{progression}} %</span>
                    <!-- <button v-b-modal.modal-log type="button">Launch demo modal</button> -->

                    <!-- <b-modal id="modal-log" title="Journaux" modal-class="graph-log" dialog-class="graph-log-dialog" hide-backdrop no-close-on-backdrop>
                        {{logs}}
                        <table>
                            <tr v-for="log in logs">
                                <td class="time">{{log.time}}</td>
                                <!-- <td class="log"></td> -->
                            <!-- </tr> -->
                        <!-- </table> -->
                    <!-- </b-modal> -->
                </form>
                <form class="form-inline my-2 my-lg-0">
                    <button class="btn btn-light btn-sm my-2 my-sm-0" type="button" @click="showLogs();">Journaux</button>
                </form>
            </nav>
        </div>
        <button class="togglePaneButton" @click="togglePane()">
            <i class="fas fa-chevron-down" v-if="!paneOpened"></i>
            <i class="fas fa-chevron-up" v-else></i>
        </button>
    </div>
</template>
<script>
import Chart from 'chart.js';
import jsonGraphData from '../../public/BTC-ETH-hour.json';

export default {
    name: 'app-graph',
    data() {
        return {
            chartCustom: null,
            progression: 0,
            interval: null,
            paneOpened: false,
            logs: [],
            options: [
                { value: 'BTC-USD', text: 'BTC / USD', disabled: true, selected: true }
            ],
            form: {
                instrument: 'BTC-USD',
                wallet: {
                    money1: 10000,
                    money2: 0
                }
            }
        }
    },
    methods: {
        showLogs() {
            this.$parent.$refs.logs.opened = !this.$parent.$refs.logs.opened;
        },
        drawDotAtIndex(index) {
            const meta = this.chartCustom.getDatasetMeta(0);

            const x = meta.data[index]._model.x;
            const y = meta.data[index]._model.y;

            let ctx = this.chartCustom.ctx;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#007bff';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#E9F4FF';
            ctx.stroke();
            ctx.closePath();
        },
        stopStrategie() {
            clearInterval(this.interval);
            this.interval = null;
            this.progression = 0;
            this.closeTip();
        },
        launchStrategie() {
            console.log('start strategie');
            this.progression = 0;
            this.logs = [];
            const dataGraph = jsonGraphData.data.map(item => {
                return {
                    t: new Date(item[0]),
                    y: item[1],
                }
            });

            // const dataGraph = [23.45, 24.01, 24.05, 23.95, 23.50, 22.90, 22.10];

            console.log(dataGraph);


            const nodes = [
                {type: 'log', text: 'Test', enabled: true},
                {type: 'budget', condition: {
                    gt: 17000
                }},
                // {type: 'log', text: 'Test 2', enabled: true},
                // {type: 'budget', condition: {
                //     lt: 13500.00
                // },  enabled: true},
                {type: 'log', text: 'END', enabled: true}
            ];
            let copyNodes = nodes;


            console.group();
            // const bot = (() => {
                console.log(' -- START BOT -- ');
            let index = 0;
            this.interval = setInterval(() => {
                console.log('interval', index);
                 
                if (index < dataGraph.length) {
                    
                    if (copyNodes.length) {
                        let instruction = copyNodes[0];
                        // let instruction = copyNodes.shift();
                        switch(instruction.type) {
                            case 'log':
                                console.log('LOG: ', instruction.text);
                                copyNodes.shift();
                                index = index !== 0 ? --index : 0;
                                // this.logs = [...this.logs, {time: new Date().toLocaleString(), ...instruction}];
                                this.log({time: new Date().toLocaleString(), ...instruction});
                                this.drawDotAtIndex(index);
                                // node.enabled = false;
                            break;
                            case 'budget':
                                if (instruction.condition.lt) {
                                    if (dataGraph[index].y < instruction.condition.lt) {
                                        copyNodes.shift();
                                        console.log('Budget lower than ', instruction.condition.lt, dataGraph[index].y);
                                        // this.logs = [...this.logs, {time: new Date().toLocaleString(), ...instruction}];
                                        this.log({time: new Date().toLocaleString(), ...instruction});
                                        this.drawDotAtIndex(index);
                                    }
                                } else if(instruction.condition.gt) {
                                    if (dataGraph[index].y > instruction.condition.gt) {
                                        copyNodes.shift();
                                        console.log('Budget greater than', instruction.condition.gt, dataGraph[index].y);
                                        this.log({time: new Date().toLocaleString(), ...instruction});
                                        this.drawDotAtIndex(index);
                                    }
                                }
                            break;
                        }
                    }

                    // for (let i = 0, len = copyNodes.length; i < len; i++) {
                    //     let node = copyNodes[i];
                    //     if (node.enabled) {
                    //         switch(node.type) {
                                // case 'log':
                                //     console.log('LOG: ', node.text);
                                //     node.enabled = false;
                                // break;
                    //         }
                    //     }
                    // }
                    // copyNodes.map(node => {
                    //     if (node.enabled) {
                    //         switch(node.type) {
                    //             case 'log': 
                    //         }
                    //     }
                    // })
                    
                    index = ++index;
                    this.progression = Math.floor(index*100/dataGraph.length);
                    // this.
                    if (index < dataGraph.length) {
                        // this.drawProgress(index);
                        // this.showTooltipByIndex(0, index);
                    }
                } else {
                    console.log('clear')
                    clearInterval(this.interval);
                    this.stopStrategie();
                    console.groupEnd();
                }
            }, 2);
        },
        togglePane() {
            this.paneOpened = !this.paneOpened;
            this.$parent.$refs.main.graphOpened = this.paneOpened;
            this.$parent.$refs.help.graphOpened = this.paneOpened;
        },
        showTooltipByIndex(datasetIndex, pointIndex) {
            this.chartCustom.tooltip._active = []
            var activeElements = this.chartCustom.tooltip._active;
            var requestedElem = this.chartCustom.getDatasetMeta(datasetIndex).data[pointIndex];
            for(var i = 0; i < activeElements.length; i++) {
                if(requestedElem._index == activeElements[i]._index)  
                    return;
            }
            activeElements.push(requestedElem);
            this.chartCustom.tooltip._active = activeElements;
            this.chartCustom.tooltip.update(true);
            this.chartCustom.draw();
        },
        closeTip(datasetIndex, pointIndex){
            var activeElements = this.chartCustom.tooltip._active;
            if(activeElements == undefined || activeElements.length == 0)
                return;
            
            if(!datasetIndex) {
                this.chartCustom.tooltip._active = [];
            } else {
                var requestedElem = this.chartCustom.getDatasetMeta(datasetIndex).data[pointIndex];
                // Si on veut supprimer une tooltip ou bien toute
                for(var i = 0; i < activeElements.length; i++) {
                    if(requestedElem._index == activeElements[i]._index)  {
                        activeElements.splice(i, 1);
                        break;
                    }
                }
                this.chartCustom.tooltip._active = activeElements;
            }
            this.chartCustom.tooltip.update(true);
            this.chartCustom.draw();
        },
        log(args) {
            this.$parent.$refs.logs.add(args);
        }
    },
    mounted() {

        
        // dev auto open
        // this.togglePane();

        const data = jsonGraphData.data.map(item => {
            return {
                t: new Date(item[0]),
                y: item[1],
            }
        });
        const labels = jsonGraphData.data.map(item => {
            return new Date(item[0])
        });
        console.log(data);
        
        var ctx = document.getElementById('chart').getContext('2d');
        this.chartCustom = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Demo',
                    data: data,
                    borderWidth: 1,
                    pointRadius: 0,
                    borderColor: "#007bff",
                    backgroundColor: 'rgba(38, 143, 255, 0.1)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                label: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false
                        },
                        ticks: {
                            display: true,
                            padding: 5,
                            minRotation: 0,
                            maxRotation: 0,
                            autoSkip: true,
                            autoSkipPadding: 20,
                            callback: function(value, index, values) {
                                return value.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: true,
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
</script>
<style lang="scss">
#graph {
    background: white;
    position: absolute;
    top: -240px;
    left:100px;
    z-index: 9;
    width: calc(100% - 100px);
    height: 361px !important;
    border-bottom: 1px solid #ced4da;
    &.opened {
        top: 57px;
    }
    .chart-container {
        width: 100%;
        height: 300px !important;
        position: relative;
    }
    .graph-config {
        background: white;
        width: 100%;
        height: 60px;
        padding-top: 4px;
        .form-inline {
            & > * {
                margin: 0 4px;
            }
        }
        .money {
            input[type='text'] {
                width: 90px;
            }
        }
    }
    button.togglePaneButton {
        cursor: pointer;
        position: absolute;
        bottom: -5px;
        left: calc(50% - 50px);
        outline: none;
        width: 100px;
        height: 10px;
        border:1px solid #adb5bd;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        background: white;
        font-size:6px;
        svg {
            transform: translateY(-1px);
        }
    }
}

</style>