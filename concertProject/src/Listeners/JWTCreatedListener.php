<?php

namespace App\Listeners;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $payload = $event->getData();
        $user = $event->getUser();
        $payload['name'] = $user->getName();
        $payload['email'] = $user->getEmail();
        $event->setData($payload);
    }
}