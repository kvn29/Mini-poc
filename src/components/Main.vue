<template>
    <div>
        <div id="main" :class="{'graphOpened': graphOpened}"></div>
    </div>
</template>
<script>
export default {
    name: 'app-main',
    computed: {
        heightSvg() {
            return window.innerHeight - 60;
        }
    },
    data() {
        return {
            graphOpened: false,
            incrementItemId: 0,
            flowchart: null,
            flowDataStart: {"operators":{"0":{"top":20,"left":20,"properties":{"class":"flowchart-default-operator bloc-wallet","title":"<i class=\"fas fa-wallet\"></i>","inputs":{"input_1":{"label":"Input 1"}},"outputs":{"output_1":{"label":"Output 1"}}}}},"links":{},"operatorTypes":{}}
        }
    },
    methods: {
        saveState() {
            const data = this.flowchart.flowchart('getData');
            localStorage.setItem('data-flow', JSON.stringify(data));
        },
        deleteState() {
            localStorage.removeItem('data-flow');
            this.flowchart.flowchart('setData', this.flowDataStart);
        },
        add(event, opts) {
            const item = Object.assign(event.helper, {});
            const { top, left } = event.position;

            var operatorId = 'created_operator_' + this.itemId;
            var operatorData = {
                top: top,
                left: left,
                properties: {
                    class: 'flowchart-default-operator bloc-' + opts.key,
                    title: opts.text ? '<span>' + opts.text + '</span>' : '<i class="' + opts.icon + '"></i>',
                    inputs: {
                        input_1: {
                            label: 'Input 1',
                        }
                    },
                    outputs: {
                        output_1: {
                            label: 'Output 1',
                        }
                    }
                }
            };
            
            // this.incrementItemId++;
            // this.flowchart.flowchart('createOperator', this.incrementItemId, operatorData);
            const randomId = Math.floor(Math.random() * 10000000);
            console.log('randomid', randomId);
            this.flowchart.flowchart('createOperator', randomId, operatorData);

            
            let $placeholder = $('<div />').attr('class', 'placeholder');
            $('.bloc-' + opts.key).append($placeholder);
            let popper = null;
            
            $placeholder.on('click', () => {
                let $popupContainer = $('<div />').attr('class', 'popupcontainer').html('ici').appendTo('body');
                popper = new Popper($('.bloc-' + opts.key), $popupContainer,{
                    placement: 'right-start',
                    modifiers: {
                        arrow: {
                            enabled: true,
                        },
                        flip: {
                            behavior: ['right', 'bottom', 'top']
                        },
                        preventOverflow: {
                            boundariesElement: document.querySelector('.flowchart-operators-layer')[0],
                        },
                    },
                });
                $popupContainer.on('click', () => {
                    $popupContainer.remove();
                    popper.destroy();
                })
            });

            $('.bloc-' + opts.key).off('over').on('mouseenter', () => {
                this.$store.commit('setSelectedKey', opts.key);
                this.$store.dispatch('getInformation');
            }).off('mouseleave').on('mouseleave', () => {
                this.$store.commit('setSelectedKey', null);
                this.$store.dispatch('getInformation');
            }).off('drag').on('drag', () => {
                if (popper) 
                    popper.update();
            })
        },
        initFlow() {
            this.flowchart = $('#main');

            const data = localStorage.getItem('data-flow') 
                ? JSON.parse(localStorage.getItem('data-flow'))
                : this.flowDataStart;
            this.flowchart.flowchart({
                data: data
            });
            // localStorage.getItem('data-flow') ? this.flowchart.flowchart({
            //     data: JSON.parse(localStorage.getItem('data-flow'))
            // }) : this.flowchart.flowchart();
        }
    },
    mounted() {
        $(document).ready(() => {
            this.initFlow();
        });
        this.$store.dispatch('getTradeData');



        const dataGraph = [23.45, 24.01, 24.05, 23.95, 23.50, 22.90, 22.10];

        console.log(dataGraph);


        const nodes = [
            {type: 'log', text: 'Test', enabled: true},
            {type: 'log', text: 'Test 2', enabled: true},
            {type: 'budget', condition: {
                lt: 23.00
            },  enabled: true},
            {type: 'log', text: 'END', enabled: true}
        ];
        let copyNodes = nodes;


        console.group();
        // const bot = (() => {
            console.log(' -- START BOT -- ');
        let index = 0;
        let intervalBot = setInterval(function() {
            console.log('interval', index);
            
            if (index < dataGraph.length) {
                
                if (copyNodes.length) {
                    let instruction = copyNodes[0];
                    // let instruction = copyNodes.shift();
                    switch(instruction.type) {
                        case 'log':
                            console.log('LOG: ', instruction.text);
                            copyNodes.shift();
                            index = --index;
                            // node.enabled = false;
                        break;
                        case 'budget':
                            if (instruction.condition.lt) {
                                if (dataGraph[index] < instruction.condition.lt) {
                                    copyNodes.shift();
                                    console.log('Budget lower than ', instruction.condition.lt, dataGraph[index]);
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
            } else {
                console.log('clear')
                clearInterval(intervalBot);
                console.groupEnd();
            }
        }, 10);
        

        // })()
    }
}
</script>
<style lang="scss">
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
#main {
    background-color: #FCFCFC;
    background-image: url('../assets/worn-dots.png');
    background-repeat: repeat;
    position: absolute;
    top: 117px;
    left: 100px;
    width: calc(100% - 100px);
    height: calc(100% - 60px - 60px);
    &.graphOpened {
        top: 417px;
    }
    .flowchart-container {
        background: transparent;
        svg {
            cursor: default;
        }
    }
    
}
.popupcontainer {
    border:2px solid #2c3e50;
    padding: 6px 10px;
    background: white;
    border-radius: 8px;
    position: absolute;
    font-size: 12px;
    left: 25px !important;
    min-width: 250px;
    min-height: 100px;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    &::before {
        content:'';
        position: absolute;
        /* width: 10px; */
        /* height: 10px; */
        display: block;
        /* background: red; */
        top: 12px; 
        left: -10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7.5px 10px 7.5px 0;
        border-color: transparent #2c3e50 transparent transparent;
    }
}
.flowchart-link path {
    stroke-width: 2 !important;
}

g.flowchart-link {
    @keyframes fadein {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    transform: translateY(5px);
    &:hover {
        animation: linear 200ms infinite reverse fadein;
    }
}
.flowchart-operator.flowchart-default-operator.ui-draggable {
    display: flex;
    align-items: center;
    width: 45px !important;
    height: 45px !important;
    border-radius: 7px;
    border: 1px solid #2c3e50;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24) !important;
    .placeholder {
        position: absolute;
        bottom: -25px;
        left: -18px;
        width: 80px;
        height: 20px;
        color: white;
        font-size:12px;
        padding: 3px;
        border-radius: 3px;
        background: #2c3e50;
    }
    .flowchart-operator-title {
        border-radius: 7px;
        color: black;
        z-index: 1;
        position: absolute;
        background: white;
        text-align: center;
        font-size:19px;
        padding-top:9px;
        height: 100%;
        width: 100%;
        span {
            font-size: 13px;
            margin-top: 5px;
            text-transform: uppercase;
            display: block;
        }
    }
    .flowchart-operator-inputs-outputs {
        margin: inherit !important;
        position: absolute;
        z-index: 2;
    }
    .flowchart-operator-connector-label {
        display: none;
    }
    .flowchart-operator-connector-arrow {
        border:0;
        background: #2c3e50;
        border-radius: 50%;
        width: 8px;
        height: 8px;
    }
    .flowchart-operator-connector-small-arrow {
        border:0;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        &[style="border-left-color: rgb(51, 102, 255);"] {
            /* Connected arrow */
            background: red;
        }
        &[style="border-left-color: rgb(0, 0, 0);"] {
            /* Selected path */
            background: yellow;
        }
        &[style="border-left-color: rgb(31, 61, 153);"] {
            /* hover path */
            background: green;
        }
    }

    /** arrow left **/
    .flowchart-operator-inputs {
        .flowchart-operator-connector-arrow {
            left: -4px;
        }
        .flowchart-operator-connector-small-arrow {
            &:not([style="border-left-color: transparent;"]) {
                top: 0px;
                left: -4px;
            }
        }
    }
    /** arrow right **/
    .flowchart-operator-outputs {
        .flowchart-operator-connector-arrow {
            right: -4px;   
        }
        .flowchart-operator-connector-small-arrow {
            &:not([style="border-left-color: transparent;"]) {
                top: 0px;
                right: -4px;
            }
        }
    }
        
}
</style>