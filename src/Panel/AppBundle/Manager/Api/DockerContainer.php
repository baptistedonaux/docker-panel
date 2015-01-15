<?php

namespace Panel\AppBundle\Manager\Api;

use Panel\AppBundle\Utils\Utils;

class DockerContainer
{
	private $docker;

	public function __construct(Docker $docker)
	{
		$this->docker = $docker;
	}

	public function ps(array $options = array())
	{
		$path = "/containers/json";
		if (!empty($options)) {
			$path .= "?";
			foreach ($options as $key => &$value) {
				$path .= $key."=".$value."&";
			}
		}

		return Docker::decode($this->docker->get($path));
	}

	public function stop($id)
	{
		$this->docker->post("/containers/".$id."/stop");
	}

	public function pause($id)
	{
		$this->docker->post("/containers/".$id."/pause");
	}

	public function play($id)
	{
		$this->docker->post("/containers/".$id."/unpause");
	}

	public function trash($id)
	{
		$this->docker->delete("/containers/".$id);
	}
}