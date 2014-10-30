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
				that.parent().parent().remove();
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
				that.attr("data-pause", that.attr("data-play"));
				that.removeAttr("data-play");
				that.find("i.glyphicon.glyphicon-play").attr("class", "glyphicon glyphicon-pause");
				rebind();
			}
		});
	});
}

rebind();