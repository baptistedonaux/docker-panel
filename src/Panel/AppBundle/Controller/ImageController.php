<?php

namespace Panel\AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/image")
 */
class ImageController extends Controller
{
    /**
     * @Route("/search", name="image_search")
     */
    public function search(Request $request)
    {
    	$images = $this->container->get("docker.api")->images();
        foreach ($images as $key => $image) {
            $found = false;
            foreach ($image["RepoTags"] as $name) {
                if (strpos($name, $request->query->get("q")) !== false) {
                    $found = true;
                }
            }

            if ($found === false) {
                unset($images[$key]);
            }
        }

    	return new JsonResponse($images);
    }
}
