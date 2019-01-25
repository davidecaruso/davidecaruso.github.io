---
title: Testing Laravel with Dusk and SQLite
tags: 
  - laravel
  - dusk
  - testing
  - sqlite
---

[Laravel Dusk](https://laravel.com/docs/5.7/dusk) is a helpful tool to perform browser-automated testing using a standalone ChromeDriver installation. In order to do tests in a different environment – therefore a different database –we have to set a bunch of configs. Even if Dusk is ready-to-use after the installation, config it to point to a SQLite database could be very tricky, and is also hard to find documentation about it.

## Create a brand new database connection
The first thing you have to do is create a new custom database connection in the **config/database.php** file – you can also use the existing *sqlite* connection:

```php
<?php

return [
    // ...
    'connections' => [
        // ...
        'dusk' => [
            'driver' => 'sqlite',
            'database' => database_path('database.sqlite'),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],
    ],
    // ...
];
```

This configuration will create a database named **database.sqlite** inside the *database* folder.

## Setting up the environment
The next step is to create a copy of the **.env** file naming it **.env.dusk**<sup>1</sup>, leaving everything as is but changing only the database variables:
```dotenv
# ...
APP_ENV=testing
# ...

DB_CONNECTION=dusk
#DB_HOST=127.0.0.1
#DB_PORT=3306
#DB_DATABASE=homestead
#DB_USERNAME=homestead
#DB_PASSWORD=secret
# ...
```
Comment or delete all **DB_&#42;** variables, set the **DB_CONNECTION** to *dusk* and make sure that the **APP_ENV** is *testing*.

> 1\. On the web you may find **.env.dusk.testing** or **.env.dusk.local** but seem that don't work.

## Run Dusk tests
Be loaded, we are finishing. 
Lastly, we have to clear previous config and serve the project with the right environment:
```bash
php artisan config:clear
php artisan serve --env=dusk
```

Now we can run Dusk tests as we commonly do:
```bash
php artisan dusk
```

And should be work :tada:

<br><br>Bye.
