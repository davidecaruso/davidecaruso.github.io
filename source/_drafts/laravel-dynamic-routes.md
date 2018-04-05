---
title: 'Laravel: how to quickly create dynamic routes'
tags:
 - laravel
 - php
 - routing
---
Laravel allows to easily integrate dynamic routes with controllers and the related *Eloquent* models, without caring about how to get data from database. That is provided by a strict relation between the controller and the model, by using the *type hinting* inside the controller's method and implementing a method of the model to set which is the relation.

## Put in practice

Supposing to have a **Post** model:
```php
<?php
// routes/web.php

Route::resource('/posts', 'PostController')->only('show');
// or
Route::get('/posts/{post}', 'PostController@show');
```

When the route `/post/slug-of-a-post` is triggered, then will be called the *show* method of **PostController**:
```php
<?php
// app/Http/Controllers/PostController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function show(Request $request, Post $post)
    {
        return view('posts.show', ['post' => $post]);
    }
}
```

As you can see, the second parameter must be of type **Post**: this tell to Laravel to ask to the model to interpretate the route request. This is a mandatory step without which the next step would not work:

```php
<?php
// app/Post.php

namespace App;

class Post extends Illuminate\Database\Eloquent\Model
{
    protected $fillable = [
        'author_id',
        'title',
        'content',
        'slug'
    ];
    
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
```

The last step is to implement the *getRouteKeyName* method – inherited from the *Model* class – which consents to choose for which field the controller has to query for. If not implemented, it will search for the model's primary key field by default, so the *id*.

## Alternative
As said before, all depends on the type hinting inside the controller's method. Well, what could happen if you change it? Let see:
```php
<?php
// app/Http/Controllers/PostController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $post = Post::where('slug', $slug)->first();
        return view('posts.show', ['post' => $post]);
    }
}
```
In this way the controller gets the raw value passed in the route and is its duty to retrieve the post through the model.

<br><br>Bye.