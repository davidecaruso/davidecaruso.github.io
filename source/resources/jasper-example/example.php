<?php
require_once __DIR__ . '/vendor/autoload.php';

use JasperPHP\JasperPHP;

// Instanciate JasperPHP
$jasper = new JasperPHP();

// Compile jrxml file into jasper
$jasper->compile(__DIR__ . '/report.jrxml')->execute();

// Generate the report
$jasper->process(
    __DIR__ . '/report.jasper',
    null,
    ['xlsx'],
    [],
    [
        'driver' => 'json',
        'json_query' => 'data',
        'data_file' => __DIR__ . '/data.json'
    ]
)->execute();