var id = 'count_user_by_year_mounth';

var vm_count_user_by_year_mounth = new Vue({
    el: '#' + id,
    data: {
        title: id,
        data: [],
        box_size: {
            width: 'auto',
            height: 250
        },
    },
    methods: {
        chart: function() {
            this.box_size.width = $("#" + this.title + " .panel-body").width();
            $("#" + this.title + " canvas").attr('width', this.box_size.width);
            $("#" + this.title + " canvas").attr('height', this.box_size.height);


            var canvas = document.querySelector("#" + this.title + " canvas"),
                context = canvas.getContext("2d");

            var width = canvas.width,
                height = canvas.height;

            var arc = d3.arc()
                .outerRadius(radius - 30)
                .innerRadius(0)
                .context(context);

            var labelArc = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius - 10)
                .context(context);

            var arcs = d3.pie()
                .value(function(d) {
                    return scale(d.count);
                })(this.data);

            var color = d3.schemeCategory20;

            context.translate(width / 2, height / 2);


            arcs.forEach(function(d, i) {
                context.beginPath();
                arc(d);
                context.fillStyle = color[i];
                context.fill();
            });


            context.beginPath();
            arcs.forEach(arc);
            context.strokeStyle = "#fff";
            // context.lineWidth = 5;
            context.lineJoin = 'bevel';
            context.stroke();


            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "#000";
            arcs.forEach(function(d, i) {
                var c = labelArc.centroid(d);
                context.font = "15px Microsoft YaHei";
                context.fillStyle = color[i];
                context.fillText(d.data.role, c[0], c[1]);
            });


        },
    },
    compiled: function() {

        var vm = this;

        $.ajaxSetup({
            async: false,
        });

        $.get('month_users/2016', {}, function(data) {
            this.data = JSON.parse(data);
        });

        this.chart();
    }

});
