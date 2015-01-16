function image(item)
{
	var content = "<tr data-image='" + item["Id"] + "'><td>" + item["RepoTags"][0].split(":").shift() + "</td><td>";

	for (var j = item["RepoTags"].length - 1; j >= 0; j--) {
		content += "<span class='label label-info'>" + item["RepoTags"][j].split(":").pop() + "</span> ";
	};

	content += "</td></td><td>" + filesize(item["Size"]) + "</td><td>" + filesize(item["VirtualSize"]) + "</td></tr>";

	return content;
}

function container(item)
{
	var content = "<tr><td><i class='glyphicon glyphicon-";

	if (item["Status"].indexOf("Paused") > -1) {
		content += "pause";
	} else if (item["Status"].indexOf("Up") > -1 || item["Status"].indexOf("Restarting") > -1) {
		content += "play";
	} else {
		content += "stop";
	}

	var supply = '<span class="label label-info">' + item["Names"].join('</span> <span class="label label-info">') + '</span>';

	content += "'></i></td><td><button type='button' class='btn btn-xs btn-default' data-toggle='popover' title='Also available name' data-content='" + supply + "'>" + item["Names"][0] + "</button></td><td>" + item["Status"] + "</td><td>" + item["Image"] + "</td><td>";

	if (item["Status"].indexOf("Paused") > -1) {
		content += '<a data-stop="' + item["Id"] + '"><i class="glyphicon glyphicon-stop"></i></a><a data-play="' + item["Id"] + '"><i class="glyphicon glyphicon-play"></i></a>';
	} else if (item["Status"].indexOf("Up") > -1 || item["Status"].indexOf("Restarting") > -1) {
		content += '<a data-stop="' + item["Id"] + '"><i class="glyphicon glyphicon-stop"></i></a><a data-pause="' + item["Id"] + '"><i class="glyphicon glyphicon-pause"></i></a>';
	} else {
		content += '<a data-play="' + item["Id"] + '"><i class="glyphicon glyphicon-play"></i></a><a data-trash="' + item["Id"] + '"><i class="glyphicon glyphicon-trash"></i></a>';
	}

	return content;
}