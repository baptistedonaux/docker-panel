function request(url, done)
{
	$.ajax({
		url: url,
		dataType: "json"
	}).done(function(response) {
		done(response);
	});
}

function rebind()
{
	$("[data-stop]").off("click");
	$("[data-stop]").on("click", function() {
		var that = $(this);
		var id = that.attr("data-stop");
		var url = Routing.generate("container_stop", {"id": id});

		request(url, function(response) {
			if (response.success) {
				that.parent().find("[data-pause] i.glyphicon.glyphicon-pause").remove();
				that.parent().find("[data-stop] i.glyphicon.glyphicon-stop").remove();
				that.parent().find("[data-play] i.glyphicon.glyphicon-play").remove();
				that.parent().find("[data-trash] i.glyphicon.glyphicon-trash").remove();

				that.parent().append("<a data-play='" + id + "'><i class='glyphicon glyphicon-play'></i></a>");
				that.parent().append("<a data-trash='" + id + "'><i class='glyphicon glyphicon-trash'></i></a>");

				rebind();
			}
		});
	});

	$("[data-pause]").off("click");
	$("[data-pause]").on("click", function() {
		var that = $(this);
		var id = that.attr("data-pause");
		var url = Routing.generate("container_pause", {"id": id});

		request(url, function(response) {
			if (response.success) {
				that.attr("data-play", that.attr("data-pause"));
				that.removeAttr("data-pause");
				that.find("i.glyphicon.glyphicon-pause").attr("class", "glyphicon glyphicon-play");
				rebind();
			}
		});
	});

	$("[data-play]").off("click");
	$("[data-play]").on("click", function() {
		var that = $(this);
		var id = that.attr("data-play");
		var url = Routing.generate("container_play", {"id": id});

		request(url, function(response) {
			if (response.success) {
				that.attr("data-pause", id);
				that.removeAttr("data-play");
				that.find("i.glyphicon.glyphicon-play").attr("class", "glyphicon glyphicon-pause");

				var trash = that.parent().find("[data-trash] i.glyphicon.glyphicon-trash").length;

				if (trash > 0) {
					that.parent().find("[data-trash] i.glyphicon.glyphicon-trash").remove();
					that.parent().append("<a data-stop='" + id + "'><i class='glyphicon glyphicon-stop'></i></a>");
				}
				rebind();
			}
		});
	});

	$("[data-trash]").off("click");
	$("[data-trash]").on("click", function() {
		var that = $(this);
		var id = that.attr("data-trash");
		var url = Routing.generate("container_trash", {"id": id});

		request(url, function(response) {
			if (response.success) {
				that.parent().parent().remove();
				rebind();
			}
		});
	});

	$('[data-toggle]').popover({
		trigger: "hover",
		placement: "right",
		html: true
	});

	$("[data-image]").off("click");
	$("[data-image]").on("click", function() {
		var that = $(this);

		$.ajax({
			url: Routing.generate("image_get", {"id": that.attr("data-image")}),
		}).done(function(image) {
			var title = "Create a new container";

			var html = '<div class="modal-dialog"><form><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + title + '</h4></div><div class="modal-body"><div><input type="text" name="name" placeholder="Container name" /></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="submit" class="btn btn-primary">Create a container</button></div></div></form></div>';

			$("#modal").html(html);

			$("#modal form").off("submit");
			$("#modal form").on("submit", function() {
				var form = $(this);

				var name = form.find("input[name='name']").val();

				$.ajax({
					url: Routing.generate("container_create", {"image": that.attr("data-image")}) + "?name=" + name,
					contentType: "application/json",
					data: {
						"Hostname":"",
						"User":"",
						"Memory":0,
						"MemorySwap":0,
						"AttachStdin":false,
						"AttachStdout":true,
						"AttachStderr":true,
						"PortSpecs":null,
						"Privileged": false,
						"Tty":false,
						"OpenStdin":false,
						"StdinOnce":false,
						"Env":null,
						"Dns":null,
						"Volumes":{},
						"VolumesFrom":"",
						"WorkingDir":"",
						// "Hostname":"",
						// "Domainname": "",
						// "User":"",
						// "Memory":0,
						// "MemorySwap":0,
						// "CpuShares": 0,
						// "Cpuset": "0",
						// "AttachStdin":false,
						// "AttachStdout":true,
						// "AttachStderr":true,
						// "Tty":false,
						// "OpenStdin":false,
						// "StdinOnce":false,
						// "Env":null,
						// "Cmd":[
						// 	"echo 'Hello World!'"
						// ],
						// "Entrypoint": "/bin/bash",
						"Image": that.attr("data-image"),
						// "Volumes":{
						// },
						// "WorkingDir":"",
						// "NetworkDisabled": false,
						// "MacAddress":false,
						// "ExposedPorts":{
						// 	"22/tcp": {}
						// },
						// "SecurityOpts": [],
						// "HostConfig": {
						// 	"Binds":["/tmp:/tmp"],
						// 	"Links":["redis3:redis"],
						// 	"LxcConf":{"lxc.utsname":"docker"},
						// 	"PortBindings":{},
						// 	"PublishAllPorts":false,
						// 	"Privileged":false,
						// 	"Dns": [""],
						// 	"DnsSearch": [""],
						// 	"VolumesFrom": [],
						// 	"CapAdd": ["NET_ADMIN"],
						// 	"CapDrop": ["MKNOD"],
						// 	"RestartPolicy": {},
						// 	"NetworkMode": "bridge",
						// 	"Devices": []
						// }
					},
					type: "POST",
				}).done(function(response) {
				});

				return false;
			});

			$('#modal').modal('show');
		});

	});
}

