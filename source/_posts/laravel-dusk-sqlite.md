---
title: Testing Laravel with Dusk and SQLite
tags:
  - laravel
  - dusk
  - testing
  - sqlite
date: 2019-01-25 15:14:10
---


[Laravel Dusk](https://laravel.com/docs/5.7/dusk) is a helpful tool to perform browser-automated tests using a standalone ChromeDriver installation. In order to use a different environment – therefore a different database – we have to set a bunch of configs. Even if Dusk is ready-to-use after the installation, using it with a SQLite database could be very tricky, and is also hard to find documentation about it.

## Create a brand new database connection
The first thing you have to do is create a new database connection in the **config/database.php** file – you can also use the existing *sqlite* connection:

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

This configuration will use a database file named **database.sqlite** inside the *database* folder. If something doesn't work, create the file manually:

```bash
touch database/database.sqlite
```

## Setting up the environment
The next step is to create a copy of the **.env** file named **.env.dusk**<sup>1</sup>, leaving everything as is but changing only few variables:
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

> 1\. On the web you may find **.env.dusk.testing** or **.env.dusk.local** doesn't seem to be working.

## Run Dusk tests
Be loaded, we are finishing. 
Lastly, we have to clear previous config and serve the project using the correct environment:
```bash
php artisan config:clear
php artisan serve --env=dusk
```

Now we can run Dusk tests as we commonly do:
```bash
php artisan dusk
```

And should work :tada:

<br><br>Bye.
