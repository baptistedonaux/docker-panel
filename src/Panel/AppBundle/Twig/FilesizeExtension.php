<?php

namespace Panel\AppBundle\Twig;

class FilesizeExtension extends \Twig_Extension
{
    /**
     * @param integer $size
     * @return string
     */
    public function filesize($size)
    {
        if( $size <= 0 ) {
            return '0 KB';
        }

        if( $size === 1 ) {
            return '1 byte';
        }

        $mod = 1024;
        $units = array('bytes', 'KB', 'MB', 'GB', 'TB', 'PB');

        for( $i = 0; $size > $mod && $i < count($units) - 1; ++$i ) {
            $size /= $mod;
        }

        return round($size, 2) . ' ' . $units[$i];
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            'filesize' => new \Twig_Filter_Method(
                $this, 'filesize'
            ),
        );
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'panel_filesize_extension';
    }
}
