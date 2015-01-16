<?php

namespace Panel\AppBundle\Manager\Api;

use Panel\AppBundle\Utils\Utils;

class DockerImage
{
	private $docker;

	public function __construct(Docker $docker)
	{
		$this->docker = $docker;
	}

	public function get($id)
	{
		$path = "/images/".$id."/json";

		return Docker::decode($this->docker->get($path));
	}
}