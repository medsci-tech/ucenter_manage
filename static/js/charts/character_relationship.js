var vm_character_relationship = new Vue({
    el: '#character_relationship',
    data: {
        title: 'character_relationship',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'upstream_downstream_beans',
    },
    computed: {
        data: function() {
            var user = this.get_data.user_info;
            var upstream = this.get_data.upstream;
            var downstream = this.get_data.downstream;
            var nodes = [];
            var links = [];

            nodes.push({
                name: user.phone,
                value: user.total_beans,
                symbolSize: Math.log(user.total_beans + 1000) * 2,
                itemStyle: {
                    normal: {
                        color: color[0]
                    }
                },
                x: 50,
                y: 50,
            })
            if (!upstream) {
                links.push({
                    source: upstream.phone,
                    target: user.phone,
                    lineStyle: {
                        normal: {
                            width: 3,
                            color: color[2]
                        }
                    }
                });
                nodes.push({
                    name: upstream.phone,
                    value: upstream.total_beans,
                    symbolSize: Math.log(upstream.total_beans + 1000) * 2,
                    itemStyle: {
                        normal: {
                            color: color[2]
                        }
                    }
                })
            }
            if (downstream != null) {
                for (i in downstream) {
                    links.push({
                        source: user.phone,
                        target: downstream[i].phone,
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: color[0]
                            }
                        }
                    });
                    nodes.push({
                        name: downstream[i].phone,
                        value: downstream[i].total_beans,
                        symbolSize: Math.log(downstream[i].total_beans + 100) * 2,
                        itemStyle: {
                            normal: {
                                color: color[1]
                            }
                        }
                    })
                }
            }
            return {
                nodes: nodes,
                links: links,
            }
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);
            if (this.get_data.downstream.length <= 1) {
                $('#' + this.title + '_chart').height(200);
            };
            var vm = this;

            var option = {
                color: color,
                // title: {
                //     text: this.title
                // },
                tooltip: {},
                series: [{
                    // name: '123',
                    type: 'graph',
                    // areaStyle: {normal: {}},
                    // itemStyle: { normal: {} },
                    layout: 'force',
                    force: {
                        repulsion: 50,
                        gravity: 0,
                        edgeLength: [30, 200],
                    },
                    data: vm.data.nodes,
                    links: vm.data.links,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    edgeSymbol: ['none', 'arrow'],
                    roam: true,
                    nodeScaleRatio: 0,
                }]
            };
            var chart = echarts.init(document.getElementById(vm.title + '_chart'));
            chart.setOption(option);

            chart.on('click', function(a) {
                if (a.dataType == 'node' && a.name != vm.get_data.user_info.phone) {

                    window.location.href = '/characters/' + a.name;
                }
            })
        },
        refresh: function(e) {
            var vm = this;
            if (e == 0) {
                $.get(vm.get_url, {}, function(data) {
                    vm.get_data = data;
                    vm.chart();
                });
            } else {
                $.get(e, {}, function(data) {
                    vm.get_data = data;
                    vm.chart();
                });
            }

        }
    },
    compiled: function() {

        var vm = this;

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;

            vm.chart();
        });
    }

});
