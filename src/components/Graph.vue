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
                    <button class="btn btn-primary btn-sm my-2 my-sm-0" type="button" @click="launchStrategie();">Test</button>
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
import graphData from '../../public/BTC-ETH-hour.json';

export default {
    name: 'app-graph',
    data() {
        return {
            paneOpened: false,
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
        launchStrategie() {
            console.log('start strategie')
        },
        togglePane() {
            this.paneOpened = !this.paneOpened;
            this.$parent.$refs.main.graphOpened = this.paneOpened;
            this.$parent.$refs.help.graphOpened = this.paneOpened;
        }
    },
    mounted() {
        const data = graphData.data.map(item => {
            return {
                t: new Date(item[0]),
                y: item[1],
            }
        });
        const labels = graphData.data.map(item => {
            return new Date(item[0])
        });
        console.log(data);

        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
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
            // data: {
            //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            //     datasets: [{
            //         label: '# of Votes',
            //         data: [12, 19, 3, 5, 2, 3],
            //         borderWidth: 1
            //     }]
            // },
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