rebind();

AutoComplete({
	selector: [
		"div.col-lg-4 input[data-autocomplete]"
	],
	post: function(result, response, custParams) {
		var tbody = document.querySelector("#images tbody");

		var content = "";
		response = JSON.parse(response);
		
		var result = [];
		var keys = Object.keys(response);

		for (var i = keys.length - 1; i >= 0; i--) {
			result.push(response[keys[i]]);
		};

		var content = "";
		for (var i = result.length - 1; i >= 0; i--) {
			content += image(result[i]);
		};

        tbody.innerHTML = content;

        rebind();
	}
});

AutoComplete({
	selector: [
		"div.col-lg-6 input[data-autocomplete]"
	],
	post: function(result, response, custParams) {
		var tbody = document.querySelector("#containers tbody");

		var content = "";
		response = JSON.parse(response);
		
		var result = [];
		var keys = Object.keys(response);

		for (var i = keys.length - 1; i >= 0; i--) {
			result.push(response[keys[i]]);
		};

		var content = "";
		for (var i = result.length - 1; i >= 0; i--) {
			content += container(result[i]);
		};

        tbody.innerHTML = content;

        rebind();
	}
});

/*
 2014 Jason Mulligan
 @license BSD-3 <https://raw.github.com/avoidwork/filesize.js/master/LICENSE>
 @link http://filesizejs.com
 @module filesize
 @version 2.0.4
*/
(function(p){function g(g,c){var b="",d=0,a,h,m,f,n,e,k,l;if(isNaN(g))throw Error("Invalid arguments");c=c||{};h=!0===c.bits;e=!0===c.unix;d=void 0!==c.base?c.base:e?2:10;n=void 0!==c.round?c.round:e?1:2;k=void 0!==c.spacer?c.spacer:e?"":" ";l=void 0!==c.suffixes?c.suffixes:{};f=Number(g);m=0>f;b=2<d?1E3:1024;m&&(f=-f);0===f?e?b="0":(a="B",b="0"+k+(l[a]||a)):(a=Math.floor(Math.log(f)/Math.log(1E3)),8<a&&(a=8),d=2===d?f/Math.pow(2,10*a):f/Math.pow(1E3,a),h&&(d*=8,d>b&&(d/=b,a++)),b=d.toFixed(0<a?n:
0),a=q[h?"bits":"bytes"][a],e?(h&&r.test(a)&&(a=a.toLowerCase()),a=a.charAt(0),e=b.replace(s,""),"B"===a?a="":h||"k"!==a||(a="K"),t.test(e)&&(b=parseInt(b,u).toString()),b+=k+(l[a]||a)):e||(b+=k+(l[a]||a)));m&&(b="-"+b);return b}var r=/b$/,u=10,s=/.*\./,t=/^0$/,q={bits:"B kb Mb Gb Tb Pb Eb Zb Yb".split(" "),bytes:"B kB MB GB TB PB EB ZB YB".split(" ")};"undefined"!==typeof exports?module.exports=g:"function"===typeof define?define(function(){return g}):p.filesize=g})(this);
//@ sourceMappingURL=filesize.map
