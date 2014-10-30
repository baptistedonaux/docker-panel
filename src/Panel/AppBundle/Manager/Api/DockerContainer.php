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

	public function ps()
	{
		return Docker::decode($this->docker->get("/containers/json"));
	}
}